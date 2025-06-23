
const mongoose = require("mongoose");

// Load environment variables from .env file (like MONGODB_URL)
require('dotenv').config();

// reading the MongoDB connection URL from the .env file.
const mongoUrl = process.env.MONGODB_URL;

// Connect to MongoDB using Mongoose
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,         // Use new URL parser 
    useUnifiedTopology: true       // Use new topology engine 
});

// Get the default connection object to handle events
const db = mongoose.connection;

// Event listener: when successfully connected to the database
db.on('connected', () => {
    console.log("✅ Connected to MongoDB server");
});

// Event listener: when the database connection is disconnected
db.on('disconnected', () => {
    console.log("⚠️ Disconnected from MongoDB server");
});

// Event listener: when there's a connection error
db.on('error', (err) => {
    console.error("❌ Connection error:", err);
});

// Export the db object so it can be used in other files
module.exports = db;
