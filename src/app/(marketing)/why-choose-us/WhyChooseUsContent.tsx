"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/sections/HeroSection';
import { SplitContent } from '@/components/sections/SplitContent';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './why-choose-us.module.css';

export default function WhyChooseUsContent() {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  const backgroundVideoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (backgroundVideoRef.current) {
      if (isVideoOpen) {
        backgroundVideoRef.current.pause();
      } else {
        backgroundVideoRef.current.play();
      }
    }
  }, [isVideoOpen]);




  const fadeUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } },
  };

  const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const reasons = [
    {
      text: 'Our operational timeline has seen vast changes across the globe, yet our structural mission remains resolute in maintaining absolute transparency.'
    },
    {
      text: 'Retraining and professional development programmes for young people and adults, helping them thrive in a fast-changing world.'
    },
    {
      text: 'Named scholarships, youth competitions and mentoring in science, technology, education, healthcare and the arts.'
    },
    {
      text: 'Funding projects that bring the best of Russian and global science, technology and culture to life.'
    },
    {
      text: 'Teaching modern entrepreneurial skills and giving direct, charitable support to those in need.'
    },
    {
      text: 'Promoting peace, environmental protection, cultural renewal and international cooperation.'
    }
  ];

  return (
    <>
      {/* ════════ SECTION 1 — HERO — SHARED REDESIGN ════════ */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg}>
          <Image
            src="/images/women-pointing.jpg"
            alt="Heritage"
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
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            <span className={styles.heroTag}>guide for learners</span>
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
          >
            Your Gateway to<br />World-Class <span className="rt-text-yellow">Education</span>
          </motion.h1>

          <motion.p
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            Premium global education at a fraction of Western costs. Degrees recognized in Medicine, Aerospace, and Theoretical Physics.
          </motion.p>
        </div>
      </section>

      {/* ════════ EXPERT GUIDANCE SECTION (Vistario home-two style) ════════ */}
      <section className={styles.guidanceSection}>
        <div className="container-large">
          <div className={styles.guidanceGrid}>
            <motion.div
              className={styles.guidanceLeft}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className={styles.guidanceTag}>WATCH. LEARN. ACHIEVE</span>
              <h2 className={styles.guidanceTitle}>
                Expert guidance for your <span style={{ color: 'var(--_color---crimson-red)' }}>educational</span> path
              </h2>
            </motion.div>

            <motion.div
              className={styles.guidanceRight}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className={styles.guidanceDesc}>
                In a world full of promises, we believe in proof. We have stayed true to our founding principles — putting students first, maintaining complete transparency, and building a bridge between India and Russia.
                <br /><br />
                &quot;We don&apos;t just promise — we prove. Every year. Every student. Every decision.&quot;
              </p>

            </motion.div>
          </div>

          <motion.div
            className={styles.videoContainer}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            onClick={() => setIsVideoOpen(true)}
            style={{ cursor: 'pointer' }}
          >
            <video
              ref={backgroundVideoRef}
              className={styles.guidanceVideo}
              autoPlay
              muted
              loop
              playsInline
              poster="/images/studying.jpg"
            >
              <source
                src="https://cdn.prod.website-files.com/68b824698be8e7c047a5da51%2F68d4dad6779e4db442e80ab8_koursio-home-two-video-transcode.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className={styles.videoOverlay}>
              <div className={styles.playButton}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Video Modal Overlay */}
        {isVideoOpen && (
          <div className={styles.videoModal} onClick={() => setIsVideoOpen(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={() => setIsVideoOpen(false)}>✕</button>
              <video
                controls
                autoPlay
                className={styles.modalVideo}
                src="https://cdn.prod.website-files.com/68b824698be8e7c047a5da51%2F68d4dad6779e4db442e80ab8_koursio-home-two-video-transcode.mp4"
              />
            </div>
          </div>
        )}
      </section>

      {/* ════════ SECTION 2: WHY CHOOSE THE ZNANIE? ════════ */}
      <section className={styles.educationSection}>
        <div className="container-large">
          <div className={styles.educationGrid}>
            <motion.div
              className={styles.imageGrid}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.imageLarge}>
                <Image src="/images/learning_woman.jpg" alt="Focus" fill className="object-cover" />
              </div>
              <div className={styles.imageSmall}>
                <Image src="/images/annika-gordon.jpg" alt="Library" fill className="object-cover" />
              </div>
              <div className={styles.imageSmall}>
                <Image src="/images/yogpeeth.jpg" alt="Notes" fill className="object-cover" />
              </div>
            </motion.div>

            <motion.div
              className={styles.educationContent}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className={styles.educationTag}>BEST PLACE FOR LEARNING</span>
              <h2 className={styles.educationTitle}>
                Why Choose <span style={{ color: 'var(--_color---crimson-red)' }}>The Znanie?</span>
              </h2>
              <p className={styles.educationDesc}>
                &quot;We don&apos;t just facilitate education; we architect global careers through a unique India-Russia corridor built on absolute transparency.&quot;
              </p>

              <div className={styles.benefitList}>
                {reasons.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className={styles.benefitItem}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                  >
                    <div className={styles.benefitIcon}>
                      <Image
                        src="https://cdn.prod.website-files.com/68b824698be8e7c047a5da51/68e7af75e2506f3c270d0299_rt-about-one-innovation-bullet.svg"
                        alt="Bullet"
                        width={25}
                        height={25}
                      />
                    </div>
                    <div className={styles.benefitText}>
                      <p>{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Strategic Sovereignty (Vistario courses-one style) ─── */}
      <section className={styles.sovereigntySection}>
        <div className="container-large">
          <div className={styles.sectionHeaderCentered}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="tag-line" style={{ display: 'block', marginBottom: '16px' }}>THE FIVE PILLARS OF DIFFERENCE</span>
              <h2 className="heading-h2">
                Strategic <span className="rt-red-text">Sovereignty</span>
              </h2>
              <p className={styles.paragraphLarge} style={{ maxWidth: '600px', margin: '0 auto' }}>
                Znanie operates with an architectural registry of principles that ensure our students receive more than just admission — they receive a future built on proof and transparency.
              </p>
            </motion.div>
          </div>

          <div className={styles.sovereigntyGrid}>
            {[
              {
                id: '01',
                title: 'India–Russia Focused Educational Mission',
                tagline: 'ONE MISSION. TWO NATIONS. UNLIMITED POTENTIAL.',
                desc: 'Strengthening the educational and cultural bridge between India and Russia.',
                image: '/images/studying.jpg',
                tag: 'Mission Pillar',
                points: [
                  'Deep expertise in academic pathways',
                  'Strong institutional relationships',
                  'Cross-border success programs',
                  'Specialized cultural context'
                ]
              },
              {
                id: '02',
                title: 'Certified and Experienced Trainers',
                tagline: 'EXPERT GUIDANCE FROM FIELD VETERANS.',
                desc: 'Passionate educators with real-world experience and recognized certifications.',
                image: '/images/eliason.jpg',
                tag: 'Faculty Pillar',
                points: [
                  'Certified international instructors',
                  'Years of practical teaching',
                  'Native Russian language coaches',
                  'Continuous quality checks'
                ]
              },
              {
                id: '03',
                title: 'University & Employer Guidance',
                tagline: 'BEYOND ADMISSIONS. TOWARDS SUCCESS.',
                desc: 'End-to-end guidance from selecting the institution to final career placement.',
                image: '/images/mimi-thian.jpg',
                tag: 'Success Pillar',
                points: [
                  'Personalized university selection',
                  'Complete admission support',
                  'Visa & residency processing',
                  'Post-graduation career guidance'
                ]
              },
              {
                id: '04',
                title: 'Transparent and Ethical Non-Profit',
                tagline: 'ETHICS OVER PROFITS. EVERY TIME.',
                desc: 'A registered non-profit where every decision is guided by ethics, not margins.',
                image: '/images/stocksnap-people.jpg',
                tag: 'Ethics Pillar',
                points: [
                  '100% financial transparency',
                  'Zero hidden commission fees',
                  'Published annual reports',
                  'Honest student recommendations'
                ]
              }
            ].map((pillar, index) => (
              <motion.div
                key={pillar.id}
                className={styles.sovereigntyCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className={styles.cardImageWrapper}>
                  <img src={pillar.image} alt={pillar.title} className={styles.cardImage} />
                  <div className={styles.cardBadge}>PILLAR {pillar.id}</div>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardTags}>
                    <span className={styles.cardTag}>{pillar.tag}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{pillar.title}</h3>
                  <p className={styles.cardDesc}>{pillar.desc}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardAuthor}>Znanie Advantage</span>
                    <span className={styles.cardCta}>→</span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className={styles.cardHoverOverlay}>
                  <h4 className={styles.hoverTitle}>{pillar.title}</h4>
                  <p className={styles.hoverMeta}>Znanie Strategic Pillar • 2026</p>
                  <p className={styles.hoverDesc}>{pillar.desc}</p>
                  <ul className={styles.hoverPoints}>
                    {pillar.points.map((pt, i) => (
                      <li key={i} className={styles.hoverPoint}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>



      {/* ─── Bilateral Benchmarks REDESIGN ─── */}
      <section className={styles.benchmarksSection}>
        <div className="container-large">
          <div className={styles.sectionHeaderCentered}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="tag-line" style={{ display: 'block', marginBottom: '16px' }}>STRATEGIC MASTER REGISTRY</span>
              <h2 className="heading-h2">
                Bilateral <span className="rt-red-text">Benchmarks</span>
              </h2>
              <p className="paragraph-large" style={{ maxWidth: '600px', margin: '0 auto' }}>
                A comparative protocol documenting the divergence between conventional agencies and our specialized Indian–Russian framework.
              </p>
            </motion.div>
          </div>

          <div className={styles.benchmarksGridCentered}>
            {/* Standard Tier */}
            <motion.div
              className={styles.benchmarkCardRedesigned}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.benchmarkHeader}>
                <span className={styles.benchmarkType}>Institutional Protocol</span>
                <h3 className={styles.benchmarkTitleLarge}>Industry Norms</h3>
                <p className={styles.benchmarkSubline}>Standard educational consulting agencies offering mass-market services.</p>
              </div>

              <div className={styles.comparisonList}>
                {[
                  { metric: 'Lifecycle Support', value: 'Support ending at college enrollment' },
                  { metric: 'Governance', value: 'Commission-based agency models' },
                  { metric: 'Strategy', value: 'Standardized mass-processing' },
                  { metric: 'Integrity', value: 'Opaque fee structures & limited audit' },
                  { metric: 'Faculty', value: 'Generic freelance teaching consultants' },
                  { metric: 'Connection', value: 'End-of-service post-enrollment' }
                ].map((item, i) => (
                  <div key={i} className={styles.comparisonItem}>
                    <span className={styles.itemMetric}>{item.metric}</span>
                    <div className={styles.itemValue}>
                      <span className={styles.itemStatusIcon}>✕</span>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Premium Tier (Znanie) */}
            <motion.div
              className={`${styles.benchmarkCardRedesigned} ${styles.premium}`}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.premiumBadge}>RECOMMENDED PROTOCOL</div>
              <div className={styles.benchmarkHeader}>
                <span className={styles.benchmarkType}>Bilateral Excellence</span>
                <h3 className={styles.benchmarkTitleLarge}>ZNANIE Framework</h3>
                <p className={styles.benchmarkSubline}>Exclusive India–Russia focus with high-integrity stewardship.</p>
              </div>

              <div className={styles.comparisonList}>
                {[
                  { metric: 'Lifecycle Support', value: 'End-to-end stewardship to employment' },
                  { metric: 'Governance', value: 'Registered non-profit ethical protocol' },
                  { metric: 'Strategy', value: 'Personalized academic routing' },
                  { metric: 'Integrity', value: '100% financial transparency & audit' },
                  { metric: 'Faculty', value: 'Internationally certified academic stewards' },
                  { metric: 'Connection', value: 'Lifelong bond elite alumni network' }
                ].map((item, i) => (
                  <div key={i} className={styles.comparisonItem}>
                    <span className={styles.itemMetric}>{item.metric}</span>
                    <div className={styles.itemValue}>
                      <span className={styles.itemStatusIcon}>✓</span>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Our Promise to You (Resonance Redesign) ─── */}
      <section className={styles.promiseSection}>
        <div className={styles.promiseBg}>
          <Image
            src="/images/jarmoluk-library.jpg"
            alt="Promise Background"
            fill
            className={styles.promiseBgImage}
          />
          <div className={styles.promiseOverlay} />
        </div>

        <div className="container-large">
          <div className={styles.promiseHeader}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className={styles.promiseTag}>COMMITMENT TO EXCELLENCE</span>
              <h2 className={styles.promiseTitle}>
                Our <em>Promise</em> to You
              </h2>
              <p className={styles.promiseSubtitle}>
                Architecting global careers through a unique India-Russia corridor built on absolute transparency and multi-generational trust.
              </p>
            </motion.div>
          </div>

          <motion.div
            className={styles.promiseGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {[
              {
                id: '01',
                text: 'To always put your education above our convenience.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12.5V16a6 6 0 0 0 12 0v-3.5" />
                  </svg>
                )
              },
              {
                id: '02',
                text: 'To recommend only what is truly best for you.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                )
              },
              {
                id: '03',
                text: 'To be honest, even when honesty is hard.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                )
              },
              {
                id: '04',
                text: 'To remain transparent in every transaction.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                )
              },
              {
                id: '05',
                text: 'To support you not just until admission — but for life.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 12a4 4 0 1 1-8 0" />
                  </svg>
                )
              },
              {
                id: '06',
                text: 'To treat you as a person, never as a number.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                )
              }
            ].map((promise, index) => (
              <motion.div
                key={promise.id}
                className={styles.promiseCard}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                <div className={styles.promiseIconFloat}>
                  <div className={styles.promiseIconCircle}>
                    {promise.icon}
                  </div>
                </div>
                <div className={styles.promiseCardInner}>
                  <div className={styles.promiseNum}>PROMISE {promise.id}</div>
                  <div className={styles.promiseDivider} />
                  <p className={styles.promiseText}>{promise.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Office Bearers Section ─── */}
      <section className={styles.officeBearersSection}>
        <div className="container-large">
          <div className={styles.sectionHeaderCentered}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="tag-line" style={{ display: 'block', marginBottom: '16px' }}>GOVERNANCE & STEWARDSHIP</span>
              <h2 className="heading-h2">
                Office <span className="rt-red-text">Bearers</span>
              </h2>
            </motion.div>
          </div>

          <motion.div
            className={styles.divisionHeader}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h3 className={styles.divisionTitle}>Russia <em>Division</em></h3>
          </motion.div>

          <div className={styles.teamGrid}>
            {[
              {
                name: "MR. KUMYKOV KAZBEK KHUSEINOVICH",
                title: "CHAIRMAN (PRESIDENT)",
                image: "/images/team/kumykov_kazbek.jpg"
              },
              {
                name: "MR. YUSHKOV PAVEL ALEXANDROVICH",
                title: "CHIEF EXECUTIVE OFFICER",
                image: "/images/team/yushko_ pavel.jpg"
              },
              {
                name: "MR. P. RAMESH KUMAR",
                title: "GLOBAL REPRESENTATIVE",
                image: "/images/team/ramesh_kumar.jpg"
              }
            ].map((member, i) => (
              <motion.div
                key={i}
                className={styles.teamCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={styles.memberImageContainer}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className={styles.memberImage}
                  />
                </div>
                <div className={styles.memberText}>
                  <div className={styles.memberTitle}>{member.title}</div>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <div className={styles.memberDivider}></div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={styles.divisionHeader}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h3 className={styles.divisionTitle}>India <em>Division</em></h3>
          </motion.div>

          <div className={styles.teamGrid}>
            {[
              {
                name: "DR. NIJIL JOBI BENSAM",
                title: "INDIA REPRESENTATIVE & ALL-INDIA PRESIDENT",
                image: "/images/team/nijil_jobi.jpg"
              },
              {
                name: "DR. M. SHANTHAKUMAR",
                title: "ALL-INDIA CHIEF EXECUTIVE & DIRECTOR",
                image: "/images/team/shanthakumar.jpg"
              },
              {
                name: "DR. T.M. UVARAJ",
                title: "ALL-INDIA PROGRAMME COORDINATOR",
                image: "/images/team/uvaraj.jpg"
              },
              {
                name: "MR. VIJAY BHASKAR PERUMALSAMY",
                title: "ALL-INDIA ICT WING COORDINATOR",
                image: "/images/team/bhaskar.jpg"
              },

              {
                name: "DR. M. SANTHALAKSHMI",
                title: "All India People & Culture Director",
                image: "/images/team/Santhalakshmi.jpg"
              }
            ].map((member, i) => (
              <motion.div
                key={i}
                className={styles.teamCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={styles.memberImageContainer}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className={styles.memberImage}
                  />
                </div>
                <div className={styles.memberText}>
                  <div className={styles.memberTitle}>{member.title}</div>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <div className={styles.memberDivider}></div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


    </>
  );
}
