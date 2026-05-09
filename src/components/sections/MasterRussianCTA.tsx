"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './MasterRussianCTA.module.css';

export const MasterRussianCTA: React.FC = () => {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as any }
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.bg}>
        <Image
          src="/images/585669-30778.jpg"
          alt="Institutional Academic Excellence"
          fill
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className={styles.tag}>MASTER RUSSIAN • JOIN THE ELITE • GLOBAL TRIUMPH</span>
          <h2 className={styles.title}>
            Accelerate Your Academic & Professional Journey
          </h2>
          <p className={styles.desc}>
            Deepen your linguistic precision with our ТРКИ-synchronized matrix. Whether it’s Aerospace, Quantum Computing, or International Diplomacy, our curriculum is engineered for your global success.
          </p>

        </motion.div>
      </div>
    </section>
  );
};
