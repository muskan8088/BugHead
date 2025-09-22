const express = require('express');
const Website = require('../models/websitemodel');
const verifyToken = require("../middleware/auth");
require('dotenv').config();
const router = express.Router();

// Create a new website
router.post("/add", verifyToken, async (req, res) => {
    console.log("User from token:", req.user);
    try {
        const { name, repository, website, github, githubOwner, githubRepo } = req.body;
        const newWebsite = new Website({
            name,
            repository,
            website,
            github,
            githubOwner,
            githubRepo,
            owner: req.user._id,
        });
        const savedWebsite = await newWebsite.save();
        res.status(201).json(savedWebsite);
    } catch (error) {
        console.error("Error adding website:", error);
        res.status(400).json({ error: error.message });
    }
});

router.get("/getall", verifyToken, async (req, res) => {
    try {
        const websites = await Website.find({ owner: req.user._id });
        res.status(200).json(websites);
    } catch (error) {
        console.error("Error fetching websites:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

// Get a single website by ID (now protected)
router.get('/getbyid/:id', verifyToken, async (req, res) => {
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

router.get("/getuserwebsites", verifyToken, async (req, res) => {
    try {
        const websites = await Website.find({ owner: req.user._id });
        res.status(200).json(websites);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;