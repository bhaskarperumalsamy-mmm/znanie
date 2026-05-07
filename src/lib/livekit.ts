import { AccessToken, RoomServiceClient } from 'livekit-server-sdk';
import crypto from 'crypto';

const LIVEKIT_URL = process.env.LIVEKIT_URL || '';
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || '';
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET || '';

export interface LiveKitRoom {
  name: string;
  sid?: string;
  createdAt?: Date;
}

export function isLiveKitConfigured(): boolean {
  return !!(LIVEKIT_URL && LIVEKIT_API_KEY && LIVEKIT_API_SECRET);
}

export function getLiveKitUrl(): string {
  return LIVEKIT_URL;
}

export function getServerUrl(): string {
  return LIVEKIT_URL;
}

export async function createRoom(roomName: string): Promise<LiveKitRoom> {
  if (!isLiveKitConfigured()) {
    throw new Error('LiveKit is not configured');
  }

  const roomService = new RoomServiceClient(LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);
  
  try {
    const room = await roomService.createRoom({
      name: roomName,
      emptyTimeout: 60,
      maxParticipants: 100,
    });
    
    return {
      name: room.name,
      sid: room.sid,
      createdAt: room.creationTime ? new Date(Number(room.creationTime)) : undefined,
    };
  } catch (error: any) {
    if (error.code === 1024) {
      return {
        name: roomName,
        sid: crypto.randomUUID(),
      };
    }
    throw error;
  }
}

export async function generateToken(
  roomName: string,
  participantName: string,
  participantIdentity: string,
  isHost: boolean = false
): Promise<string> {
  if (!isLiveKitConfigured()) {
    throw new Error('LiveKit is not configured');
  }

  const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
    identity: participantIdentity,
    name: participantName,
  });

  // Allow all participants (including students) to publish audio/video
  const canPublish = true;

  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: canPublish,
    canSubscribe: true,
    canPublishData: true,
  });

  return at.toJwt();
}

export async function deleteRoom(roomName: string): Promise<boolean> {
  if (!isLiveKitConfigured()) {
    return false;
  }

  const roomService = new RoomServiceClient(LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);
  
  try {
    await roomService.deleteRoom(roomName);
    return true;
  } catch (error) {
    console.error('Error deleting room:', error);
    return false;
  }
}

export async function getRoomDetails(roomName: string): Promise<LiveKitRoom | null> {
  if (!isLiveKitConfigured()) {
    return null;
  }

  const roomService = new RoomServiceClient(LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);
  
  try {
    const rooms = await roomService.listRooms();
    const room = rooms.find(r => r.name === roomName);
    if (!room) return null;
    
    return {
      name: room.name,
      sid: room.sid,
      createdAt: room.creationTime ? new Date(Number(room.creationTime)) : undefined,
    };
  } catch (error) {
    return null;
  }
}

export function getMeetingUrl(roomName: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002';
  return `${baseUrl}/meet/${roomName}`;
}

export function generateRoomName(): string {
  const adjectives = ['happy', 'bright', 'great', 'smart', 'brave', 'calm', 'kind', 'wise'];
  const nouns = ['sun', 'moon', 'star', 'cloud', 'river', 'mountain', 'forest', 'ocean'];
  
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const timestamp = Date.now().toString(36);
  
  return `znanie-${adj}-${noun}-${timestamp}`;
}

export async function createImmediateMeeting(
  hostIdentity: string,
  hostName: string
): Promise<{ roomName: string; joinUrl: string; token: string }> {
  const roomName = generateRoomName();
  
  await createRoom(roomName);
  
  const hostToken = await generateToken(roomName, hostName, `host-${hostIdentity}`, true);
  const joinUrl = `${getMeetingUrl(roomName)}?token=${hostToken}`;
  
  return {
    roomName,
    joinUrl,
    token: hostToken,
  };
}

export async function createScheduledMeeting(
  hostIdentity: string,
  hostName: string,
  scheduledAt: Date,
  duration: number = 60
): Promise<{ roomName: string; joinUrl: string; token: string }> {
  const roomName = generateRoomName();
  
  await createRoom(roomName);
  
  const hostToken = await generateToken(roomName, hostName, `host-${hostIdentity}`, true);
  const joinUrl = `${getMeetingUrl(roomName)}?token=${hostToken}`;
  
  return {
    roomName,
    joinUrl,
    token: hostToken,
  };
}

export async function generateParticipantToken(
  roomName: string,
  participantName: string,
  participantIdentity: string
): Promise<string> {
  return generateToken(roomName, participantName, participantIdentity, false);
}

export async function listRooms(): Promise<LiveKitRoom[]> {
  if (!isLiveKitConfigured()) {
    return [];
  }

  const roomService = new RoomServiceClient(LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);
  
  try {
    const rooms = await roomService.listRooms();
    return rooms.map(room => ({
      name: room.name,
      sid: room.sid,
      createdAt: room.creationTime ? new Date(Number(room.creationTime)) : undefined,
    }));
  } catch (error) {
    console.error('Error listing rooms:', error);
    return [];
  }
}

