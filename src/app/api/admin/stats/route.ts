import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [totalUsers, totalTeachers, totalStudents, totalMeetings] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: { in: ['TEACHER', 'COUNSELOR', 'MENTOR'] } } }),
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.meeting.count(),
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        totalTeachers,
        totalStudents,
        totalMeetings,
      },
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}