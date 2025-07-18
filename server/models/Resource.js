// server/models/Resource.js
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  educationLevel: { type: String, default: 'matric' },
  level: { type: String, default: 'class-9' },
  subject: { type: String, default: 'General' },
  resourceType: { type: String, default: 'notes' },
  year: { type: Number },
  googleDriveLink: { type: String, required: true },
  thumbnailUrl: { type: String },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: [] }],
});

module.exports = mongoose.model('Resource', resourceSchema);