"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './meetings.module.css';

interface Meeting {
  id: string;
  title: string;
  description: string | null;
  startTime: string;
  endTime: string;
  status: string;
  meetingType: string;
  student: { id: string; name: string };
  teacher: { id: string; name: string };
}

export default function MeetingsPage() {
  const router = useRouter();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

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
      
      fetchMeetings();
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchMeetings = async () => {
    try {
      const res = await fetch('/api/meetings');
      const data = await res.json();
      setMeetings(data.meetings || []);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMeetings = meetings.filter((meeting) => {
    if (filter === 'all') return true;
    return meeting.status === filter;
  });

  const getStatusBadge = (status: string) => {
    const statusClasses: Record<string, string> = {
      REQUESTED: styles.requested,
      CONFIRMED: styles.confirmed,
      IN_PROGRESS: styles.inProgress,
      COMPLETED: styles.completed,
      CANCELLED: styles.cancelled,
      NO_SHOW: styles.noShow,
    };
    return statusClasses[status] || '';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Meetings</h1>
        <Link href="/dashboard/book" className={styles.bookBtn}>
          Book New Meeting
        </Link>
      </div>

      <div className={styles.filters}>
        {['all', 'REQUESTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`${styles.filterBtn} ${filter === status ? styles.active : ''}`}
          >
            {status === 'all' ? 'All' : status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredMeetings.length === 0 ? (
        <div className={styles.empty}>
          <p>No meetings found.</p>
          <Link href="/dashboard/book" className={styles.emptyBtn}>
            Book your first meeting
          </Link>
        </div>
      ) : (
        <div className={styles.list}>
          {filteredMeetings.map((meeting) => (
            <Link key={meeting.id} href={`/dashboard/meetings/${meeting.id}`} className={styles.cardLink}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>{meeting.title}</h3>
                  <span className={`${styles.badge} ${getStatusBadge(meeting.status)}`}>
                    {meeting.status}
                  </span>
                </div>
                
                <p className={styles.cardMeta}>
                  {formatDate(meeting.startTime)} - {formatDate(meeting.endTime)}
                </p>
                
                <p className={styles.cardRole}>
                  With: <strong>{meeting.teacher.name}</strong>
                </p>
                
                {meeting.description && (
                  <p className={styles.cardDesc}>{meeting.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}