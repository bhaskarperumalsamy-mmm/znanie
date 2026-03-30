import React from 'react';
import Link from 'next/link';
import styles from './TopBar.module.css';

export const TopBar: React.FC = () => {
  return (
    <div className={styles.topBar}>
      <div className={`container ${styles.container}`}>
        <div className={styles.left}>
          <span className={styles.offerText}>Exclusive 20% discount on courses - limited time offer</span>
        </div>
        <div className={styles.right}>
          <a href="mailto:support@znanie.com" className={styles.link}>support@znanie.com</a>
          <a href="tel:+918881234567" className={styles.link}>Call: (888) 123 4567</a>
        </div>
      </div>
    </div>
  );
};
