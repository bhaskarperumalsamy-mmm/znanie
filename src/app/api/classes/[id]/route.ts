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

    const classData = await prisma.class.findUnique({
      where: { id },
      include: {
        students: { select: { id: true, name: true, email: true } },
        teacher: { select: { id: true, name: true, email: true } },
      },
    });

    if (!classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    // Access check
    if (user.role === 'STUDENT' && !classData.students.some(s => s.id === user.id)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
    if (user.role === 'TEACHER' && classData.teacherId !== user.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    return NextResponse.json({ class: classData });
  } catch (error) {
    console.error('Get class error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, description, studentIds } = body;

    const classData = await prisma.class.findUnique({ where: { id } });

    if (!classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    if (classData.teacherId !== user.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const updatedClass = await prisma.class.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(studentIds && {
          students: {
            set: studentIds.map((sid: string) => ({ id: sid }))
          }
        })
      },
      include: {
        students: { select: { id: true, name: true, email: true } }
      }
    });

    return NextResponse.json({ class: updatedClass });
  } catch (error) {
    console.error('Update class error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const classData = await prisma.class.findUnique({ where: { id } });

    if (!classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    if (classData.teacherId !== user.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    await prisma.class.delete({ where: { id } });

    return NextResponse.json({ message: 'Class deleted successfully' });
  } catch (error) {
    console.error('Delete class error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
