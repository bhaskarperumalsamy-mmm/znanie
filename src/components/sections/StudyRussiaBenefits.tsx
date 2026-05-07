"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, BookOpen, Award, Languages, ArrowRight, TrendingUp } from 'lucide-react';
import styles from './StudyRussiaBenefits.module.css';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isDark?: boolean;
  delay?: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, isDark, delay = 0 }) => {
  return (
    <Link href="/contact" className={styles.cardLink}>
      <motion.div
        className={`${styles.card} ${isDark ? styles.darkCard : ''}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ 
          y: -10,
          backgroundColor: isDark ? '#0e1010' : '#0e1010',
          transition: { duration: 0.3, ease: 'easeOut' }
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] as any }}
      >
        <motion.div 
          className={styles.iconWrapper}
        >
          {icon}
        </motion.div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDesc}>{description}</p>
        <div className={styles.viewMore}>
          <span>Enquire Now</span>
          <motion.span
            variants={{
              arrowHover: { x: 5, color: 'var(--_color---golden-amber)' }
            }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight size={16} />
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
};

export const StudyRussiaBenefits: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className="container-large">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.overline}>PROMISE. QUALITY. EXCELLENCE.</span>
          <h2 className={styles.mainTitle}>Why Should You <span className="text-primary">Study in Russia?</span></h2>
          <p className={styles.subTitle}>
            Discover a transcontinental academic titan where historical depth meets futuristic innovation.
          </p>
        </motion.div>

        <div className={styles.grid}>
          <BenefitCard
            icon={<Globe size={28} strokeWidth={1.5} />}
            title="Cultural Diversity"
            description="Engage with 160+ ethnic groups in a rich multicultural environment that broadens global perspectives."
            delay={0.1}
          />
          <BenefitCard
            icon={<BookOpen size={28} strokeWidth={1.5} />}
            title="Academic Studies"
            description="Immerse yourself in a legacy of peerless art, literature, and history that has shaped global civilization."
            delay={0.2}
          />
          <BenefitCard
            icon={<Award size={28} strokeWidth={1.5} />}
            title="Music and Dance"
            description="Home to the Bolshoi Ballet and icons like Tchaikovsky, offering world-leading training in performing arts."
            delay={0.3}
          />
          <BenefitCard
            icon={<Languages size={28} strokeWidth={1.5} />}
            title="Language Immersion"
            description="The global standard for complete Russian language mastery through authentic cultural integration."
            delay={0.4}
          />
          <BenefitCard
            icon={<Award size={28} strokeWidth={1.5} />}
            title="History Studies"
            description="Walk through UNESCO Heritage sites that shaped global civilization and strategic geopolitical history."
            delay={0.5}
          />
          <BenefitCard
            icon={<TrendingUp size={28} strokeWidth={1.5} />}
            title="Quality Education"
            description="Leading global rankings in mathematics, physics, and engineering with state-of-the-art research facilities."
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
};
