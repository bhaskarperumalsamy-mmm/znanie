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

    const review = await prisma.review.findUnique({
      where: { id },
      include: {
        reviewer: {
          select: { id: true, name: true, email: true, profilePhoto: true },
        },
        teacher: {
          select: { id: true, name: true, email: true },
        },
        meeting: {
          select: { id: true, title: true, startTime: true },
        },
      },
    });

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ review });
  } catch (error) {
    console.error('Admin review detail error:', error);
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

    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    console.error('Admin delete review error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}