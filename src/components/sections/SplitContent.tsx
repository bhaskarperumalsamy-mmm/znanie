import React from 'react';
import Image from 'next/image';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import styles from './SplitContent.module.css';

interface Feature {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

interface SplitContentProps {
  tag?: string;
  title: React.ReactNode;
  description?: string;
  features?: Feature[];
  imageSrc: string;
  imageAlt?: string;
  imageLeft?: boolean;
  ctaText?: string;
  ctaHref?: string;
  lightBg?: boolean;
}

export const SplitContent: React.FC<SplitContentProps> = ({
  tag,
  title,
  description,
  features,
  imageSrc,
  imageAlt = 'Section image',
  imageLeft = false,
  ctaText,
  ctaHref,
  lightBg = false,
}) => {
  return (
    <section className={`${styles.section} ${lightBg ? styles.lightBg : ''}`}>
      <div className="container">
        <div className={`${styles.grid} ${imageLeft ? styles.imageLeft : ''}`}>
          <div className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <Image src={imageSrc} alt={imageAlt} fill className={styles.image} />
            </div>
          </div>

          <div className={styles.contentCol}>
            <SectionHeader tag={tag} title={title} align="left" />
            {description && <p className={styles.description}>{description}</p>}

            {features && (
              <div className={styles.features}>
                {features.map((f, i) => (
                  <div key={i} className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      {f.icon || <span className={styles.dot} />}
                    </div>
                    <div>
                      <h4 className={styles.featureTitle}>{f.title}</h4>
                      <p className={styles.featureDesc}>{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {ctaText && ctaHref && (
              <div className={styles.cta}>
                <Button variant="primary" href={ctaHref}>{ctaText} &rarr;</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
