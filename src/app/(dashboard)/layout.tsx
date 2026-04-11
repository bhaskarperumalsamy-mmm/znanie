"use client";

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './dashboard-layout.module.css';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/login');
    }
  }, [mounted, loading, user, router]);

  if (loading || !mounted) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isTeacher = ['TEACHER', 'COUNSELOR', 'MENTOR'].includes(user?.role || '');

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Link href="/dashboard">ZNANIE</Link>
        </div>
        
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
            <>
              <Link href="/dashboard/availability" className={styles.navLink}>Availability</Link>
              <Link href="/dashboard/profile" className={styles.navLink}>My Profile</Link>
              <Link href="/dashboard/create-meeting" className={styles.navLink}>Create Meeting</Link>
            </>
          )}
          <Link href="/dashboard/analytics" className={styles.navLink}>Analytics</Link>
          <Link href="/teachers" className={styles.navLink}>Browse Teachers</Link>
        </nav>

        <div className={styles.bottomNav}>
          <Link href="/" className={styles.navLink}>← Back to Website</Link>
          <button onClick={logout} className={styles.logoutBtn}>Logout</button>
        </div>
      </aside>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}