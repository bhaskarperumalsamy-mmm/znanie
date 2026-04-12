"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './public-layout.module.css';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/me', { method: 'DELETE' });
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <div className={styles.publicContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>ZNANIE</Link>
          
          <nav className={styles.nav}>
            <Link href="/teachers" className={styles.navLink}>Teachers</Link>
            <Link href="/study-in-russia" className={styles.navLink}>Study in Russia</Link>
            <Link href="/russian-language-courses" className={styles.navLink}>Russian Courses</Link>
          </nav>

          <div className={styles.authButtons}>
            {!loading && (
              user ? (
                <>
                  <Link href="/dashboard" className={styles.dashboardBtn}>Dashboard</Link>
                  <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className={styles.loginBtn}>Sign In</Link>
                  <Link href="/register" className={styles.signupBtn}>Sign Up</Link>
                </>
              )
            )}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} ZNANIE Foundation. All rights reserved.</p>
      </footer>
    </div>
  );
}