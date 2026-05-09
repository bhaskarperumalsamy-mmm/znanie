"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  BarChart,
  BookOpen,
  Layers,
  Zap,
  Award,
  Languages,
  Users,
  Globe,
  Cpu,
  Smartphone,
  ShieldCheck,
  Star,
  ArrowRight
} from 'lucide-react';
import styles from './RussiaEducationBenefits.module.css';

const benefits = [
  { id: '01', title: 'Fundamental Leadership', text: 'World leader in training mathematicians & physicists.', icon: <BarChart size={20} /> },
  { id: '02', title: 'Exhaustive Curriculum', text: 'Over 4000 programs covering medical & technical fields.', icon: <BookOpen size={20} /> },
  { id: '03', title: 'Vertical Integration', text: 'From short summer schools to prestigous residency.', icon: <Layers size={20} /> },
  { id: '04', title: 'Value Blueprint', text: 'Premium combination with degrees starting at 83K RUB.', icon: <Zap size={20} /> },
  { id: '05', title: 'State Scholarships', text: 'State-funded seats allocated for top foreign talent.', icon: <Award size={20} /> },
  { id: '06', title: 'Bilingual Tracks', text: 'Increasing number of universities offering English tracks.', icon: <Languages size={20} /> },
  { id: '07', title: 'Russian Immersion', text: 'Long-term prep-faculty programs for non-natives.', icon: <Users size={20} /> },
  { id: '08', title: 'Double Certification', text: 'Joint programs with international institutions.', icon: <Globe size={20} /> },
  { id: '09', title: 'Digital Ecosystem', text: 'Active leadership in MOOC and online communities.', icon: <Cpu size={20} /> },
  { id: '10', title: 'High-Tech Labs', text: 'State-of-the-art research and smart dormitories.', icon: <Smartphone size={20} /> },
  { id: '11', title: 'Social Adaptation', text: 'Specific assistance for lifestyle and cultural onboarding.', icon: <ShieldCheck size={20} /> },
  { id: '12', title: 'National Incentives', text: 'Special cards for transport and museum discounts.', icon: <Star size={20} /> }
];

export const RussiaEducationBenefits: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className="container-large">
        <div className={styles.splitGrid}>
          {/* Left Side: Editorial Image */}
          <div className={styles.leftColumn}>
            <motion.div
              className={styles.pioneerImageWrapper}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] as any }}
            >
              <Image
                src="/images/friends-cheering-world.jpg"
                alt="Institutional Excellence"
                fill
                className={styles.mainImage}
                priority
              />
              <div className={styles.imageOverlay} />

              <div className={styles.statBadge}>
                <div className={styles.statIcon}>
                  <Users size={24} />
                </div>
                <div className={styles.statText}>
                  <strong>315K+</strong>
                  <span>Foreign Citizens</span>
                </div>
              </div>

              <div className={styles.narrativeBox}>
                <span className={styles.overline}>ESTABLISHED 1947</span>
                <h2 className={styles.narrativeTitle}>Architecting <br /> Global Careers</h2>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Benefits Matrix */}
          <div className={styles.rightColumn}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className={styles.tag}>ADVANTAGE MATRIX</span>
              <h2 className={styles.mainTitle}>Benefits of Education in <em>Russia</em></h2>
            </motion.div>

            <div className={styles.benefitsList}>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.id}
                  className={styles.benefitItem}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  whileHover={{ x: 10 }}
                >
                  <div className={styles.benefitIconBox}>
                    {benefit.icon}
                  </div>
                  <div className={styles.benefitContent}>
                    <div className={styles.benefitHeader}>
                      <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                    </div>
                    <p className={styles.benefitText}>{benefit.text}</p>
                  </div>
                  <div className={styles.arrowIcon}>
                    <ArrowRight size={16} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
