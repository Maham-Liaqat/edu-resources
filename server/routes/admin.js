const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Admin Login Route
// In routes/admin.js
router.post('/login', (req, res) => {
  // Add input validation
  if (!req.body || !req.body.password) {
    return res.status(400).json({ 
      success: false,
      message: 'Password is required' 
    });
  }

  const { password } = req.body;
  
  if (password === process.env.ADMIN_PASSWORD) {
    // ... rest of your success logic
  } else {
    console.log(`Failed login attempt. Received: "${password}", Expected: "${process.env.ADMIN_PASSWORD}"`);
    res.status(401).json({ 
      success: false,
      message: 'Invalid admin credentials' 
    });
  }
});

router.get('/env-check', (req, res) => {
  res.json({
    adminPassword: process.env.ADMIN_PASSWORD ? "SET" : "MISSING",
    jwtSecret: process.env.JWT_SECRET ? "SET" : "MISSING"
  });
});

// Admin Verification Middleware
const verifyAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      throw new Error('Invalid admin privileges');
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Protected Admin Route Example
router.get('/verify', verifyAdmin, (req, res) => {
  res.json({ isValid: true, user: req.user });
});

module.exports = router;