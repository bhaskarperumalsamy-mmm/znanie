import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const specialization = searchParams.get('specialization');
    const language = searchParams.get('language');
    const search = searchParams.get('search');

    const where: any = {
      role: { in: ['TEACHER', 'COUNSELOR', 'MENTOR'] },
    };

    if (specialization) {
      where.teacherProfile = {
        specializations: {
          has: specialization,
        },
      };
    }

    if (language) {
      where.teacherProfile = {
        ...where.teacherProfile,
        languages: {
          has: language,
        },
      };
    }

    const teachers = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        profilePhoto: true,
        timezone: true,
        language: true,
        teacherProfile: {
          select: {
            bio: true,
            specializations: true,
            certifications: true,
            hourlyRate: true,
            avgRating: true,
            totalReviews: true,
            languages: true,
          },
        },
      },
      orderBy: {
        teacherProfile: {
          avgRating: 'desc',
        },
      },
    });

    let filteredTeachers = teachers;
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredTeachers = teachers.filter(
        (t: any) =>
          t.name.toLowerCase().includes(searchLower) ||
          t.teacherProfile?.bio?.toLowerCase().includes(searchLower) ||
          t.teacherProfile?.specializations?.some((s: string) =>
            s.toLowerCase().includes(searchLower)
          )
      );
    }

    return NextResponse.json({ teachers: filteredTeachers });
  } catch (error) {
    console.error('Get teachers error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}