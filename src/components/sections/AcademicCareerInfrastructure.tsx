"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Cpu, Palette, Plane, ArrowRight } from 'lucide-react';
import styles from './AcademicCareerInfrastructure.module.css';

interface CareerCardProps {
  icon: React.ReactNode;
  category: string;
  title: string;
  location: string;
  meta: { label: string; value: string }[];
  tag?: string;
  delay?: number;
}

const CareerCard: React.FC<CareerCardProps> = ({ icon, category, title, location, meta, tag, delay = 0 }) => {
  return (
    <motion.div
      className={styles.careerCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.iconCircle}>{icon}</div>
        <div className={styles.headerInfo}>
          <span className={styles.category}>{category}</span>
          <span className={styles.location}>{location}</span>
        </div>
        {tag && <div className={styles.salaryTag}>{tag}</div>}
      </div>

      <h3 className={styles.cardTitle}>{title}</h3>

      <div className={styles.metaGrid}>
        {meta.map((item, idx) => (
          <div key={idx} className={styles.metaItem}>
            <span className={styles.metaLabel}>{item.label}</span>
            <span className={styles.metaValue}>{item.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export const AcademicCareerInfrastructure: React.FC = () => {
  const data = [
    {
      icon: <Stethoscope size={24} />,
      category: "MEDICAL RESEARCH",
      location: "Top Clinical Hubs",
      title: "Medicine & Health Sciences",
      tag: "HIGH DEMAND",
      meta: [
        { label: "DURATION", value: "6 Years" },
        { label: "DEGREE", value: "Specialist" },
        { label: "REGION", value: "Global recognized" },
        { label: "FOCUS", value: "Universal Care" }
      ]
    },
    {
      icon: <Cpu size={24} />,
      category: "TECHNICAL INNOVATION",
      location: "IT & Engineering Hubs",
      title: "Engineering & Applied Tech",
      meta: [
        { label: "DURATION", value: "4-5 Years" },
        { label: "DEGREE", value: "B.Sc / M.Sc" },
        { label: "REGION", value: "Pan-Russia" },
        { label: "FOCUS", value: "Infrastructure" }
      ]
    },
    {
      icon: <Palette size={24} />,
      category: "CREATIVE ARTS",
      location: "St. Petersburg / Moscow",
      title: "Arts & Cultural Humanities",
      meta: [
        { label: "DURATION", value: "4 Years" },
        { label: "DEGREE", value: "BA / MA" },
        { label: "REGION", value: "Heritage Sites" },
        { label: "FOCUS", value: "Fine Arts" }
      ]
    },
    {
      icon: <Plane size={24} />,
      category: "AEROSPACE SCIENCE",
      location: "Specialized Academies",
      title: "Aviation & Cosmic Research",
      tag: "ELITE",
      meta: [
        { label: "DURATION", value: "5 Years" },
        { label: "DEGREE", value: "Professional" },
        { label: "REGION", value: "Strategic" },
        { label: "FOCUS", value: "Aerodynamics" }
      ]
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container-large">
        <div className={styles.sectionHeader}>
          <span className={styles.overline}>ACADEMIC FRAMEWORK</span>
          <h2 className={styles.mainTitle}>
            Empower your <span>career success</span>
          </h2>
          <p className={styles.subTitle}>
            Mapping Russia's elite academic infrastructure to global professional standards. 
            Choose your specialization within our certified framework.
          </p>
        </div>

        <div className={styles.grid}>
          {data.map((item, index) => (
            <CareerCard
              key={index}
              {...item}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
