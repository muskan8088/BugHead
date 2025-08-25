import fetch from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Load API keys from .env
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = "namita2003"; // replace
const REPO = "mern"; // replace
const ISSUE_NUMBER = 1; // replace with issue number

// Gemini setup
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// 1. Get issue details from GitHub
async function getIssue() {
    const response = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/issues/${ISSUE_NUMBER}`,
        {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github+json",
            },
        }
    );
    return await response.json();
}

// 2. Generate summary using Gemini
async function summarizeIssue(issueBody) {
    const prompt = `
  Summarize the following GitHub issue in 2-3 sentences:
  ---
  ${issueBody}
  `;
    const result = await model.generateContent(prompt);
    return result.response.text();
}

// 3. Post summary back to GitHub as a comment
async function postComment(summary) {
    const response = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/issues/${ISSUE_NUMBER}/comments`,
        {
            method: "POST",
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github+json",
            },
            body: JSON.stringify({ body: `### 🤖 AI-Generated Summary\n${summary}` }),
        }
    );
    return await response.json();
}

// Main workflow
(async () => {
    try {
        const issue = await getIssue();
        const summary = await summarizeIssue(issue.body);
        const comment = await postComment(summary);
        console.log("✅ Summary added to issue:", comment.html_url);
    } catch (error) {
        console.error("❌ Error:", error);
    }
})();
