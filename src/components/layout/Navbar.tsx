"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/Button';
import styles from './Navbar.module.css';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/me', { method: 'DELETE' });
      setUser(null);
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Why Choose Us', path: '/why-choose-us' },
    { name: 'Gallery', path: '/gallery' },
    { 
      name: 'Study in Russia', 
      path: '#',
      hasDropdown: true,
      subMenu: [
        { name: 'Study in Russia', path: '/study-in-russia' },
        { name: 'Russian Language Courses', path: '/russian-language-courses' },
      ]
    },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.logoContainer}>
          <Link href="/home" className={styles.logoLinkWrapper}>
            <Image
              src="/images/znaine-logo.png"
              alt="Znanie Logo"
              width={320}
              height={100}
              className={styles.logoImg}
              priority
            />
            <span className={styles.logoText}>Znanie</span>
          </Link>
        </div>

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.name} className={`${styles.navItem} ${link.hasDropdown ? styles.hasDropdown : ''}`}>
                {link.hasDropdown ? (
                  <>
                    <span className={styles.navLink}>
                      {link.name} <span className={styles.arrow}>▾</span>
                    </span>
                    <ul className={styles.dropdown}>
                      {link.subMenu?.map((sub) => (
                        <li key={sub.path}>
                          <Link 
                            href={sub.path} 
                            className={styles.dropdownLink}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link 
                    href={link.path} 
                    className={`${styles.navLink} ${pathname === link.path ? styles.active : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
            {!loading && (
              <li className={styles.mobileOnlyAuth}>
                {user ? (
                  <Link 
                    href={['TEACHER', 'COUNSELOR', 'MENTOR'].includes(user.role) ? '/teacher' : user.role === 'ADMIN' ? '/admin' : '/student'}
                    className={styles.navLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link 
                    href="/login" 
                    className={styles.navLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </li>
            )}
          </ul>
        </nav>

        <div className={styles.rightSection}>
          {!loading && (
            user ? (
              <>
                <Link 
                  href={['TEACHER', 'COUNSELOR', 'MENTOR'].includes(user.role) ? '/teacher' : user.role === 'ADMIN' ? '/admin' : '/student'} 
                  className={styles.dashboardLink}
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className={styles.logoutLink}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.loginLink}>
                  Sign In
                </Link>
              </>
            )
          )}
          
          <button 
            className={styles.mobileToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerActive : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
};
