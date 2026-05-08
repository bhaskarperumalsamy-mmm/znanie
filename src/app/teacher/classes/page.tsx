"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Class {
  id: string;
  title: string;
  description: string | null;
  students: { id: string; name: string; email: string }[];
}

export default function TeacherClassesPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      
      if (!data.user || data.user.role !== 'TEACHER') {
        router.push('/login');
        return;
      }
      
      fetchClasses();
    } catch (err) {
      router.push('/login');
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await fetch('/api/classes');
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      setClasses(data.classes || []);
    } catch (err) {
      setError('Failed to load classes');
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
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
          <p className="text-gray-500 mt-1">Manage your classes and student rosters</p>
        </div>
        <Link
          href="/teacher/classes/new"
          className="bg-[#c1121f] hover:bg-[#b5110a] text-white px-4 py-2.5 rounded-lg font-medium transition shadow-sm"
        >
          + Create Class
        </Link>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {classes.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No classes yet</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">You haven't created any classes yet. Create your first class to start adding students and scheduling meetings.</p>
          <Link
            href="/teacher/classes/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#c1121f] hover:bg-[#b5110a]"
          >
            Create your first class
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
              <div className="p-6 flex-grow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{cls.title}</h3>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4 h-10">
                  {cls.description || "No description provided."}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex -space-x-2">
                    {cls.students.slice(0, 3).map((student, i) => (
                      <div key={student.id} className="w-8 h-8 rounded-full border-2 border-white bg-red-100 text-[#c1121f] flex items-center justify-center text-xs font-bold z-10" style={{ zIndex: 10 - i }}>
                        {student.name.charAt(0)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700 ml-2">
                    {cls.students.length} student{cls.students.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <Link
                  href={`/teacher/classes/${cls.id}`}
                  className="text-sm font-medium text-[#c1121f] hover:text-[#b5110a] flex items-center justify-between"
                >
                  Manage Class <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
