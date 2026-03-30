"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  onSubmit?: (data: FormData) => void;
}

interface FormData {
  name: string;
  email: string;
  course: string;
  subject: string;
  message: string;
}

const courseOptions = [
  'Russian Language Course',
  'University Admission',
  'Visa Assistance',
  'Cultural Exchange',
  'General Enquiry',
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    course: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    onSubmit?.(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: easeOut }}
      >
        <span className={styles.tag}>HAPPY TO HEAR FROM YOU</span>
        <h2 className={styles.title}>
          Send us a <span className={styles.highlight}>message</span>
        </h2>
        <p className={styles.subtitle}>
          Fill in the form below and one of our advisors will get back to you within 24 hours.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            className={styles.successMessage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            <motion.div
              className={styles.successIcon}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>
            <h3>Thank you for reaching out!</h3>
            <p>Our team will get back to you within 24 hours.</p>
          </motion.div>
        ) : (
          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
          >
            <div className={styles.formGrid}>
              <motion.div
                className={`${styles.formGroup} ${errors.name ? styles.hasError : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
              >
                <label className={styles.label} htmlFor="name">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.input}
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </motion.div>

              <motion.div
                className={`${styles.formGroup} ${errors.email ? styles.hasError : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
              >
                <label className={styles.label} htmlFor="email">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.input}
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </motion.div>
            </div>

            <motion.div
              className={styles.formGrid}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, ease: easeOut }}
            >
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="course">
                  Choose Course
                </label>
                <select
                  id="course"
                  name="course"
                  className={styles.select}
                  value={formData.course}
                  onChange={handleChange}
                >
                  <option value="">Select a course</option>
                  {courseOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`${styles.formGroup} ${errors.subject ? styles.hasError : ''}`}>
                <label className={styles.label} htmlFor="subject">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  className={styles.select}
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="">Select a topic</option>
                  {courseOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.subject && <span className={styles.error}>{errors.subject}</span>}
              </div>
            </motion.div>

            <motion.div
              className={`${styles.formGroup} ${errors.message ? styles.hasError : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6, ease: easeOut }}
            >
              <label className={styles.label} htmlFor="message">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                className={styles.textarea}
                rows={5}
                placeholder="Tell us about yourself and how we can help..."
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <span className={styles.error}>{errors.message}</span>}
            </motion.div>

            <motion.button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7, ease: easeOut }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <span className={styles.loading}>
                  <span className={styles.spinner} />
                  Sending...
                </span>
              ) : (
                <>
                  Send Message
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
