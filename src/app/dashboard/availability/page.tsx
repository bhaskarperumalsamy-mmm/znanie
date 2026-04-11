"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import styles from './availability.module.css';

interface Availability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  bufferMinutes: number;
  isActive: boolean;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AvailabilityPage() {
  const router = useRouter();
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    dayOfWeek: '1',
    startTime: '09:00',
    endTime: '17:00',
    bufferMinutes: '15',
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
      
      if (!['TEACHER', 'COUNSELOR', 'MENTOR'].includes(data.user.role)) {
        router.push('/dashboard');
        return;
      }
      
      fetchAvailability();
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchAvailability = async () => {
    try {
      const res = await fetch('/api/availability');
      const data = await res.json();
      setAvailability(data.availability || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dayOfWeek: parseInt(formData.dayOfWeek),
          startTime: formData.startTime,
          endTime: formData.endTime,
          bufferMinutes: parseInt(formData.bufferMinutes),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to add availability');
      }

      fetchAvailability();
      setFormData({
        dayOfWeek: '1',
        startTime: '09:00',
        endTime: '17:00',
        bufferMinutes: '15',
      });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this time slot?')) return;
    
    try {
      const res = await fetch(`/api/availability/${id}`, { method: 'DELETE' });
      
      if (res.ok) {
        fetchAvailability();
      }
    } catch (error) {
      console.error('Error deleting availability:', error);
    }
  };

  const handleToggle = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/availability/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !current }),
      });
      
      if (res.ok) {
        fetchAvailability();
      }
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };

  if (loading) {
    return <div className={styles.container}><p>Loading...</p></div>;
  }

  return (
    <div className={styles.container}>
      <h1>Manage Availability</h1>
      <p className={styles.subtitle}>Set your available time slots for students to book</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Select
          label="Day of Week"
          value={formData.dayOfWeek}
          onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
          options={DAYS.map((day, i) => ({ value: String(i), label: day }))}
        />

        <div className={styles.row}>
          <Input
            label="Start Time"
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
          />

          <Input
            label="End Time"
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            required
          />
        </div>

        <Select
          label="Buffer Time (between meetings)"
          value={formData.bufferMinutes}
          onChange={(e) => setFormData({ ...formData, bufferMinutes: e.target.value })}
          options={[
            { value: '0', label: 'No buffer' },
            { value: '5', label: '5 minutes' },
            { value: '10', label: '10 minutes' },
            { value: '15', label: '15 minutes' },
            { value: '30', label: '30 minutes' },
          ]}
        />

        <Button type="submit" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Time Slot'}
        </Button>
      </form>

      <div className={styles.list}>
        <h2>Your Available Times</h2>
        
        {availability.length === 0 ? (
          <p className={styles.empty}>No availability set yet. Add your first time slot above.</p>
        ) : (
          <div className={styles.slots}>
            {availability.map((slot) => (
              <div key={slot.id} className={`${styles.slot} ${!slot.isActive ? styles.inactive : ''}`}>
                <div className={styles.slotInfo}>
                  <strong>{DAYS[slot.dayOfWeek]}</strong>
                  <span>{slot.startTime} - {slot.endTime}</span>
                  <span className={styles.buffer}>{slot.bufferMinutes} min buffer</span>
                </div>
                <div className={styles.slotActions}>
                  <button 
                    onClick={() => handleToggle(slot.id, slot.isActive)}
                    className={styles.toggleBtn}
                  >
                    {slot.isActive ? 'Disable' : 'Enable'}
                  </button>
                  <button 
                    onClick={() => handleDelete(slot.id)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}