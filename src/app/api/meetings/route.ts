import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { createConference } from '@/lib/telemost';

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
        joinUrl: joinUrl,
        conferenceId: conferenceId,
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