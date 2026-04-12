"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './analytics.module.css';

export default function AnalyticsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [analyticsType, setAnalyticsType] = useState<'student' | 'teacher' | 'admin'>('student');

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
      
      setUser(data.user);
      
      // Determine analytics type based on role
      if (['TEACHER', 'COUNSELOR', 'MENTOR'].includes(data.user.role)) {
        setAnalyticsType('teacher');
      } else if (data.user.role === 'ADMIN') {
        setAnalyticsType('admin');
      }
      
      fetchAnalytics(data.user.role);
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchAnalytics = async (role: string) => {
    try {
      let type = 'student';
      if (['TEACHER', 'COUNSELOR', 'MENTOR'].includes(role)) {
        type = 'teacher';
      } else if (role === 'ADMIN') {
        type = 'admin';
      }
      
      const res = await fetch(`/api/analytics?type=${type}`);
      const data = await res.json();
      setStats(data.stats || data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.container}><p>Loading...</p></div>;
  }

  return (
    <div className={styles.container}>
      <h1>Analytics</h1>
      <p className={styles.subtitle}>Your {analyticsType} dashboard overview</p>

      <div className={styles.grid}>
        {analyticsType === 'student' && stats && (
          <>
            <div className={styles.card}>
              <h3>Total Meetings</h3>
              <p className={styles.number}>{stats.total || 0}</p>
            </div>
            <div className={styles.card}>
              <h3>Completed</h3>
              <p className={styles.number}>{stats.completed || 0}</p>
            </div>
            <div className={styles.card}>
              <h3>Upcoming</h3>
              <p className={styles.number}>{stats.upcoming || 0}</p>
            </div>
            <div className={styles.card}>
              <h3>Cancelled</h3>
              <p className={styles.number}>{stats.cancelled || 0}</p>
            </div>
          </>
        )}

        {analyticsType === 'teacher' && stats && (
          <>
            <div className={styles.card}>
              <h3>Total Meetings</h3>
              <p className={styles.number}>{stats.total || 0}</p>
            </div>
            <div className={styles.card}>
              <h3>Completed</h3>
              <p className={styles.number}>{stats.completed || 0}</p>
            </div>
            <div className={styles.card}>
              <h3>Upcoming</h3>
              <p className={styles.number}>{stats.upcoming || 0}</p>
            </div>
            <div className={styles.card}>
              <h3>No Shows</h3>
              <p className={styles.number}>{stats.noShow || 0}</p>
            </div>
            <div className={styles.card}>
              <h3>Time Slots</h3>
              <p className={styles.number}>{stats.availability || 0}</p>
            </div>
          </>
        )}

        {analyticsType === 'admin' && stats && (
          <>
            <div className={styles.card}>
              <h3>Total Users</h3>
              <p className={styles.number}>{stats.totalUsers || 0}</p>
            </div>
            <div className={styles.card}>
              <h3>Teachers</h3>
              <p className={styles.number}>{stats.totalTeachers || 0}</p>
            </div>
            <div className={styles.card}>
              <h3>Students</h3>
              <p className={styles.number}>{stats.totalStudents || 0}</p>
            </div>
            <div className={styles.card}>
              <h3>Total Meetings</h3>
              <p className={styles.number}>{stats.totalMeetings || 0}</p>
            </div>
            <div className={styles.card}>
              <h3>Completed</h3>
              <p className={styles.number}>{stats.completedMeetings || 0}</p>
            </div>
          </>
        )}
      </div>

      <Link href="/dashboard" className={styles.backLink}>
        &larr; Back to Dashboard
      </Link>
    </div>
  );
}