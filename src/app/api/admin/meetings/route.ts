import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const teacherId = searchParams.get('teacherId') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: any = {};
    
    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }
    
    if (status) {
      where.status = status;
    }
    
    if (teacherId) {
      where.teacherId = teacherId;
    }

    const [meetings, total] = await Promise.all([
      prisma.meeting.findMany({
        where,
        include: {
          teacher: {
            select: { id: true, name: true, email: true, profilePhoto: true },
          },
          class: {
            select: { id: true, title: true },
          },
        },
        orderBy: { startTime: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.meeting.count({ where }),
    ]);

    return NextResponse.json({
      meetings,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Admin meetings error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}