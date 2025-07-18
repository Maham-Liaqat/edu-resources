// server/models/Comment.js
const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500,
  },
  user: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { _id: true });

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500,
  },
  user: {
    type: String, // Store username or 'Anonymous' for non-authenticated users
    required: true,
  },
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [ReplySchema]
});

module.exports = mongoose.model('Comment', CommentSchema);