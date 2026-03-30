"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HeartPulse, Landmark, Scale, TrendingUp } from 'lucide-react';
import styles from './WelfareGovernance.module.css';

interface WelfareCardProps {
  id: string;
  title: string;
  text: string;
  icon: React.ReactNode;
  delay?: number;
}

const WelfareCard: React.FC<WelfareCardProps> = ({ id, title, text, icon, delay = 0 }) => {
  return (
    <motion.div
      className={styles.promiseCard}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
      }}
    >
      <div className={styles.promiseIconFloat}>
        <div className={styles.promiseIconCircle}>
          {icon}
        </div>
      </div>
      <div className={styles.promiseCardInner}>
        <div className={styles.promiseNum}>{id}</div>
        <div className={styles.promiseDivider} />
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.promiseText}>{text}</p>
      </div>
    </motion.div>
  );
};

export const WelfareGovernance: React.FC = () => {
  const points = [

    {
      id: 'Public Health',
      title: 'Universal Health Coverage',
      text: 'Constitutional guarantees of free health coverage via a state-run mandatory plan. Over 2 million professionals ensure state-of-the-art care for all enrolled students.',
      icon: <Landmark size={28} strokeWidth={1.5} />
    },

    {
      id: 'Academic Ethics',
      title: 'The Ministry Oversight',
      text: 'Rigorous secondary and higher education governance, with the state dedicating 4.7% of GDP to maintain excellence across all 519 learning institutions..',
      icon: <TrendingUp size={28} strokeWidth={1.5} />
    }
  ];

  return (
    <section className={styles.promiseSection}>
      <div className={styles.promiseBg}>
        <Image
          src="/images/jarmoluk-library.jpg"
          alt="Governance Background"
          fill
          className={styles.promiseBgImage}
        />
        <div className={styles.promiseOverlay} />
      </div>

      <div className="container-large">
        <div className={styles.promiseHeader}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.promiseTag}>SYSTEMIC STEWARDSHIP</span>
            <h2 className={styles.promiseTitle}>
              Welfare & <em>Governance</em>
            </h2>
            <p className={styles.promiseSubtitle}>
              Architecting a secure and transparent environment through constitutional guarantees and strategic professional integration.
            </p>
          </motion.div>
        </div>

        <motion.div
          className={styles.promiseGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {points.map((point, index) => (
            <WelfareCard
              key={point.id}
              {...point}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
