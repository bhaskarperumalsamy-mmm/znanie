"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ShieldCheck, TrendingUp, History, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import styles from './GlobalValidation.module.css';

interface Point {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const points: Point[] = [
  {
    id: '01',
    title: 'PROTOCOL VALIDATION: TORFL Synchronized Matrix',
    desc: 'Our curriculum is mathematically aligned with the ТРКИ standards, ensuring your proficiency is validated by the highest educational authorities.',
    icon: <ShieldCheck size={24} strokeWidth={1.5} />
  },
  {
    id: '02',
    title: 'MARKET SYNERGY: The Bilateral Career Axis',
    desc: 'Mastering Russian provides immediate access to high-impact roles in Aerospace, Quantum Computing, and International Diplomacy.',
    icon: <TrendingUp size={24} strokeWidth={1.5} />
  },
  {
    id: '03',
    title: 'SOVEREIGN READINESS: Institutional Legacy',
    desc: 'A proven track record since 1998 in developing high-stakes linguistic competence for sovereign-ready professionals.',
    icon: <History size={24} strokeWidth={1.5} />
  }
];

export const GlobalValidation: React.FC = () => {
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
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          tagline="STRATEGIC OUTLOOK"
          titleBase="Global"
          titleAccent="Validation"
          description="Bridging the gap between certified academic proficiency and elite professional opportunities in the Russia-India corridor. We synchronize our pedagogy with the highest sovereign standards."
          inline
        />
        <div className={styles.grid}>
          {/* Left Column: Semantic Hierarchy & Strategic Points */}
          <div className={styles.contentCol}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >

              <div className={styles.featureList}>
                {points.map((point) => (
                  <motion.div
                    key={point.id}
                    className={styles.featureItem}
                    variants={fadeUp}
                  >
                    <div className={styles.iconCircle}>
                      {point.icon}
                    </div>
                    <div className={styles.featureText}>
                      <h3 className={styles.featureTitle}>{point.title}</h3>
                      <p className={styles.featureDesc}>{point.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Imagery & Floating Evidence Axis */}
          <motion.div
            className={styles.imageCol}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className={styles.imageWrapper}>
              <Image
                src="/images/sanketgraphy.jpg"
                alt="Institutional Registry Alignment"
                fill
                className={styles.image}
              />
            </div>

            <motion.div
              className={styles.statsCard}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className={styles.statsVal}>100%</span>
              <span className={styles.statsLabel}>ТРКИ SYLLABUS</span>
              <p className={styles.statsDesc}>
                Complete synchronization with the Russian State TORFL Protocol.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
