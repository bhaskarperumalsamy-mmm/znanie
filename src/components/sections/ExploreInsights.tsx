"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, Variants } from 'framer-motion';
import styles from './ExploreInsights.module.css';

const insights = [
  {
    id: 'large',
    type: 'large' as const,
    image: '/images/students-studying.jpg',
    author: 'Svetlana Ivanova',
    date: 'March 24, 2026',
    title: 'How Global Education is Shaping the Future of India-Russia Relations'
  },
  {
    id: 'small-1',
    type: 'small' as const,
    image: '/images/learning_woman.jpg',
    author: 'Daniel Cruz',
    date: 'March 20, 2026',
    title: 'Top 5 Universities in Russia for International Students in 2026'
  },
  {
    id: 'small-2',
    type: 'small' as const,
    image: '/images/element5.jpg',
    author: 'Emma Laurent',
    date: 'March 15, 2026',
    title: 'Mastering the Russian Language: A Practical Guide for Beginners'
  }
];

export const ExploreInsights: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.8 } 
    }
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={styles.title}
          >
            Explore New Insights
          </motion.h2>
          <motion.a 
            href="/russian-language-courses" 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={styles.viewAll}
          >
            View All
          </motion.a>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={styles.grid}
        >
          {insights.map((item) => (
            <motion.div 
              key={item.id} 
              variants={itemVariants}
              className={`${styles.card} ${item.type === 'large' ? styles.largeCard : styles.smallCard}`}
            >
              {item.type === 'large' ? (
                <div className={styles.cardImgWrapper}>
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className={styles.image} 
                  />
                  <div className={styles.largeOverlay}>
                    <p className={styles.meta}>By {item.author} • {item.date}</p>
                    <h3 className={styles.largeTitle}>{item.title}</h3>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.smallImgWrapper}>
                    <div className={styles.smallImgContainer}>
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className={styles.image} 
                      />
                    </div>
                  </div>
                  <div className={styles.smallContent}>
                    <p className={styles.smallMeta}>{item.author} • {item.date}</p>
                    <h4 className={styles.smallTitle}>{item.title}</h4>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
