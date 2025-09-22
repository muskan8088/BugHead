const express = require('express');
const Issue = require('../models/issuemodel');
const Website = require('../models/websitemodel');
const axios = require('axios');
const authMiddleware = require('../middleware/auth'); 
const router = express.Router();

// Get issues by website ID (requires authentication)
router.get('/getbywebsiteid/:id', authMiddleware, async (req, res) => {
    try {
        const issues = await Issue.find({ website: req.params.id });
        res.status(200).json(issues);
    } catch (error) {
        console.error("Error fetching issues by website ID:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

// Add an issue from the public plugin (no authentication required)
router.post('/add', async (req, res) => {
    try {
        const issueData = req.body;
        console.log(req.body);
        
        
        // Find the website by the ID provided in the request body
        const website = await Website.findById(issueData.websiteId);
        console.log(website);
        
        if (!website) {
            return res.status(404).json({ error: 'Website not found.' });
        }

        if (!website.owner || !website.repository) {
            return res.status(400).json({ error: 'Website has no GitHub repo configured.' });
        }

        // Save issue in DB (link website)
        const issue = new Issue({ 
            ...issueData, 
            website: website._id, 
            ownerID: website.owner // Link the issue to the website's owner
        });
        const savedIssue = await issue.save();

        // GitHub issue
        const githubToken = process.env.GITHUB_TOKEN;
        const githubTitle = savedIssue.title || savedIssue.issueDescription || 'No Title';
        const githubBody = `
**Issue details:**
- Website ID: ${website._id}
- Website Name: ${website.name || 'N/A'}
- Description: ${savedIssue.issueDescription || 'N/A'}
- OS: ${savedIssue.os || 'N/A'}
- Browser: ${savedIssue.browser || 'N/A'}
- Category: ${savedIssue.category || 'N/A'}
- Owner ID: ${savedIssue.ownerID || 'N/A'}
        `;

        const githubResponse = await axios.post(
            `https://api.github.com/repos/${website.githubOwner}/${website.githubRepo}/issues`,
            { title: githubTitle, body: githubBody },
            { headers: { Authorization: `token ${githubToken}`, Accept: 'application/vnd.github+json' } }
        );

        res.status(201).json({ savedIssue, githubIssue: githubResponse.data });
    } catch (error) {
        console.error('Error adding issue:', error);
        res.status(500).json({ error: 'An error occurred while adding the issue.', details: error.message });
    }
});

module.exports = router;
