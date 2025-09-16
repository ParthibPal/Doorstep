const express = require('express');
const dotenv = require('dotenv');
const SellerTempCollection = require('../models/SellerFormModel.js');
dotenv.config();    // load environment variables
const router = express.Router(); // create new router object


router.get("/tempProviderDetails", async (req, res) => {
    try {
        const provider = await SellerTempCollection.find()   //retrive all user
        const providerWithImages = provider.map(provider => ({
            _id: provider._id,
            name: provider.name,
            mobileNumber: provider.mobileNumber,
            email: provider.email,
            gstin: provider.gstin,
            imageSrc: provider.imageSrc ? provider.imageSrc : "Image kothay",
            password: provider.password,
            category: provider.category,
            serviceCost: provider.serviceCost,
            serviceLocation: provider.serviceLocation,
            serviceName: provider.serviceName,
            serviceDescription: provider.serviceDescription
        }))
        res.status(200).json(providerWithImages);
    } catch (error) {
        console.error("❌ Error fetching users: ", error)
        res.status(500).json({ message: "Internal server error" })
    }
})


//Route to delete a user by ID
router.delete("/tempProviderDetails/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Ensure _id is a valid ObjectId string
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(400).json({ error: "Invalid ID format" });
        // }
        //Find the user by ID and delete
        const deleteProvider = await SellerTempCollection.findByIdAndDelete(id);
        if (!deleteProvider) {
            return res.status(404).json({ message: "❌ User not found" })
        }
        res.status(200).json({ message: "✅ User deleted successfully" });
    } catch (error) {
        console.error("❌ Error while deleting the user: ", error);
        res.status(500).json({ message: "Initial server error" })
    }
})

module.exports = router;
