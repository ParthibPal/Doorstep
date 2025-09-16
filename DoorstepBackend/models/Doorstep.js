const mongoose = require('mongoose')
const DoorstepSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    confirmPassword: String,
    phone:Number
})
const DoorstepModel = mongoose.model("employee",DoorstepSchema);
module.exports = DoorstepModel