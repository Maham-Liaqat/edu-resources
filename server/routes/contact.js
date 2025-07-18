// server/routes/contact.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const axios = require('axios');
const { body, validationResult } = require('express-validator');

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Validation middleware
const validateContactForm = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('captcha').notEmpty().withMessage('CAPTCHA verification required')
];

// Verify reCAPTCHA token
const verifyRecaptcha = async (token, remoteip) => {
  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
        remoteip: remoteip
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 5000
      }
    );

    if (!response.data?.success) {
      console.error('CAPTCHA verification failed:', {
        hostname: response.data?.hostname,
        errors: response.data?.['error-codes'],
        timestamp: new Date().toISOString()
      });
      return false;
    }

    return true;
  } catch (err) {
    console.error('CAPTCHA verification error:', err);
    return false;
  }
};

// Route handler
router.post('/', validateContactForm, async (req, res) => {
  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }

  const { name, email, subject, message, captcha } = req.body;

  // Skip CAPTCHA verification in development
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Skipping CAPTCHA verification in development');
  } else {
    // Verify CAPTCHA in production
    const isCaptchaValid = await verifyRecaptcha(captcha, req.ip);
    if (!isCaptchaValid) {
      return res.status(400).json({ 
        success: false,
        message: 'CAPTCHA verification failed',
        error: 'Invalid or expired CAPTCHA token'
      });
    }
  }

  try {
    // Prepare email content
    const emailHtml = `
      <h3>New Contact Form Submission</h3>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: `"IlmZone Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact: ${subject}`,
      html: emailHtml
    });

    // Only send confirmation if user email is different
    if (email !== process.env.EMAIL_USER && email !== process.env.ADMIN_EMAIL) {
      await transporter.sendMail({
        from: `"IlmZone" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `We've received your message`,
        html: `
          <h3>Thank you for contacting IlmZone!</h3>
          <p>We've received your message and will get back to you soon.</p>
          ${emailHtml}
        `
      });
    }

    res.status(200).json({ 
      success: true,
      message: 'Message sent successfully' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to send message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;