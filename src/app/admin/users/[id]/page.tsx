"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import DeleteModal from '@/components/admin/DeleteModal';

interface TeacherProfile {
  id: string;
  bio: string | null;
  specializations: string[];
  certifications: string[];
  hourlyRate: number | null;
  avgRating: number;
  totalReviews: number;
  languages: string[];
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  timezone: string;
  language: string;
  profilePhoto: string | null;
  createdAt: string;
  teacherProfile: TeacherProfile | null;
  enrolledClasses: { id: string; title: string }[];
  teachingClasses: { id: string; title: string }[];
}

interface Stats {
  totalMeetings: number;
  completedMeetings: number;
  totalClassesTeaching: number;
  totalClassesEnrolled: number;
  totalReviews: number;
}

export default function UserViewPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  
  const [user, setUser] = useState<UserData | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      
      if (!data.user || data.user.role !== 'ADMIN') {
        router.push('/login');
        return;
      }
      
      fetchUserData();
    } catch (err) {
      router.push('/login');
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`);
      const data = await res.json();
      
      if (!res.ok) {
        alert(data.error || 'Failed to fetch user');
        router.push('/admin/users');
        return;
      }
      
      setUser(data.user);
      setStats(data.stats);
    } catch (err) {
      console.error('Error fetching user:', err);
      alert('Failed to fetch user');
      router.push('/admin/users');
    } finally {
      setLoading(false);
    }
  };

  const handleSendInvitation = async () => {
    if (!confirm('Send password setup invitation to this user?')) return;
    
    try {
      const res = await fetch(`/api/admin/users/${userId}/invite`, {
        method: 'POST',
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        alert(data.error || 'Failed to send invitation');
        return;
      }
      
      alert('Invitation sent successfully!');
    } catch (err) {
      alert('Something went wrong');
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to delete user');
        return;
      }
      
      router.push('/admin/users');
    } catch (err) {
      alert('Something went wrong');
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      ADMIN: 'bg-red-100 text-red-800',
      TEACHER: 'bg-purple-100 text-purple-800',
      COUNSELOR: 'bg-blue-100 text-blue-800',
      MENTOR: 'bg-indigo-100 text-indigo-800',
      STUDENT: 'bg-green-100 text-green-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c1121f]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">User not found</p>
        <Link href="/admin/users" className="text-[#c1121f] hover:underline mt-2 inline-block">
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/admin/users" className="hover:text-gray-700">Users</Link>
        <span>/</span>
        <span className="text-gray-900">{user.name}</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#c1121f] text-white flex items-center justify-center text-2xl font-semibold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/admin/users/${userId}/edit`}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Edit
          </Link>
          <button
            onClick={handleSendInvitation}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Send Invite
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Role</label>
                <p className="font-medium">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                    {user.role}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Verification Status</label>
                <p className="font-medium">
                  {user.isVerified ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  )}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Timezone</label>
                <p className="font-medium text-gray-900">{user.timezone}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Language</label>
                <p className="font-medium text-gray-900">{user.language}</p>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-500">Member Since</label>
                <p className="font-medium text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Teacher Profile */}
          {user.teacherProfile && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Teacher Profile</h2>
              <div className="space-y-4">
                {user.teacherProfile.bio && (
                  <div>
                    <label className="text-sm text-gray-500">Bio</label>
                    <p className="text-gray-900">{user.teacherProfile.bio}</p>
                  </div>
                )}
                
                {user.teacherProfile.specializations.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-500">Specializations</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.teacherProfile.specializations.map((spec, i) => (
                        <span key={i} className="px-2.5 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {user.teacherProfile.certifications.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-500">Certifications</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.teacherProfile.certifications.map((cert, i) => (
                        <span key={i} className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {user.teacherProfile.languages.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-500">Languages</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.teacherProfile.languages.map((lang, i) => (
                        <span key={i} className="px-2.5 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {user.teacherProfile.hourlyRate && (
                  <div>
                    <label className="text-sm text-gray-500">Hourly Rate</label>
                    <p className="font-medium text-gray-900">${user.teacherProfile.hourlyRate}/hour</p>
                  </div>
                )}

                {user.teacherProfile.avgRating > 0 && (
                  <div>
                    <label className="text-sm text-gray-500">Rating</label>
                    <p className="font-medium text-gray-900">
                      ⭐ {user.teacherProfile.avgRating.toFixed(1)} ({user.teacherProfile.totalReviews} reviews)
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Classes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Classes</h2>
            
            {['TEACHER', 'COUNSELOR', 'MENTOR'].includes(user.role) && user.teachingClasses.length > 0 && (
              <div className="mb-4">
                <label className="text-sm text-gray-500 mb-2 block">Teaching Classes ({user.teachingClasses.length})</label>
                <div className="space-y-2">
                  {user.teachingClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="text-gray-900">{cls.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {user.role === 'STUDENT' && user.enrolledClasses.length > 0 && (
              <div>
                <label className="text-sm text-gray-500 mb-2 block">Enrolled Classes ({user.enrolledClasses.length})</label>
                <div className="space-y-2">
                  {user.enrolledClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="text-gray-900">{cls.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {user.teachingClasses.length === 0 && user.enrolledClasses.length === 0 && (
              <p className="text-gray-500 italic">No classes</p>
            )}
          </div>
        </div>

        {/* Right Column - Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h2>
            <div className="space-y-4">
              {['TEACHER', 'COUNSELOR', 'MENTOR'].includes(user.role) && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Meetings</span>
                    <span className="font-medium text-gray-900">{stats?.totalMeetings || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Completed</span>
                    <span className="font-medium text-gray-900">{stats?.completedMeetings || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Classes Teaching</span>
                    <span className="font-medium text-gray-900">{stats?.totalClassesTeaching || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Reviews</span>
                    <span className="font-medium text-gray-900">{stats?.totalReviews || 0}</span>
                  </div>
                </>
              )}
              {user.role === 'STUDENT' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Meetings</span>
                    <span className="font-medium text-gray-900">{stats?.totalMeetings || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Completed</span>
                    <span className="font-medium text-gray-900">{stats?.completedMeetings || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Enrolled Classes</span>
                    <span className="font-medium text-gray-900">{stats?.totalClassesEnrolled || 0}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        title="Delete User"
        message={`Are you sure you want to delete ${user.name}? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        loading={deleting}
      />
    </div>
  );
}