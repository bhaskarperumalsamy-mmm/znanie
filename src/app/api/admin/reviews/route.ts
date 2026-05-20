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
    const rating = searchParams.get('rating') || '';
    const teacherId = searchParams.get('teacherId') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: any = {};
    
    if (rating) {
      where.overallRating = parseInt(rating);
    }
    
    if (teacherId) {
      where.teacherId = teacherId;
    }

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        include: {
          reviewer: {
            select: { id: true, name: true, email: true },
          },
          teacher: {
            select: { id: true, name: true, email: true },
          },
          meeting: {
            select: { id: true, title: true, startTime: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.review.count({ where }),
    ]);

    return NextResponse.json({
      reviews,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Admin reviews error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}