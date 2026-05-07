import { 
  createImmediateMeeting, 
  createScheduledMeeting,
  createRoom,
  getMeetingUrl,
  generateToken,
  deleteRoom,
  isLiveKitConfigured 
} from './livekit';

interface CreateConferenceResult {
  id: string;
  joinUrl: string;
  token?: string;
  roomName?: string;
}

export function createConference(): CreateConferenceResult {
  if (!isLiveKitConfigured()) {
    console.log('[TELEMOST] LiveKit not configured, falling back to Jitsi');
    return createJitsiConference();
  }

  console.log('[TELEMOST] Using LiveKit for conference creation');
  
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 11);
  const roomName = `znanie-${timestamp}-${randomPart}`;

  return {
    id: roomName,
    joinUrl: getMeetingUrl(roomName),
    roomName: roomName,
  };
}

function createJitsiConference(): CreateConferenceResult {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 11);
  const meetingId = `znanie-${timestamp}-${randomPart}`;
  
  const joinUrl = `https://meet.jit.si/${meetingId}`;
  
  return {
    id: meetingId,
    joinUrl: joinUrl,
  };
}

export async function createImmediateConference(
  hostIdentity: string, 
  hostName: string
): Promise<CreateConferenceResult> {
  if (!isLiveKitConfigured()) {
    const jitsi = createJitsiConference();
    return jitsi;
  }

  const result = await createImmediateMeeting(hostIdentity, hostName);
  return {
    id: result.roomName,
    joinUrl: result.joinUrl,
    token: result.token,
    roomName: result.roomName,
  };
}

export async function createScheduledConference(
  hostIdentity: string,
  hostName: string,
  scheduledAt: Date,
  duration?: number
): Promise<CreateConferenceResult> {
  if (!isLiveKitConfigured()) {
    const jitsi = createJitsiConference();
    return jitsi;
  }

  const result = await createScheduledMeeting(hostIdentity, hostName, scheduledAt, duration);
  return {
    id: result.roomName,
    joinUrl: result.joinUrl,
    token: result.token,
    roomName: result.roomName,
  };
}

export async function deleteConference(conferenceId: string): Promise<void> {
  if (!isLiveKitConfigured()) {
    console.log('[TELEMOST] Jitsi - cannot delete meetings programmatically');
    return;
  }

  try {
    await deleteRoom(conferenceId);
    console.log('[TELEMOST] Deleted LiveKit room:', conferenceId);
  } catch (error) {
    console.error('[TELEMOST] Error deleting room:', error);
  }
}

export async function getConferenceToken(
  roomName: string,
  participantName: string,
  participantIdentity: string,
  isHost?: boolean
): Promise<string> {
  if (!isLiveKitConfigured()) {
    return '';
  }

  return generateToken(roomName, participantName, participantIdentity, isHost);
}

export async function getConference(conferenceId: string): Promise<{ id: string; joinUrl: string } | null> {
  return {
    id: conferenceId,
    joinUrl: getMeetingUrl(conferenceId),
  };
}