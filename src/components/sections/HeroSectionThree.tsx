"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Button } from '../ui/Button';
import styles from './HeroSectionThree.module.css';

interface HeroSectionThreeProps {
  title: React.ReactNode;
  description: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  imageSrc: string;
  ratingText?: string;
  showOrbital?: boolean;
}

export const HeroSectionThree: React.FC<HeroSectionThreeProps> = ({
  title,
  description,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
  imageSrc,
  ratingText,
  showOrbital = true,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.33, 1, 0.68, 1]
      } 
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.bgWrapper}>
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full relative"
        >
          <Image 
            src={imageSrc} 
            alt="Hero Background" 
            fill 
            priority
            sizes="100vw"
            className={styles.bgImage} 
          />
        </motion.div>
        <div className={styles.overlay}></div>
        
        {/* Orbital Animation replaces globe */}
        <div className={styles.orbitalContainer}>
          <div className={styles.orbitalGlow}></div>
          <div className={styles.orbitalRings}>
            <div className={styles.orbitalRingInner}></div>
            <div className={styles.orbitalRingOuter}>
              {/* India Icon */}
              <div className={styles.iconWrapperIndia}>
                <Image src="/images/indian_icon.png" alt="India" width={40} height={40} className="object-contain" />
              </div>
              {/* Russia Icon */}
              <div className={styles.iconWrapperRussia}>
                <Image src="/images/russia_icon.png" alt="Russia" width={40} height={40} className="object-contain" />
              </div>
            </div>
          </div>
          <div className={styles.centerTextWrapper}>
            <h2 className={styles.centerText}>ZNANIE</h2>
          </div>
        </div>
      </div>
      
      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {ratingText && (
            <motion.div variants={itemVariants} className={styles.reviewsBanner}>
              <div className={styles.stars}>
                ⭐⭐⭐⭐⭐
              </div>
              <span className={styles.ratingText}>{ratingText}</span>
            </motion.div>
          )}

          <motion.h1 variants={itemVariants} className={styles.title}>{title}</motion.h1>
          <motion.p variants={itemVariants} className={styles.description}>{description}</motion.p>
          
          <motion.div variants={itemVariants} className={styles.actions}>
            {primaryCtaText && primaryCtaHref && (
              <Button variant="primary" href={primaryCtaHref}>
                {primaryCtaText} &rarr;
              </Button>
            )}
            {secondaryCtaText && secondaryCtaHref && (
              <Button variant="dark" href={secondaryCtaHref}>
                {secondaryCtaText} &rarr;
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


