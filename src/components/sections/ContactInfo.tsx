"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './ContactInfo.module.css';

const easeOut = [0.22, 1, 0.36, 1] as const;

const contactData = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: 'Phone',
    value: '(888) 123 4567',
    href: 'tel:+18881234567',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: 'Email',
    value: 'info@znaine.com',
    href: 'mailto:info@znaine.com',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Location',
    value: 'New Delhi, India',
    href: null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Working Hours',
    value: 'Mon – Sat, 9am – 6pm IST',
    href: null,
  },
];

export const ContactInfo: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: easeOut }}
      >
        <span className={styles.tag}>CONTACT INFORMATION</span>
        <h2 className={styles.title}>
          Reach us <span className={styles.highlight}>directly</span>
        </h2>
      </motion.div>

      <div className={styles.cards}>
        {contactData.map((item, index) => (
          <motion.div
            key={item.title}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: easeOut }}
            whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(14, 16, 16, 0.12)' }}
          >
            <div className={styles.iconWrapper}>{item.icon}</div>
            <div className={styles.content}>
              <h4 className={styles.cardTitle}>{item.title}</h4>
              {item.href ? (
                <a href={item.href} className={styles.cardValue}>
                  {item.value}
                </a>
              ) : (
                <p className={styles.cardValue}>{item.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={styles.mapWrapper}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
      >
        <div className={styles.mapPlaceholder}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>New Delhi, India</span>
        </div>
      </motion.div>

      <motion.div
        className={styles.socialSection}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5, ease: easeOut }}
      >
        <span className={styles.socialLabel}>Connect on Social</span>
        <div className={styles.socialButtons}>
          {[
            { name: 'Facebook', href: '#' },
            { name: 'LinkedIn', href: '#' },
            { name: 'Instagram', href: '#' },
          ].map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              className={styles.socialBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {social.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
