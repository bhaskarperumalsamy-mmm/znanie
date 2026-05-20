import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { hashPassword } from '@/lib/auth';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get('role');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: any = {};
    if (role) {
      where.role = role;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isVerified: true,
          createdAt: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Admin users error:', error);
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
    const { name, email, role, bio, specializations, languages, sendInvitation } = body;

    if (!name || !email || !role) {
      return NextResponse.json({ error: 'Name, email, and role are required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    // Generate temporary password (user will need to reset)
    const tempPassword = crypto.randomBytes(16).toString('hex');
    const hashedPassword = await hashPassword(tempPassword);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        isVerified: sendInvitation ? false : true,
        verificationToken: sendInvitation ? verificationToken : null,
        teacherProfile: ['TEACHER', 'COUNSELOR', 'MENTOR'].includes(role) ? {
          create: {
            bio: bio || null,
            specializations: specializations ? specializations.split(',').map((s: string) => s.trim()) : [],
            languages: languages ? languages.split(',').map((l: string) => l.trim()) : [],
          }
        } : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
      },
    });

    // TODO: Send invitation email if sendInvitation is true
    if (sendInvitation) {
      console.log(`[EMAIL] Would send invitation to ${email} with token ${verificationToken}`);
      // In production, integrate with email service here
    }

    return NextResponse.json({ 
      user: newUser,
      message: sendInvitation ? 'User created. Invitation will be sent.' : 'User created successfully.'
    });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}