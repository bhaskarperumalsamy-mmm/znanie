import React from 'react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  tag?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  lightText?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  title,
  subtitle,
  align = 'center',
  lightText = false,
}) => {
  return (
    <div className={`${styles.header} ${styles[align]} ${lightText ? styles.lightText : ''}`}>
      {tag && <span className={styles.tag}>{tag}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};
