"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/sections/HeroSection';
import { SplitContent } from '@/components/sections/SplitContent';
import { CTABanner } from '@/components/sections/CTABanner';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './career.module.css';

export default function CareerContent() {


  const jobListings = [
    {
      id: '1',
      role: 'Education Counsellor',
      location: 'Delhi (Hybrid)',
      type: 'Full-Time',
      dept: 'Admissions',
    },
    {
      id: '2',
      role: 'Russian Language Instructor',
      location: 'Remote',
      type: 'Part-Time / Contract',
      dept: 'Education',
    },
    {
      id: '3',
      role: 'Student Relations Manager',
      location: 'Moscow, Russia',
      type: 'Full-Time',
      dept: 'Student Services',
    },
    {
      id: '4',
      role: 'Digital Marketing Executive',
      location: 'Delhi (On-Site)',
      type: 'Full-Time',
      dept: 'Marketing',
    },
  ];

  const fadeUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as any } },
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
      <HeroSection
        imageSrc="/images/martin-adams.jpg"
        tag="WHY ZNAINE"
        title="Become a guide for learners"
        description="Connecting Indian students with life-changing educational opportunities in Russia. We are the bridge that keeps communities and futures linked."
        primaryCtaText="See our programs"
        primaryCtaHref="/study-in-russia"
      />


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
                <Image src="/images/studying.jpg" alt="Library" fill className="object-cover" />
              </div>
              <div className={styles.imageSmall}>
                <Image src="/images/library.jpg" alt="Notes" fill className="object-cover" />
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
              <h2 className={styles.educationTitle}>Customized education for your career goals</h2>
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

      {/* ════════ NEW SECTION 2: WHY CHOOSE THE ZNANIE? ════════ */}
      <section className={styles.reasonsSection}>
        <div className="container">
          <SectionHeader
            tag="THE ADVANTAGE"
            title={<>Why Choose <span className="text-primary">The Znanie?</span></>}
            align="center"
          />

          <motion.p
            className={styles.reasonsSubtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            &quot;We don&apos;t just facilitate education; we architect global careers through a unique India-Russia corridor built on absolute transparency.&quot;
          </motion.p>

          <div className={styles.reasonsGrid}>
            {[
              {
                num: '01',
                title: 'Absolute Transparency',
                desc: 'Our operational timeline has seen vast changes across the globe, yet our structural mission remains resolute in maintaining absolute transparency.'
              },
              {
                num: '02',
                title: 'Professional Growth',
                desc: 'Retraining and professional development programmes for young people and adults, helping them thrive in a fast-changing world.'
              },
              {
                num: '03',
                title: 'Mentoring & Support',
                desc: 'Named scholarships, youth competitions and mentoring in science, technology, education, healthcare and the arts.'
              },
              {
                num: '04',
                title: 'Global Science Bridge',
                desc: 'Funding projects that bring the best of Russian and global science, technology and culture to life.'
              },
              {
                num: '05',
                title: 'Entrepreneurial Spirit',
                desc: 'Teaching modern entrepreneurial skills and giving direct, charitable support to those in need.'
              },
              {
                num: '06',
                title: 'International Cooperation',
                desc: 'Promoting peace, environmental protection, cultural renewal and international cooperation.'
              }
            ].map((r, i) => (
              <motion.div
                key={r.num}
                className={styles.reasonCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={styles.reasonNumber}>{r.num}</div>
                <h3 className={styles.reasonTitle}>{r.title}</h3>
                <p className={styles.reasonDesc}>{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className={styles.jobsSection}>
        <div className="container">
          <SectionHeader
            tag="JOIN OUR TEAM"
            title={<>We are <span className="text-primary">hiring</span></>}
            subtitle="Help us shape the future of India-Russia education. We are always looking for passionate people to join our growing team."
            align="center"
          />

          <div className={styles.jobList}>
            {jobListings.map((job) => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.jobInfo}>
                  <span className={styles.jobDept}>{job.dept}</span>
                  <h3 className={styles.jobRole}>{job.role}</h3>
                  <div className={styles.jobMeta}>
                    <span>📍 {job.location}</span>
                    <span>🕒 {job.type}</span>
                  </div>
                </div>
                <a href="/contact" className={styles.applyBtn}>Apply Now &rarr;</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to make a difference?"
        description="Whether you are a student ready to start your Russia journey or a professional who wants to join our mission — we are here for you."
        ctaText="Contact now"
        ctaHref="/contact"
      />
    </>
  );
}
