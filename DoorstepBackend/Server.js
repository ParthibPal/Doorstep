// ============================
// Import dependencies
// ============================
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// ============================
// Import models & routes
// ============================
// Example model import
const DoorstepModel = require("./models/Doorstep");

// Route imports
const cardRoutes = require("./routes/cardRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const verifyProvider = require("./routes/VerifyProvider");
const cartRoutes = require("./routes/cartRoutes");
const salesRoutes = require("./routes/sales");

const app = express();
const PORT = process.env.PORT || 5000;

// ============================
// Middleware
// ============================
// Parse JSON bodies
app.use(express.json());

// Allow CORS (important for frontend-backend communication)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // specify frontend URL in production
    credentials: true,
  })
);

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "yourSecretKey", // Use strong secret in production
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // secure cookies in production
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

// ============================
// Database Connection
// ============================
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in environment variables.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ============================
// Session Check Route
// ============================
app.get("/check-session", (req, res) => {
  if (req.session.user) {
    console.log("User from session:", req.session.user);
    res.json({ message: `User is: ${req.session.user}` });
  } else {
    res.json({ message: "No user session found" });
  }
});

// ============================
// Auth Routes
// ============================
app.post("/signup", async (req, res) => {
  try {
    const user = await DoorstepModel.create(req.body);
    res.json(user);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Error creating user" });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await DoorstepModel.findOne({ email });
    if (!user) return res.status(404).json("no record found");

    if (user.password === password) {
      req.session.user = email;
      res.json("success");
    } else {
      res.status(401).json("password is incorrect");
    }
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ============================
// API Routes
// ============================
app.use("/api/cards", cardRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/sellerTempForm", sellerRoutes);
app.use("/api", verifyProvider);
app.use("/api/sales-table", salesRoutes);

// ============================
// Serve Frontend (Production)
// ============================
if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "../DoorstepFrontend/dist");
  
    app.use(express.static(frontendPath));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
    });
  }

// ============================
// Start the server
// ============================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