export async function getActiveParticipants(roomName: string): Promise<number> {
  if (!isLiveKitConfigured()) {
    return 0;
  }

  const roomService = new RoomServiceClient(LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);
  
  try {
    const participants = await roomService.listParticipants(roomName);
    return participants.length;
  } catch (error) {
    return 0;
  }
}

export interface ParticipantInfo {
  identity: string;
  name: string;
  joinedAt?: Date;
  metadata?: string;
}

export async function listParticipants(roomName: string): Promise<ParticipantInfo[]> {
  if (!isLiveKitConfigured()) {
    return [];
  }

  const roomService = new RoomServiceClient(LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);
  
  try {
    const participants = await roomService.listParticipants(roomName);
    return participants.map(p => ({
      identity: p.identity,
      name: p.name || p.identity,
      joinedAt: p.joinedAt ? new Date(Number(p.joinedAt)) : undefined,
      metadata: p.metadata || '',
    }));
  } catch (error) {
    console.error('Error listing participants:', error);
    return [];
  }
}

export interface RoomStatus {
  name: string;
  sid?: string;
  isActive: boolean;
  participantCount: number;
  createdAt?: Date;
}

export async function getRoomStatus(roomName: string): Promise<RoomStatus | null> {
  if (!isLiveKitConfigured()) {
    return null;
  }

  const roomService = new RoomServiceClient(LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);
  
  try {
    const rooms = await roomService.listRooms();
    const room = rooms.find(r => r.name === roomName);
    if (!room) {
      return {
        name: roomName,
        isActive: false,
        participantCount: 0,
      };
    }

    const participants = await roomService.listParticipants(roomName);
    
    return {
      name: room.name,
      sid: room.sid,
      isActive: participants.length > 0,
      participantCount: participants.length,
      createdAt: room.creationTime ? new Date(Number(room.creationTime)) : undefined,
    };
  } catch (error) {
    console.error('Error getting room status:', error);
    return null;
  }
}

export async function updateRoomMetadata(
  roomName: string,
  metadata: string
): Promise<boolean> {
  console.log(`Update room metadata: ${roomName} -> ${metadata}`);
  return true;
}

export async function kickParticipant(roomName: string, identity: string): Promise<boolean> {
  if (!isLiveKitConfigured()) {
    return false;
  }

  const roomService = new RoomServiceClient(LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);
  
  try {
    await roomService.removeParticipant(roomName, identity);
    return true;
  } catch (error) {
    console.error('Error kicking participant:', error);
    return false;
  }
}

export async function muteParticipant(
  roomName: string, 
  identity: string, 
  kind: 'audio' | 'video'
): Promise<boolean> {
  console.log(`Mute ${kind} for ${identity} in ${roomName}`);
  return true;
}

export interface MeetingCommands {
  create: (hostIdentity: string, hostName: string) => Promise<{ roomName: string; joinUrl: string; token: string }>;
  schedule: (hostIdentity: string, hostName: string, scheduledAt: Date, duration?: number) => Promise<{ roomName: string; joinUrl: string; token: string }>;
  delete: (roomName: string) => Promise<boolean>;
  getUrl: (roomName: string) => string;
  getToken: (roomName: string, participantName: string, participantIdentity: string, isHost?: boolean) => Promise<string>;
  getStatus: (roomName: string) => Promise<RoomStatus | null>;
  listParticipants: (roomName: string) => Promise<ParticipantInfo[]>;
  kick: (roomName: string, identity: string) => Promise<boolean>;
  mute: (roomName: string, identity: string, kind: 'audio' | 'video') => Promise<boolean>;
  list: () => Promise<LiveKitRoom[]>;
}

export const meetingCommands: MeetingCommands = {
  create: createImmediateMeeting,
  schedule: createScheduledMeeting,
  delete: deleteRoom,
  getUrl: getMeetingUrl,
  getToken: generateToken,
  getStatus: getRoomStatus,
  listParticipants: listParticipants,
  kick: kickParticipant,
  mute: muteParticipant,
  list: listRooms,
};

export function createMeetingCommandHandler() {
  return {
    async createMeeting(hostIdentity: string, hostName: string) {
      return createImmediateMeeting(hostIdentity, hostName);
    },
    async scheduleMeeting(hostIdentity: string, hostName: string, scheduledAt: Date, duration?: number) {
      return createScheduledMeeting(hostIdentity, hostName, scheduledAt, duration);
    },
    async deleteMeeting(roomName: string) {
      return deleteRoom(roomName);
    },
    getMeetingUrl(roomName: string) {
      return getMeetingUrl(roomName);
    },
    async getMeetingToken(roomName: string, participantName: string, participantIdentity: string, isHost?: boolean) {
      return generateToken(roomName, participantName, participantIdentity, isHost);
    },
    async getMeetingStatus(roomName: string) {
      return getRoomStatus(roomName);
    },
    async getMeetingParticipants(roomName: string) {
      return listParticipants(roomName);
    },
    async removeParticipant(roomName: string, identity: string) {
      return kickParticipant(roomName, identity);
    },
    async muteParticipant(roomName: string, identity: string, kind: 'audio' | 'video') {
      return muteParticipant(roomName, identity, kind);
    },
    async listAllRooms() {
      return listRooms();
    },
  };
}