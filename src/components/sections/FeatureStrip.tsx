import React from 'react';
import styles from './FeatureStrip.module.css';

interface FeatureItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureStripProps {
  subtitle?: string;
  features: FeatureItem[];
}

export const FeatureStrip: React.FC<FeatureStripProps> = ({ subtitle, features }) => {
  return (
    <div className={styles.wrapper}>
      <div className={`container ${styles.container}`}>
        <div className={styles.inner}>
          {subtitle && <h3 className={styles.subtitle}>{subtitle}</h3>}
          <div className={styles.features}>
            {features.map((feature, index) => (
              <div key={index} className={styles.feature}>
                <div className={styles.iconWrapper}>
                  {feature.icon || <div className={styles.defaultIcon} />}
                </div>
                <div className={styles.content}>
                  <h4 className={styles.title}>{feature.title}</h4>
                  <p className={styles.description}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
