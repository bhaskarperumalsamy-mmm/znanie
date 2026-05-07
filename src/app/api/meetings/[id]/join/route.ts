import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { getConferenceToken } from '@/lib/telemost';
import { isLiveKitConfigured } from '@/lib/livekit';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: meetingId } = await params;
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    const meeting = await prisma.meeting.findUnique({
      where: { id: meetingId }
    });

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }

    // Verify user is authorized to join
    const isTeacher = meeting.teacherId === user.id;
    const isStudent = meeting.studentId === user.id;
    
    if (!isTeacher && !isStudent && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized to join this meeting' }, { status: 403 });
    }

    // If it's a legacy meeting or Jitsi meeting, just redirect to the saved joinUrl
    if (!isLiveKitConfigured() || !meeting.conferenceId?.startsWith('znanie-')) {
      return NextResponse.redirect(meeting.joinUrl || '/');
    }

    const roomName = meeting.conferenceId;
    
    // Generate token
    const token = await getConferenceToken(
      roomName,
      user.name,
      `${user.role.toLowerCase()}-${user.id}`,
      isTeacher || user.role === 'ADMIN'
    );

    // Build the frontend URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
    const redirectUrl = `${baseUrl}/meet/${roomName}?token=${token}`;

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Error joining meeting:', error);
    return NextResponse.json({ error: 'Failed to join meeting' }, { status: 500 });
  }
}
