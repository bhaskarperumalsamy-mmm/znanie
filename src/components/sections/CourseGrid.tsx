import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import styles from './CourseGrid.module.css';

export interface CourseData {
  id: string;
  image: string;
  badge: {
    text: string;
    color: 'red' | 'yellow';
  };
  category: string;
  title: string;
  instructor: string;
  price: string;
  href: string;
}

interface CourseGridProps {
  tag?: string;
  title: React.ReactNode;
  courses: CourseData[];
  showMoreHref?: string;
}

export const CourseGrid: React.FC<CourseGridProps> = ({
  tag,
  title,
  courses,
  showMoreHref,
}) => {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader tag={tag} title={title} align="center" />
        
        <div className={styles.filterMenu}>
          <button className={`${styles.filterBtn} ${styles.active}`}>All courses</button>
          <button className={styles.filterBtn}>Business</button>
          <button className={styles.filterBtn}>Development</button>
          <button className={styles.filterBtn}>Finance</button>
          <button className={styles.filterBtn}>Design</button>
        </div>
        
        <div className={styles.grid}>
          {courses.map((course) => (
            <div key={course.id} className={styles.courseWrapper}>
              <Card
                imageSrc={course.image}
                badge={course.badge.text}
                badgeColor={course.badge.color}
                category={course.category}
                title={course.title}
                description={course.instructor}
                price={course.price}
                href={course.href}
              />
            </div>
          ))}
        </div>
        
        {showMoreHref && (
          <div className={styles.actions}>
            <Button variant="dark" href={showMoreHref}>Show less</Button>
          </div>
        )}
      </div>
    </section>
  );
};
