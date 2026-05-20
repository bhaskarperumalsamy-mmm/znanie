import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const [
      totalUsers,
      totalTeachers,
      totalStudents,
      totalMeetings,
      totalClasses,
      activeMeetings,
      pendingReviews,
      thisWeekMeetings,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: { in: ['TEACHER', 'COUNSELOR', 'MENTOR'] } } }),
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.meeting.count(),
      prisma.class.count(),
      prisma.meeting.count({ where: { status: 'IN_PROGRESS' } }),
      prisma.review.count({ where: { overallRating: 0 } }),
      prisma.meeting.count({
        where: {
          startTime: {
            gte: startOfWeek,
            lt: endOfWeek,
          },
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        totalTeachers,
        totalStudents,
        totalMeetings,
        totalClasses,
        activeMeetings,
        pendingReviews,
        thisWeekMeetings,
      },
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}