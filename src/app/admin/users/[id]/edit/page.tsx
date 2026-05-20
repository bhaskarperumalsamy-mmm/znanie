"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface TeacherProfile {
  id: string;
  bio: string | null;
  specializations: string[];
  certifications: string[];
  hourlyRate: number | null;
  languages: string[];
}

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    isVerified: false,
    bio: '',
    specializations: '',
    certifications: '',
    hourlyRate: '',
    languages: ''
  });

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
      
      const user = data.user;
      const teacherProfile = user.teacherProfile;
      
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        isVerified: user.isVerified || false,
        bio: teacherProfile?.bio || '',
        specializations: teacherProfile?.specializations?.join(', ') || '',
        certifications: teacherProfile?.certifications?.join(', ') || '',
        hourlyRate: teacherProfile?.hourlyRate?.toString() || '',
        languages: teacherProfile?.languages?.join(', ') || ''
      });
    } catch (err) {
      console.error('Error fetching user:', err);
      alert('Failed to fetch user');
      router.push('/admin/users');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          isVerified: formData.isVerified,
          teacherProfile: ['TEACHER', 'COUNSELOR', 'MENTOR'].includes(formData.role) ? {
            bio: formData.bio,
            specializations: formData.specializations,
            languages: formData.languages,
            hourlyRate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : null
          } : undefined
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Failed to update user');
        return;
      }
      
      alert('User updated successfully!');
      router.push(`/admin/users/${userId}`);
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const getRoleFields = (role: string) => {
    return ['TEACHER', 'COUNSELOR', 'MENTOR'].includes(role);
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
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/admin/users" className="hover:text-gray-700">Users</Link>
        <span>/</span>
        <Link href={`/admin/users/${userId}`} className="hover:text-gray-700">View</Link>
        <span>/</span>
        <span className="text-gray-900">Edit</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
        <p className="text-gray-500 mt-1">Update user information and profile</p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1121f] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1121f] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1121f] focus:border-transparent"
                  >
                    <option value="STUDENT">Student</option>
                    <option value="TEACHER">Teacher</option>
                    <option value="COUNSELOR">Counselor</option>
                    <option value="MENTOR">Mentor</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isVerified}
                      onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                      className="w-4 h-4 text-[#c1121f] rounded focus:ring-[#c1121f]"
                    />
                    <span className="text-sm font-medium text-gray-700">Mark as verified</span>
                  </label>
                </div>
              </div>
            </div>

            {getRoleFields(formData.role) && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Teacher Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1121f] focus:border-transparent"
                      rows={4}
                      placeholder="Brief description about yourself"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specializations (comma separated)</label>
                    <input
                      type="text"
                      value={formData.specializations}
                      onChange={(e) => setFormData({ ...formData, specializations: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1121f] focus:border-transparent"
                      placeholder="Math, Physics, Chemistry"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Languages (comma separated)</label>
                    <input
                      type="text"
                      value={formData.languages}
                      onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1121f] focus:border-transparent"
                      placeholder="English, Hindi, Russian"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate (optional)</label>
                    <input
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1121f] focus:border-transparent"
                      placeholder="25"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Link
                href={`/admin/users/${userId}`}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-4 py-2 bg-[#c1121f] text-white rounded-lg hover:bg-[#b5110a] transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}