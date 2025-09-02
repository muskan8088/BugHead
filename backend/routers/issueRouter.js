const express = require('express');
const Issue = require('../models/issuemodel');
const Website = require('../models/websitemodel');
const axios = require('axios');
const authMiddleware = require('../middleware/auth'); // ✅ import middleware

const router = express.Router();

// Add an issue (user must be authenticated)
router.post('/add', authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id; // ✅ get logged-in user from token
        const issueData = req.body;

        // Find website belonging to this user
        const website = await Website.findOne({ owner: userId });
        if (!website) return res.status(404).json({ error: 'No website registered for this user.' });

        if (!website.githubOwner || !website.githubRepo) {
            return res.status(400).json({ error: 'Website has no GitHub repo configured.' });
        }

        // Save issue in DB (link website + user)
        const issue = new Issue({ ...issueData, website: website._id, ownerID: userId });
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
        console.error(error.response?.data || error.message);
        res.status(400).json({ error: error.response?.data || error.message });
    }
});

module.exports = router;
