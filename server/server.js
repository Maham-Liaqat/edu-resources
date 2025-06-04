const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const axios = require('axios'); // Only if needed for external calls

dotenv.config();

const app = express();

// =============================================
// Middleware
// =============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://localhost:5173',
    // Add production domains here
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));

// Rate Limiting for Admin Routes
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 5 requests per window
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false
});

// =============================================
// Database Connection
// =============================================
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// =============================================
// Security Middlewares
// =============================================
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
  });
}

// =============================================
// Routes
// =============================================
// Admin Routes
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminLimiter, adminRoutes);

// Contact Routes
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// Resource Routes
const resourceRoutes = require('./routes/resources');
app.use('/api/resources', resourceRoutes);

// =============================================
// Error Handling Middleware
// =============================================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// =============================================
// Server Initialization
// =============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});