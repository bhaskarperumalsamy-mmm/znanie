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
      include: { class: { include: { students: { select: { id: true } } } } }
    });

    const isStudentInClass = meeting?.class?.students.some(s => s.id === user.id);

    if (!meeting || (!isStudentInClass && meeting.teacherId !== user.id && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const actionItems = await prisma.actionItem.findMany({
      where: { meetingId: id },
      include: {
        assignee: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ actionItems });
  } catch (error) {
    console.error('Get action items error:', error);
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
    const { title, assigneeId, dueDate } = body;

    const meeting = await prisma.meeting.findUnique({
      where: { id },
      include: { class: { include: { students: { select: { id: true } } } } }
    });

    const isStudentInClass = meeting?.class?.students.some(s => s.id === user.id);

    if (!meeting || (!isStudentInClass && meeting.teacherId !== user.id && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const actionItem = await prisma.actionItem.create({
      data: {
        meetingId: id,
        assigneeId: assigneeId || user.id,
        title,
        ...(dueDate && { dueDate: new Date(dueDate) }),
      },
      include: {
        assignee: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json({ actionItem });
  } catch (error) {
    console.error('Create action item error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}