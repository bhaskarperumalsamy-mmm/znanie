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
    });

    if (!meeting || (meeting.studentId !== user.id && meeting.teacherId !== user.id && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const notes = await prisma.meetingNote.findMany({
      where: { meetingId: id },
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ notes });
  } catch (error) {
    console.error('Get notes error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

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
    const { content, isPrivate = false } = body;

    const meeting = await prisma.meeting.findUnique({
      where: { id },
    });

    if (!meeting || (meeting.studentId !== user.id && meeting.teacherId !== user.id && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const note = await prisma.meetingNote.create({
      data: {
        meetingId: id,
        authorId: user.id,
        content,
        isPrivate,
      },
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json({ note });
  } catch (error) {
    console.error('Create note error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}