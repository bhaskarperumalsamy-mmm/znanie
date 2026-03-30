"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Laptop, Archive, Library } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import styles from './InstitutionalPedagogy.module.css';

interface Pillar {
  id: string;
  title: string;
  text: string;
  icon: React.ReactNode;
}

const pillars: Pillar[] = [
  {
    id: '01',
    title: 'Live Synchronous Classes',
    text: 'Real-time interactive modules with certified TORFL examiners. Conversation labs, pronunciation clinics, and grammar workshops with native-speaking faculty.',
    icon: <Laptop size={28} />
  },
  {
    id: '02',
    title: 'Session Archives',
    text: 'Every lecture recorded in HD for lifelong review. Timestamped notes, searchable transcripts, and chapter markers for efficient revision.',
    icon: <Archive size={28} />
  },
  {
    id: '03',
    title: 'Scholarly Materials',
    text: '500+ pages of curated pedagogical notes and vocabulary lexicons — grammar workbooks, cultural readers, and exam preparation kits.',
    icon: <Library size={28} />
  }
];

export const InstitutionalPedagogy: React.FC = () => {
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
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.bg}>
        <Image
          src="/images/jarmoluk-library.jpg"
          alt="Institutional Architecture"
          fill
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.container}>
        <SectionHeader 
          tagline="OUR PROMISE TO YOU"
          titleBase="Pedagogy for"
          titleAccent="High-Stakes Success"
          description="We deliver more than instruction. We provide the institutional foundation for your academic and professional triumph in the Russia-India corridor through synchronized pedagogical excellence."
          light
        />

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              className={styles.card}
              variants={fadeUp}
            >
              <div className={styles.iconFloat}>
                <div className={styles.iconCircle}>
                  {pillar.icon}
                </div>
              </div>
              <div className={styles.cardInner}>
                <div className={styles.num}>PILLAR {pillar.id}</div>
                <div className={styles.divider} />
                <h3 className={styles.cardTitle}>{pillar.title}</h3>
                <p className={styles.text}>{pillar.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
