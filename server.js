// server.js
require('dotenv').config(); // Loads environment variables from a .env file
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Initialize Express App
const app = express();

// 1. Connect to Database
connectDB();

// 2. Global Middlewares
app.use(cors());                  // Enables Cross-Origin Resource Sharing (Crucial for connecting React/Frontend)
app.use(express.json());          // Body parser: parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));

// 3. Import Routes (Uncomment these as you create them in your /routes folder)
// const authRoutes = require('./routes/auth.routes');
// const employeeRoutes = require('./routes/employee.routes');
// const attendanceRoutes = require('./routes/attendance.routes');

// 4. Mount Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/employees', employeeRoutes);
// app.use('/api/attendance', attendanceRoutes);

// Base Health-Check Route
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: "Welcome to the Human Resource Management System (HRMS) API Gateway",
        status: "Running" 
    });
});

// Global Error Handling Middleware (Catches unhandled errors beautifully)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// 5. Define Server Port & Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`⚡ HRMS Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
});