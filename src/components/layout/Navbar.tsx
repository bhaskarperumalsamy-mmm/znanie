"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/Button';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
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

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Why Choose Us', path: '/why-choose-us' },
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
          <Link href="/home">
            <Image
              src="/images/znaine-logo.png"
              alt="Znaine Logo"
              width={320}
              height={100}
              className={styles.logoImg}
              priority
            />
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
          </ul>
        </nav>

        <div className={styles.rightSection}>
          {/* 
          <Button variant="primary" href="/contact" className={styles.signInBtn}>
            Get Started &rarr;
          </Button> 
          */}
          
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
