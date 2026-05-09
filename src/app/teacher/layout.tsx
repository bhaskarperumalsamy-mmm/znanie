"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthRedirect } from '@/lib/useAuthRedirect';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  
  const { user, loading, checkAuth } = useAuthRedirect({
    allowedRoles: ['TEACHER', 'COUNSELOR', 'MENTOR'],
    loginUrl: '/login',
    maxRetries: 2,
    retryDelay: 500,
  });

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c1121f]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c1121f] mb-4"></div>
        <p className="text-gray-500">Verifying access...</p>
        <button 
          onClick={() => checkAuth()}
          className="mt-4 text-[#c1121f] hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  const navItems = [
    { href: '/teacher', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/teacher/classes', label: 'My Classes', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { href: '/teacher/meetings', label: 'My Meetings', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { href: '/teacher/meetings/new', label: 'Create Meeting', icon: 'M12 4v16m8-8H4' },
    { href: '/teacher/availability', label: 'Availability', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { href: '/teacher/profile', label: 'My Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { href: '/teacher/analytics', label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { href: '/teacher/students', label: 'My Students', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className={`${collapsed ? 'w-20' : 'w-64'} fixed h-full bg-white border-r border-gray-200 transition-all duration-300`}>
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <Link href="/teacher" className="text-xl font-bold text-[#c1121f]">
                ZNANIE
              </Link>
            )}
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {collapsed ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                )}
              </svg>
            </button>
          </div>
          {!collapsed && (
            <p className="text-xs text-gray-400 mt-1 font-medium">TEACHER PORTAL</p>
          )}
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#c1121f] text-white flex items-center justify-center font-semibold flex-shrink-0">
              {user?.name?.charAt(0)}
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="font-medium text-gray-900 text-sm truncate">{user?.name}</p>
                <p className="text-gray-500 text-xs truncate">{user?.role}</p>
              </div>
            )}
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-gray-600 rounded-lg hover:bg-gray-50 transition group"
            >
              <svg className="w-5 h-5 flex-shrink-0 group-hover:text-[#c1121f] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {!collapsed && <span className="text-sm">Back to Website</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-[#c1121f] hover:bg-red-50 rounded-lg transition"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!collapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      <main className={`${collapsed ? 'ml-20' : 'ml-64'} flex-1 p-8 bg-gray-50 min-h-screen transition-all duration-300`}>
        {children}
      </main>
    </div>
  );
}