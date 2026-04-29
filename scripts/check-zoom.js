require('dotenv').config();
const https = require('https');

const clientId = process.env.ZOOM_CLIENT_ID;
const clientSecret = process.env.ZOOM_CLIENT_SECRET;
const accountId = process.env.ZOOM_ACCOUNT_ID;

console.log('\n✓ Zoom Credentials Check\n━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`Client ID: ${clientId ? clientId.substring(0, 10) + '...' : 'MISSING'}`);
console.log(`Client Secret: ${clientSecret ? '***' + clientSecret.substring(clientSecret.length - 4) : 'MISSING'}`);
console.log(`Account ID: ${accountId ? accountId.substring(0, 10) + '...' : 'MISSING'}\n`);

if (!clientId || !clientSecret || !accountId) {
  console.log('❌ FAILED: Missing credentials in .env file');
  console.log('\nAdd these to your .env:');
  console.log('ZOOM_CLIENT_ID=your_client_id');
  console.log('ZOOM_CLIENT_SECRET=your_client_secret');
  console.log('ZOOM_ACCOUNT_ID=your_account_id');
  process.exit(1);
}

const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

console.log('Step 1: Getting Access Token...\n');

const postData = `grant_type=account_credentials&account_id=${accountId}`;

const options = {
  hostname: 'zoom.us',
  path: '/oauth/token',
  method: 'POST',
  headers: {
    'Authorization': `Basic ${credentials}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      const tokenData = JSON.parse(data);
      const accessToken = tokenData.access_token;
      console.log('✓ Access Token Received!\n');
      console.log('Step 2: Creating Test Meeting...\n');
      createTestMeeting(accessToken);
    } else {
      console.log('❌ FAILED: Failed to get Zoom token\n');
      console.log('Error:', data);
      console.log('\n→ Solution: Re-enable your Zoom Server-to-Server OAuth app at:');
      console.log('  https://marketplace.zoom.us/');
      console.log('\nMake sure:');
      console.log('  1. App is published/enabled');
      console.log('  2. Scopes are added: meeting:write:admin, meeting:read:admin');
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.log('❌ FAILED: Network error:', error.message);
  process.exit(1);
});

req.write(postData);
req.end();

function createTestMeeting(accessToken) {
  const meetingData = JSON.stringify({
    topic: 'Test Meeting - ZNANIE',
    type: 2,
    duration: 30,
    timezone: 'Asia/Kolkata'
  });

  const meetingOptions = {
    hostname: 'api.zoom.us',
    path: '/v2/users/me/meetings',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(meetingData)
    }
  };

  const meetingReq = https.request(meetingOptions, (res) => {
    let meetingResponse = '';

    res.on('data', (chunk) => {
      meetingResponse += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 201) {
        const meeting = JSON.parse(meetingResponse);
        console.log('✓ Test Meeting Created Successfully!\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Meeting Details:');
        console.log('  Topic:', meeting.topic);
        console.log('  ID:', meeting.id);
        console.log('  Join URL:', meeting.join_url);
        console.log('  Start Time:', meeting.start_time);
        console.log('\n✓ All Zoom checks passed!');
        console.log('\nYour Zoom integration is ready!');
        process.exit(0);
      } else {
        console.log('❌ FAILED: Could not create meeting');
        console.log('Error:', meetingResponse);
        process.exit(1);
      }
    });
  });

  meetingReq.on('error', (error) => {
    console.log('❌ FAILED: Network error:', error.message);
    process.exit(1);
  });

  meetingReq.write(meetingData);
  meetingReq.end();
}
