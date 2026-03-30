"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { SectionHeader } from '../ui/SectionHeader';
import styles from './TestimonialSlider.module.css';

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  imageSrc?: string;
}

interface TestimonialSliderProps {
  tag?: string;
  title: React.ReactNode;
  testimonials: Testimonial[];
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  tag,
  title,
  testimonials,
}) => {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader tag={tag} title={title} align="center" />

        <div className={styles.slider}>
          <div className={styles.cardTrack}>
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`${styles.card} ${i === active ? styles.activeCard : ''}`}
              >
                <div className={styles.stars}>★★★★★</div>
                <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
                <div className={styles.author}>
                  {t.imageSrc && (
                    <div className={styles.avatar}>
                      <Image src={t.imageSrc} alt={t.name} fill className={styles.avatarImg} />
                    </div>
                  )}
                  <div>
                    <strong className={styles.name}>{t.name}</strong>
                    <span className={styles.role}>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.nav}>
            <button className={styles.navBtn} onClick={prev} aria-label="Previous">&#8592;</button>
            <div className={styles.dots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === active ? styles.activeDot : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button className={styles.navBtn} onClick={next} aria-label="Next">&#8594;</button>
          </div>
        </div>
      </div>
    </section>
  );
};
