const IS_DEV = process.env.NODE_ENV === 'development';
const JITSI_DOMAIN = process.env.JITSI_DOMAIN || 'meet.jit.si';

interface CreateConferenceResult {
  id: string;
  joinUrl: string;
}

/**
 * Create a Jitsi meeting
 * No API needed - just generate a unique meeting ID and use the URL
 */
export function createConference(): CreateConferenceResult {
  if (IS_DEV) {
    console.log('[JITSI] Creating meeting...');
  }
  
  // Generate unique meeting ID
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 11);
  const meetingId = `znanie-${timestamp}-${randomPart}`;
  
  const joinUrl = `https://${JITSI_DOMAIN}/${meetingId}`;
  
  return {
    id: meetingId,
    joinUrl: joinUrl,
  };
}

/**
 * Delete a Jitsi meeting
 * Note: Jitsi public instance doesn't support meeting deletion via API
 * Meetings auto-expire after inactivity
 */
export async function deleteConference(conferenceId: string): Promise<void> {
  if (IS_DEV) {
    console.log('[JITSI] Delete meeting called:', conferenceId);
  }
  
  // For public Jitsi, meetings cannot be programmatically deleted
  // They automatically expire after 24 hours of inactivity
  console.log('[JITSI] Note: Meetings auto-expire after inactivity');
  return;
}

/**
 * Get conference details
 * Note: Public Jitsi doesn't provide API for this
 */
export async function getConference(conferenceId: string): Promise<{ id: string; joinUrl: string } | null> {
  // Return the URL directly for public Jitsi
  return {
    id: conferenceId,
    joinUrl: `https://${JITSI_DOMAIN}/${conferenceId}`,
  };
}