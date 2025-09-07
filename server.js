const express = require('express');

const app = express();

// Basic test route
app.get('/api/test', (req, res) => {
    res.status(200).json({ 
        message: 'Server is working!', 
        timestamp: new Date().toISOString(),
        platform: 'Vercel'
    });
});

// Health check route  
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        service: 'Ecommerce API',
        env: process.env.NODE_ENV || 'development'
    });
});

// Root API route
app.get('/api', (req, res) => {
    res.status(200).json({ 
        message: 'Ecommerce API v1.0', 
        endpoints: ['/api/test', '/api/health'],
        status: 'Running'
    });
});

// Catch all other routes
app.get('*', (req, res) => {
    res.status(200).json({ 
        message: 'Ecommerce App',
        api: '/api',
        requested_path: req.path
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: err.message 
    });
});

module.exports = app;