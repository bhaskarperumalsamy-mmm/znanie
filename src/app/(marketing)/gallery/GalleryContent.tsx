"use client";

import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./gallery.module.css";

/* ─── Gallery Image Data ─── */
const galleryImages = [
  { src: "/images/zn_teaching.jpg", alt: "ZNANIE Teaching Session", category: "Education" },
  { src: "/images/zn_learning.jpg", alt: "Students Learning Together", category: "Education" },
  { src: "/images/zn_student.JPG", alt: "ZNANIE Student Life", category: "Education" },
  { src: "/images/zn_language.jpg", alt: "Russian Language Class", category: "Education" },
  { src: "/images/studying.jpg", alt: "Focused Study Session", category: "Education" },
  { src: "/images/studying-together.jpg", alt: "Collaborative Learning", category: "Education" },
  { src: "/images/students-studying.jpg", alt: "Students in Discussion", category: "Education" },
  { src: "/images/element5.jpg", alt: "Academic Excellence", category: "Education" },
  { src: "/images/girl-writing-notebook.jpg", alt: "Student Taking Notes", category: "Education" },
  { src: "/images/book-read.jpg", alt: "Reading and Research", category: "Education" },
  { src: "/images/fortress_derbent.jpg", alt: "Derbent Fortress — Russian Heritage", category: "Culture" },
  { src: "/images/kenozero_lake.jpg", alt: "Kenozero Lake — Natural Beauty", category: "Culture" },
  { src: "/images/mary-bertova.jpg", alt: "Russian Cultural Scene", category: "Culture" },
  { src: "/images/radik-sitdikov.jpg", alt: "Cultural Landmark", category: "Culture" },
  { src: "/images/mira-kireeva.jpg", alt: "Russian Architecture", category: "Culture" },
  { src: "/images/daniil-smetanin.jpg", alt: "Urban Russia", category: "Culture" },
  { src: "/images/evgeny-strzhalkovsky.jpg", alt: "Heritage Site", category: "Culture" },
  { src: "/images/alexis-brown.jpg", alt: "Student Interaction", category: "Campus" },
  { src: "/images/mimi-thian.jpg", alt: "Group Collaboration", category: "Campus" },
  { src: "/images/stocksnap-people.jpg", alt: "Campus Community", category: "Campus" },
  { src: "/images/chris-montgomery.jpg", alt: "Virtual Learning Setup", category: "Campus" },
  { src: "/images/annika-gordon.jpg", alt: "Library Resources", category: "Campus" },
  { src: "/images/jarmoluk-library.jpg", alt: "University Library", category: "Campus" },
  { src: "/images/thisisengineering.jpg", alt: "Engineering Lab", category: "Campus" },
  { src: "/images/startup-stock.jpg", alt: "Team Workspace", category: "Campus" },
  { src: "/images/friends-cheering-world.jpg", alt: "International Community", category: "Events" },
  { src: "/images/cosmetica-india-academy.jpg", alt: "Academy Events", category: "Events" },
  { src: "/images/rishikesh-yogpeeth.jpg", alt: "Cultural Exchange Program", category: "Events" },
  { src: "/images/bruno-nascimento.jpg", alt: "Student Activities", category: "Events" },
  { src: "/images/katerina-holmes.jpg", alt: "Workshop Session", category: "Events" },
  { src: "/images/low-angle-medium.jpg", alt: "Graduation Ceremony", category: "Events" },
  { src: "/images/cottonbro.jpg", alt: "Student Presentation", category: "Events" },
  { src: "/images/elly-fairytale.jpg", alt: "Cultural Celebration", category: "Events" },
];

export default function GalleryContent() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    );
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + galleryImages.length) % galleryImages.length
        : null
    );
  }, []);

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <>
      {/* ─── Hero (matches About Us style) ─── */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg}>
          <Image
            src="/images/students-studying.jpg"
            alt="Gallery Hero"
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
            <span className={styles.heroTag}>VISUAL JOURNEY</span>
          </motion.div>

          {/* Logo image above heading */}
          <motion.div
            className={styles.heroLogoWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
          >
            <Image
              src="/images/znaine-logo.png"
              alt="ZNANIE Logo"
              width={80}
              height={80}
              className={styles.heroLogo}
            />
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.33, 1, 0.68, 1] }}
          >
            Our <span className={styles.heroTitleAccent}>Gallery</span>
          </motion.h1>

          <motion.p
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            A curated collection capturing our educational excellence, cultural
            heritage, and the vibrant spirit of Indo-Russian cooperation.
          </motion.p>
        </div>
      </section>

      {/* ─── Gallery Grid with Single Header ─── */}
      <section className={styles.gallerySection}>
        {/* Section Header */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
        >
          <span className={styles.sectionTag}>EXPERIENCES</span>
          <h2 className={styles.sectionTitle}>Events &amp; People</h2>
          <p className={styles.sectionDesc}>Workshops, ceremonies, and cultural exchanges that bring us together.</p>
          <div className={styles.sectionDivider} />
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          className={styles.masonryGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.src}
              className={styles.gridItem}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              onClick={() => openLightbox(index)}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.galleryImage}
                />
                <div className={styles.imageOverlay}>
                  <div className={styles.imageCaption}>
                    <p className={styles.captionText}>{img.alt}</p>
                    <span className={styles.expandIcon}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 3 21 3 21 9" />
                        <polyline points="9 21 3 21 3 15" />
                        <line x1="21" y1="3" x2="14" y2="10" />
                        <line x1="3" y1="21" x2="10" y2="14" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                fill
                sizes="90vw"
                className={styles.lightboxImage}
                priority
              />
            </motion.div>

            {/* Controls */}
            <button
              className={`${styles.lightboxBtn} ${styles.lightboxClose}`}
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <button
              className={`${styles.lightboxBtn} ${styles.lightboxPrev}`}
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className={`${styles.lightboxBtn} ${styles.lightboxNext}`}
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Caption Bar */}
            <div className={styles.lightboxCaption}>
              <span className={styles.lightboxTitle}>
                {galleryImages[lightboxIndex].alt}
              </span>
              <span className={styles.lightboxCounter}>
                {lightboxIndex + 1} / {galleryImages.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
