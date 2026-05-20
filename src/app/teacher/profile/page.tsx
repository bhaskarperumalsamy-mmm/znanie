"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Profile {
  bio: string;
  specializations: string[];
  certifications: string[];
  hourlyRate: number;
  languages: string[];
}

export default function TeacherProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile>({
    bio: '',
    specializations: [],
    certifications: [],
    hourlyRate: 0,
    languages: [],
  });
  const [message, setMessage] = useState('');
  
  // Password change modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const specializationOptions = [
    'Russian Language', 'MBBS', 'Engineering', 'Business', 'Arts', 'Science', 
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Economics'
  ];

  const languageOptions = [
    'English', 'Russian', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 
    'Malayalam', 'Bengali', 'Marathi', 'Gujarati'
  ];

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
      
      setUser(data.user);
      fetchProfile();
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/teachers/profile');
      const data = await res.json();
      
      if (data.profile) {
        setProfile({
          bio: data.profile.bio || '',
          specializations: data.profile.specializations || [],
          certifications: data.profile.certifications || [],
          hourlyRate: data.profile.hourlyRate || 0,
          languages: data.profile.languages || [],
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/teachers/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save profile');
      }

      setMessage('Profile saved successfully!');
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    
    setPasswordLoading(true);
    
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setPasswordError(data.error || 'Failed to change password');
        return;
      }
      
      setPasswordSuccess('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess('');
      }, 2000);
    } catch (error) {
      setPasswordError('Something went wrong');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSpecializationChange = (value: string) => {
    const current = profile.specializations;
    if (current.includes(value)) {
      setProfile({ ...profile, specializations: current.filter(s => s !== value) });
    } else {
      setProfile({ ...profile, specializations: [...current, value] });
    }
  };

  const handleLanguageChange = (value: string) => {
    const current = profile.languages;
    if (current.includes(value)) {
      setProfile({ ...profile, languages: current.filter(l => l !== value) });
    } else {
      setProfile({ ...profile, languages: [...current, value] });
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
        <p className="text-gray-500 mt-1">Set up your profile to start receiving students</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
        {message && (
          <div className={`px-4 py-3 rounded-lg text-sm ${
            message.includes('success') 
              ? 'bg-green-50 border border-green-200 text-green-600' 
              : 'bg-red-50 border border-red-200 text-red-600'
          }`}>
            {message}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Bio
          </label>
          <textarea
            placeholder="Tell students about yourself, your teaching experience, qualifications..."
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specializations
          </label>
          <div className="flex flex-wrap gap-2">
            {specializationOptions.map(spec => (
              <button
                key={spec}
                type="button"
                onClick={() => handleSpecializationChange(spec)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  profile.specializations.includes(spec)
                    ? 'bg-[#c1121f] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Hourly Rate (USD)
          </label>
          <input
            type="number"
            placeholder="0"
            value={profile.hourlyRate}
            onChange={(e) => setProfile({ ...profile, hourlyRate: parseFloat(e.target.value) || 0 })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Languages You Teach
          </label>
          <div className="flex flex-wrap gap-2">
            {languageOptions.map(lang => (
              <button
                key={lang}
                type="button"
                onClick={() => handleLanguageChange(lang)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  profile.languages.includes(lang)
                    ? 'bg-[#c1121f] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-[#c1121f] hover:bg-[#b5110a] text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Security</h2>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="text-[#c1121f] hover:text-[#b5110a] font-medium text-sm"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Change Password</h2>
            
            {passwordError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {passwordError}
              </div>
            )}
            
            {passwordSuccess && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                {passwordSuccess}
              </div>
            )}
            
            <form onSubmit={handlePasswordChange}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1121f] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1121f] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1121f] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => { setShowPasswordModal(false); setPasswordError(''); }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex-1 px-4 py-2 bg-[#c1121f] text-white rounded-lg hover:bg-[#b5110a] transition disabled:opacity-50"
                >
                  {passwordLoading ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}