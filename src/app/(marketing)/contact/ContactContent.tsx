"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './contact.module.css';

const faqs = [
  {
    q: 'Who can enroll in Znaine programs?',
    a: 'Anyone with an interest in learning Russian or studying in Russia can enroll. We cater to students, professionals, and lifelong learners of all backgrounds.',
  },
  {
    q: 'How do I apply for a Russian university through Znaine?',
    a: 'Browse our programs, select your desired course, and fill in the enquiry form. Our advisors contact you within 24 hours to guide you through the full application process.',
  },
  {
    q: 'Are the programs available online?',
    a: 'Russian language courses are fully online. University admission consulting is handled online, with offline support available in Delhi and select cities.',
  },
  {
    q: 'Do I need prior Russian knowledge to apply?',
    a: 'No. Our beginner language courses and university prep programs require no prior knowledge of Russian. We teach from zero.',
  },
  {
    q: 'Will my Russian degree be recognised in India?',
    a: 'Yes. All our partner universities are WHO-listed and NMC-recognised (for medical programs), ensuring full global validity and Indian recognition.',
  },
];

export default function ContactContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* ════════ SECTION 1 — HERO — PREMIUM REDESIGN ════════ */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg}>
          <Image
            src="/images/chris-montgomery.jpg"
            alt="Contact Us"
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
            <span className={styles.heroTag}>Connect With Us</span>
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
          >
            Get in touch <br />with <span className="rt-text-yellow">us</span>
          </motion.h1>

          <motion.p
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            Have questions about studying in Russia? We&apos;re here to help you every step of the way.    </motion.p>
        </div>
      </section>

      {/* ════════ SECTION 2 — HAPPY TO HEAR FROM YOU ════════ */}
      <section className={styles.contactFormSection}>
        <div className="container">
          <div className={styles.mainGrid}>
            {/* Left Column: Image & Socials */}
            <motion.div
              className={styles.imageCol}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.contactSideImage}>
                <Image
                  src="/images/alexis-brown.jpg"
                  alt="Contact Us"
                  fill
                  className={styles.sideImage}
                />
              </div>
              <p className={styles.sideDescription}>
                We&apos;re always ready to help with any queries. Whether it&apos;s about courses, admissions, or support — our team is just a message away.
              </p>
              <div className={styles.socialFollowText}>Follow our social account :</div>
              <div className={styles.socials}>
                {[
                  { icon: 'bi-instagram', label: 'Instagram' },
                  { icon: 'bi-twitter-x', label: 'Twitter' },
                  { icon: 'bi-linkedin', label: 'LinkedIn' }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    className={styles.socialLink}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, translateY: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className={`bi ${social.icon}`}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Form Card */}
            <motion.div
              className={styles.formCol}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.formCard}>
                <h2 className={styles.formHeading}>Happy to hear from you</h2>

                {submitted ? (
                  <motion.div
                    className={styles.successMsg}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className={styles.successIcon}>✓</div>
                    <h3>Message Sent!</h3>
                    <p>Our team will reach out within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                      <input
                        type="text"
                        required
                        placeholder="Full name*"
                        className={styles.input}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Phone*"
                        className={styles.input}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className={styles.formRow}>
                      <input
                        type="email"
                        required
                        placeholder="Email address*"
                        className={styles.input}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <select
                        className={styles.input}
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      >
                        <option value="">Choose course*</option>
                        <option>University Admission</option>
                        <option>Russian Language Course</option>
                        <option>Visa Assistance</option>
                        <option>General Enquiry</option>
                      </select>
                    </div>
                    <textarea
                      required
                      rows={5}
                      placeholder="Your message"
                      className={styles.textarea}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    <motion.button
                      type="submit"
                      className={styles.submitBtn}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send message &rarr;
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 3 — INFO GRID ════════ */}
      <section className={styles.infoGridSection}>
        <div className="container">
          <div className={styles.infoGrid}>
            {[
              {
                icon: 'bi-telephone',
                label: 'Phone',
                value: (
                  <>
                    8925269033<br />
                    9344882288
                  </>
                ),
                href: 'tel:+918925269033'
              },
              {
                icon: 'bi-envelope',
                label: 'Email',
                value: 'info@znaine.com',
                href: 'mailto:info@znaine.com'
              },
              {
                icon: 'bi-geo-alt',
                label: 'Address',
                value: (
                  <>
                    No. 8, Solakalipalayam Road,<br /><br />
                    Thannasi Kovil Street, Kodumudi,<br /><br />
                    Erode District, Tamil Nadu, India - 638151
                  </>
                ),
                href: null
              }
            ].map((info, idx) => {
              const Content = (
                <>
                  <div className={styles.infoIconRed}>
                    <i className={`bi ${info.icon}`}></i>
                  </div>
                  <div className={styles.infoCardContent}>
                    <span className={styles.infoCardLabel}>{info.label}</span>
                    <span className={styles.infoCardValue}>{info.value}</span>
                  </div>
                </>
              );

              if (info.href) {
                return (
                  <motion.a
                    key={idx}
                    href={info.href}
                    className={styles.infoCardVistario}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                  >
                    {Content}
                  </motion.a>
                );
              }

              return (
                <motion.div
                  key={idx}
                  className={styles.infoCardVistario}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  {Content}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className="container">
          <SectionHeader
            tag="FREQUENTLY ASKED QUESTIONS"
            title={<>Frequently Asked <span className="text-primary">Questions</span></>}
            subtitle="Find clear answers to common queries and learn more about our services easily."
            align="center"
          />

          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <span className={styles.faqIcon}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
