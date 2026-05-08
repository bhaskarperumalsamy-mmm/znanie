"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Meeting {
  id: string;
  title: string;
  startTime: string;
  status: string;
  class?: { title: string };
}

interface Stats {
  totalMeetings: number;
  upcomingMeetings: number;
  completedMeetings: number;
  totalStudents: number;
}

export default function TeacherDashboard() {
  const router = useRouter();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalMeetings: 0,
    upcomingMeetings: 0,
    completedMeetings: 0,
    totalStudents: 0,
  });
  const [loading, setLoading] = useState(true);

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
      
      if (!['TEACHER', 'COUNSELOR', 'MENTOR'].includes(data.user.role)) {
        router.push('/student');
        return;
      }
      
      fetchData();
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchData = async () => {
    try {
      const [meetingsRes, statsRes] = await Promise.all([
        fetch('/api/meetings?limit=5'),
        fetch('/api/analytics?type=teacher'),
      ]);
      
      const meetingsData = await meetingsRes.json();
      const statsData = await statsRes.json();
      
      setMeetings(meetingsData.meetings || []);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      CONFIRMED: 'bg-green-100 text-green-700',
      REQUESTED: 'bg-yellow-100 text-yellow-700',
      COMPLETED: 'bg-gray-100 text-gray-700',
      CANCELLED: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c1121f]"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's your teaching overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Meetings</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalMeetings}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Upcoming</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.upcomingMeetings}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.completedMeetings}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Students</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalStudents}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          href="/teacher/meetings/new"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#c1121f] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Create Meeting</h3>
              <p className="text-gray-500 text-sm">Schedule a new session</p>
            </div>
          </div>
        </Link>

        <Link
          href="/teacher/availability"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Set Availability</h3>
              <p className="text-gray-500 text-sm">Update your schedule</p>
            </div>
          </div>
        </Link>

        <Link
          href="/teacher/analytics"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Analytics</h3>
              <p className="text-gray-500 text-sm">View your stats</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Meetings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Meetings</h2>
            <Link href="/teacher/meetings" className="text-[#c1121f] hover:text-[#b5110a] text-sm font-medium">
              View All →
            </Link>
          </div>
        </div>
        
        {meetings.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 mb-4">No meetings yet.</p>
            <Link href="/teacher/meetings/new" className="text-[#c1121f] hover:text-[#b5110a] font-medium">
              Create your first meeting →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {meetings.map((meeting) => (
              <Link
                key={meeting.id}
                href={`/teacher/meetings/${meeting.id}`}
                className="p-6 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {meeting.class?.title || 'No Class'} • {formatDate(meeting.startTime)}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                  {meeting.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}