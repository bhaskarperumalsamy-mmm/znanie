import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Card.module.css';

interface CardProps {
  imageSrc?: string;
  imageAlt?: string;
  badge?: string;
  badgeColor?: 'red' | 'yellow';
  category?: string;
  title: string;
  description?: string;
  href?: string;
  price?: string;
  meta?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  imageSrc,
  imageAlt = 'Card image',
  badge,
  badgeColor = 'red',
  category,
  title,
  description,
  href,
  price,
  meta,
}) => {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (href) {
      return <Link href={href} className={styles.card}>{children}</Link>;
    }
    return <div className={styles.card}>{children}</div>;
  };

  return (
    <CardWrapper>
      {imageSrc && (
        <div className={styles.imageContainer}>
          <Image src={imageSrc} alt={imageAlt} fill className={styles.image} />
          {badge && (
            <div className={`${styles.badge} ${styles[badgeColor]}`}>
              {badge}
            </div>
          )}
        </div>
      )}
      
      <div className={styles.content}>
        {category && <span className={styles.category}>{category}</span>}
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        
        {(price || meta) && (
          <div className={styles.footer}>
            {price && <span className={styles.price}>{price}</span>}
            {meta && <span className={styles.meta}>{meta}</span>}
          </div>
        )}
      </div>
    </CardWrapper>
  );
};
