// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Fetches your database URI from a .env file or falls back to local MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hrms_db');
        
        console.log(`🚀 MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        // Exit process with failure code if connection fails during hackathon presentation
        process.exit(1); 
    }
};

module.exports = connectDB;