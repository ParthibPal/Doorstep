const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    name: String,
    location: String,
    img: String,
    serviceCost: Number,
    serviceName: String,
    providerEmail: { type: String, required: true },
    loggedInEmail: { type: String, required: true },
    description: String,
    phone: String,
    rating: Number,
    joiningdate: String,
    salesdata: Number,
    createdAt: { type: String,  }
});

module.exports = mongoose.model('Sale', SaleSchema, 'sales-table');
