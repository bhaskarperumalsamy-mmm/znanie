import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { createConference } from '@/lib/telemost';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user || !['TEACHER', 'COUNSELOR', 'MENTOR'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      studentId, 
      title, 
      description, 
      startTime, 
      endTime, 
      meetingType = 'ONE_ON_ONE',
      maxParticipants = 10,
      groupCode 
    } = body;

    if (!studentId || !title || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'studentId, title, startTime, and endTime are required' },
        { status: 400 }
      );
    }

    // Create Jitsi meeting
    let conferenceId: string | null = null;
    let joinUrl: string | null = null;

    try {
      const conference = createConference();
      conferenceId = conference.id;
      joinUrl = conference.joinUrl;
    } catch (conferenceError) {
      console.error('Conference creation error:', conferenceError);
    }

    // Create meeting in database
    const meeting = await prisma.meeting.create({
      data: {
        studentId,
        teacherId: user.id,
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        timezone: 'Asia/Kolkata',
        meetingType: meetingType as any,
        status: 'CONFIRMED',
        joinUrl: joinUrl,
        conferenceId: conferenceId,
        maxParticipants,
        groupCode,
      },
      include: {
        student: {
          select: { id: true, name: true, email: true },
        },
        teacher: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({ 
      meeting,
      message: 'Meeting created successfully',
      joinUrl: joinUrl,
    });
  } catch (error) {
    console.error('Create meeting error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}