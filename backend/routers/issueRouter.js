const express = require('express');
const Issue = require('../models/issuemodel'); // Import the model

require('dotenv').config();
const router = express.Router();

// Create a new website
router.post('/add', async (req, res) => {
    try {
        const issue = new Issue(req.body);
        const savedIssue = await issue.save();
        res.status(201).json(savedIssue);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all websites
router.get('/getall', async (req, res) => {
    try {
        const issue = await Issue.find().populate('owner'); // Populate owner details
        res.status(200).json(issue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single website by ID
router.get('/getbyid/:id', async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id).populate('owner');
        if (!issue) {
            return res.status(404).json({ error: 'issue not found' });
        }
        res.status(200).json(issue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a website by ID
router.put('/update/:id', async (req, res) => {
    try {
        const updatedIssue = await Website.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedIssue) {
            return res.status(404).json({ error: 'issue not found' });
        }
        res.status(200).json(updatedIssue);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a website by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedIssue = await Website.findByIdAndDelete(req.params.id);
        if (!deletedIssue) {
            return res.status(404).json({ error: 'issue not found' });
        }
        res.status(200).json({ message: 'issue deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;