import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  imageSrc: string;
  tag?: string;
  title: React.ReactNode;
  description: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  metaHtml?: React.ReactNode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  imageSrc,
  tag,
  title,
  description,
  primaryCtaText,
  primaryCtaHref,
  metaHtml,
}) => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.bgWrapper}>
        <Image 
          src={imageSrc} 
          alt="Hero Background" 
          fill 
          priority
          className={styles.bgImage} 
        />
        <div className={styles.overlay}></div>
      </div>
      
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          {tag && <span className={styles.tag}>{tag}</span>}
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          
          <div className={styles.actions}>
            {primaryCtaText && (
              <Button variant="primary" href={primaryCtaHref}>
                {primaryCtaText} &rarr;
              </Button>
            )}
          </div>
          
          {metaHtml && (
            <div className={styles.metaInfo}>
              {metaHtml}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
