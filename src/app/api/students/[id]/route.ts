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

    if (!['TEACHER', 'COUNSELOR', 'MENTOR', 'ADMIN'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id: studentId } = await params;

    // Fetch student profile
    const student = await prisma.user.findUnique({
      where: { 
        id: studentId,
        role: 'STUDENT'
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        language: true,
        timezone: true,
      }
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Fetch classes this student is taking with this teacher
    const classes = await prisma.class.findMany({
      where: {
        teacherId: user.id,
        students: {
          some: { id: studentId }
        }
      },
      select: {
        id: true,
        title: true,
        description: true,
      }
    });

    // Fetch meetings between this teacher and this student
    const meetings = await prisma.meeting.findMany({
      where: {
        teacherId: user.id,
        class: {
          students: {
            some: { id: studentId }
          }
        }
      },
      include: {
        class: {
          select: { title: true }
        }
      },
      orderBy: { startTime: 'desc' }
    });

    return NextResponse.json({ 
      student,
      classes,
      meetings
    });
  } catch (error) {
    console.error('Get student details error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
