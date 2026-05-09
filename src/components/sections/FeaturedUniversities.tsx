'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const universities = [
  { name: 'Lomonosov Moscow State University', image: '/images/Universities/moscow_state_university.jpg', location: 'Moscow, Russia', programs: '200+', desc: 'Russia\'s oldest and most prestigious university, ranked among the world\'s top institutions for sciences, humanities, and medicine.' },
  { name: 'Bauman MSTU', image: '/images/Universities/bauman_university.jpg', location: 'Moscow, Russia', programs: '100+', desc: 'A leading technical university known for excellence in aerospace, mechanical, and biomedical engineering research.' },
  { name: 'RUDN University', image: '/images/Universities/rudn_university.jpg', location: 'Moscow, Russia', programs: '150+', desc: 'The most international university in Russia, welcoming students from 160+ countries with diverse academic programs.' },
  { name: 'Saint-Petersburg State University', image: '/images/Universities/spb_university.jpg', location: 'St. Petersburg, Russia', programs: '180+', desc: 'One of Russia\'s oldest universities, renowned for law, international relations, and liberal arts in a stunning cultural capital.' },
  { name: 'MIPT (Phystech)', image: '/images/Universities/mipt_university.jpg', location: 'Moscow Region, Russia', programs: '100+', desc: 'Russia\'s premier institute for physics and technology, producing Nobel laureates and pioneering researchers.' },
  { name: 'HSE University', image: '/images/Universities/hse_university.jpg', location: 'Moscow, Russia', programs: '160+', desc: 'A young, dynamic university excelling in economics, social sciences, data science, and digital humanities.' },
  { name: 'MEPhI University', image: '/images/Universities/mephi_university.jpg', location: 'Moscow, Russia', programs: '80+', desc: 'National Research Nuclear University, a leader in nuclear physics, cybersecurity, and cutting-edge technology.' },
  { name: 'Novosibirsk State University', image: '/images/Universities/ns_university.jpg', location: 'Novosibirsk, Russia', programs: '120+', desc: 'Located in Russia\'s scientific capital Akademgorodok, offering unparalleled research opportunities in natural sciences.' },
  { name: 'Tomsk State University', image: '/images/Universities/tomsk_state_university.jpg', location: 'Tomsk, Russia', programs: '130+', desc: 'The oldest university in Siberia, combining classical education with modern interdisciplinary research programs.' },
  { name: 'Ural Federal University', image: '/images/Universities/ural_university.jpg', location: 'Yekaterinburg, Russia', programs: '140+', desc: 'The largest university in the Urals, bridging Europe and Asia with strong engineering and natural science programs.' },
]

