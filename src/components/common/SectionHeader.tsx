"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  tagline: string;
  titleBase: string;
  titleAccent: string;
  description: string;
  light?: boolean;
  inline?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tagline,
  titleBase,
  titleAccent,
  description,
  light,
  inline
}) => {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as any } 
    }
  };

  return (
    <motion.header 
      className={`${styles.header} ${light ? styles.light : ''} ${inline ? styles.inline : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <div className={styles.left}>
        <span className={styles.tagline}>{tagline}</span>
        <h2 className={styles.title}>
          {titleBase} <span className={styles.titleRed}>{titleAccent}</span>
        </h2>
      </div>
      <div className={styles.right}>
        <p className={styles.description}>
          {description}
        </p>
      </div>
    </motion.header>
  );
};
