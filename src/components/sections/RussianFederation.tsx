"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Globe, MapPin, Landmark, TrendingUp } from 'lucide-react';
import styles from './RussianFederation.module.css';

export const RussianFederation: React.FC = () => {
  const features = [
    { label: 'Territorial Scale', value: '17.1 Million km²', icon: <Globe size={32} strokeWidth={1.5} /> },
    { label: 'Capital City', value: 'Moscow', icon: <Landmark size={32} strokeWidth={1.5} /> },
    { label: 'Cultural Heart', value: 'St. Petersburg', icon: <MapPin size={32} strokeWidth={1.5} /> },
    { label: 'Global Rank', value: 'Top 10 Pop.', icon: <TrendingUp size={32} strokeWidth={1.5} /> },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as any } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  return (
    <section className={styles.section}>
      <div className="container-large">
        <div className={styles.grid}>
          {/* Left Column: Portrait Hero Image */}
          <motion.div
            className={styles.imageCol}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] as any }}
          >
            <div className={styles.portraitWrapper}>
              <Image
                src="/images/alina-makhatyrova.jpg"
                alt="Russian Academic Heritage"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </motion.div>

          {/* Right Column: Content + Grid + Landscape */}
          <motion.div
            className={styles.contentCol}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeUp} className={styles.tag}>GEOPOLITICAL PROFILE</motion.span>

            <motion.h2 variants={fadeUp} className={styles.title}>
              The Russian <span className="text-primary">Federation</span>
            </motion.h2>

            <motion.p variants={fadeUp} className={styles.subheadline}>
              Russia spans eleven time zones across two continents, surrounded by sixteen sovereign states—the most of any nation on earth.
            </motion.p>

            <motion.p variants={fadeUp} className={styles.desc}>
              As a global academic titan, it stands at the intersection of European heritage and Pacific innovation, offering a unique ecosystem for international scholars seeking advanced specialized degrees.
            </motion.p>

            {/* Feature Grid (2x2) */}
            <motion.div variants={fadeUp} className={styles.featureGrid}>
              {features.map((f, i) => (
                <div key={i} className={styles.featureItem}>
                  <div className={styles.featureIcon}>{f.icon}</div>
                  <div className={styles.featureText}>
                    <span className={styles.featureLabel}>{f.label}</span>
                    <span className={styles.featureValue}>{f.value}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Bottom Landscape Image - Integrated in column */}
            <motion.div
              variants={fadeUp}
              className={styles.landscapeWrapper}
            >
              <Image
                src="/images/zn_environment.jpg"
                alt="Modern Russia"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className={styles.imageOverlay}>
                <p>Russia's resource-rich environment and strategic geopolitical presence provide a unique cross-continental gateway for academic excellence.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
