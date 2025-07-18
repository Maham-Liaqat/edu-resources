// server/routes/comments.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Resource = require('../models/Resource');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// server/routes/comments.js (partial update)
router.get('/resource/:resourceId', async (req, res) => {
  try {
    const resourceId = req.params.resourceId;
    console.log('Attempting to fetch comments for resourceId:', resourceId);
    if (!mongoose.Types.ObjectId.isValid(resourceId)) {
      console.log('Invalid resource ID:', resourceId);
      return res.status(400).json({
        success: false,
        message: 'Invalid resource ID',
      });
    }

    const comments = await Comment.find({ resource: resourceId })
      .sort('-createdAt')
      .lean()
      .exec();
    console.log('Comments query result:', comments);

    res.json({    
      success: true,
      data: comments || [], // Ensure data is always an array
    });
  } catch (err) {
    console.error('Error fetching comments:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to fetch comments',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// Create a new comment
router.post('/resource/:resourceId', async (req, res) => {
  try {
    const { resourceId } = req.params;
    const { content, user } = req.body;
    if (!content || !user) {
      return res.status(400).json({ message: 'Content and user are required.' });
    }
        const comment = new Comment({
          content,
      user,
          resource: resourceId,
      createdAt: new Date()
    });
    await comment.save();
    // Fetch the saved comment from MongoDB to ensure _id and createdAt are present
    const savedComment = await Comment.findById(comment._id);
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Reply to a comment
router.post('/reply/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content, user } = req.body;
    if (!content || !user) {
      return res.status(400).json({ message: 'Content and user are required.' });
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }
    const reply = {
      content,
      user,
      createdAt: new Date()
    };
    comment.replies = comment.replies || [];
    comment.replies.unshift(reply);
    await comment.save();
    // Return the last inserted reply (with _id)
    const savedReply = comment.replies[0];
    res.status(201).json(savedReply);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;