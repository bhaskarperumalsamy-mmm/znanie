import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const teacherId = searchParams.get('teacherId');
    const meetingId = searchParams.get('meetingId');

    const where: any = {};

    if (teacherId) {
      where.teacherId = teacherId;
    }

    if (meetingId) {
      where.meetingId = meetingId;
    }

    const reviews = await prisma.review.findMany({
      where,
      include: {
        reviewer: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Get reviews error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { meetingId, teacherId, overallRating, knowledgeRating, communicationRating, punctualityRating, helpfulnessRating, comment, isAnonymous = false } = body;

    if (!meetingId || !teacherId || !overallRating) {
      return NextResponse.json(
        { error: 'meetingId, teacherId, and overallRating are required' },
        { status: 400 }
      );
    }

    if (overallRating < 1 || overallRating > 5) {
      return NextResponse.json(
        { error: 'overallRating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const meeting = await prisma.meeting.findUnique({
      where: { id: meetingId },
      include: { class: { include: { students: { select: { id: true } } } } }
    });

    const isStudentInClass = meeting?.class?.students.some(s => s.id === user.id);

    if (!meeting || !isStudentInClass) {
      return NextResponse.json(
        { error: 'You can only review meetings you attended' },
        { status: 403 }
      );
    }

    if (meeting.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'You can only review completed meetings' },
        { status: 400 }
      );
    }

    const existingReview = await prisma.review.findUnique({
      where: { meetingId },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this meeting' },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        meetingId,
        reviewerId: user.id,
        teacherId,
        overallRating,
        knowledgeRating,
        communicationRating,
        punctualityRating,
        helpfulnessRating,
        comment,
        isAnonymous,
      },
    });

    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId: teacherId },
    });

    if (teacherProfile) {
      const allReviews = await prisma.review.findMany({
        where: { teacherId },
        select: { overallRating: true },
      });

      const avgRating = allReviews.reduce((acc: number, r: any) => acc + r.overallRating, 0) / allReviews.length;

      await prisma.teacherProfile.update({
        where: { userId: teacherId },
        data: {
          avgRating,
          totalReviews: allReviews.length,
        },
      });
    }

    return NextResponse.json({ review });
  } catch (error) {
    console.error('Create review error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}