import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let classes: any[] = [];

    if (user.role === 'TEACHER') {
      classes = await prisma.class.findMany({
        where: { teacherId: user.id },
        include: {
          students: { select: { id: true, name: true, email: true } },
        },
      });
    } else if (user.role === 'STUDENT') {
      classes = await prisma.class.findMany({
        where: {
          students: {
            some: { id: user.id }
          }
        },
        include: {
          teacher: { select: { id: true, name: true, email: true } },
        },
      });
    } else if (user.role === 'ADMIN') {
      classes = await prisma.class.findMany({
        include: {
          teacher: { select: { id: true, name: true, email: true } },
          students: { select: { id: true, name: true, email: true } },
        },
      });
    }

    return NextResponse.json({ classes });
  } catch (error) {
    console.error('Error fetching classes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user || user.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, studentIds } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const newClass = await prisma.class.create({
      data: {
        title,
        description,
        teacherId: user.id,
        students: {
          connect: studentIds?.map((id: string) => ({ id })) || []
        }
      },
      include: {
        students: { select: { id: true, name: true, email: true } }
      }
    });

    return NextResponse.json({ class: newClass });
  } catch (error) {
    console.error('Error creating class:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
