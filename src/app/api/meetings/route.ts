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
    const { 
      studentId: bodyStudentId,
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

    // Determine studentId and teacherId based on user role
    let finalStudentId: string;
    let finalTeacherId: string;

    if (user.role === 'STUDENT') {
      // Student creating meeting - they are the student
      finalStudentId = user.id;
      if (!bodyTeacherId) {
        return NextResponse.json({ error: 'teacherId is required' }, { status: 400 });
      }
      finalTeacherId = bodyTeacherId;
    } else if (['TEACHER', 'COUNSELOR', 'MENTOR'].includes(user.role)) {
      // Teacher creating meeting - they are the teacher
      finalTeacherId = user.id;
      if (!bodyStudentId) {
        return NextResponse.json({ error: 'studentId is required' }, { status: 400 });
      }
      finalStudentId = bodyStudentId;
    } else {
      // Admin - need both
      if (!bodyTeacherId || !bodyStudentId) {
        return NextResponse.json({ error: 'teacherId and studentId are required' }, { status: 400 });
      }
      finalTeacherId = bodyTeacherId;
      finalStudentId = bodyStudentId;
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
        studentId: finalStudentId,
        teacherId: finalTeacherId,
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
      joinUrl,
      roomName: roomName,
      conferenceId,
    });
  } catch (error) {
    console.error('Create meeting error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}