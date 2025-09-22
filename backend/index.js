const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// ✅ Import routers
const userRouter = require('./routers/userRouter');
const websiteRouter = require('./routers/websiteRouter');
const issueRouter = require('./routers/issueRouter');

const app = express();
const port = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables Cross-Origin Resource Sharing

// ✅ Route mounting
// Mount each router at its respective base path
app.use('/user', userRouter);
app.use('/website', websiteRouter);
app.use('/issue', issueRouter);

app.use(express.static('static'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});