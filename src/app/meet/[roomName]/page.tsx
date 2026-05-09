'use client';

import { LiveKitRoom, VideoConference, RoomAudioRenderer } from '@livekit/components-react';
import '@livekit/components-styles';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: Promise<{ roomName: string }>;
  searchParams: Promise<{ token?: string }>;
}

export default function MeetingPage(props: PageProps) {
  // Unwrap the Promises for Next.js 15+ App Router compatibility
  const params = use(props.params);
  const searchParams = use(props.searchParams);
  
  const token = searchParams.token;
  const roomName = params.roomName;
  const router = useRouter();
  
  const [liveKitUrl, setLiveKitUrl] = useState<string | null>(null);

  useEffect(() => {
    // Read from environment variables exposed to the client
    const url = process.env.NEXT_PUBLIC_LIVEKIT_URL;
    if (url) {
      setLiveKitUrl(url);
    } else {
      console.error('NEXT_PUBLIC_LIVEKIT_URL is not defined');
    }
  }, []);

  if (!token) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 text-white">
        <div className="rounded-lg bg-gray-800 p-8 text-center shadow-xl">
          <h1 className="mb-4 text-2xl font-bold text-red-400">Access Denied</h1>
          <p className="text-gray-300">No meeting token provided.</p>
          <p className="mt-2 text-sm text-gray-500">Please join using a valid meeting link.</p>
        </div>
      </div>
    );
  }

  if (!liveKitUrl) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 text-white">
        <div className="rounded-lg bg-gray-800 p-8 text-center shadow-xl">
          <h1 className="mb-4 text-2xl font-bold text-yellow-400">Configuration Error</h1>
          <p className="text-gray-300">LiveKit Server URL is not configured.</p>
        </div>
      </div>
    );
  }

  const handleDisconnected = () => {
    // Attempt to close the window (works if it was opened in a new tab)
    window.close();
    // Fallback if the window can't be closed by script
    router.push('/');
  };

  return (
    <div className="h-screen w-full bg-black" data-lk-theme="default">
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={liveKitUrl}
        className="h-full w-full"
        onDisconnected={handleDisconnected}
      >
        <VideoConference />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
}
