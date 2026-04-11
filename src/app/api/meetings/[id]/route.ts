import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const meeting = await prisma.meeting.findUnique({
      where: { id },
      include: {
        student: {
          select: { id: true, name: true, email: true, profilePhoto: true },
        },
        teacher: {
          select: { id: true, name: true, email: true, profilePhoto: true },
        },
        notes: {
          include: {
            author: {
              select: { id: true, name: true },
            },
          },
        },
        actionItems: {
          include: {
            assignee: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }

    // Check access
    if (
      meeting.studentId !== user.id &&
      meeting.teacherId !== user.id &&
      user.role !== 'ADMIN'
    ) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    return NextResponse.json({ meeting });
  } catch (error) {
    console.error('Get meeting error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function PATCH(
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
    const { title, description, startTime, endTime, status, meetingUrl } = body;

    const meeting = await prisma.meeting.findUnique({
      where: { id },
    });

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }

    // Check access
    if (
      meeting.studentId !== user.id &&
      meeting.teacherId !== user.id &&
      user.role !== 'ADMIN'
    ) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const updated = await prisma.meeting.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(startTime && { startTime: new Date(startTime) }),
        ...(endTime && { endTime: new Date(endTime) }),
        ...(status && { status: status as any }),
        ...(meetingUrl !== undefined && { meetingUrl }),
      },
    });

    return NextResponse.json({ meeting: updated });
  } catch (error) {
    console.error('Update meeting error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const meeting = await prisma.meeting.findUnique({
      where: { id },
    });

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }

    // Check access
    if (
      meeting.studentId !== user.id &&
      meeting.teacherId !== user.id &&
      user.role !== 'ADMIN'
    ) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Instead of deleting, mark as cancelled
    await prisma.meeting.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    return NextResponse.json({ message: 'Meeting cancelled' });
  } catch (error) {
    console.error('Delete meeting error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}