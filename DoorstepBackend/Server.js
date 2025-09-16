const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const cors = require("cors");
const dotenv = require('dotenv');
// const DoorstepModel = require("./Backend/models/Doorstep");
const DoorstepModel = require("./models/Doorstep")

// Route imports (make sure these files use `module.exports = router`)
const cardRoutes = require("./routes/cardRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const verifyProvider = require("./routes/VerifyProvider");
const cartRoutes = require("./routes/cartRoutes");
const salesRoutes = require("./routes/sales");



// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'yourSecretKey', // Replace with strong secret in production
    resave: false,
    saveUninitialized: true
}));

// Database Connection
if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in the environment variables.");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error: ", err));

// Session Check Route
app.get('/check-session', (req, res) => {
    if (req.session.user) {
        console.log('User from session:', req.session.user);
        res.json({ message: `User is: ${req.session.user}` });
    } else {
        res.json({ message: 'No user session found' });
    }
});

// Auth Routes
app.post('/signup', (req, res) => {
    DoorstepModel.create(req.body)
        .then(Doorstep => res.json(Doorstep))
        .catch(err => res.json(err));
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    DoorstepModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    req.session.user = email;
                    res.json("success");
                } else {
                    res.json("password is incorrect");
                }
            } else {
                res.json("no record found");
            }
        });
});

// App Routes
app.use("/api/cards", cardRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/sellerTempForm", sellerRoutes);
app.use("/api", verifyProvider);
app.use("/api/sales-table", salesRoutes);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
