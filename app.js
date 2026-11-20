
// app.js

// 1. Import packages
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// 2. Create Express application
const app = express();

const PORT = 3000;

// ======================================
// BUILT-IN MIDDLEWARE
// ======================================

// Parse incoming JSON data
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// ======================================
// THIRD-PARTY MIDDLEWARE
// ======================================

// Morgan logs HTTP requests in terminal
app.use(morgan('dev'));

// ======================================
// CUSTOM MIDDLEWARE
// ======================================

app.use((req, res, next) => {
    console.log("Custom Middleware Executed");

    req.requestTime = new Date();

     console.log("Request Date and Time:", req.requestTime);

    next();
});

// ======================================
// ROUTES
// ======================================

// Home route
app.get('/api', (req, res) => {
    res.send("Welcome to Student Management API");
});

// Get request
app.get('/api/info', (req, res) => {
    res.json({
        message: "Student Management API is running",
        time: req.requestTime
    });
});

// Post request
app.post('/api/student', (req, res) => {

    const student = req.body;

    console.log("Received Student:", student);

    res.status(201).json({
        message: "Student details received successfully!",
        student: student
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
