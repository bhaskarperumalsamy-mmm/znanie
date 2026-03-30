import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import styles from './CategoryCards.module.css';

interface Category {
  id: string;
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

interface CategoryCardsProps {
  tag?: string;
  title: React.ReactNode;
  categories: Category[];
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({
  tag,
  title,
  categories,
}) => {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader tag={tag} title={title} align="center" />
        
        <div className={styles.grid}>
          {categories.map((category) => (
            <div key={category.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                {category.icon || <div className={styles.defaultIcon} />}
              </div>
              <h3 className={styles.cardTitle}>{category.title}</h3>
              <span className={styles.cardSubtitle}>{category.subtitle}</span>
              <p className={styles.cardDesc}>{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
