const axios = require("axios");
require('dotenv').config();

const token = process.env.GITHUB_TOKEN; // your token here
const owner = "namita2003";        // e.g., "octocat"
const repo = "Mern";          // e.g., "Hello-World"

async function createIssue(title, body) {
    try {
        const response = await axios.post(
            `https://api.github.com/repos/${owner}/${repo}/issues`,
            {
                title: "this is a test",
                body: "isues for frontend repo",
            },
            {
                headers: {
                    Authorization: `token ${token}`,
                    "User-Agent": "Node.js Script",
                },
            }
        );

        console.log("✅ Issue created:", response.data.html_url);
    } catch (error) {
        console.error("❌ Failed to create issue:", error.response?.data || error.message);
    }
}

createIssue("Bug: Something went wrong", "Steps to reproduce:\n1. ...\n2. ...");
