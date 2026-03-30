import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container-large ${styles.container}`}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/home">
              <Image
                src="/images/znaine-logo.png"
                alt="Znaine Logo"
                width={280}
                height={80}
                className={styles.logoImg}
              />
            </Link>
            <p className={styles.desc}>
              Empowering learners with flexible courses, expert guidance, and affordable education for lifelong growth.
            </p>
          </div>

          {/* Links Column 1: Middle */}
          <div className={styles.linkCol}>
            <h3 className={styles.colTitle}>Main Pages</h3>
            <ul className={styles.linkList}>
              <li><Link href="/home">Home</Link></li>
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/study-in-russia">Study in Russia</Link></li>
            </ul>
          </div>

          {/* Links Column 2: Last */}
          <div className={styles.linkCol}>
            <h3 className={styles.colTitle}>Explore</h3>
            <ul className={styles.linkList}>
              <li><Link href="/why-choose-us">Why Choose Us</Link></li>
              <li><Link href="/russian-language-courses">Russian Language Courses</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

        </div>

        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <p>© {new Date().getFullYear()} Znanie. All rights reserved.</p>
          </div>
          <div className={styles.bottomRight}>
            <Link href="#" className={styles.policyLink}>Terms & Conditions</Link>
            <span className={styles.bottomDot}>•</span>
            <Link href="#" className={styles.policyLink}>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
