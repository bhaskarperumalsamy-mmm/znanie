"use client";

import { AcademicCareerInfrastructure } from '@/components/sections/AcademicCareerInfrastructure';
import { RussianFederation } from '@/components/sections/RussianFederation';
import { RussiaEducationBenefits } from '@/components/sections/RussiaEducationBenefits';
import { WelfareGovernance } from '@/components/sections/WelfareGovernance';
import { CareerHubInternships } from '@/components/sections/CareerHubInternships';
import { StudentLifeRussia } from '@/components/sections/StudentLifeRussia';
import { StudyRussiaBenefits } from '@/components/sections/StudyRussiaBenefits';
import { CourseGrid } from '@/components/sections/CourseGrid';
import { SplitContent } from '@/components/sections/SplitContent';
import { StatsCounter } from '@/components/sections/StatsCounter';
import { CTABanner } from '@/components/sections/CTABanner';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import styles from './courses.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function StudyInRussiaContent() {
  return (
    <>
      {/* ════════ REDESIGNED HERO — BASED ON WHY-CHOOSE-US ════════ */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg}>
          <Image
            src="/images/jarmoluk-library.jpg"
            alt="Heritage"
            fill
            className={styles.heroBgImage}
            priority
          />
          <div className={styles.heroGridOverlay} />
          <div className={styles.heroOverlayGradient} />
        </div>

        <motion.div
          className={styles.heroContent}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.3 }
            }
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
            }}
          >
            <span className={styles.heroTag}>Discover</span>
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.33, 1, 0.68, 1] } }
            }}
          >
            World-Class Education <br />in <span className="rt-text-yellow">Russia</span>
          </motion.h1>

          <motion.p
            className={styles.heroDesc}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.33, 1, 0.68, 1] } }
            }}
          >
            Russia, the largest nation in the world, spans two continents and offers a transcontinental gateway to academic excellence and cultural depth.
          </motion.p>
        </motion.div>
      </section>


      <RussianFederation />

      <StudyRussiaBenefits />

      <RussiaEducationBenefits />

      <AcademicCareerInfrastructure />

      <StudentLifeRussia />

      <WelfareGovernance />

      <CareerHubInternships />
    </>
  );
}
