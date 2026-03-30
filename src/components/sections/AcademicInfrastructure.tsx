"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Book, Cog, GraduationCap, Microscope, Play } from 'lucide-react';
import styles from './AcademicInfrastructure.module.css';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isRed?: boolean;
  delay?: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description, isRed, delay = 0 }) => {
  return (
    <motion.div
      className={`${styles.infoCard} ${isRed ? styles.redCard : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{description}</p>
    </motion.div>
  );
};

export const AcademicInfrastructure: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className="container-large">
        <div className={styles.layoutGrid}>
          {/* Left Column: Text Content */}
          <div className={styles.contentColumn}>
            <motion.span 
              className={styles.overline}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              ADVANCE AWARDS AND APPRECIATION
            </motion.span>
            <motion.h2 
              className={styles.mainHeading}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Empower your <br /> career success
            </motion.h2>
            <motion.p 
              className={styles.mainDesc}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore a multi-tier structural framework mapping the trajectory of global academic excellence. From mandatory general education to elite doctoral research, Russia's infrastructure is designed for futuristic innovation.
            </motion.p>
            
            <motion.button 
              className={styles.videoBtn}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className={styles.playIcon}>
                <Play size={14} fill="currentColor" />
              </div>
              <span>Watch our journey</span>
            </motion.button>
          </div>

          {/* Right Column: Staggered Bento Grid */}
          <div className={styles.gridColumn}>
            <div className={styles.staggeredStack}>
              <div className={styles.stackColumn}>
                <InfoCard 
                  icon={<Book size={32} strokeWidth={1.5} />}
                  title="General Education"
                  description="The foundation of the academic cycle: Grades 1-9 (11 Years Total)."
                  isRed
                  delay={0.1}
                />
                <InfoCard 
                  icon={<GraduationCap size={32} strokeWidth={1.5} />}
                  title="Higher Education"
                  description="Bologna-integrated Bachelor (240 ECTS) and Master (120 ECTS) tiers."
                  delay={0.3}
                />
              </div>
              <div className={`${styles.stackColumn} ${styles.offsetColumn}`}>
                <InfoCard 
                  icon={<Cog size={32} strokeWidth={1.5} />}
                  title="Vocational Training"
                  description="Specialized technical paths in Tekhnikums with high-speed industrial integration."
                  delay={0.2}
                />
                <InfoCard 
                  icon={<Microscope size={32} strokeWidth={1.5} />}
                  title="Doctoral Studies"
                  description="Elite research clusters focused on Candidate (PhD) and Doctor of Science ranks."
                  delay={0.4}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
