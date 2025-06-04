// server/utils/recaptcha.js
const axios = require('axios');

module.exports.verifyRecaptcha = async (token) => {
  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      new URLSearchParams({
        secret: process.env.VITE_RECAPTCHA_SECRET_KEY,
        response: token
      })
    );
    
    return response.data.success;
  } catch (err) {
    console.error('reCAPTCHA verification failed:', err);
    return false;
  }
};