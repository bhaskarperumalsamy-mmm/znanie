"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './auth-layout.module.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetch('/api/auth/me')
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            router.push('/dashboard');
          }
        });
    }
  }, [mounted, router]);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.leftPanel}>
        <div className={styles.brand}>
          <Link href="/">ZNANIE</Link>
        </div>
        <div className={styles.tagline}>
          <h1>India-Russia Education</h1>
          <p>Bridge your future with quality education</p>
        </div>
      </div>
      <div className={styles.rightPanel}>
        {children}
      </div>
    </div>
  );
}