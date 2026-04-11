"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import styles from './book.module.css';

interface Teacher {
  id: string;
  name: string;
  teacherProfile: {
    specializations: string[];
    bio: string;
  } | null;
}

export default function BookMeetingPage() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    teacherId: '',
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '60',
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const startTime = new Date(`${formData.date}T${formData.time}`);
      const duration = parseInt(formData.duration);
      const endTime = new Date(startTime.getTime() + duration * 60000);

      const res = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherId: formData.teacherId,
          title: formData.title,
          description: formData.description,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to book meeting');
      }

      router.push('/dashboard/meetings');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className={styles.container}><p>Loading...</p></div>;
  }

  return (
    <div className={styles.container}>
      <h1>Book a Meeting</h1>
      <p className={styles.subtitle}>Schedule a session with our teachers</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Select
          label="Select Teacher"
          value={formData.teacherId}
          onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
          options={[
            { value: '', label: 'Choose a teacher...' },
            ...teachers.map((t) => ({ value: t.id, label: t.name })),
          ]}
          required
        />

        <Input
          label="Meeting Title"
          placeholder="What would you like to discuss?"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <Textarea
          label="Description (optional)"
          placeholder="Any specific topics or questions?"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <div className={styles.row}>
          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            required
          />

          <Input
            label="Time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>

        <Select
          label="Duration"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          options={[
            { value: '30', label: '30 minutes' },
            { value: '45', label: '45 minutes' },
            { value: '60', label: '1 hour' },
            { value: '90', label: '1.5 hours' },
            { value: '120', label: '2 hours' },
          ]}
          required
        />

        <Button type="submit" fullWidth disabled={submitting}>
          {submitting ? 'Booking...' : 'Book Meeting'}
        </Button>
      </form>
    </div>
  );
}