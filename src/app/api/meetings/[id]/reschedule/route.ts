import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { startTime, endTime } = body;

    const meeting = await prisma.meeting.findUnique({
      where: { id },
    });

    if (!meeting || (meeting.studentId !== user.id && meeting.teacherId !== user.id && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    if (!['REQUESTED', 'CONFIRMED'].includes(meeting.status)) {
      return NextResponse.json(
        { error: 'Cannot reschedule a meeting that is in progress, completed, or cancelled' },
        { status: 400 }
      );
    }

    if (!startTime || !endTime) {
      return NextResponse.json(
        { error: 'startTime and endTime are required' },
        { status: 400 }
      );
    }

    const updated = await prisma.meeting.update({
      where: { id },
      data: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    return NextResponse.json({ meeting: updated });
  } catch (error) {
    console.error('Reschedule meeting error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}