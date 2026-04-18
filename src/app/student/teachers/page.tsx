"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Teacher {
  id: string;
  name: string;
  email: string;
  profilePhoto: string | null;
  timezone: string;
  language: string;
  teacherProfile: {
    bio: string | null;
    specializations: string[];
    certifications: string[];
    hourlyRate: number | null;
    avgRating: number;
    totalReviews: number;
    languages: string[];
  } | null;
}

export default function StudentTeachersPage() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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
      
      fetchTeachers();
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await fetch('/api/teachers');
      const data = await res.json();
      setTeachers(data.teachers || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(search.toLowerCase()) ||
    teacher.teacherProfile?.specializations?.some((s) =>
      s.toLowerCase().includes(search.toLowerCase())
    )
  );

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
        <h1 className="text-2xl font-bold text-gray-900">Browse Teachers</h1>
        <p className="text-gray-500 mt-1">Find the perfect teacher for your learning needs</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
        />
      </div>

      {filteredTeachers.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No teachers found. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-[#c1121f] text-white flex items-center justify-center text-xl font-semibold flex-shrink-0">
                  {teacher.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                  
                  {teacher.teacherProfile && teacher.teacherProfile.avgRating > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm text-gray-600">
                        {teacher.teacherProfile.avgRating.toFixed(1)} ({teacher.teacherProfile.totalReviews} reviews)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {teacher.teacherProfile && teacher.teacherProfile.specializations?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {teacher.teacherProfile.specializations.slice(0, 3).map((spec) => (
                    <span key={spec} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {spec}
                    </span>
                  ))}
                </div>
              )}

              {teacher.teacherProfile?.bio && (
                <p className="text-gray-500 text-sm mt-3 line-clamp-2">{teacher.teacherProfile.bio}</p>
              )}

              <a
                href={`/student/book?teacher=${teacher.id}`}
                className="mt-4 block w-full text-center bg-[#c1121f] hover:bg-[#b5110a] text-white font-medium py-2.5 px-4 rounded-lg transition"
              >
                Book Session
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}