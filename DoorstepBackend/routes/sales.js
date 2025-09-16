const express = require('express');
const Sale = require('../models/Sale.js');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const sales = req.body.sales;

        if (!Array.isArray(sales) || sales.length === 0) {
            return res.status(400).json({ message: "No sales data provided" });
        }

        await Sale.insertMany(sales);
        res.status(201).json({ message: "Sales saved successfully" });
    } catch (error) {
        console.error("Error saving sales:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

// GET sales for a specific provider
router.get('/provider', async (req, res) => {
    const { email } = req.query;
    try {
        const sales = await Sale.find({ providerEmail: email });
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sales data' });
    }
});



module.exports = router;

