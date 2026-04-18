const IS_DEV = process.env.NODE_ENV === 'development';

export async function createZoomMeeting(meetingData: any) {
  if (IS_DEV) {
    console.log('[DEV MODE] createZoomMeeting called - Yandex.360 integration pending');
  }
  
  const meetingId = `dev-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    id: meetingId,
    join_url: IS_DEV 
      ? `http://localhost:3002/meeting/${meetingId}` 
      : `https://meet.yandex.ru/${meetingId}`,
    start_url: IS_DEV 
      ? `http://localhost:3002/meeting/${meetingId}?host=true` 
      : `https://meet.yandex.ru/${meetingId}?host=true`,
    password: Math.random().toString(36).substr(2, 6),
  };
}