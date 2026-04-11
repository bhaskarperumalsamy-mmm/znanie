import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { createZoomMeeting } from '@/lib/zoom';

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

    // Create Zoom meeting
    let zoomJoinUrl = null;
    let zoomHostUrl = null;
    let zoomMeetingId = null;

    try {
      const startDate = new Date(startTime);
      const endDate = new Date(endTime);
      const duration = Math.round((endDate.getTime() - startDate.getTime()) / 60000);

      const zoomMeeting = await createZoomMeeting({
        topic: title,
        type: 2,
        start_time: startDate.toISOString(),
        duration: duration,
        timezone: 'Asia/Kolkata',
        agenda: description,
      });

      zoomJoinUrl = zoomMeeting.join_url;
      zoomHostUrl = zoomMeeting.start_url;
      zoomMeetingId = String(zoomMeeting.id);
    } catch (zoomError) {
      console.error('Zoom creation error:', zoomError);
      // Continue without Zoom if it fails
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
        meetingUrl: zoomJoinUrl,
        hostUrl: zoomHostUrl,
        zoomMeetingId,
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

    return NextResponse.json({ meeting });
  } catch (error) {
    console.error('Create meeting error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}