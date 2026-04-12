import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const availability = await prisma.availability.findMany({
      where: { teacherId: user.id },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });

    return NextResponse.json({ availability });
  } catch (error) {
    console.error('Get availability error:', error);
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
    const { dayOfWeek, startTime, endTime, bufferMinutes = 15 } = body;

    if (dayOfWeek === undefined || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'dayOfWeek, startTime, and endTime are required' },
        { status: 400 }
      );
    }

    const availability = await prisma.availability.create({
      data: {
        teacherId: user.id,
        dayOfWeek,
        startTime,
        endTime,
        bufferMinutes,
      },
    });

    return NextResponse.json({ availability });
  } catch (error) {
    console.error('Create availability error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}