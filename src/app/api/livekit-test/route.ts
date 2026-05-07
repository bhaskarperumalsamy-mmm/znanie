import { NextRequest, NextResponse } from 'next/server';
import { createImmediateConference, createScheduledConference, deleteConference } from '@/lib/telemost';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type = 'IMMEDIATE', scheduledAt, duration = 60, hostIdentity, hostName } = body;

    let result;

    if (type === 'SCHEDULED' && scheduledAt) {
      const scheduledDate = new Date(scheduledAt);
      result = await createScheduledConference(
        hostIdentity || 'test-host',
        hostName || 'Test Host',
        scheduledDate,
        duration
      );
    } else {
      result = await createImmediateConference(
        hostIdentity || 'test-host',
        hostName || 'Test Host'
      );
    }

    return NextResponse.json({
      success: true,
      conferenceId: result.id,
      roomName: result.roomName || result.id,
      joinUrl: result.joinUrl,
      token: result.token,
    });
  } catch (error: any) {
    console.error('Test meeting error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create meeting' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomName } = body;

    if (!roomName) {
      return NextResponse.json({ error: 'roomName is required' }, { status: 400 });
    }

    await deleteConference(roomName);

    return NextResponse.json({
      success: true,
      message: 'Meeting deleted',
    });
  } catch (error: any) {
    console.error('Test delete meeting error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete meeting' }, { status: 500 });
  }
}