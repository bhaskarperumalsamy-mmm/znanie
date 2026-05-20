import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Don't reveal if email exists
      return NextResponse.json({ 
        message: 'If an account exists, a password reset link has been sent.' 
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationToken: resetToken,
      },
    });

    // TODO: Send email with reset link
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'}/reset-password?token=${resetToken}`;
    console.log(`[EMAIL] Password reset link for ${email}: ${resetUrl}`);
    
    // In production, integrate with email service here

    return NextResponse.json({ 
      message: 'If an account exists, a password reset link has been sent.' 
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}