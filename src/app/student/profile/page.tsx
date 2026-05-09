"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

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
      
      setUser(data.user);
    } catch (error) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c1121f]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1">View and manage your profile</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-[#c1121f] text-white flex items-center justify-center text-2xl font-semibold">
            {user?.name?.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {user?.role}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-medium text-gray-900 mb-4">Account Information</h3>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">Name</span>
              <span className="font-medium text-gray-900">{user?.name}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">Email</span>
              <span className="font-medium text-gray-900">{user?.email}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">Role</span>
              <span className="font-medium text-gray-900">{user?.role}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-gray-500">Member Since</span>
              <span className="font-medium text-gray-900">
                {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="font-medium text-gray-900 mb-4">Enrolled Classes</h3>
          {user?.enrolledClasses && user.enrolledClasses.length > 0 ? (
            <div className="space-y-3">
              {user.enrolledClasses.map((cls: any) => (
                <div key={cls.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{cls.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Not enrolled in any classes.</p>
          )}
        </div>
      </div>
    </div>
  );
}