// server/routes/admin.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // If using password hashing
const Admin = require('../models/Admin'); // Import the Admin model

// Admin login
router.post('/login', async(req, res) => {
  const { password } = req.body;

  try {
    // Query the database for an admin with the matching password
    const admin = await Admin.findOne({}); // Adjust query based on your login logic (e.g., username if added)

    if (!admin) {
      return res.status(401).json({ success: false, message: 'No admin found' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }
    // Generate JWT token
    const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});


// Verify admin token
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      success: true,
      message: 'Token is valid',
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
});

module.exports = router;