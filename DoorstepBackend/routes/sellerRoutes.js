const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const SellerTempCollection = require("../models/SellerFormModel.js");
const dotenv = require("dotenv");


dotenv.config()
const router = express.Router();

//Configure Cloudinary for image storage
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, //Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,    //Cloudinary API Key
    api_secret: process.env.CLOUDINARY_API_SECRET   //Cloudinary API Key
})

const sellerTempStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "seller_temp_storage",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const uploadSellerTempData = multer({storage: sellerTempStorage });


router.post("/", async (req, res) => {  //, uploadSellerTempData.single("image")
    try {
        const { mobileNumber, email, gstin } = req.body;

        if (!mobileNumber || !email || !gstin) {
            return res.status(400).json({ message: "⚠ Mobile Number, Email Id, and GSTIN are required!" });
        }

        const imageUrl = req.file ? req.file.path : null;

        const newSeller = new SellerTempCollection({ mobileNumber, email, gstin }); //, imageSrc: imageUrl 
        await newSeller.save();

        res.status(201).json({ message: "✅ Seller Data added successfully", sellerTempCollection: newSeller });
    } catch (error) {
        console.error("❌ Error adding seller data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Step 2: Update password using email (WITHOUT HASHING)
router.post("/step2", async (req, res) => {
    try {
        const { email, name, password, confirmPassword } = req.body;
        // console.log(req.body);
        
        if (!email || !name || !password || !confirmPassword) {
            return res.status(400).json({ message: "⚠ Email, Name, Password, and Confirm Password are required!" });
        }
        
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "⚠ Passwords do not match!" });
        }

        // Find the seller by email and update password (without hashing)
        const updatedSeller = await SellerTempCollection.findOneAndUpdate(
            { email },
            {$set : {name,password}},
            { password },
            { new: true }
        );

        if (!updatedSeller) {
            return res.status(404).json({ message: "❌ Seller not found!" });
        }

        res.status(201).json({ message: "✅ Password updated successfully" });
    } catch (error) {
        console.error("❌ Error updating password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


//Route: Add tha New Card (POST)
router.post("/step3", uploadSellerTempData.single("imageSrc"),async (req,res) => {
    try{
        const {email,category, serviceName, serviceDescription, serviceLocation, serviceCost} = req.body   //Extract name and description from request body
        const imageSrc = req.file ? req.file.path : null;

        
        
        //validate request
        if(!email || !category || !serviceName || !serviceDescription || !serviceLocation || !serviceCost  ){
            return res.status(400).json({message: "⚠ All data fields are required!"});
        }

    
        const existingService = await SellerTempCollection.findOne({ email });

        if (existingService) {
            // Update existing entry
            existingService.category = category;
            existingService.serviceName = serviceName;
            existingService.serviceDescription = serviceDescription;
            existingService.serviceLocation = serviceLocation;
            existingService.serviceCost = serviceCost;
            if (imageSrc) existingService.imageSrc = imageSrc; // Update image only if a new one is uploaded

            await existingService.save();
            return res.status(200).json({ message: "✅ Service updated successfully", service: existingService });
        } else {
                console.log("Start from the beginning");
                
            }



        //save card to MongoDB
        await newService.save();
        res.status(201).json({message: "✅ Product Details added successfully", service: newService});
    }catch(error){
        console.error("❌ Error adding new Service Provider: ",error);
        res.status(500).json({message: "Internal server error"});
    }
})





module.exports = router;
