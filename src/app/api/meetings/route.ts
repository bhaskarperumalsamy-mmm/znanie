import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { createImmediateConference, createScheduledConference } from '@/lib/telemost';

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
      where.class = {
        students: {
          some: { id: user.id }
        }
      };
      where.status = {
        in: ['CONFIRMED', 'COMPLETED', 'IN_PROGRESS']
      };
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
        class: {
          include: {
            students: { select: { id: true, name: true, email: true } }
          }
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
    const { 
      classId: bodyClassId,
      teacherId: bodyTeacherId, 
      title, 
      description, 
      startTime, 
      endTime, 
      timezone = 'Asia/Kolkata', 
      meetingType = 'ONE_ON_ONE',
      type = 'IMMEDIATE',
      scheduledAt,
      duration = 60
    } = body;

    let conferenceId: string | null = null;
    let joinUrl: string | null = null;
    let roomName: string | null = null;
    let hostToken: string | null = null;

    // Create meeting using LiveKit
    try {
      if (type === 'SCHEDULED' && scheduledAt) {
        const scheduledDate = new Date(scheduledAt);
        const result = await createScheduledConference(
          user.id.toString(),
          user.name || 'Host',
          scheduledDate,
          duration
        );
        conferenceId = result.id;
        joinUrl = result.joinUrl;
        roomName = result.roomName || result.id;
        hostToken = result.token || null;
      } else {
        // IMMEDIATE - start now
        const result = await createImmediateConference(
          user.id.toString(),
          user.name || 'Host'
        );
        conferenceId = result.id;
        joinUrl = result.joinUrl;
        roomName = result.roomName || result.id;
        hostToken = result.token || null;
      }
      console.log('[API] Created conference:', { conferenceId, joinUrl, roomName });
    } catch (conferenceError) {
      console.error('[API] Conference creation error:', conferenceError);
    }

    // Calculate start and end times
    let startDate: Date;
    let endDate: Date;

    if (startTime && endTime) {
      startDate = new Date(startTime);
      endDate = new Date(endTime);
    } else if (type === 'SCHEDULED' && scheduledAt) {
      startDate = new Date(scheduledAt);
      endDate = new Date(startDate.getTime() + duration * 60 * 1000);
    } else {
      // Immediate - start now
      startDate = new Date();
      endDate = new Date(startDate.getTime() + duration * 60 * 1000);
    }

    // Determine classId and teacherId based on user role
    let finalClassId: string;
    let finalTeacherId: string;

    if (user.role === 'STUDENT') {
      return NextResponse.json({ error: 'Students cannot create meetings directly' }, { status: 403 });
    } else if (['TEACHER', 'COUNSELOR', 'MENTOR'].includes(user.role)) {
      // Teacher creating meeting
      finalTeacherId = user.id;
      if (!bodyClassId) {
        return NextResponse.json({ error: 'classId is required' }, { status: 400 });
      }
      finalClassId = bodyClassId;
    } else {
      // Admin
      if (!bodyTeacherId || !bodyClassId) {
        return NextResponse.json({ error: 'teacherId and classId are required' }, { status: 400 });
      }
      finalTeacherId = bodyTeacherId;
      finalClassId = bodyClassId;
    }

    const meeting = await prisma.meeting.create({
      data: {
        title,
        description,
        startTime: startDate,
        endTime: endDate,
        timezone,
        meetingType: meetingType as any,
        joinUrl,
        conferenceId,
        status: 'REQUESTED',
        classId: finalClassId,
        teacherId: finalTeacherId,
      },
      include: {
        class: true,
        teacher: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({
      meeting,
      joinUrl,
      roomName: roomName,
      conferenceId,
    });
  } catch (error) {
    console.error('Create meeting error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}