export const FeaturedUniversities = () => {
  const [active, setActive] = useState(0)
  const uni = universities[active]

  return (
    <section className="fu-section">
      <div className="fu-bg-pattern" />
      <div className="container-large" style={{ position: 'relative', zIndex: 2 }}>

        {/* ─── Header ─── */}
        <motion.div
          className="fu-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] as any }}
          viewport={{ once: true }}
        >
          <span className="fu-tag">INSTITUTIONAL ARCHIVE</span>
          <h2 style={{ fontSize: 'var(--_typhography---font-size--h2)', fontWeight: 'var(--_typhography---font-weight--h2)', lineHeight: 'var(--_typhography---font-line-height--h2)', color: 'var(--_color---charcoal-black)' }}>
            Featured <span style={{ color: 'var(--_color---crimson-red)' }}>Universities</span>
          </h2>
          <p className="fu-subtitle">Explore our network of world-renowned partner universities across Russia.</p>
        </motion.div>

        {/* ─── Hero Showcase ─── */}
        <div className="fu-showcase">
          {/* Left: Large Image */}
          <div className="fu-hero-img-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="fu-hero-img-inner"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] as any }}
              >
                <Image src={uni.image} alt={uni.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw" priority />
                <div className="fu-hero-overlay" />
              </motion.div>
            </AnimatePresence>
            <div className="fu-hero-counter">{String(active + 1).padStart(2, '0')} / {String(universities.length).padStart(2, '0')}</div>
          </div>

          {/* Right: Info Panel */}
          <div className="fu-info-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] as any }}
              >
                <span className="fu-info-loc">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  {uni.location}
                </span>
                <h3 className="fu-info-name">{uni.name}</h3>
                <p className="fu-info-desc">{uni.desc}</p>
                <div className="fu-info-stat">
                  <div className="fu-stat-box">
                    <span className="fu-stat-num">{uni.programs}</span>
                    <span className="fu-stat-lbl">Programs</span>
                  </div>
                  <div className="fu-stat-divider" />
                  <div className="fu-stat-box">
                    <span className="fu-stat-num">Top 10</span>
                    <span className="fu-stat-lbl">in Russia</span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ─── Thumbnail Selector ─── */}
        <div className="fu-thumbs">
          {universities.map((u, idx) => (
            <button
              key={idx}
              className={`fu-thumb ${idx === active ? 'fu-thumb--active' : ''}`}
              onClick={() => setActive(idx)}
              aria-label={`Select ${u.name}`}
            >
              <Image src={u.image} alt={u.name} fill className="object-cover" sizes="80px" />
              <div className="fu-thumb-overlay" />
            </button>
          ))}
        </div>

      </div>

      <style>{`
        /* ─── Section ─── */
        .fu-section {
          padding: var(--_gaps---section-gap--section-gap-v1) 0;
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }
        .fu-bg-pattern {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 10% 30%, rgba(220,37,37,0.02) 0%, transparent 50%),
            radial-gradient(circle at 90% 70%, rgba(255,181,2,0.02) 0%, transparent 50%);
          pointer-events: none;
        }

        /* ─── Header ─── */
        .fu-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .fu-tag {
          display: inline-block;
          font-family: var(--_font-family---lexend);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.25em;
          color: var(--_color---golden-amber);
          text-transform: uppercase;
          margin-bottom: 16px;
          padding: 6px 20px;
          border: 1px solid rgba(255,181,2,0.2);
          border-radius: 100px;
          background: rgba(255,181,2,0.06);
        }
        .fu-subtitle {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--_color---shadow-gray);
          font-family: var(--font-body);
          max-width: 480px;
          margin: 12px auto 0;
        }
        @media (min-width: 1024px) {
          .fu-subtitle { font-size: 1rem; margin-top: 16px; }
        }

        /* ─── Showcase (Hero) ─── */
        .fu-showcase {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          border-radius: 20px;
          overflow: hidden;
          background: #f8f9fa;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 24px rgba(0,0,0,0.03);
        }
        @media (min-width: 1024px) {
          .fu-showcase {
            grid-template-columns: 1.15fr 0.85fr;
          }
        }

        /* Left: Image */
        .fu-hero-img-wrap {
          position: relative;
          height: 260px;
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .fu-hero-img-wrap { height: 440px; }
        }
        .fu-hero-img-inner {
          position: absolute;
          inset: 0;
        }
        .fu-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 100%);
        }
        .fu-hero-counter {
          position: absolute;
          bottom: 20px;
          left: 24px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.9);
          font-family: var(--font-heading);
          z-index: 3;
          padding: 6px 16px;
          background: rgba(0,0,0,0.35);
          border-radius: 100px;
          backdrop-filter: blur(6px);
        }

        /* Right: Info Panel */
        .fu-info-panel {
          padding: 36px 36px 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (min-width: 1024px) {
          .fu-info-panel { padding: 48px 44px; }
        }

        .fu-info-loc {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          color: var(--_color---golden-amber);
          font-family: var(--font-body);
          margin-bottom: 12px;
          font-weight: 600;
        }
        .fu-info-loc svg { stroke: var(--_color---golden-amber); }

        .fu-info-name {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--_color---charcoal-black);
          font-family: var(--font-heading);
          line-height: 1.25;
          margin-bottom: 16px;
        }
        @media (min-width: 1024px) {
          .fu-info-name { font-size: 1.75rem; }
        }

        .fu-info-desc {
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--_color---shadow-gray);
          font-family: var(--font-body);
          margin-bottom: 28px;
        }

        .fu-info-stat {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 32px;
          padding: 20px 0;
          border-top: 1px solid rgba(0,0,0,0.06);
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .fu-stat-box {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .fu-stat-num {
          font-size: 1.375rem;
          font-weight: 800;
          color: var(--_color---charcoal-black);
          font-family: var(--font-heading);
        }
        .fu-stat-lbl {
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--_color---shadow-gray);
          font-family: var(--font-heading);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .fu-stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(0,0,0,0.08);
        }

        .fu-explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: var(--_color---crimson-red);
          color: #ffffff;
          border-radius: 100px;
          font-size: 0.8125rem;
          font-weight: 700;
          font-family: var(--font-heading);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          transition: all 0.35s ease;
          box-shadow: 0 4px 16px rgba(220,37,37,0.25);
        }
        .fu-explore-btn:hover {
          background: var(--_color---charcoal-black);
          color: #ffffff;
          box-shadow: 0 6px 24px rgba(0,0,0,0.15);
          transform: translateY(-2px);
        }

        /* ─── Thumbnails ─── */
        .fu-thumbs {
          display: flex;
          gap: 12px;
          margin-top: 28px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: none;
        }
        .fu-thumbs::-webkit-scrollbar { display: none; }

        .fu-thumb {
          position: relative;
          flex-shrink: 0;
          width: 80px;
          height: 56px;
          border-radius: 10px;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
          background: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .fu-thumb--active {
          border-color: var(--_color---crimson-red);
          box-shadow: 0 0 16px rgba(220,37,37,0.2);
        }
        .fu-thumb:not(.fu-thumb--active):hover {
          border-color: rgba(0,0,0,0.1);
        }

        .fu-thumb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.4);
          transition: opacity 0.3s ease;
        }
        .fu-thumb--active .fu-thumb-overlay {
          opacity: 0;
        }
        .fu-thumb:hover .fu-thumb-overlay {
          opacity: 0.1;
        }
      `}</style>
    </section>
  )
}
