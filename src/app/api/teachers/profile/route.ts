import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.teacherProfile.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user || !['TEACHER', 'COUNSELOR', 'MENTOR'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { bio, specializations, certifications, hourlyRate, languages } = body;

    const existingProfile = await prisma.teacherProfile.findUnique({
      where: { userId: user.id },
    });

    let profile;
    if (existingProfile) {
      profile = await prisma.teacherProfile.update({
        where: { userId: user.id },
        data: {
          ...(bio !== undefined && { bio }),
          ...(specializations && { specializations }),
          ...(certifications && { certifications }),
          ...(hourlyRate !== undefined && { hourlyRate }),
          ...(languages && { languages }),
        },
      });
    } else {
      profile = await prisma.teacherProfile.create({
        data: {
          userId: user.id,
          bio: bio || '',
          specializations: specializations || [],
          certifications: certifications || [],
          hourlyRate: hourlyRate || 0,
          languages: languages || [],
        },
      });
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Create/update profile error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}