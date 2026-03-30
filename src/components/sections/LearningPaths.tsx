"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { PenTool, Globe, Target, BookOpen, UserCheck } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import styles from './LearningPaths.module.css';

interface TRKIPath {
  id: string;
  level: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const LearningPaths: React.FC = () => {
  const trkiPaths: TRKIPath[] = [
    {
      id: "01",
      level: "A1",
      title: "Beginner",
      description: "Foundation of the Cyrillic script and survival communication protocols.",
      icon: <PenTool size={28} strokeWidth={1.5} />
    },
    {
      id: "02",
      level: "A2",
      title: "Waystage",
      description: "Navigating routine social and professional interactions with confidence.",
      icon: <Globe size={28} strokeWidth={1.5} />
    },
    {
      id: "03",
      level: "B1",
      title: "Threshold",
      description: "Achieving functional independence for academic and corporate environments.",
      icon: <Target size={28} strokeWidth={1.5} />
    },
    {
      id: "04",
      level: "B2",
      title: "Vantage",
      description: "Advanced fluency for analytical discourse and complex negotiations.",
      icon: <BookOpen size={28} strokeWidth={1.5} />
    },
    {
      id: "05",
      level: "C1",
      title: "Advanced",
      description: "Near-native operational proficiency for elite leadership roles.",
      icon: <UserCheck size={28} strokeWidth={1.5} />
    }
  ];

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
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
        <SectionHeader 
          tagline="MISSION ORIENTED"
          titleBase="Learning paths built"
          titleAccent="for your success"
          description="Designed for individuals seeking elite leadership roles, academic mastery, or institutional readiness. We synchronize your roadmap with global standards."
        />
        <div className={styles.grid}>
          {/* Left Column: TRKI Levels Narrative */}
          <motion.div
            className={styles.contentCol}
            initial={false}
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >

            <div className={styles.featureList}>
              {trkiPaths.map((path) => (
                <motion.div key={path.id} variants={fadeUp} className={styles.featureItem}>
                  <div className={styles.iconBox}>
                    <div className={styles.icon}>{path.icon}</div>
                  </div>
                  <div className={styles.featureText}>
                    <h3 className={styles.featureTitle}>
                      <span className={styles.levelBadge}>{path.level}</span> {path.title}
                    </h3>
                    <p className={styles.featureDesc}>
                      {path.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Asymmetric Imagery */}
          <motion.div
            className={styles.imageCol}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className={styles.portraitImage}>
              <Image
                src="/images/girl-writing-notebook.jpg"
                alt="Intensive Focus"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            <div className={styles.landscapeImage}>
              <Image
                src="/images/cottonbro.jpg"
                alt="Digital Collaboration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
