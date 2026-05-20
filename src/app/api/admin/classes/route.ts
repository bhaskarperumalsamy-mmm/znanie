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
    const teacherId = searchParams.get('teacherId') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: any = {};
    
    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }
    
    if (teacherId) {
      where.teacherId = teacherId;
    }

    const [classes, total] = await Promise.all([
      prisma.class.findMany({
        where,
        include: {
          teacher: {
            select: { id: true, name: true, email: true },
          },
          students: {
            select: { id: true },
          },
          meetings: {
            select: { id: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.class.count({ where }),
    ]);

    return NextResponse.json({
      classes: classes.map(c => ({
        ...c,
        studentCount: c.students.length,
        meetingCount: c.meetings.length,
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Admin classes error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, teacherId } = body;

    if (!title || !teacherId) {
      return NextResponse.json({ error: 'title and teacherId are required' }, { status: 400 });
    }

    const classObj = await prisma.class.create({
      data: {
        title,
        description,
        teacherId,
      },
      include: {
        teacher: {
          select: { id: true, name: true, email: true },
        },
        students: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({ class: classObj });
  } catch (error) {
    console.error('Admin create class error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}