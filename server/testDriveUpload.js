// server/testDriveUpload.js
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

async function testUpload() {
  try {
    const buffer = Buffer.from('Test file content');
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);

    const fileMetadata = {
      name: 'test-file.txt',
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
    };

    const media = {
      mimeType: 'text/plain',
      body: bufferStream,
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    console.log('File uploaded:', response.data);
  } catch (error) {
    console.error('Upload error:', error.message);
    if (error.response) console.error('Response:', error.response.data);
  }
}

testUpload();