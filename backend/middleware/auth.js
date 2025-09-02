const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // ✅ Only attach user to request, not website
        req.user = user;

        next();
    } catch (error) {
        console.error('Auth error:', error.message);
        return res.status(401).json({ error: 'Unauthorized: ' + error.message });
    }
};

module.exports = authMiddleware;
