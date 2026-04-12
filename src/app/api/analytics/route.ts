import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'student', 'teacher', 'admin'

    if (type === 'student') {
      const meetings = await prisma.meeting.findMany({
        where: { studentId: user.id },
        orderBy: { createdAt: 'desc' },
      });

      const stats = {
        total: meetings.length,
        completed: meetings.filter(m => m.status === 'COMPLETED').length,
        cancelled: meetings.filter(m => m.status === 'CANCELLED').length,
        upcoming: meetings.filter(m => m.status === 'CONFIRMED' && new Date(m.startTime) > new Date()).length,
      };

      return NextResponse.json({ stats });
    }

    if (type === 'teacher') {
      const meetings = await prisma.meeting.findMany({
        where: { teacherId: user.id },
        orderBy: { createdAt: 'desc' },
      });

      const stats = {
        total: meetings.length,
        completed: meetings.filter(m => m.status === 'COMPLETED').length,
        cancelled: meetings.filter(m => m.status === 'CANCELLED').length,
        upcoming: meetings.filter(m => m.status === 'CONFIRMED' && new Date(m.startTime) > new Date()).length,
        noShow: meetings.filter(m => m.status === 'NO_SHOW').length,
      };

      const teacherProfile = await prisma.teacherProfile.findUnique({
        where: { userId: user.id },
      });

      const availability = await prisma.availability.findMany({
        where: { teacherId: user.id, isActive: true },
      });

      return NextResponse.json({ stats, profile: teacherProfile, availability: availability.length });
    }

    if (type === 'admin') {
      const totalUsers = await prisma.user.count();
      
      const teachers = await prisma.user.findMany({
        where: { role: { in: ['TEACHER', 'COUNSELOR', 'MENTOR'] } },
        select: { id: true },
      });
      
      const students = await prisma.user.count({
        where: { role: 'STUDENT' },
      });

      const meetings = await prisma.meeting.count();
      const completedMeetings = await prisma.meeting.count({
        where: { status: 'COMPLETED' },
      });

      const teacherProfiles = await prisma.teacherProfile.findMany({
        orderBy: { avgRating: 'desc' },
        take: 10,
        include: {
          user: {
            select: { name: true },
          },
        },
      });

      return NextResponse.json({
        stats: {
          totalUsers,
          totalTeachers: teachers.length,
          totalStudents: students,
          totalMeetings: meetings,
          completedMeetings,
        },
        topTeachers: teacherProfiles,
      });
    }

    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
  } catch (error) {
    console.error('Get analytics error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}