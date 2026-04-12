"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import styles from './create-meeting.module.css';

interface Student {
  id: string;
  name: string;
  email: string;
}

export default function CreateMeetingPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '60',
    meetingType: 'ONE_ON_ONE',
    maxParticipants: '10',
  });
  const [message, setMessage] = useState('');

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
      
      fetchStudents();
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      const data = await res.json();
      setStudents(data.students || []);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const startTime = new Date(`${formData.date}T${formData.time}`);
      const duration = parseInt(formData.duration);
      const endTime = new Date(startTime.getTime() + duration * 60000);

      const res = await fetch('/api/meetings/teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: formData.studentId,
          title: formData.title,
          description: formData.description,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          meetingType: formData.meetingType,
          maxParticipants: parseInt(formData.maxParticipants),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create meeting');
      }

      setMessage('Meeting created successfully! Zoom link generated.');
      
      setTimeout(() => {
        router.push('/dashboard/meetings');
      }, 2000);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className={styles.container}><p>Loading...</p></div>;
  }

  return (
    <div className={styles.container}>
      <h1>Create Meeting</h1>
      <p className={styles.subtitle}>Schedule a meeting for a student</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        {message && (
          <div className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
            {message}
          </div>
        )}

        <Select
          label="Select Student"
          value={formData.studentId}
          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
          options={[
            { value: '', label: 'Choose a student...' },
            ...students.map(s => ({ value: s.id, label: `${s.name} (${s.email})` })),
          ]}
          required
        />

        <Input
          label="Meeting Title"
          placeholder="e.g., Russian Language Lesson 1"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <Textarea
          label="Description (optional)"
          placeholder="What will you cover in this session?"
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

        <div className={styles.row}>
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

          <Select
            label="Meeting Type"
            value={formData.meetingType}
            onChange={(e) => setFormData({ ...formData, meetingType: e.target.value })}
            options={[
              { value: 'ONE_ON_ONE', label: '1-on-1 Session' },
              { value: 'GROUP', label: 'Group Session' },
              { value: 'ORIENTATION', label: 'Orientation' },
            ]}
            required
          />
        </div>

        {formData.meetingType === 'GROUP' && (
          <Input
            label="Max Participants"
            type="number"
            placeholder="10"
            value={formData.maxParticipants}
            onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
          />
        )}

        <Button type="submit" fullWidth disabled={submitting}>
          {submitting ? 'Creating Meeting...' : 'Create Meeting'}
        </Button>
      </form>
    </div>
  );
}