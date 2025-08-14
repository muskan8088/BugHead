const express = require('express');
const Website = require('../models/websitemodel'); // Import the model
const router = express.Router();

// Create a new website
router.post('/add', async (req, res) => {
    try {
        const website = new Website(req.body);
        const savedWebsite = await website.save();
        res.status(201).json(savedWebsite);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all websites
router.get('/getall', async (req, res) => {
    try {
        const websites = await Website.find().populate('owner'); // Populate owner details
        res.status(200).json(websites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single website by ID
router.get('/getbyid/:id', async (req, res) => {
    try {
        const website = await Website.findById(req.params.id).populate('owner');
        if (!website) {
            return res.status(404).json({ error: 'Website not found' });
        }
        res.status(200).json(website);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a website by ID
router.put('/update/:id', async (req, res) => {
    try {
        const updatedWebsite = await Website.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedWebsite) {
            return res.status(404).json({ error: 'Website not found' });
        }
        res.status(200).json(updatedWebsite);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a website by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedWebsite = await Website.findByIdAndDelete(req.params.id);
        if (!deletedWebsite) {
            return res.status(404).json({ error: 'Website not found' });
        }
        res.status(200).json({ message: 'Website deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;