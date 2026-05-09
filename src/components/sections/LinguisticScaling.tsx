"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight, GraduationCap, MapPin, Search, Star, Target } from 'lucide-react';
import styles from './LinguisticScaling.module.css';

export const LinguisticScaling: React.FC = () => {
  const trkiLevels = [
    {
      level: "A1 Beginner",
      description: "Foundation of the Cyrillic script and survival communication protocols.",
      icon: <Search size={24} />
    },
    {
      level: "A2 Waystage",
      description: "Navigating routine social and professional interactions with confidence.",
      icon: <MapPin size={24} />
    },
    {
      level: "B1 Threshold",
      description: "Achieving functional independence for academic and corporate environments.",
      icon: <Target size={24} />
    },
    {
      level: "B2 Vantage",
      description: "Advanced fluency for analytical discourse and complex negotiations.",
      icon: <Star size={24} />
    },
    {
      level: "C1 Advanced",
      description: "Near-native operational proficiency for elite leadership roles.",
      icon: <GraduationCap size={24} />
    }
  ];

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as any } 
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column: Rounded Institutional Image */}
          <motion.div
            className={styles.imageCol}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] as any }}
          >
            <div className={styles.imageWrapper}>
              <Image
                src="/images/learning_woman.jpg"
                alt="Linguistic Mastery"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </motion.div>

          {/* Right Column: Strategic Matrix Content */}
          <motion.div
            className={styles.contentCol}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeUp} className={styles.tag}>
              STRATEGIC MATRIX
            </motion.span>
            
            <motion.h2 variants={fadeUp} className={styles.title}>
              Linguistic Scaling
            </motion.h2>
            
            <motion.p variants={fadeUp} className={styles.description}>
              Synchronized with TORFL standards, our matrix provides a structured pathway 
              from absolute novice to elite operational proficiency.
            </motion.p>

            <div className={styles.levelsGrid}>
              {trkiLevels.map((item, index) => (
                <motion.div
                  key={index}
                  className={styles.levelCard}
                  variants={fadeUp}
                >
                  <div className={styles.iconWrapper}>
                    {item.icon}
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{item.level}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
