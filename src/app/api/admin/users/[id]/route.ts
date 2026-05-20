import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import crypto from 'crypto';

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

    const userData = await prisma.user.findUnique({
      where: { id },
      include: {
        teacherProfile: true,
        enrolledClasses: {
          select: { id: true, title: true },
        },
        teachingClasses: {
          select: { id: true, title: true },
        },
        teacherMeetings: {
          select: { id: true, status: true },
        },
        reviewsForMe: {
          select: { id: true },
        },
      },
    });

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const stats = {
      totalMeetings: userData.teacherMeetings.length,
      completedMeetings: userData.teacherMeetings.filter(m => m.status === 'COMPLETED').length,
      totalClassesTeaching: userData.teachingClasses.length,
      totalClassesEnrolled: userData.enrolledClasses.length,
      totalReviews: userData.reviewsForMe.length,
    };

    return NextResponse.json({ 
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        isVerified: userData.isVerified,
        timezone: userData.timezone,
        language: userData.language,
        profilePhoto: userData.profilePhoto,
        createdAt: userData.createdAt,
        teacherProfile: userData.teacherProfile,
        enrolledClasses: userData.enrolledClasses,
        teachingClasses: userData.teachingClasses,
      },
      stats
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, email, role, isVerified, teacherProfile } = body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (isVerified !== undefined) updateData.isVerified = isVerified;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
      },
    });

    // Update teacher profile if provided
    if (teacherProfile && ['TEACHER', 'COUNSELOR', 'MENTOR'].includes(role)) {
      await prisma.teacherProfile.upsert({
        where: { userId: id },
        update: {
          bio: teacherProfile.bio || null,
          specializations: teacherProfile.specializations || [],
          certifications: teacherProfile.certifications || [],
          languages: teacherProfile.languages || [],
          hourlyRate: teacherProfile.hourlyRate || null,
        },
        create: {
          userId: id,
          bio: teacherProfile.bio || null,
          specializations: teacherProfile.specializations || [],
          certifications: teacherProfile.certifications || [],
          languages: teacherProfile.languages || [],
          hourlyRate: teacherProfile.hourlyRate || null,
        },
      });
    }

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Update user error:', error);
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

    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const targetUser = await prisma.user.findUnique({ where: { id } });
    
    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    
    await prisma.user.update({
      where: { id },
      data: {
        isVerified: false,
        verificationToken,
      },
    });

    console.log(`[EMAIL] Would send invitation to ${targetUser.email} with token ${verificationToken}`);
    
    return NextResponse.json({ 
      message: 'Invitation sent successfully',
      email: targetUser.email
    });
  } catch (error) {
    console.error('Send invitation error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}