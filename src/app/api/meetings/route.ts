import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { createZoomMeeting } from '@/lib/zoom';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const role = user.role;

    const where: any = {};

    if (role === 'STUDENT') {
      where.studentId = user.id;
    } else if (['TEACHER', 'COUNSELOR', 'MENTOR'].includes(role)) {
      where.teacherId = user.id;
    } else if (role === 'ADMIN') {
      // Admin sees all
    }

    if (status) {
      where.status = status;
    }

    const meetings = await prisma.meeting.findMany({
      where,
      include: {
        student: {
          select: { id: true, name: true, email: true, profilePhoto: true },
        },
        teacher: {
          select: { id: true, name: true, email: true, profilePhoto: true },
        },
      },
      orderBy: { startTime: 'asc' },
    });

    return NextResponse.json({ meetings });
  } catch (error) {
    console.error('Get meetings error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { teacherId, title, description, startTime, endTime, timezone = 'Asia/Kolkata', meetingType = 'ONE_ON_ONE' } = body;

    if (!teacherId || !title || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'teacherId, title, startTime, and endTime are required' },
        { status: 400 }
      );
    }

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const duration = Math.round((endDate.getTime() - startDate.getTime()) / 60000);

    // Create Zoom meeting
    let zoomJoinUrl = null;
    let zoomHostUrl = null;
    let zoomMeetingId = null;

    try {
      const zoomMeeting = await createZoomMeeting({
        topic: title,
        type: 2,
        start_time: startDate.toISOString(),
        duration: duration > 0 ? duration : 60,
        timezone: timezone,
        agenda: description,
      });

      zoomJoinUrl = zoomMeeting.join_url;
      zoomHostUrl = zoomMeeting.start_url;
      zoomMeetingId = String(zoomMeeting.id);
    } catch (zoomError) {
      console.error('Zoom creation error:', zoomError);
      // Continue without Zoom if it fails
    }

    const meeting = await prisma.meeting.create({
      data: {
        studentId: user.id,
        teacherId,
        title,
        description,
        startTime: startDate,
        endTime: endDate,
        timezone,
        meetingType: meetingType as any,
        meetingUrl: zoomJoinUrl,
        hostUrl: zoomHostUrl,
        zoomMeetingId: zoomMeetingId,
        status: 'REQUESTED',
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