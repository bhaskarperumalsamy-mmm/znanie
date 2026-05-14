"use client";

import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./gallery.module.css";

/* ─── Gallery Image Data ─── */
const galleryImages = [
  { src: "/images/gallery/znanie_001.jpg", alt: "ZNANIE Gallery Image 1", category: "Gallery" },
  { src: "/images/gallery/znanie_002.jpg", alt: "ZNANIE Gallery Image 2", category: "Gallery" },
  { src: "/images/gallery/znanie_003.jpg", alt: "ZNANIE Gallery Image 3", category: "Gallery" },
  { src: "/images/gallery/znanie_004.jpg", alt: "ZNANIE Gallery Image 4", category: "Gallery" },
  { src: "/images/gallery/znanie_005.jpg", alt: "ZNANIE Gallery Image 5", category: "Gallery" },
  { src: "/images/gallery/znanie_006.jpg", alt: "ZNANIE Gallery Image 6", category: "Gallery" },
  { src: "/images/gallery/znanie_007.jpg", alt: "ZNANIE Gallery Image 7", category: "Gallery" },
  { src: "/images/gallery/znanie_008.jpg", alt: "ZNANIE Gallery Image 8", category: "Gallery" },
  { src: "/images/gallery/znanie_009.jpg", alt: "ZNANIE Gallery Image 9", category: "Gallery" },
  { src: "/images/gallery/znanie_010.jpg", alt: "ZNANIE Gallery Image 10", category: "Gallery" },
  { src: "/images/gallery/znanie_011.jpg", alt: "ZNANIE Gallery Image 11", category: "Gallery" },
  { src: "/images/gallery/znanie_012.jpg", alt: "ZNANIE Gallery Image 12", category: "Gallery" },
  { src: "/images/gallery/znanie_013.jpg", alt: "ZNANIE Gallery Image 13", category: "Gallery" },
  { src: "/images/gallery/znanie_014.jpg", alt: "ZNANIE Gallery Image 14", category: "Gallery" },
  { src: "/images/gallery/znanie_015.jpg", alt: "ZNANIE Gallery Image 15", category: "Gallery" },
  { src: "/images/gallery/znanie_016.jpg", alt: "ZNANIE Gallery Image 16", category: "Gallery" },
  { src: "/images/gallery/znanie_017.jpg", alt: "ZNANIE Gallery Image 17", category: "Gallery" },
  { src: "/images/gallery/znanie_018.jpg", alt: "ZNANIE Gallery Image 18", category: "Gallery" },
  { src: "/images/gallery/znanie_019.jpg", alt: "ZNANIE Gallery Image 19", category: "Gallery" },
  { src: "/images/gallery/znanie_020.jpg", alt: "ZNANIE Gallery Image 20", category: "Gallery" },
  { src: "/images/gallery/znanie_021.jpg", alt: "ZNANIE Gallery Image 21", category: "Gallery" },
  { src: "/images/gallery/znanie_022.jpg", alt: "ZNANIE Gallery Image 22", category: "Gallery" },
  { src: "/images/gallery/znanie_023.jpg", alt: "ZNANIE Gallery Image 23", category: "Gallery" },
  { src: "/images/gallery/znanie_024.jpg", alt: "ZNANIE Gallery Image 24", category: "Gallery" },
  { src: "/images/gallery/znanie_025.jpg", alt: "ZNANIE Gallery Image 25", category: "Gallery" },
  { src: "/images/gallery/znanie_026.jpg", alt: "ZNANIE Gallery Image 26", category: "Gallery" },
  { src: "/images/gallery/znanie_027.jpg", alt: "ZNANIE Gallery Image 27", category: "Gallery" },
  { src: "/images/gallery/znanie_028.jpg", alt: "ZNANIE Gallery Image 28", category: "Gallery" },
  { src: "/images/gallery/znanie_029.jpg", alt: "ZNANIE Gallery Image 29", category: "Gallery" },
  { src: "/images/gallery/znanie_030.jpg", alt: "ZNANIE Gallery Image 30", category: "Gallery" },
  { src: "/images/gallery/znanie_031.jpg", alt: "ZNANIE Gallery Image 31", category: "Gallery" },
  { src: "/images/gallery/znanie_032.jpg", alt: "ZNANIE Gallery Image 32", category: "Gallery" },
  { src: "/images/gallery/znanie_033.jpg", alt: "ZNANIE Gallery Image 33", category: "Gallery" },
  { src: "/images/gallery/znanie_034.jpg", alt: "ZNANIE Gallery Image 34", category: "Gallery" },
  { src: "/images/gallery/znanie_035.jpg", alt: "ZNANIE Gallery Image 35", category: "Gallery" },
  { src: "/images/gallery/znanie_036.jpg", alt: "ZNANIE Gallery Image 36", category: "Gallery" },
  { src: "/images/gallery/znanie_037.jpg", alt: "ZNANIE Gallery Image 37", category: "Gallery" },
  { src: "/images/gallery/znanie_038.jpg", alt: "ZNANIE Gallery Image 38", category: "Gallery" },
  { src: "/images/gallery/znanie_039.jpg", alt: "ZNANIE Gallery Image 39", category: "Gallery" },
  { src: "/images/gallery/znanie_040.jpg", alt: "ZNANIE Gallery Image 40", category: "Gallery" },
  { src: "/images/gallery/znanie_041.jpg", alt: "ZNANIE Gallery Image 41", category: "Gallery" },
  { src: "/images/gallery/znanie_042.jpg", alt: "ZNANIE Gallery Image 42", category: "Gallery" },
  { src: "/images/gallery/znanie_043.jpg", alt: "ZNANIE Gallery Image 43", category: "Gallery" },
  { src: "/images/gallery/znanie_044.jpg", alt: "ZNANIE Gallery Image 44", category: "Gallery" },
  { src: "/images/gallery/znanie_045.jpg", alt: "ZNANIE Gallery Image 45", category: "Gallery" },
  { src: "/images/gallery/znanie_047.jpg", alt: "ZNANIE Gallery Image 46", category: "Gallery" },
  { src: "/images/gallery/znanie_048.jpg", alt: "ZNANIE Gallery Image 47", category: "Gallery" },
  { src: "/images/gallery/znanie_049.jpg", alt: "ZNANIE Gallery Image 48", category: "Gallery" },
  { src: "/images/gallery/znanie_050.jpg", alt: "ZNANIE Gallery Image 49", category: "Gallery" },
  { src: "/images/gallery/znanie_051.jpg", alt: "ZNANIE Gallery Image 50", category: "Gallery" },
  { src: "/images/gallery/znanie_052.jpg", alt: "ZNANIE Gallery Image 51", category: "Gallery" },
  { src: "/images/gallery/znanie_053.jpg", alt: "ZNANIE Gallery Image 52", category: "Gallery" },
  { src: "/images/gallery/znanie_054.jpg", alt: "ZNANIE Gallery Image 53", category: "Gallery" },
  { src: "/images/gallery/znanie_055.jpg", alt: "ZNANIE Gallery Image 54", category: "Gallery" },
  { src: "/images/gallery/znanie_056.jpg", alt: "ZNANIE Gallery Image 55", category: "Gallery" },
  { src: "/images/gallery/znanie_057.jpg", alt: "ZNANIE Gallery Image 56", category: "Gallery" },
  { src: "/images/gallery/znanie_058.jpg", alt: "ZNANIE Gallery Image 57", category: "Gallery" },
  { src: "/images/gallery/znanie_059.jpg", alt: "ZNANIE Gallery Image 58", category: "Gallery" },
  { src: "/images/gallery/znanie_060.jpg", alt: "ZNANIE Gallery Image 59", category: "Gallery" },
  { src: "/images/gallery/znanie_061.jpg", alt: "ZNANIE Gallery Image 60", category: "Gallery" },
  { src: "/images/gallery/znanie_062.jpg", alt: "ZNANIE Gallery Image 61", category: "Gallery" },
  { src: "/images/gallery/znanie_063.jpg", alt: "ZNANIE Gallery Image 62", category: "Gallery" },
  { src: "/images/gallery/znanie_064.jpg", alt: "ZNANIE Gallery Image 63", category: "Gallery" },
  { src: "/images/gallery/znanie_065.jpg", alt: "ZNANIE Gallery Image 64", category: "Gallery" },
  { src: "/images/gallery/znanie_066.jpg", alt: "ZNANIE Gallery Image 65", category: "Gallery" },
  { src: "/images/gallery/znanie_067.jpg", alt: "ZNANIE Gallery Image 66", category: "Gallery" },
  { src: "/images/gallery/znanie_068.jpg", alt: "ZNANIE Gallery Image 67", category: "Gallery" },
  { src: "/images/gallery/znanie_069.jpg", alt: "ZNANIE Gallery Image 68", category: "Gallery" },
  { src: "/images/gallery/znanie_070.jpg", alt: "ZNANIE Gallery Image 69", category: "Gallery" },
  { src: "/images/gallery/znanie_071.jpg", alt: "ZNANIE Gallery Image 70", category: "Gallery" },
  { src: "/images/gallery/znanie_072.jpg", alt: "ZNANIE Gallery Image 71", category: "Gallery" },
  { src: "/images/gallery/znanie_073.jpg", alt: "ZNANIE Gallery Image 72", category: "Gallery" },
  { src: "/images/gallery/znanie_074.jpg", alt: "ZNANIE Gallery Image 73", category: "Gallery" },
  { src: "/images/gallery/znanie_075.jpg", alt: "ZNANIE Gallery Image 74", category: "Gallery" },
  { src: "/images/gallery/znanie_076.jpg", alt: "ZNANIE Gallery Image 75", category: "Gallery" },
  { src: "/images/gallery/znanie_077.jpg", alt: "ZNANIE Gallery Image 76", category: "Gallery" },
  { src: "/images/gallery/znanie_078.jpg", alt: "ZNANIE Gallery Image 77", category: "Gallery" },
  { src: "/images/gallery/znanie_079.jpg", alt: "ZNANIE Gallery Image 78", category: "Gallery" },
  { src: "/images/gallery/znanie_080.jpg", alt: "ZNANIE Gallery Image 79", category: "Gallery" },
  { src: "/images/gallery/znanie_081.jpg", alt: "ZNANIE Gallery Image 80", category: "Gallery" },
  { src: "/images/gallery/znanie_082.jpg", alt: "ZNANIE Gallery Image 81", category: "Gallery" },
  { src: "/images/gallery/znanie_083.jpg", alt: "ZNANIE Gallery Image 82", category: "Gallery" },
  { src: "/images/gallery/znanie_084.jpg", alt: "ZNANIE Gallery Image 83", category: "Gallery" },
  { src: "/images/gallery/znanie_085.jpg", alt: "ZNANIE Gallery Image 84", category: "Gallery" },
  { src: "/images/gallery/znanie_086.jpg", alt: "ZNANIE Gallery Image 85", category: "Gallery" },
  { src: "/images/gallery/znanie_087.jpg", alt: "ZNANIE Gallery Image 86", category: "Gallery" },
  { src: "/images/gallery/znanie_089.jpg", alt: "ZNANIE Gallery Image 87", category: "Gallery" },
  { src: "/images/gallery/znanie_090.jpg", alt: "ZNANIE Gallery Image 88", category: "Gallery" },
  { src: "/images/gallery/znanie_091.jpg", alt: "ZNANIE Gallery Image 89", category: "Gallery" },
  { src: "/images/gallery/znanie_092.jpg", alt: "ZNANIE Gallery Image 90", category: "Gallery" }
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
            src="/images/zn_gallery.jpg"
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
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] as any }}
          >
            <span className={styles.heroTag}>VISUAL JOURNEY</span>
          </motion.div>

          {/* Logo image above heading */}
          <motion.div
            className={styles.heroLogoWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.33, 1, 0.68, 1] as any }}
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
            transition={{ duration: 0.8, delay: 0.25, ease: [0.33, 1, 0.68, 1] as any }}
          >
            Our <span className={styles.heroTitleAccent}>Gallery</span>
          </motion.h1>

          <motion.p
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] as any }}
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
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] as any }}
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
            visible: { transition: { staggerChildren: 0.18 } },
          }}
        >
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.src}
              className={styles.gridItem}
              variants={{
                hidden: { opacity: 0, x: 30, y: 30, scale: 0.95 },
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.9,
                    ease: [0.33, 1, 0.68, 1] as any
                  }
                },
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
