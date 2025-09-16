const mongoose = require('mongoose'); // CommonJS import

//define a schema (structure) for storing card details
const SellerFormModel = new mongoose.Schema({
    mobileNumber: { //card title(required)
        type: String,
        required: false
    },
    email: { //card description(required)
        type: String,
        required: false
    },

    gstin: { //URL of the image stored in Cloudinary(Required)
        type: String,
        required:false
    },
    name: { //URL of the image stored in Cloudinary(Required)
        type: String,
        required:false
    },
    password: { //URL of the image stored in Cloudinary(Required)
        type: String,
        required:false,
        // default:"Hello Papa"
    },
    imageSrc: { //URL of the image stored in Cloudinary(Required)
        type: String,
        required:false,
        default: "xyz"
    },

    serviceName: { //URL of the image stored in Cloudinary(Required)
        type: String,
        required:false,
        // default: "xyz"
    },
    category: { //URL of the image stored in Cloudinary(Required)
        type: String,
        required:false,
        // default: "xyz"
    },
    serviceLocation: { //URL of the image stored in Cloudinary(Required)
        type: String,
        required:false,
        // default: "xyz"
    },
    serviceDescription: { //URL of the image stored in Cloudinary(Required)
        type: String,
        required:false,
        // default: "xyz"
    },
    serviceCost: { //URL of the image stored in Cloudinary(Required)
        type: String,
        required:false,
        // default: "xyz"
    },

    // confirmPassword: { //URL of the image stored in Cloudinary(Required)
    //     type: String,
    //     required:false,
    //     default: "xyz"
    // }
},{collection: "main-project-seller-temp-data"})

//create and export the card model
const SellerTempCollection = mongoose.model("SellerTempCollection",SellerFormModel);
module.exports = SellerTempCollection; // CommonJS export
