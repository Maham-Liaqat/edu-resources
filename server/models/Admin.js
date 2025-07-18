// server/models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generate _id
  // Remove 'id' field unless explicitly needed
  // id: { type: mongoose.Schema.Types.ObjectId, required: true }, // Uncomment if needed
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
});

module.exports = mongoose.model('Admin', adminSchema);