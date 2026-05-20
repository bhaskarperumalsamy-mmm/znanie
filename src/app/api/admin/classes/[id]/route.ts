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

    const classObj = await prisma.class.findUnique({
      where: { id },
      include: {
        teacher: {
          select: { id: true, name: true, email: true, profilePhoto: true },
        },
        students: {
          select: { id: true, name: true, email: true, profilePhoto: true },
        },
        meetings: {
          select: {
            id: true,
            title: true,
            startTime: true,
            endTime: true,
            status: true,
          },
          orderBy: { startTime: 'asc' },
        },
      },
    });

    if (!classObj) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      class: {
        ...classObj,
        studentCount: classObj.students.length,
        meetingCount: classObj.meetings.length,
      }
    });
  } catch (error) {
    console.error('Admin class detail error:', error);
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

    await prisma.class.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Class deleted' });
  } catch (error) {
    console.error('Admin delete class error:', error);
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
    const { title, description } = body;

    const classObj = await prisma.class.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
      },
      include: {
        teacher: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({ class: classObj });
  } catch (error) {
    console.error('Admin update class error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}