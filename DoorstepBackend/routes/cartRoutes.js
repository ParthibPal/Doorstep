const express = require('express');
const session = require("express-session");  // Using require
const multer = require('multer');    //require multer from file uploads
const { CloudinaryStorage } = require('multer-storage-cloudinary');  //Stores images directly in Cloudinary instead of the local filesystem.
//require cloudinary storage
const { v2: cloudinary } = require('cloudinary'); //Used to upload images to Cloudinary.
const dotenv = require('dotenv'); //load environment variables
const Card = require("../models/CardModel.js");   //require card model
const SellerTempCollection = require('../models/SellerFormModel.js');
const CartItem = require('../models/CartItem.js'); //require CartItem model



dotenv.config();  //load cloudinary API keys
const router = express.Router();    //Initialize Express Router
router.post('/', async (req, res) => {
    const {
        name, img, location, salesdata, rating, serviceCost, serviceName, 
        description, joiningdate, phone, loggedInEmail,providerEmail
    } = req.body;

    try {
        const newCartItem = new CartItem({
            name,
            img,
            location,
            salesdata,
            rating,
            serviceCost,
            serviceName,
            description,
            joiningdate,
            phone,
            loggedInEmail,
            providerEmail
        });

        // Save to database
        await newCartItem.save();

        res.status(201).json({ message: 'Cart item added successfully', newCartItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add cart item', error });
    }
});


// GET all cart items
router.get('/', async (req, res) => {
    const email = req.query.email;  // Get email from query
    const cartItems = await CartItem.find({ 
        loggedInEmail: email });  // Fetch only that user's cart
    res.json(cartItems);
});

// DELETE a cart item by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await CartItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json({ message: 'Cart item deleted successfully', deletedItem });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete cart item', error });
    }
});


module.exports = router;
