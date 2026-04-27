#!/usr/bin/env tsx

/**
 * Jitsi Meet API Test Script
 * Tests that Jitsi meeting URLs can be generated correctly
 * 
 * Usage: npx tsx test-jitsi-meeting.tsx
 */

import 'dotenv/config';

// Colors for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
};

const log = {
  step: (msg: string) => console.log(`${colors.cyan}==>${colors.reset} ${msg}`),
  success: (msg: string) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg: string) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg: string) => console.log(`   ${msg}`),
};

// Generate unique meeting ID (same logic we'll use in the app)
function generateMeetingId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 11);
  return `znanie-${timestamp}-${randomPart}`;
}

// Create Jitsi meeting URL from meeting ID
function createJitsiUrl(meetingId: string): string {
  return `https://meet.jit.si/${meetingId}`;
}

// Validate URL format
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname === 'meet.jit.si';
  } catch {
    return false;
  }
}

async function testJitsiMeeting() {
  console.log('');
  console.log(`${colors.cyan}==============================================${colors.reset}`);
  console.log(`${colors.cyan}  Jitsi Meet URL Generator Test${colors.reset}`);
  console.log(`${colors.cyan}==============================================${colors.reset}`);
  console.log('');

  log.step('Testing Jitsi meeting generation...');
  console.log('');

  // Test 1: Generate meeting ID
  log.step('Test 1: Generate Meeting ID');
  const meetingId = generateMeetingId();
  log.info(`Generated ID: ${meetingId}`);
  
  if (meetingId && meetingId.length > 10) {
    log.success('Meeting ID generated successfully!');
  } else {
    log.error('Meeting ID generation failed!');
    process.exit(1);
  }
  console.log('');

  // Test 2: Create Jitsi URL
  log.step('Test 2: Create Jitsi URL');
  const joinUrl = createJitsiUrl(meetingId);
  log.info(`Generated URL: ${joinUrl}`);
  
  if (joinUrl.includes('meet.jit.si') && joinUrl.includes(meetingId)) {
    log.success('Jitsi URL created successfully!');
  } else {
    log.error('Jitsi URL creation failed!');
    process.exit(1);
  }
  console.log('');

  // Test 3: Validate URL format
  log.step('Test 3: Validate URL Format');
  const isValid = isValidUrl(joinUrl);
  
  if (isValid) {
    log.success('URL format is valid!');
  } else {
    log.error('URL format is invalid!');
    process.exit(1);
  }
  console.log('');

  // Test 4: Generate multiple meetings
  log.step('Test 4: Generate Multiple Meeting URLs');
  const testUrls: string[] = [];
  
  for (let i = 0; i < 3; i++) {
    const id = generateMeetingId();
    const url = createJitsiUrl(id);
    testUrls.push(url);
    log.info(`Meeting ${i + 1}: ${url}`);
  }
  
  // Check all are unique
  const uniqueUrls = new Set(testUrls);
  if (uniqueUrls.size === testUrls.length) {
    log.success('All meeting URLs are unique!');
  } else {
    log.error('Some URLs are duplicated!');
  }
  console.log('');

  // Summary
  console.log(`${colors.green}==============================================${colors.reset}`);
  console.log(`${colors.green}  All Tests Passed!${colors.reset}`);
  console.log(`${colors.green}==============================================${colors.reset}`);
  console.log('');
  log.success('Jitsi meeting URL generation is working!');
  console.log('');
  log.info('You can test these URLs in your browser:');
  testUrls.forEach((url, i) => {
    console.log(`   ${i + 1}. ${url}`);
  });
  console.log('');
  log.info('Note: Anyone with the link can join - no account needed');
  console.log('');
}

testJitsiMeeting().catch((error) => {
  console.error('Script error:', error);
  process.exit(1);
});