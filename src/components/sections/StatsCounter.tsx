"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './StatsCounter.module.css';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

interface StatsCounterProps {
  stats: Stat[];
}

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

const StatItem: React.FC<{ stat: Stat; animate: boolean }> = ({ stat, animate }) => {
  const count = useCountUp(stat.value, 2000, animate);
  return (
    <div className={styles.stat}>
      <div className={styles.value}>
        {count.toLocaleString()}{stat.suffix || ''}
      </div>
      <div className={styles.label}>{stat.label}</div>
    </div>
  );
};

export const StatsCounter: React.FC<StatsCounterProps> = ({ stats }) => {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={ref}>
      <div className="container">
        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
};
