"use client";

import { LearningPaths } from '@/components/sections/LearningPaths';
import { CurriculumGrid } from '@/components/sections/CurriculumGrid';
import { InstitutionalPedagogy } from '@/components/sections/InstitutionalPedagogy';
import { GlobalValidation } from '@/components/sections/GlobalValidation';
import { MasterRussianCTA } from '@/components/sections/MasterRussianCTA';
import styles from './blog.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';



export default function RussianCoursesContent() {

  return (
    <>
      <section className={styles.heroSection}>
        <div className={styles.heroBg}>
          <Image
            src="/images/zn_new_journey.jpg"
            alt="Master Russian"
            fill
            className={styles.heroBgImage}
            priority
          />
          <div className={styles.heroGridOverlay} />
          <div className={styles.heroOverlayGradient} />
        </div>

        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] as any }}
          >
            <span className={styles.heroTag}>Master Russian.</span>
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] as any }}
          >
            Thinking about starting a <br />
            <span className="rt-text-yellow">new journey?</span>
          </motion.h1>

          <motion.p
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] as any }}
          >
            We promote the growth of the Russian language and help you learn with confidence—from beginner to advanced levels—carefully designed to prepare you for study, work, and successful integration into Russian society.
          </motion.p>
        </div>
      </section>


      <LearningPaths />
      <InstitutionalPedagogy />
      <GlobalValidation />
      <CurriculumGrid />
      <MasterRussianCTA />




    </>
  );
}
