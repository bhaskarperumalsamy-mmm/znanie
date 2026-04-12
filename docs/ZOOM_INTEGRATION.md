# Zoom Integration Documentation

## Overview

The ZNANIE Meeting Organizer uses Zoom's Server-to-Server OAuth API to automatically create meetings when:
- A student books a meeting with a teacher
- A teacher creates a meeting for a student

## Prerequisites

- A Zoom account with an active Zoom subscription
- Access to create a Server-to-Server OAuth app

## Setting Up Zoom

### Step 1: Create a Server-to-Server OAuth App

1. Go to [Zoom App Marketplace](https://marketplace.zoom.us/)
2. Click "Develop" → "Build Server-to-Server OAuth App"
3. Fill in the app details:
   - **App Name**: ZNANIE Meeting Organizer
   - **App Description**: Meeting scheduling for ZNANIE Foundation
   - **Category**: Education

### Step 2: Configure Scopes

Add the following OAuth scopes:
- `meeting:write:admin` - Create meetings
- `meeting:read:admin` - View meetings
- `meeting:delete:admin` - Delete meetings

### Step 3: Get Credentials

After creating the app, you'll get:
- **Account ID**
- **Client ID**
- **Client Secret**

### Step 4: Add Credentials to Environment

Update your `.env` file:

```bash
ZOOM_CLIENT_ID=your_client_id
ZOOM_CLIENT_SECRET=your_client_secret
ZOOM_ACCOUNT_ID=your_account_id
```

---

## How It Works

### Meeting Creation Flow

```
1. User books/creates a meeting
         ↓
2. API calls Zoom API (/src/lib/zoom.ts)
         ↓
3. Zoom creates meeting and returns:
   - join_url (for students/guests)
   - start_url (for host/teacher)
   - meeting_id
         ↓
4. Save all information to database
         ↓
5. User sees "Join Meeting" button
```

---

## Code Implementation

### Zoom Library (`src/lib/zoom.ts`)

The main Zoom integration is in `src/lib/zoom.ts`:

```typescript
import { createZoomMeeting } from '@/lib/zoom';

// Example usage
const meeting = await createZoomMeeting({
  topic: "Russian Lesson",
  type: 2, // Scheduled meeting
  start_time: "2026-04-15T10:00:00Z",
  duration: 60,
  timezone: "Asia/Kolkata",
  agenda: "Lesson description"
});

// Returns:
// {
//   id: 123456789,
//   uuid: "...",
//   join_url: "https://zoom.us/j/123...",
//   start_url: "https://zoom.us/s/123...",
//   password: "abc123"
// }
```

---

## Meeting Types

### Supported Meeting Types

| Type | Zoom Type | Description |
|------|----------|-------------|
| ONE_ON_ONE | `type: 2` | Scheduled meeting |
| GROUP | `type: 2` | Scheduled meeting with multiple participants |
| ORIENTATION | `type: 2` | Scheduled meeting for orientation |

---

## Meeting Links

When a Zoom meeting is created, two URLs are generated:

| URL | Recipient | Purpose |
|-----|-----------|---------|
| `join_url` | Student | Join the meeting as participant |
| `start_url` | Teacher | Host the meeting |

Both URLs are stored in the database in the Meeting model:

```typescript
model Meeting {
  meetingUrl    String?  // Zoom join URL
  hostUrl       String?  // Zoom host URL
  zoomMeetingId String?  // Zoom meeting ID
}
```

---

## Error Handling

If Zoom API fails, the meeting is still created (without Zoom links):

```typescript
try {
  const zoomMeeting = await createZoomMeeting({...});
  meetingUrl = zoomMeeting.join_url;
  hostUrl = zoomMeeting.start_url;
  zoomMeetingId = String(zoomMeeting.id);
} catch (error) {
  console.error('Zoom creation error:', error);
  // Continue without Zoom
}
```

---

## Testing Zoom Integration

### Test with API

```bash
curl -X POST http://localhost:3002/api/meetings/teacher \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "studentId": "...",
    "title": "Test Meeting",
    "startTime": "2026-04-15T10:00:00Z",
    "endTime": "2026-04-15T11:00:00Z"
  }'
```

Expected response:
```json
{
  "meeting": {
    "id": "...",
    "title": "Test Meeting",
    "meetingUrl": "https://zoom.us/j/...",
    "hostUrl": "https://zoom.us/s/...",
    "meetingType": "ONE_ON_ONE"
  }
}
```

---

## Limitations

1. **Rate Limits**: Zoom has API rate limits
   - Server-to-Server OAuth: 1 request/second (can be increased)

2. **Meeting Duration**: Max 30 days by default

3. **Participants**: Free Zoom accounts limited to 100 participants

4. **Recording**: Auto-recording requires paid Zoom plan

---

## Security

- All Zoom credentials are stored in environment variables
- Tokens are cached to reduce API calls
- Meeting URLs include password protection

---

## Troubleshooting

### Error: "Invalid credentials"

Verify your Zoom credentials in `.env`:
```bash
ZOOM_CLIENT_ID=...
ZOOM_CLIENT_SECRET=...
ZOOM_ACCOUNT_ID=...
```

### Error: "Insufficient permissions"

Make sure your OAuth app has required scopes:
- `meeting:write:admin`
- `meeting:read:admin`

### Error: "Rate limit exceeded"

Wait a few seconds and retry, or contact Zoom to increase your rate limit.

---

## Resources

- [Zoom API Documentation](https://marketplace.zoom.us/docs/api-reference)
- [Server-to-Server OAuth Guide](https://marketplace.zoom.us/docsguides/guides/server-to-server-oauth)
- [Zoom Meeting API](https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings)