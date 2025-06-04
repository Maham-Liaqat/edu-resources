const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const { uploadToDrive } = require('../utils/googleDrive');
const Resource = require('../models/Resource');

// Configure multer for memory storage and file filtering
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024 // 25MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf', // PDF
      'application/msword', // DOC
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOCX
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'), false);
    }
  }
});

// Get resources with filtering
// Add to your existing resources route
router.get('/', async (req, res) => {
  try {
    const { 
      educationLevel, 
      level, 
      subject,
      resourceType, // New filter
      search,
      sort = '-createdAt',
      limit = 9,
      page = 1
    } = req.query;

    const query = {};
    
    if (educationLevel) query.educationLevel = educationLevel;
    if (level) query.level = level;
    if (subject) query.subject = subject;
    if (resourceType) query.resourceType = resourceType; // New filter
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const [resources, total] = await Promise.all([
      Resource.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .lean(),
      Resource.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: resources,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload multiple resources
router.post('/upload', upload.array('files'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: 'No files uploaded' 
      });
    }

    const uploadResults = await Promise.all(
      req.files.map(async (file) => {
        try {
          // Upload to Google Drive
          const driveFile = await uploadToDrive(
            file.buffer,
            `${file.originalname}-${Date.now()}`,
            file.mimetype
          );

          // Create resource record
          const resource = new Resource({
            title: file.originalname.replace(/\.[^/.]+$/, ""), // Remove extension
            description: `Uploaded ${new Date().toLocaleDateString()}`,
            educationLevel: req.body.educationLevel || 'matric',
            level: req.body.level || 'class-9',
            subject: req.body.subject || 'general',
            resourceType: req.body.resourceType || 'notes',
            fileUrl: driveFile.webContentLink,
            thumbnailUrl: driveFile.thumbnailLink,
            uploadedBy: req.user?.id || 'anonymous'
          });

          await resource.save();
          
          return {
            success: true,
            name: file.originalname,
            url: driveFile.webContentLink,
            resourceId: resource._id
          };
        } catch (err) {
          console.error(`Error uploading ${file.originalname}:`, err);
          return {
            success: false,
            name: file.originalname,
            error: err.message
          };
        }
      })
    );

    // Check if all uploads succeeded
    const allSuccess = uploadResults.every(result => result.success);

    res.status(allSuccess ? 200 : 207).json({
      success: allSuccess,
      message: allSuccess 
        ? 'All files uploaded successfully' 
        : 'Some files failed to upload',
      results: uploadResults
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Upload failed',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Get single resource by ID
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid resource ID' 
      });
    }

    const resource = await Resource.findById(req.params.id).lean();
    
    if (!resource) {
      return res.status(404).json({ 
        success: false,
        message: 'Resource not found' 
      });
    }

    res.json({
      success: true,
      data: resource
    });
  } catch (err) {
    console.error('Error fetching resource:', err);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch resource',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;