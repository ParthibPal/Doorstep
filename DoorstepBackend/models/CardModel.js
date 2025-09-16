const mongoose = require('mongoose'); // Use require instead of import

//define a schema (structure) for storing card details
const CardSchema = new mongoose.Schema({
    name: { //card title(required)
        type: String,
        required: true
    },
    desc: { //card description(required)
        type:String,
        required: true 
    },
    imageSrc: { //URL of the image stored in Cloudinary(Required)
        type: String,
        required:true
    }
},{collection: "main-project-test"})

//create and export the card model
const Card = mongoose.model("Card",CardSchema);
module.exports = Card; // Use module.exports instead of export default
