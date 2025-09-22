const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URL;

mongoose.connect(url)
.then((result) => {
    console.log('connected to MongoDB');
    
}).catch((err) => {
    console.log('Error connecting to MongoDB',err.message);
    
});
module.exports = mongoose;

//this file establishes a connection to the MongoDB database using Mongoose.
// It reads the database URL from enviourment variables and logs the connection status.