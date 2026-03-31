'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const benefits = [
  {
    title: 'Vocabulary & Grammar',
    desc: 'Build a robust foundation with thousands of words, practical phrases, and structured grammar for real-world conversations.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 11.37 9.198 15.53 5.313 18M15 13a11.64 11.64 0 01-3.136-3.636" />
      </svg>
    )
  },
  {
    title: 'Cultural Immersion',
    desc: 'Go beyond textbooks — explore Russian traditions, contemporary life, holidays, and social etiquette.',
    icon: (
      <span style={{ fontSize: '26px' }}>🌍</span>
    )
  },
  {
    title: 'Career & Opportunity',
    desc: 'Open doors to studying in Russia, bilateral careers in diplomacy, trade, energy, and professional translation.',
    icon: (
      <span style={{ fontSize: '26px' }}>🚀</span>
    )
  }
]

const cefrLevels = [
  { code: 'A1', label: 'ELEMENTARY', color: '#22c55e' },
  { code: 'A2', label: 'BASIC', color: '#22c55e' },
  { code: 'B1', label: 'INTERMEDIATE', color: '#3b82f6' },
  { code: 'B2', label: 'UPPER-INT', color: '#3b82f6' },
  { code: 'C1', label: 'ADVANCED', color: '#a855f7' },
  { code: 'C2', label: 'MASTERY', color: '#a855f7' }
]

