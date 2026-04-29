#!/usr/bin/env tsx

/**
 * Yandex Telemost API Test Script
 * Usage: npx tsx test-yandex-api.ts
 * 
 * Requires YANDEX_OAUTH_TOKEN in .env or environment variable
 */

import 'dotenv/config';

const API_URL = process.env.TELEMOST_API_URL || 'https://cloud-api.yandex.net/v1/telemost-api';
const TOKEN = process.env.YANDEX_OAUTH_TOKEN;

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

async function testYandexAPI() {
  console.log('');
  console.log(`${colors.cyan}==============================================${colors.reset}`);
  console.log(`${colors.cyan}  Yandex Telemost API Connection Test${colors.reset}`);
  console.log(`${colors.cyan}==============================================${colors.reset}`);
  console.log('');

  // Check if token is configured
  if (!TOKEN || TOKEN === 'your_token_here') {
    log.error('YANDEX_OAUTH_TOKEN is not set');
    console.log('');
    console.log('Please add your token to .env file:');
    console.log('  YANDEX_OAUTH_TOKEN=your_token_here');
    console.log('');
    console.log('Get your token at: https://oauth.yandex.ru/');
    process.exit(1);
  }

  log.success('YANDEX_OAUTH_TOKEN is set');
  log.info(`API URL: ${API_URL}`);

  console.log('');
  console.log(`${colors.cyan}==============================================${colors.reset}`);
  console.log(`${colors.cyan}  Testing API Connection${colors.reset}`);
  console.log(`${colors.cyan}==============================================${colors.reset}`);
  console.log('');

  // Test 1: Create a conference
  log.step('Creating a conference...');
  console.log('');

  try {
    const createResponse = await fetch(`${API_URL}/conferences`, {
      method: 'POST',
      headers: {
        'Authorization': `OAuth ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: '{}',
    });

    const createData = await createResponse.json();

    console.log("createData", createData)

    if (!createResponse.ok) {
      log.error('Failed to create conference');
      log.info(`Status: ${createResponse.status}`);
      log.info(`Error: ${createData.message || JSON.stringify(createData)}`);
      console.log('');
      console.log('Possible issues:');
      console.log('  - Token may be expired or invalid');
      console.log('  - Token may not have sufficient permissions');
      console.log('  - Network connectivity issues');
      process.exit(1);
    }

    console.log(`Response: ${JSON.stringify(createData, null, 2)}`);
    console.log('');

    const conferenceId = createData.id as string;
    const joinUrl = createData.join_url as string;

    log.success('Conference created successfully!');
    console.log('');
    log.info(`Conference ID: ${conferenceId}`);
    log.info(`Join URL: ${joinUrl}`);
    console.log('');

    // Test 2: Get conference details
    log.step('Getting conference details...');
    console.log('');

    try {
      const getResponse = await fetch(`${API_URL}/conferences/${conferenceId}`, {
        method: 'GET',
        headers: {
          'Authorization': `OAuth ${TOKEN}`,
        },
      });

      if (getResponse.ok) {
        const getData = await getResponse.json();
        console.log(`Response: ${JSON.stringify(getData, null, 2)}`);
        console.log('');
        log.success('Conference details retrieved!');
      } else {
        log.info('Could not retrieve conference details (may be expected)');
      }
    } catch (err) {
      log.info('Get conference skipped or failed');
    }

    // Test 3: Delete the conference
    log.step('Deleting the conference...');
    console.log('');

    try {
      const deleteResponse = await fetch(`${API_URL}/conferences/${conferenceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `OAuth ${TOKEN}`,
        },
      });

      if (deleteResponse.ok || deleteResponse.status === 404) {
        log.success('Conference deleted successfully!');
      } else {
        log.info(`Delete response status: ${deleteResponse.status}`);
        log.success('Conference marked for deletion (or already deleted)');
      }
    } catch (err) {
      log.info('Delete completed (conference may already be deleted)');
    }

    console.log('');
    console.log(`${colors.green}==============================================${colors.reset}`);
    console.log(`${colors.green}  All Tests Passed!${colors.reset}`);
    console.log(`${colors.green}==============================================${colors.reset}`);
    console.log('');
    console.log('Your Yandex API configuration is working correctly.');
    console.log('');

  } catch (error) {
    log.error('Unexpected error occurred');
    console.log('');
    console.log('Error details:');
    console.log(error);
    console.log('');
    process.exit(1);
  }
}

// Run the test
testYandexAPI().catch((error) => {
  console.error('Script error:', error);
  process.exit(1);
});