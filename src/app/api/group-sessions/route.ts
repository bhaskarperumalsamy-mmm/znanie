import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const from = searchParams.get('from');

    const where: any = {
      meetingType: 'GROUP',
    };

    if (status === 'upcoming') {
      where.startTime = { gte: new Date() };
      where.status = { in: ['REQUESTED', 'CONFIRMED'] };
    } else if (status === 'past') {
      where.endTime = { lt: new Date() };
    }

    const groupSessions = await prisma.meeting.findMany({
      where,
      include: {
        teacher: {
          select: { id: true, name: true, profilePhoto: true },
        },
      },
      orderBy: { startTime: 'asc' },
      take: from ? undefined : 20,
    });

    return NextResponse.json({ groupSessions });
  } catch (error) {
    console.error('Get group sessions error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user || !['TEACHER', 'COUNSELOR', 'MENTOR', 'ADMIN'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      title, 
      description, 
      startTime, 
      endTime, 
      maxParticipants = 10,
      isPublic = true,
      timezone = 'Asia/Kolkata'
    } = body;

    if (!title || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'title, startTime, and endTime are required' },
        { status: 400 }
      );
    }

    const groupSession = await prisma.meeting.create({
      data: {
        teacherId: user.id,
        studentId: user.id, // Teacher is also participant
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        meetingType: 'GROUP',
        status: 'CONFIRMED',
        timezone,
        maxParticipants,
      },
      include: {
        teacher: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json({ groupSession });
  } catch (error) {
    console.error('Create group session error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}