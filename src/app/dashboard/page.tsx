"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './dashboard.module.css';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/me', { method: 'DELETE' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return <div className={styles.container}><p>Loading...</p></div>;
  }

  const isTeacher = ['TEACHER', 'COUNSELOR', 'MENTOR'].includes(user?.role || '');

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>{user?.name?.charAt(0)}</div>
          <div>
            <p className={styles.userName}>{user?.name}</p>
            <p className={styles.userRole}>{user?.role}</p>
          </div>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
          <Link href="/dashboard/calendar" className={styles.navLink}>Calendar</Link>
          <Link href="/dashboard/meetings" className={styles.navLink}>My Meetings</Link>
          <Link href="/dashboard/book" className={styles.navLink}>Book Meeting</Link>
          {isTeacher && (
            <Link href="/dashboard/availability" className={styles.navLink}>Availability</Link>
          )}
          <Link href="/dashboard/analytics" className={styles.navLink}>Analytics</Link>
          <Link href="/teachers" className={styles.navLink}>Browse Teachers</Link>
        </nav>

        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <main className={styles.main}>
        <h1>Welcome, {user?.name}!</h1>
        <p className={styles.subtitle}>What would you like to do today?</p>

        <div className={styles.grid}>
          <Link href="/dashboard/book" className={styles.card}>
            <h3>Book a Meeting</h3>
            <p>Schedule a session with a teacher or counselor</p>
          </Link>
          
          <Link href="/dashboard/meetings" className={styles.card}>
            <h3>My Meetings</h3>
            <p>View your upcoming and past meetings</p>
          </Link>
          
          <Link href="/dashboard/calendar" className={styles.card}>
            <h3>Calendar</h3>
            <p>View your schedule in calendar view</p>
          </Link>
          
          <Link href="/teachers" className={styles.card}>
            <h3>Browse Teachers</h3>
            <p>Find the right teacher for your needs</p>
          </Link>
        </div>
      </main>
    </div>
  );
}