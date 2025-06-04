// server/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');


// router.post('/register', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hashedPassword });
//     await user.save();

//     res.status(201).json({ message: 'User registered successfully', user: { email: user.email } });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ... (login, me routes)
router.post('/admin/login', async (req, res) => {
  const { password } = req.body;
  
  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET);
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false });
});
module.exports = router;