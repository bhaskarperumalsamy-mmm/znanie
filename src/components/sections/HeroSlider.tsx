"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import styles from "./HeroSlider.module.css";

/* ── Slide definitions ──────────────────────────────────────── */
const SLIDES = [
  {
    id: 1,
    heroTag: "REGIONAL PUBLIC CHARITY FOUNDATION",
    title: (
      <>
        &ldquo;ZNANIE&rdquo; Named after&nbsp;
        <br />
        Academician <span className="rt-text-yellow">S.I. VAVILOV</span>
      </>
    ),
    description:
      "Empowering Minds Through Russian Language and Education — Bridging Nations for a Peaceful and Prosperous World Inspired by Russian Culture.",
    imageSrc: "/images/zn_teaching.jpg",
    primaryCtaText: "Learn More",
    primaryCtaHref: "/about-us",
    secondaryCtaText: "Contact Us",
    secondaryCtaHref: "/contact",
  },
  {
    id: 2,
    heroTag: "WORLD-CLASS RUSSIAN UNIVERSITIES",
    title: (
      <>
        Shape Your Future with
        <br />
        <span className="rt-text-yellow">Russian Education</span>
      </>
    ),
    description:
      "Discover top-ranked Russian universities offering internationally recognised degrees across medicine, engineering, science and the humanities — at unmatched value.",
    imageSrc: "/images/zn_znanie_rss.jpg",
    primaryCtaText: "Explore Universities",
    primaryCtaHref: "/study-in-russia",
    secondaryCtaText: "Why Russia?",
    secondaryCtaHref: "/why-choose-us",
  },
  {
    id: 3,
    heroTag: "MASTER THE LANGUAGE OF KNOWLEDGE",
    title: (
      <>
        Unlock the Power of
        <br />
        <span className="rt-text-yellow">Russian Language</span>
      </>
    ),
    description:
      "Our structured language mastery programmes take you from beginner to fluent — giving you the cultural and academic edge to thrive in Russia and beyond.",
    imageSrc: "/images/zn_language.jpg",
    primaryCtaText: "Start Learning",
    primaryCtaHref: "/russian-language-courses",
    secondaryCtaText: "View Curriculum",
    secondaryCtaHref: "/russian-language-courses",
  },
];

const INTERVAL = 6000;

/* ── SVG arrows ─────────────────────────────────────────────── */
const ChevLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ── Framer variants ─────────────────────────────────────────── */
const wrapVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.35 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] as any } },
};

/* ── Component ───────────────────────────────────────────────── */
export const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setProgressKey((k) => k + 1);
  }, []);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  /* Auto-play */
  useEffect(() => {
    timer.current = setTimeout(next, INTERVAL);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [next]);

  /* Keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const slide = SLIDES[current];

  return (
    <section className={styles.sliderRoot} aria-label="Hero slideshow">

      {/* ── Slide track ──────────────────────────────────────── */}
      <div
        className={styles.track}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {SLIDES.map((s) => (
          <div key={s.id} className={styles.slide}>
            <Image
              src={s.imageSrc}
              alt={`Slide ${s.id}`}
              fill
              priority={s.id === 1}
              sizes="100vw"
              className={styles.bgImage}
              style={{ objectFit: "cover" }}
            />
            <div className={styles.heroGridOverlay} />
            <div className={styles.heroOverlayGradient} />

            {/* Orbital decoration */}
            {s.id === 1 && (
              <div className={styles.orbitalContainer}>
                <div className={styles.orbitalGlow} />
                <div className={styles.orbitalRings}>
                  <div className={styles.orbitalRingInner} />
                  <div className={styles.orbitalRingOuter}>
                    <div className={styles.iconWrapperPos1}>
                      <Image src="/images/uae-icon.png" alt="UAE" width={48} height={48} className="object-contain" />
                    </div>
                    <div className={styles.iconWrapperPos2}>
                      <Image src="/images/russia_icon.png" alt="Russia" width={60} height={60} className="object-contain" />
                    </div>
                    <div className={styles.iconWrapperPos3}>
                      <Image src="/images/srilanka-icon.png" alt="Sri Lanka" width={48} height={48} className="object-contain" />
                    </div>
                    <div className={styles.iconWrapperPos4}>
                      <Image src="/images/indian_icon.png" alt="India" width={60} height={60} className="object-contain" />
                    </div>
                    <div className={styles.iconWrapperPos5}>
                      <Image src="/images/nepal-icon.png" alt="Nepal" width={48} height={48} className="object-contain" />
                    </div>
                  </div>
                </div>
                <div className={styles.centerTextWrapper}>
                  <h2 className={styles.centerText}>ZNANIE</h2>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Animated text layer (above track) ────────────────── */}
      <div className={`container ${styles.slideContent}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className={styles.contentInner}
            variants={wrapVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.span variants={itemVariants} className={styles.heroTag}>
              {slide.heroTag}
            </motion.span>

            <motion.h1 variants={itemVariants} className={styles.slideTitle}>
              {slide.title}
            </motion.h1>

            <motion.p variants={itemVariants} className={styles.slideDescription}>
              {slide.description}
            </motion.p>

            <motion.div variants={itemVariants} className={styles.slideActions}>
              {slide.primaryCtaText && slide.primaryCtaHref && (
                <Button variant="primary" href={slide.primaryCtaHref}>
                  {slide.primaryCtaText} &rarr;
                </Button>
              )}
              {slide.secondaryCtaText && slide.secondaryCtaHref && (
                <Button variant="dark" href={slide.secondaryCtaHref}>
                  {slide.secondaryCtaText} &rarr;
                </Button>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Prev / Next ───────────────────────────────────────── */}
      <button id="hero-prev" aria-label="Previous slide"
        className={`${styles.arrowBtn} ${styles.arrowPrev}`} onClick={prev}>
        <ChevLeft />
      </button>
      <button id="hero-next" aria-label="Next slide"
        className={`${styles.arrowBtn} ${styles.arrowNext}`} onClick={next}>
        <ChevRight />
      </button>

      {/* ── Dots ─────────────────────────────────────────────── */}
      <div className={styles.dots} role="tablist" aria-label="Slide indicators">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            id={`hero-dot-${i}`}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* ── Progress bar ─────────────────────────────────────── */}
      <div
        key={`progress-${progressKey}`}
        className={styles.progressBar}
        style={{ animation: `progressAnim ${INTERVAL}ms linear forwards` }}
      />
    </section>
  );
};
