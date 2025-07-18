// server/routes/resources.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { uploadToDrive } = require('../utils/googleDrive');
const Resource = require('../models/Resource');
const stream = require('stream');
const mongoose = require('mongoose'); // Add this for ObjectId validation

// Rate Limiting for upload
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit to 10 requests
  message: 'Too many upload attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Admin access required',
      });
    }
    if (!decoded.id || typeof decoded.id !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID in token',
      });
    }
    req.user = { id: decoded.id }; // Ensure req.user.id is set
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

// Configure multer to accept both resource file and thumbnail image
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB per file
  },
  fileFilter: (req, file, cb) => {
    // Accept resource file (PDF, DOC, DOCX) or image (for thumbnail)
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp',
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, and image files are allowed.'), false);
    }
  },
});

// Upload a single resource with optional thumbnail
router.post('/upload', [uploadLimiter, verifyAdmin], upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
]), async (req, res) => {
  try {
    if (!req.files || !req.files.file || req.files.file.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }
    const file = req.files.file[0];
    let thumbnailUrl = '';
    // Handle thumbnail upload if provided
    if (req.files.thumbnail && req.files.thumbnail.length > 0) {
      const thumb = req.files.thumbnail[0];
      const thumbStream = new stream.PassThrough();
      thumbStream.end(thumb.buffer);
      const thumbMetadata = {
        name: `thumb-${thumb.originalname}-${Date.now()}`,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
      };
      const thumbMedia = {
        mimeType: thumb.mimetype,
        body: thumbStream,
      };
      const thumbResponse = await uploadToDrive({
        resource: thumbMetadata,
        media: thumbMedia,
        fields: 'id, webContentLink',
      });
      // Use webContentLink for direct image access
      thumbnailUrl = thumbResponse.webContentLink || '';
    }

    console.log('Uploaded file:', file); // Debug log

    // Create a stream from the buffer
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    const fileMetadata = {
      name: `${file.originalname}-${Date.now()}`,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
    };

    const media = {
      mimeType: file.mimetype,
      body: bufferStream,
    };

    const response = await uploadToDrive({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    // Validate req.user.id
    if (!req.user?.id) {
      return res.status(400).json({
        success: false,
        message: 'User ID is missing from token',
      });
    }

    // Normalize level
    let level = req.body.level?.toLowerCase();
    if (level === 'fsc-part1' || level === 'fscpart1' || level === 'fsc_part1') level = 'fsc-part-1';
    if (level === 'fsc-part2' || level === 'fscpart2' || level === 'fsc_part2') level = 'fsc-part-2';
    // Add more normalization as needed

    // Normalize resourceType
    let resourceType = req.body.resourceType?.toLowerCase();
    if (resourceType === 'textbook') resourceType = 'textbooks';
    if (resourceType === 'note') resourceType = 'notes';
    if (resourceType === 'syllabi') resourceType = 'syllabus';
    if (resourceType === 'pastpaper' || resourceType === 'past_paper') resourceType = 'past_papers';
    // Add more normalization as needed

    const resource = new Resource({
      title: req.body.title || file.originalname.replace(/\.[^/.]+$/, ''),
      description: req.body.description || `Uploaded ${new Date().toLocaleDateString()}`,
      educationLevel: req.body.educationLevel?.toLowerCase() || 'matric',
      level: level || 'class-9',
      subject: req.body.subject || 'General',
      resourceType: resourceType || 'notes',
      year: req.body.year || null,
      googleDriveLink: response.webViewLink,
      thumbnailUrl,
      uploadedBy: req.user.id, // Use the validated user ID
    });

    await resource.save();

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      url: response.webViewLink,
      resourceId: resource._id,
    });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const { level, educationLevel, resourceType, page = 1, limit = 9 } = req.query;

    const query = {};
    if (resourceType) query.resourceType = resourceType;
    if (level) query.level = level.toLowerCase();
    if (educationLevel) query.educationLevel = educationLevel.toLowerCase();

    const [resources, total] = await Promise.all([
      Resource.find(query)
        .sort('-createdAt')
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .lean(),
      Resource.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: resources,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('Error fetching resources:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching resources',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// Get single resource by ID (unchanged)
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid resource ID',
      });
    }

    const resource = await Resource.findById(req.params.id).lean();

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found',
      });
    }

    res.json({
      success: true,
      data: resource,
    });
  } catch (err) {
    console.error('Error fetching resource:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resource',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

module.exports = router;