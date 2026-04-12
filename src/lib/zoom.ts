const ZOOM_API_BASE = 'https://api.zoom.us/v2';

interface ZoomToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

let cachedToken: { token: string; expires: number } | null = null;

async function getZoomAccessToken(): Promise<string> {
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;
  const accountId = process.env.ZOOM_ACCOUNT_ID;

  if (!clientId || !clientSecret || !accountId) {
    throw new Error('Zoom credentials not configured');
  }

  // Check if we have a valid cached token
  if (cachedToken && cachedToken.expires > Date.now()) {
    return cachedToken.token;
  }

  // Get new token using Server-to-Server OAuth
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get Zoom token: ${error}`);
  }

  const data: ZoomToken = await response.json();
  
  // Cache token, expires 5 minutes before actual expiry
  cachedToken = {
    token: data.access_token,
    expires: Date.now() + (data.expires_in - 300) * 1000,
  };

  return data.access_token;
}

export interface CreateMeetingOptions {
  topic: string;
  type?: 1 | 2 | 3 | 8; // 1=instant, 2=scheduled, 3=recurring no fixed time, 8=recurring fixed time
  start_time?: string; // ISO 8601 format
  duration?: number; // minutes
  timezone?: string;
  password?: string;
  agenda?: string;
  settings?: {
    host_video?: boolean;
    participant_video?: boolean;
    join_before_host?: boolean;
    mute_upon_entry?: boolean;
    watermark?: boolean;
    audio?: 'both' | 'telephony' | 'voip';
    auto_recording?: 'local' | 'cloud' | 'none';
    waiting_room?: boolean;
  };
}

export interface ZoomMeeting {
  id: number;
  uuid: string;
  host_id: string;
  topic: string;
  type: number;
  status: string;
  start_time: string;
  duration: number;
  timezone: string;
  created_at: string;
  start_url: string;
  join_url: string;
  password: string;
  h323_password: string;
  pstn_password: string;
  encrypted_password: string;
}

export async function createZoomMeeting(options: CreateMeetingOptions): Promise<ZoomMeeting> {
  const token = await getZoomAccessToken();

  const response = await fetch(`${ZOOM_API_BASE}/users/me/meetings`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic: options.topic,
      type: options.type || 2,
      start_time: options.start_time,
      duration: options.duration || 60,
      timezone: options.timezone || 'Asia/Kolkata',
      password: options.password || Math.random().toString(36).substring(2, 8),
      agenda: options.agenda,
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: true,
        mute_upon_entry: false,
        watermark: false,
        audio: 'both',
        auto_recording: 'none',
        waiting_room: false,
        ...options.settings,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create Zoom meeting: ${error}`);
  }

  return response.json();
}

export async function getZoomMeeting(meetingId: string): Promise<ZoomMeeting> {
  const token = await getZoomAccessToken();

  const response = await fetch(`${ZOOM_API_BASE}/meetings/${meetingId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get Zoom meeting: ${error}`);
  }

  return response.json();
}

export async function deleteZoomMeeting(meetingId: string): Promise<void> {
  const token = await getZoomAccessToken();

  const response = await fetch(`${ZOOM_API_BASE}/meetings/${meetingId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to delete Zoom meeting: ${error}`);
  }
}

export default {
  createMeeting: createZoomMeeting,
  getMeeting: getZoomMeeting,
  deleteMeeting: deleteZoomMeeting,
};