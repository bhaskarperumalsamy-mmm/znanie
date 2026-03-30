import React from 'react';
import Link from 'next/link';
import styles from './CTABanner.module.css';

interface CTABannerProps {
  title: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  title,
  description,
  ctaText = 'Contact now',
  ctaHref = '/contact',
}) => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.text}>
            <h2 className={styles.title}>{title}</h2>
            {description && <p className={styles.desc}>{description}</p>}
          </div>
          <Link href={ctaHref} className={styles.cta}>
            {ctaText} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};
