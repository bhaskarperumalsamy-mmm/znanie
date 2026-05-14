"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './CareerHubInternships.module.css';

export const CareerHubInternships: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className="container-large">
        <div className={styles.sectionHeader}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.overline}>PROFESSIONAL PLACEMENTS</span>
            <h2 className={styles.mainTitle}>
              Career Hub & <span>Internships</span>
            </h2>
            <p className={styles.subTitle}>
              Strategic pathways for professional growth and elite industry placements within the Russian Federation's resource-rich economy.
            </p>
          </motion.div>
        </div>

        <div className={styles.grid}>
          {/* Card 1: Institutional / Strategy */}
          <motion.div
            className={`${styles.card} ${styles.grayCard}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.cardContent}>
              <span className={styles.tag}>CAREER HUB</span>
              <h2 className={styles.cardTitle}>
                Strategic Pathways <br /> for Professional Growth
              </h2>
              <p className={styles.cardDesc}>
                Lawful employment frameworks and migration permit guidance designed for 18+ students. One-year renewable permits ensure total compliance.
              </p>

            </div>

            <div className={styles.imageSection}>
              <div className={styles.circleMask}>
                <Image
                  src="/images/zn_study-work.jpg"
                  alt="Career Growth"
                  fill
                  className={styles.image}
                />
              </div>
              <div className={styles.priceBadge}>LEGAL</div>
            </div>
          </motion.div>

          {/* Card 2: Professional / Partnerships */}
          <motion.div
            className={`${styles.card} ${styles.peachCard}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className={styles.cardContent}>
              <span className={styles.badge}>ELITE PLACEMENTS</span>
              <h2 className={styles.cardTitle}>
                Collaborations with <br /> Major Industry Leaders
              </h2>
              <p className={styles.cardDesc}>
                Hands-on experience with JP Morgan, Siemens, Gazprom Tech, Rosatom, and Kaspersky Lab through our elite internship corridor.
              </p>

            </div>

            <div className={styles.imageSection}>
              <div className={styles.rectMask}>
                <Image
                  src="/images/zn_thisisengineering.jpg"
                  alt="Industry Partners"
                  fill
                  className={styles.imageGrayscale}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
