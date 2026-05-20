"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Stats {
  totalUsers: number;
  totalTeachers: number;
  totalStudents: number;
  totalMeetings: number;
  totalClasses: number;
  activeMeetings: number;
  pendingReviews: number;
  thisWeekMeetings: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalTeachers: 0,
    totalStudents: 0,
    totalMeetings: 0,
    totalClasses: 0,
    activeMeetings: 0,
    pendingReviews: 0,
    thisWeekMeetings: 0,
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
      
      if (data.user.role !== 'ADMIN') {
        router.push('/teacher');
        return;
      }
      
      fetchStats();
    } catch (err) {
      router.push('/login');
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setStats(data.stats || {
        totalUsers: 0,
        totalTeachers: 0,
        totalStudents: 0,
        totalMeetings: 0,
        totalClasses: 0,
        activeMeetings: 0,
        pendingReviews: 0,
        thisWeekMeetings: 0,
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, color: 'blue', href: '/admin/users' },
    { label: 'Teachers', value: stats.totalTeachers, color: 'purple', href: '/admin/users?role=TEACHER' },
    { label: 'Students', value: stats.totalStudents, color: 'green', href: '/admin/users?role=STUDENT' },
    { label: 'Total Meetings', value: stats.totalMeetings, color: 'orange', href: '/admin/meetings' },
    { label: 'Total Classes', value: stats.totalClasses, color: 'teal', href: '/admin/classes' },
    { label: 'Active Meetings', value: stats.activeMeetings, color: 'red', href: '/admin/meetings?status=IN_PROGRESS' },
    { label: 'This Week', value: stats.thisWeekMeetings, color: 'yellow', href: '/admin/meetings' },
    { label: 'Pending Reviews', value: stats.pendingReviews, color: 'pink', href: '/admin/reviews' },
  ];

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    teal: 'bg-teal-50 text-teal-600',
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    pink: 'bg-pink-50 text-pink-600',
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage your platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-full ${colorClasses[stat.color]} flex items-center justify-center`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/users"
            className="px-4 py-2 bg-[#c1121f] text-white rounded-lg hover:bg-[#b5110a] transition"
          >
            Manage Users
          </Link>
          <Link
            href="/admin/classes"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Manage Classes
          </Link>
          <Link
            href="/admin/meetings"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Manage Meetings
          </Link>
          <Link
            href="/admin/reviews"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Manage Reviews
          </Link>
        </div>
      </div>
    </div>
  );
}