import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const meeting = await prisma.meeting.findUnique({
      where: { id },
      include: {
        teacher: {
          select: { id: true, name: true, email: true, profilePhoto: true },
        },
        class: {
          select: { id: true, title: true },
        },
        notes: {
          select: { id: true, content: true, isPrivate: true },
        },
        actionItems: {
          select: { id: true, title: true, status: true, dueDate: true },
        },
      },
    });

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }

    return NextResponse.json({ meeting });
  } catch (error) {
    console.error('Admin meeting detail error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, title, description } = body;

    const meeting = await prisma.meeting.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(title && { title }),
        ...(description !== undefined && { description }),
      },
      include: {
        teacher: {
          select: { id: true, name: true, email: true },
        },
        class: {
          select: { id: true, title: true },
        },
      },
    });

    return NextResponse.json({ meeting });
  } catch (error) {
    console.error('Admin update meeting error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await prisma.meeting.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Meeting deleted' });
  } catch (error) {
    console.error('Admin delete meeting error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}