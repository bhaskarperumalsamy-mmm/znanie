"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function StudentMeetingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [meeting, setMeeting] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const meetingId = params?.id as string;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      
      if (!data.user) {
        router.push('/login');
        return;
      }
      
      if (data.user.role !== 'STUDENT') {
        router.push('/teacher');
        return;
      }
      
      fetchMeeting();
    } catch (err) {
      router.push('/login');
    }
  };

  const fetchMeeting = async () => {
    try {
      const res = await fetch(`/api/meetings/${meetingId}`);
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Failed to load meeting');
        return;
      }
      
      setMeeting(data.meeting);
    } catch (err) {
      setError('Failed to load meeting');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return 'bg-blue-100 text-blue-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c1121f]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="text-gray-500">Meeting not found</div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/student/meetings" className="text-[#c1121f] hover:text-[#b5110a] text-sm">
            ← Back to Meetings
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">{meeting.title}</h1>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(meeting.status)}`}>
          {meeting.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Meeting Details</h3>
            
            {meeting.description && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Description</p>
                <p className="text-gray-700">{meeting.description}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Date</p>
                <p className="text-gray-900">{formatDate(meeting.startTime)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Time</p>
                <p className="text-gray-900">{formatTime(meeting.startTime)} - {formatTime(meeting.endTime)}</p>
              </div>
            </div>
          </div>

          {/* Teacher Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Teacher</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#c1121f] text-white flex items-center justify-center font-semibold">
                {meeting.teacher?.name?.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{meeting.teacher?.name}</p>
                <p className="text-sm text-gray-500">{meeting.teacher?.email}</p>
              </div>
            </div>
          </div>

          {/* Meeting URL */}
          {meeting.joinUrl && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Video Meeting</h3>
              <div className="mb-3">
                <p className="text-sm text-gray-500 mb-1">Meeting Link</p>
                <p className="text-gray-700 text-sm font-mono break-all">{meeting.joinUrl}</p>
              </div>
              <a
                href={meeting.joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-[#c1121f] text-white rounded-lg hover:bg-[#b5110a] transition"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Join Meeting
              </a>
            </div>
          )}
        </div>

        {/* Quick Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Info</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Created</p>
                <p className="text-gray-900">{new Date(meeting.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Meeting ID</p>
                <p className="text-gray-900 font-mono text-xs">{meeting.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}