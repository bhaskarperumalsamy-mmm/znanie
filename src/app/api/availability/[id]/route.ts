import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const availability = await prisma.availability.findUnique({
      where: { id },
    });

    if (!availability) {
      return NextResponse.json({ error: 'Availability not found' }, { status: 404 });
    }

    return NextResponse.json({ availability });
  } catch (error) {
    console.error('Get availability error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { dayOfWeek, startTime, endTime, bufferMinutes, isActive } = body;

    const existing = await prisma.availability.findUnique({
      where: { id },
    });

    if (!existing || existing.teacherId !== user.id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const availability = await prisma.availability.update({
      where: { id },
      data: {
        ...(dayOfWeek !== undefined && { dayOfWeek }),
        ...(startTime && { startTime }),
        ...(endTime && { endTime }),
        ...(bufferMinutes !== undefined && { bufferMinutes }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json({ availability });
  } catch (error) {
    console.error('Update availability error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.availability.findUnique({
      where: { id },
    });

    if (!existing || existing.teacherId !== user.id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    await prisma.availability.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete availability error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}