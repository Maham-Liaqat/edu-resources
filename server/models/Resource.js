//server/models/Resource.js
const mongoose = require('mongoose');  // Add this line at the top
const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  educationLevel: { 
    type: String, 
    enum: ['class-9', 'class-10', 'fsc-part1', 'fsc-part2'],
    required: true 
  },
  subject: { 
    type: String,
    enum: ['physics', 'chemistry', 'biology', 'math', 'computer science', 'english', 'urdu', 'Islamiyat', 'Tarjama tul Quran'],
    required: true 
  },
  resourceType: { 
    type: String, 
    enum: ['textbook', 'notes', 'past_paper'],
    required: true
  },
  year: { type: Number }, // For past papers
  googleDriveLink: { type: String, required: true },
  thumbnailUrl: { type: String },
  uploadedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  createdAt: { type: Date, default: Date.now }
});

// Comment Model
const CommentSchema = new mongoose.Schema({
  content: String,
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Even without auth, we can track as "guest"
  },
  replies: [{
    content: String,
    createdAt: Date
  }],
  createdAt: Date
});