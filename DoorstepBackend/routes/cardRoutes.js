const express = require('express');
const session = require("express-session");  // Using require
const multer = require('multer');    //require multer from file uploads
const { CloudinaryStorage } = require('multer-storage-cloudinary');  //Stores images directly in Cloudinary instead of the local filesystem.
//require cloudinary storage
const { v2: cloudinary } = require('cloudinary'); //Used to upload images to Cloudinary.
const dotenv = require('dotenv'); //load environment variables
const Card = require("../models/CardModel.js");   //require card model
const SellerTempCollection = require('../models/SellerFormModel.js');
dotenv.config();  //load cloudinary API keys
const router = express.Router();    //Initialize Express Router


//Configure Cloudinary for image storage
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, //Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,    //Cloudinary API Key
    api_secret: process.env.CLOUDINARY_API_SECRET   //Cloudinary API Key
})

//Configure Multer to use Cloudinary to use Cloudinary for file uploads
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,  //Use the configured Cloudinary instance
    params: {
        folder: "card_images",   //Cloudinary folder to store images
        allowed_formats: ["jpg", "png", "jpeg"], //allowed image formats
    }
})


//Configure Multer to use Cloudinary to use Cloudinary for file uploads
// const sellerTempStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,  //Use the configured Cloudinary instance
//     params: {
//         folder: "seller_temp_storage",   //Cloudinary folder to store images
//         allowed_formats: ["jpg","png","jpeg"], //allowed image formats
//     }
// })


//Initialize Multer with the Cloudinary storage configuration
const upload = multer({ storage });

//Initialize Multer with the Cloudinary storage configuration
// const uploadSellerTempData = multer({sellerTempStorage});

//Route: Add tha New Card (POST)
router.post("/addCard", upload.single("image"), async (req, res) => {
    try {
        const { name, desc } = req.body   //Extract name and description from request body
        //validate request
        if (!name || !desc) {
            return res.status(400).json({ message: "⚠ Name and Description are required!" });
        }

        //get uploaded image URL from Cloudinary
        let imageUrl = req.file ? req.file.path : null;

        //create new card object
        const newCard = new Card({ name, desc, imageSrc: imageUrl });

        //save card to MongoDB
        await newCard.save();
        res.status(201).json({ message: "✅ Card added successfully", card: newCard });
    } catch (error) {
        console.error("❌ Error adding new Service Provider: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
})



// //Route: Add tha New Card (POST)
// router.post("/api/sellerTempForm", uploadSellerTempData.single("image"), async (req, res) => {
//     try{

//         const {mobileNumber, email, gstin} = req.body   //Extract name and description from request body

//         //validate request
//         if(!mobileNumber || !email || !gstin){
//             return res.status(400).json({message: "⚠ Mobile Number, Email Id and GSTIN are required!"});
//         }

//         //get uploaded image URL from Cloudinary
//         const imageUrl = req.file ? req.file.path: null;

//         //create new card object
//         const newSeller = new SellerTempCollection({mobileNumber, email, gstin, imageSrc: imageUrl});

//         //save card to MongoDB
//         await newSeller.save();
//         res.status(201).json({message: "✅Seller Data added successfully", SellerTempCollection: newSeller});
//     }catch(error){
//         console.error("❌ Error adding Card: ",error);
//         res.status(500).json({message: "Internal server error"});
//     }
// })




// // Fetch card by ID
// router.get("/:category", async (req, res) => {
//     try {
//         const { category } = req.params;  // Get the card ID from the request parameters

//         // Fetch the card from the database based on the provided ID
//         const card = await Card.find({ category: category });

//         if (!card) {
//             return res.status(404).json({ message: "Card not found" });
//         }

//         // Return the found card
//         res.status(200).json(card);
//     } catch (error) {
//         console.error("❌ Error fetching card by ID:", error);
//         res.status(500).json({ message: "Internal server error while fetching card." });
//     }
// });

router.get("/:category", async (req, res) => {
    try {
        const { category } = req.params;

        // Find all cards matching the category
        // New — Case-insensitive search
        const cards = await Card.find({ category: { $regex: `^${category}$`, $options: 'i' } });

        // Check if array is empty
        if (cards.length === 0) {
            return res.status(404).json({ message: "No cards found for this category" });
        }

        res.status(200).json(cards);  // Return array of cards
    } catch (error) {
        console.error("❌ Error fetching cards by category:", error);
        res.status(500).json({ message: "Internal server error while fetching cards." });
    }
});


//
// POST route to add a cart item
// router.post('/api/cart', async (req, res) => {
//     const {
//         name, img, location, salesdata, rating, price, serviceName, 
//         description, joiningdate, phone, loggedInEmail
//     } = req.body;

//     try {
//         const newCartItem = new CartItem({
//             name,
//             img,
//             location,
//             salesdata,
//             rating,
//             price,
//             serviceName,
//             description,
//             joiningdate,
//             phone,
//             loggedInEmail
//         });

//         // Save to database
//         await newCartItem.save();

//         res.status(201).json({ message: 'Cart item added successfully', newCartItem });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to add cart item', error });
//     }
// });

router.get("/", async (req, res) => {
    try {
        const cards = await Card.find() //Fetch all cards from MongoDB
        res.status(200).json(cards);
    } catch (error) {
        console.error("❌ Error fetching cards: ", error);
        res.status(500).json({ messgae: "Internal server error" })
    }
})

module.exports = router;
