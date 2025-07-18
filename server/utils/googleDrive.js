// server/utils/googleDrive.js
const { google } = require('googleapis');
const stream = require('stream');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const drive = google.drive({ version: 'v3', auth: oauth2Client });

async function uploadToDrive({ resource, media, fields }) {
  try {
    const response = await drive.files.create({
      resource,
      media,
      fields,
    });

    console.log('Google Drive upload success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Google Drive upload error:', error.message);
    if (error.response) console.error('Error response:', error.response.data);
    throw error;
  }
}

module.exports = { uploadToDrive };