const { google } = require('googleapis');
const readline = require('readline');

const oauth2Client = new google.auth.OAuth2(
  '404494936545-fqcq0efms95ep6qjnan584mpucd7jb43.apps.googleusercontent.com',          // From Google Cloud Console
  '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',      // From Google Cloud Console
  'http://localhost:5000/auth/google/callback'  // Must match authorized URI
);

const scopes = ['https://www.googleapis.com/auth/drive'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

console.log('Authorize this app by visiting:', authUrl);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the code from that page here: ', (code) => {
  oauth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error getting token:', err);
    console.log('Refresh token:', token.refresh_token);
    rl.close();
  });
});