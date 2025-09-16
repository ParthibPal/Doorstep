// CartItem.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  joiningdate: { type: String, required: true },
  location: { type: String, required: true },
  loggedInEmail: { type: String, required: true },
  providerEmail: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },  // rating between 1 and 5
  serviceCost: { type: Number,required: true},
  salesdata: { type: Number, required: true }
},{collection: "cart-items"});

const CartItem = mongoose.model('cart-items', cartItemSchema);

module.exports = CartItem;
