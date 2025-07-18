// server/generateToken.js
const { google } = require('googleapis');
const readline = require('readline');
require('dotenv').config(); // Load .env variables

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID || 'default_client_id', // Fallback for debugging
  process.env.GOOGLE_CLIENT_SECRET || 'default_client_secret', // Fallback for debugging
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/auth/google/callback' // Fallback for debugging
);

// Define scopes for Google Drive
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getToken = async () => {
  try {
    console.log('Using Redirect URI:', process.env.GOOGLE_REDIRECT_URI || 'Not set in .env');
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent', // Ensure a refresh token is returned
      redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/auth/google/callback', // Explicitly set redirect URI
    });
    console.log('Authorize this app by visiting this URL:', authUrl);

    rl.question('Enter the code from that page here: ', async (code) => {
      rl.close();
      try {
        const { tokens } = await oauth2Client.getToken(code);
        console.log('Refresh Token:', tokens.refresh_token);
        console.log('Access Token (for reference):', tokens.access_token);
        console.log('Save the Refresh Token in your .env file as GOOGLE_REFRESH_TOKEN');
      } catch (error) {
        console.error('Error retrieving token:', error.message);
        if (error.response) {
          console.error('Response:', error.response.data);
        }
      }
    });
  } catch (error) {
    console.error('Error generating auth URL:', error.message);
  }
};

getToken();