export const LanguageMastery = () => {

  return (
    <section className="language-mastery-v8">
      <div className="container-master-v8">

        {/* UPPER: Premium Narrative Header (Restored) */}
        <div className="v8-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="v8-tag">LANGUAGE & CULTURE</span>
            <h2 className="v8-d-h2">Master the <span className="text-crimson">Russian Language</span></h2>
            <p className="v8-i-text">
              Bridge the cultural and economic divide. Our immersive programs are designed for absolute beginners and emerging professionals seeking an geopolitical edge.
            </p>
          </motion.div>
        </div>

        {/* REDESIGNED: Premium Feature Block (Image & Cards Only Refined) */}
        <div className="v8-feature-grid">

          {/* Left: Redesigned Architectural Vision Anchor */}
          <motion.div
            className="v8-visual-pillar"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <div className="v8-img-frame">
              <Image
                src="/images/studying.jpg"
                alt="Institutional Mastery"
                fill
                className="object-cover"
              />
              <div className="v8-img-overlay" />
              {/* Floating Achievement Badge */}
              <div className="v8-achievement-badge">
                <span className="v8-badge-num">94%</span>
                <span className="v8-badge-txt">Fluency Rate</span>
              </div>
            </div>
            <div className="v8-frame-motif" />
          </motion.div>

          {/* Right: Redesigned Narrative Benefit Stack (User-Friendly Cards) */}
          <div className="v8-cards-pillar">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="v8-benefit-card group"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <div className="v8-card-content">
                  <div className="v8-icon-box">{benefit.icon}</div>
                  <div className="v8-text-box">
                    <h4 className="v8-card-h4">{benefit.title}</h4>
                    <p className="v8-card-p">{benefit.desc}</p>
                  </div>
                </div>
                <div className="v8-hover-accent" />
              </motion.div>
            ))}
          </div>

        </div>

        {/* BOTTOM: Final Verified Layout (Stats & Path - Re-linked) */}
        <motion.div
          className="v8-stats-strip"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="v8-stat-n">
            <span className="v8-v">258M+</span>
            <span className="v8-l">SPEAKERS WORLDWIDE</span>
          </div>
          <div className="v8-stat-n">
            <span className="v8-v">6</span>
            <span className="v8-l">PROFICIENCY LEVELS</span>
          </div>
          <div className="v8-stat-n">
            <span className="v8-v">A1 → C2</span>
            <span className="v8-l">FULL CEFR RANGE</span>
          </div>
          <div className="v8-stat-n">
            <span className="v8-v">Native</span>
            <span className="v8-l">RUSSIAN INSTRUCTORS</span>
          </div>
        </motion.div>

        {/* Old Pattern: Path to Proficiency (Restored) */}
        <motion.div
          className="old-pathway-area"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="old-pathway-container">
            <div className="old-pathway-header">
              <h3 className="old-pathway-title">The Path to Proficiency</h3>
              <p className="old-pathway-desc">Our curriculum follows the Common European Framework of Reference for Languages (CEFR).</p>
            </div>

            <div className="old-cefr-grid">
              {cefrLevels.map((lvl, index) => (
                <div key={index} className="old-cefr-node">
                  <div
                    className="old-cefr-circle"
                    style={{ borderColor: lvl.color, color: lvl.color }}
                  >
                    <span>{lvl.code}</span>
                  </div>
                  <span className="old-cefr-label">{lvl.label}</span>
                </div>
              ))}
            </div>

            <div className="old-pathway-footer">
              <a href="/russian-language-courses" className="old-path-link">
                View Full Course Details →
              </a>
            </div>
          </div>
        </motion.div>

      </div>

      <style>{`
        .language-mastery-v8 {
          background-color: var(--_color---soft-gray);
          padding: 160px 0;
          font-family: var(--_font-family---lexend);
          overflow: hidden;
        }

        .container-master-v8 {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .v8-header {
           max-width: 800px;
           margin: 0 auto 100px;
           text-align: center;
        }

        .v8-tag {
          display: block;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--_color---crimson-red);
          margin-bottom: 24px;
        }

        .v8-d-h2 {
          font-family: var(--_font-family---lexend);
          font-size: var(--_typhography---font-size--h2);
          font-weight: var(--_typhography---font-weight--h2);
          line-height: var(--_typhography---font-line-height--h2);
          color: var(--_color---charcoal-black);
          margin-bottom: 32px;
          letter-spacing: -0.01em;
        }

        .text-crimson { color: var(--_color---crimson-red); }

        .v8-i-text { font-size: 1.125rem; line-height: 1.6; color: var(--_color---smoky-black); }

        /* 🔥 Better Layout Refinement: Vertical Narrative Pillar */
        .v8-feature-grid {
           display: grid;
           grid-template-columns: 1fr;
           gap: 80px;
           align-items: center;
           margin-bottom: 120px;
        }

        @media (min-width: 1024px) {
           .v8-feature-grid {
             grid-template-columns: 1.15fr 1fr;
             gap: 120px;
           }
        }

        .v8-visual-pillar {
           position: relative;
        }

        .v8-img-frame {
           position: relative;
           aspect-ratio: 16/10;
           border-radius: 40px;
           overflow: hidden;
           box-shadow: 0 40px 100px rgba(0,0,0,0.15);
           z-index: 5;
        }

        .v8-img-overlay {
           position: absolute;
           inset: 0;
           background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
        }

        .v8-achievement-badge {
           position: absolute;
           top: 32px;
           right: 32px;
           background-color: #ffffff;
           padding: 24px 32px;
           border-radius: 20px;
           box-shadow: 0 20px 40px rgba(0,0,0,0.1);
           display: flex;
           flex-direction: column;
           align-items: center;
           z-index: 10;
        }

        .v8-badge-num { font-size: 2rem; font-weight: 800; color: var(--_color---crimson-red); line-height: 1; }
        .v8-badge-txt { font-size: 10px; font-weight: 800; text-transform: uppercase; color: var(--_color---shadow-gray); margin-top: 4px; }

        .v8-frame-motif {
           position: absolute;
           bottom: -30px;
           left: -30px;
           width: 200px;
           height: 200px;
           border: 1px dashed var(--_color---silver-mist);
           border-radius: 50%;
           z-index: 1;
        }

        /* 👑 REDESIGNED CARDS: Vertical Strategic Stack (Clean & User-Friendly) */
        .v8-cards-pillar {
           display: flex;
           flex-direction: column;
           gap: 24px;
        }

        .v8-benefit-card {
           background-color: #ffffff;
           padding: 40px;
           border-radius: 24px;
           border: 1px solid var(--_color---silver-mist);
           position: relative;
           overflow: hidden;
           transition: all 0.4s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .v8-benefit-card:hover {
           transform: translateX(12px);
           border-color: var(--_color---crimson-red);
           box-shadow: 0 20px 50px rgba(0,0,0,0.06);
           background-color: var(--_color---soft-gray);
        }

        .v8-card-content {
           display: flex;
           gap: 24px;
           align-items: center;
           position: relative;
           z-index: 5;
        }

        .v8-icon-box {
           width: 56px;
           height: 56px;
           border-radius: 14px;
           background-color: rgba(220,37,37,0.05);
           color: var(--_color---crimson-red);
           display: flex;
           align-items: center;
           justify-content: center;
           flex-shrink: 0;
           transition: all 0.3s ease;
        }

        .v8-benefit-card:hover .v8-icon-box {
           background-color: var(--_color---crimson-red);
           color: #ffffff;
        }

        .v8-card-h4 { font-size: 1.25rem; font-weight: 700; color: var(--_color---charcoal-black); margin-bottom: 8px; }
        .v8-card-p { font-size: 0.9375rem; line-height: 1.5; color: var(--_color---shadow-gray); }

        .v8-hover-accent {
           position: absolute;
           left: 0;
           top: 0;
           bottom: 0;
           width: 4px;
           background-color: var(--_color---crimson-red);
           transform: scaleY(0);
           transition: transform 0.4s ease;
        }
        .v8-benefit-card:hover .v8-hover-accent { transform: scaleY(1); }

        /* 📊 BOTTOM SECTIONS (Sync'd with flagship verified state) */
        .v8-stats-strip {
          background-color: #ffffff;
          border-radius: 2rem;
          padding: 60px;
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; margin-bottom: 80px;
          border: 1px solid var(--_color---silver-mist);
          box-shadow: 0 10px 40px rgba(0,0,0,0.05);
        }
        @media (min-width: 768px) { .v8-stats-strip { grid-template-columns: repeat(4, 1fr); } }
        .v8-stat-n { text-align: center; }
        .v8-v { display: block; font-size: 2.5rem; font-weight: 800; color: var(--_color---charcoal-black); margin-bottom: 12px; }
        .v8-l { font-size: 11px; font-weight: 800; letter-spacing: 0.15em; color: var(--_color---crimson-red); text-transform: uppercase; }

        /* Legacy Path Pattern Restore - Matching Stats Strip Aesthetic */
        .old-pathway-area {
           background-color: #ffffff;
           padding: 60px;
           border-radius: 2rem;
           border: 1px solid var(--_color---silver-mist);
           box-shadow: 0 10px 40px rgba(0,0,0,0.05);
        }

        .old-pathway-header {
           text-align: center;
           margin-bottom: 48px;
        }

        .old-pathway-title {
           font-size: 2rem;
           font-weight: 700;
           color: var(--_color---charcoal-black);
           margin-bottom: 16px;
        }

        .old-pathway-desc {
           font-size: 1rem;
           color: var(--_color---shadow-gray);
        }

        .old-cefr-grid {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 24px;
        }

        @media (min-width: 768px) {
           .old-cefr-grid { grid-template-columns: repeat(6, 1fr); }
        }

        .old-cefr-node {
           display: flex;
           flex-direction: column;
           align-items: center;
           text-align: center;
        }

        .old-cefr-circle {
           width: 64px;
           height: 64px;
           border-radius: 50%;
           border: 2px solid;
           display: flex;
           align-items: center;
           justify-content: center;
           font-weight: 800;
           font-size: 1.2rem;
           margin-bottom: 12px;
           background-color: #ffffff;
        }

        .old-cefr-label {
           font-size: 11px;
           font-weight: 800;
           text-transform: uppercase;
           color: var(--_color---charcoal-black);
        }

        .old-pathway-footer {
           margin-top: 48px;
           text-align: center;
        }

        .old-path-link {
           color: var(--_color---crimson-red);
           text-decoration: none;
           font-weight: 700;
        }

        @media (max-width: 1024px) {
           .language-mastery-v8 { padding: 60px 0; }
           .container-master-v8 { padding: 0 24px; }
           .v8-benefit-card { padding: 32px; }
           .v8-v { font-size: 2rem; }
           .v8-header { margin-bottom: 60px; }
           .v8-feature-grid { margin-bottom: 60px; gap: 48px; }
           .v8-stats-strip { padding: 40px 20px; }
           .old-pathway-area { padding: 40px 20px; }
        }

      `}</style>
    </section>
  )
}
