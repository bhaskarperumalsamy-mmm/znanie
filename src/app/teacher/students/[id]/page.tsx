"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface StudentDetails {
  student: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    language: string;
    timezone: string;
  };
  classes: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  meetings: Array<{
    id: string;
    title: string;
    status: string;
    startTime: string;
    endTime: string;
    class: {
      title: string;
    };
  }>;
}

export default function StudentDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = params.id as string;
  
  const [data, setData] = useState<StudentDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, [studentId]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const authData = await res.json();
      
      if (!authData.user || !['TEACHER', 'COUNSELOR', 'MENTOR', 'ADMIN'].includes(authData.user.role)) {
        router.push('/login');
        return;
      }
      
      fetchStudentDetails();
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchStudentDetails = async () => {
    try {
      const res = await fetch(`/api/students/${studentId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch student');
      }
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching student:', error);
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

  if (!data || !data.student) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <p className="text-gray-500">Student not found.</p>
        <Link href="/teacher/students" className="text-[#c1121f] mt-4 inline-block hover:underline">
          &larr; Back to Students
        </Link>
      </div>
    );
  }

  const { student, classes, meetings } = data;

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link href="/teacher/students" className="text-sm text-gray-500 hover:text-[#c1121f] mb-4 inline-flex items-center gap-1">
          &larr; Back to My Students
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Student Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
              <div className="w-24 h-24 rounded-full bg-[#c1121f] text-white flex items-center justify-center text-3xl font-semibold mb-4">
                {student.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
              <p className="text-gray-500 text-sm mt-1">{student.email}</p>
            </div>
            
            <div className="pt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Joined</span>
                <span className="font-medium text-gray-900">{new Date(student.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Language</span>
                <span className="font-medium text-gray-900">{student.language.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Timezone</span>
                <span className="font-medium text-gray-900 truncate max-w-[120px]" title={student.timezone}>{student.timezone}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Enrolled Classes</h3>
            {classes.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No shared classes found.</p>
            ) : (
              <div className="space-y-3">
                {classes.map(cls => (
                  <div key={cls.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <h4 className="font-medium text-gray-900 text-sm">{cls.title}</h4>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Meetings */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Meeting History</h3>
              <p className="text-sm text-gray-500 mt-1">Sessions you have with this student</p>
            </div>
            
            {meetings.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-500">No meetings found with this student.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {meetings.map((meeting) => (
                  <div key={meeting.id} className="p-6 hover:bg-gray-50 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">Class: {meeting.class?.title || 'General'}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(meeting.startTime).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {new Date(meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        meeting.status === 'COMPLETED' ? 'bg-green-50 text-green-700 border-green-200' :
                        meeting.status === 'CONFIRMED' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        meeting.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-gray-50 text-gray-700 border-gray-200'
                      }`}>
                        {meeting.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
