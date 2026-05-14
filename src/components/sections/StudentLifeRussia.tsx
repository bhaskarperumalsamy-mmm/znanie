"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './StudentLifeRussia.module.css';

interface LifeCardProps {
  image: string;
  category: string;
  title: string;
  badgeText: string;
  detailText: string;
  delay?: number;
}

const LifeCard: React.FC<LifeCardProps> = ({ image, category, title, badgeText, detailText, delay = 0 }) => {
  return (
    <motion.div
      className={styles.lifestyleCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] as any }}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          fill
          className={styles.bgImage}
        />
        <div className={styles.overlay} />

        {/* Floating Red Badge */}
        <div className={styles.redBadge}>
          <span className={styles.badgeVal}>{badgeText}</span>
        </div>

        <div className={styles.cardContent}>
          <span className={styles.categoryTag}>{category}</span>
          <h3 className={styles.cardTitle}>{title}</h3>
          <div className={styles.divider} />
          <p className={styles.detailText}>{detailText}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const StudentLifeRussia: React.FC = () => {
  const data = [
    {
      image: '/images/zn_majestic_landscapes.jpg',
      category: 'OUTDOOR ADVENTURE',
      title: 'Majestic Landscapes',
      badgeText: '11 TZ',
      detailText: 'From the Siberian Taiga to the Caucasus mountains across eleven time zones.'
    },
    {
      image: '/images/zn_fortress_derbent.jpg',
      category: 'CULTURAL HERITAGE',
      title: 'Architectural Legacies',
      badgeText: 'UNESCO',
      detailText: 'Explore 30+ World Heritage sites from Red Square to the Citadels of Derbent.'
    },

    {
      image: '/images/zn_communities.jpg',
      category: 'SOCIAL SPIRIT',
      title: 'Modern Communities',
      badgeText: '800k+',
      detailText: 'Join a vibrant community of 800,000+ international students and scholars.'
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container-large">
        <div className={styles.header}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.overline}>LIVING THE LEGACY</span>
            <h2 className={styles.mainTitle}>
              Student <span>Life in Russia</span>
            </h2>
            <p className={styles.subTitle}>
              Beyond the classroom: exploring the vast geographic beauty and deep historical heartbeat of a transcontinental giant.
            </p>
          </motion.div>
        </div>

        <div className={styles.grid}>
          {data.map((item, index) => (
            <LifeCard
              key={index}
              {...item}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
