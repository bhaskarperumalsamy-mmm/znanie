"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import styles from './profile.module.css';

interface Profile {
  id?: string;
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

  const specializationOptions = [
    'Russian Language', 'MBBS', 'Engineering', 'Business', 'Arts', 'Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Economics'
  ];

  const languageOptions = [
    'English', 'Russian', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali', 'Marathi', 'Gujarati'
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
        router.push('/dashboard');
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
    return <div className={styles.container}><p>Loading...</p></div>;
  }

  return (
    <div className={styles.container}>
      <h1>Teacher Profile</h1>
      <p className={styles.subtitle}>Set up your profile to start receiving students</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        {message && (
          <div className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
            {message}
          </div>
        )}

        <Textarea
          label="Bio"
          placeholder="Tell students about yourself, your teaching experience, qualifications..."
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        />

        <div className={styles.field}>
          <label className={styles.label}>Specializations</label>
          <div className={styles.chips}>
            {specializationOptions.map(spec => (
              <button
                key={spec}
                type="button"
                className={`${styles.chip} ${profile.specializations.includes(spec) ? styles.chipActive : ''}`}
                onClick={() => handleSpecializationChange(spec)}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Hourly Rate (USD)"
          type="number"
          placeholder="0"
          value={profile.hourlyRate}
          onChange={(e) => setProfile({ ...profile, hourlyRate: parseFloat(e.target.value) || 0 })}
        />

        <div className={styles.field}>
          <label className={styles.label}>Languages You Teach</label>
          <div className={styles.chips}>
            {languageOptions.map(lang => (
              <button
                key={lang}
                type="button"
                className={`${styles.chip} ${profile.languages.includes(lang) ? styles.chipActive : ''}`}
                onClick={() => handleLanguageChange(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Profile'}
        </Button>
      </form>
    </div>
  );
}