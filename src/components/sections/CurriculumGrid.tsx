"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Check } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import styles from './CurriculumGrid.module.css';

interface Module {
  id: string;
  name: string;
  category: string;
  badge?: string;
  features: string;
  outcome: string;
  image: string;
  duration: string;
  level: string;
  details: string;
  highlights: string[];
}

const curriculum: Module[] = [
  {
    id: '1',
    name: 'BEGINNER <br /> (A1 - Breakthrough)',
    category: 'The Foundation',
    badge: '30 LESSONS',
    features: 'Alphabet & Sounds, Zero Copula, Survival Vocab.',
    outcome: 'Navigate Cities',
    image: '/images/friends-cheering-world.jpg',
    duration: '4 Weeks',
    level: 'Beginner',
    details: 'Master the basic building blocks of the Russian language, focusing on phonetic accuracy and survival communication.',
    highlights: ['Alphabet & Phonetics', 'Nouns & Pronouns', 'Survival Scenarios', 'Daily Greetings']
  },
  {
    id: '2',
    name: 'WAYSTAGE <br /> (A2 - Elementary)',
    category: 'The Storyteller',
    badge: '35 LESSONS',
    features: 'Time Travel, The Cases (P1), Verbs of Motion.',
    outcome: 'Fluent Dialogues',
    image: '/images/alissa-de-leva.jpg',
    duration: '6 Weeks',
    level: 'Elementary',
    details: 'Navigate routine social interactions with confidence and begin constructing complex past and future narratives.',
    highlights: ['Case System Intro', 'Verbs of Motion', 'Tense Structures', 'Social Protocols']
  },
  {
    id: '3',
    name: 'THRESHOLD <br /> (B1 - Intermediate)',
    category: 'The Independent',
    badge: '40 LESSONS',
    features: 'The Cases (P2), Verb Aspects, Opinion & Debate.',
    outcome: 'Functional Independence',
    image: '/images/aejaz-memon.jpg',
    duration: '8 Weeks',
    level: 'Intermediate',
    details: 'Achieve functional independence in most travel and professional situations. Express opinions and engage in structured debate.',
    highlights: ['Verb Aspects', 'Complex Syntax', 'Debate Skills', 'Media Comprehension']
  },
  {
    id: '4',
    name: 'VANTAGE <br /> (B2 - Upper Intermediate)',
    category: 'The Communicator',
    badge: '45 LESSONS',
    features: 'Advanced Grammar, Nuanced Motion, Native Consumption.',
    outcome: 'Complex Discourse',
    image: '/images/studying.jpg',
    duration: '10 Weeks',
    level: 'High Intermediate',
    details: 'Understand complex technical discourse and form nuanced arguments on professional and academic topics.',
    highlights: ['Gerunds & Participles', 'Nuanced Motion', 'News Analysis', 'Advanced Rhetoric']
  },
  {
    id: '5',
    name: 'ADVANCED <br /> (C1 - Proficiency)',
    category: 'The Near-Native',
    badge: '50 LESSONS',
    features: 'Stylistics, Cultural Context, Literary Analysis.',
    outcome: 'Dostoevsky Ready',
    image: '/images/cinematic.jpg',
    duration: '12 Weeks',
    level: 'Advanced',
    details: 'Hone your stylistic range and cultural intuition. Participate in high-level literary analysis and complex academic discussion.',
    highlights: ['Cultural Contexts', 'Literary Stylistics', 'Idiom Mastery', 'Critical Synthesis']
  },
  {
    id: '6',
    name: 'CAREER BOOSTER <br /> (Specialized)',
    category: 'Market Unlock',
    badge: 'BESTSELLER',
    features: 'Business Etiquette, CV Writing, Industry Vocab.',
    outcome: 'Elite Leader',
    image: '/images/akinyemi-gbadamosi.jpg',
    duration: '8 Weeks',
    level: 'Professional',
    details: 'Specialized language training for corporate, medical, or diplomatic careers in Russia and CIS countries.',
    highlights: ['Business Etiquette', 'Technical Lexicon', 'Interview Prep', 'Market Context']
  }
];

export const CurriculumGrid: React.FC = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          tagline="CURRICULUM ARCHITECTURE"
          titleBase="The Path to"
          titleAccent="Proficiency"
          description="From Cyrillic foundations to elite operational leadership. Our curriculum is engineered to transform absolute beginners into high-impact global professionals through the ZNANIE framework."
          inline
        />

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          {curriculum.map((module) => (
            <motion.article
              key={module.id}
              className={styles.card}
              variants={item}
            >
              {/* NORMAL STATE */}
              <div className={styles.imageArea}>
                <Image
                  src={module.image}
                  alt={module.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {module.badge && (
                  <span className={styles.moduleBadge}>{module.badge}</span>
                )}
              </div>

              <div className={styles.contentArea}>
                <div className={styles.tagsRow}>
                  <span className={`${styles.tag} ${styles.tagPrimary}`}>
                    {module.category}
                  </span>
                  {module.badge === 'BESTSELLER' && (
                    <span className={`${styles.tag} ${styles.tagSecondary}`}>
                      BESTSELLER
                    </span>
                  )}
                </div>

                <h3 className={styles.cardTitle} dangerouslySetInnerHTML={{ __html: module.name }} />

                <p className={styles.cardMeta}>
                  {module.features}
                </p>

                <div className={styles.cardFooter}>
                  <span className={styles.outcome}>
                    {module.outcome}
                  </span>
                </div>
              </div>

              {/* MOUSE OVER HOVER STATE */}
              <div className={styles.hoverOverlay}>
                <h4 className={styles.hoverTitle} dangerouslySetInnerHTML={{ __html: module.name }} />
                <div className={styles.hoverMeta}>
                  {module.duration} • {module.level}
                </div>
                <p className={styles.hoverDesc}>
                  {module.details}
                </p>
                <ul className={styles.highlightsList}>
                  {module.highlights.map((highlight, i) => (
                    <li key={i} className={styles.highlightItem}>
                      <Check className={styles.checkIcon} size={16} />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
