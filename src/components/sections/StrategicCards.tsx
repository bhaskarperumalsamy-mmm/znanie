'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const cards = [
  {
    title: 'Civilisational Anchor',
    description: 'Stabilising the Eurasian landmass through a sovereign security architecture that prevents regional fragmentation and maintains multipolar peace.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Multipolar Vanguard',
    description: 'Championing the rights of the Global South by fostering an international order based on genuine developmental autonomy and sovereign choice.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: 'Strategic Resilience',
    description: 'A multi-generational partnership built on mutual trust, ensuring absolute consistency in relations despite shifting global currents.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  }
]

export const StrategicCards = () => {
  return (
    <section className="sc-section">
      <Image
        src="/images/radik-sitdikov.jpg"
        alt="Global Resonance Background"
        fill
        className="object-cover"
        style={{ zIndex: 0 }}
      />
      <div className="sc-overlay" />

      <div className="container-large relative z-10">

        {/* ─── Header ─── */}
        <motion.div
          className="sc-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          viewport={{ once: true }}
        >
          <span className="sc-tag">SPANNING THE GLOBE</span>
          <h2 className="strategic-title">Resonance Across the Globe</h2>
          <p className="sc-subtitle">
            The India-Russia partnership reverberates across continents — a convergence of
            civilizational depth, strategic foresight, and mutual aspiration.
          </p>
        </motion.div>

        {/* ─── Cards with Floating Icons (Vistario style) ─── */}
        <div className="sc-cards-grid">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              className="sc-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.33, 1, 0.68, 1] }}
              viewport={{ once: true }}
            >
              {/* Floating circle icon — overlapping top edge */}
              <div className="sc-icon-float">
                <div className="sc-icon-circle">
                  {card.icon}
                </div>
              </div>

              <div className="sc-card-inner">
                <span className="sc-num">{String(idx + 1).padStart(2, '0')}</span>
                <h3 className="sc-card-title">{card.title}</h3>
                <div className="sc-divider" />
                <p className="sc-card-desc">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        /* ─── Section ─── */
        .sc-section {
          padding: 120px 0 var(--_gaps---section-gap--section-gap-v1) 0;
          background: var(--_color---midnight-teal);
          position: relative;
          overflow: hidden;
        }

        /* ─── Background Overlay ─── */
        .sc-overlay {
          position: absolute;
          inset: 0;
          background: var(--_color---midnight-teal);
          opacity: 0.88; /* Shows the subtle background image globally */
          z-index: 1;
        }
        
        /* The ambient lights layered over the dark tint */
        .sc-overlay::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 20%, rgba(220,37,37,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,181,2,0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        /* ─── Header ─── */
        .sc-header {
          text-align: center;
          margin-bottom: 96px;
          position: relative;
          z-index: 2;
        }

        .sc-tag {
          display: inline-block;
          font-family: var(--_font-family---lexend);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.25em;
          color: var(--_color---golden-amber);
          text-transform: uppercase;
          margin-bottom: 20px;
          padding: 6px 20px;
          border: 1px solid rgba(255,181,2,0.2);
          border-radius: 100px;
          background: rgba(255,181,2,0.06);
        }

        .strategic-title {
          font-family: var(--_font-family---lexend);
          font-size: var(--_typhography---font-size--h2);
          font-weight: var(--_typhography---font-weight--h2);
          line-height: var(--_typhography---font-line-height--h2);
          color: #ffffff;
          margin-bottom: 24px;
        }

        .sc-subtitle {
          font-size: 1.0625rem;
          line-height: 1.75;
          color: rgba(255,255,255,0.5);
          font-family: var(--font-body);
          max-width: 560px;
          margin: 0 auto;
        }

        /* ─── Cards Grid ─── */
        .sc-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          position: relative;
          z-index: 2;
        }
        @media (min-width: 768px) {
          .sc-cards-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 28px;
          }
        }

        /* ─── Card ─── */
        .sc-card {
          position: relative;
          padding-top: 36px; /* space for floating icon */
        }

        .sc-icon-float {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
        }

        .sc-icon-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--_color---crimson-red);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 28px rgba(220,37,37,0.3);
          transition: all 0.4s ease;
        }

        .sc-card:hover .sc-icon-circle {
          transform: scale(1.08);
          box-shadow: 0 12px 36px rgba(220,37,37,0.4);
        }

        .sc-card-inner {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 60px 36px 40px;
          text-align: center;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: all 0.4s cubic-bezier(0.33, 1, 0.68, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .sc-card:hover .sc-card-inner {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.14);
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }

        .sc-num {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--_color---golden-amber);
          font-family: var(--font-heading);
          margin-bottom: 12px;
        }

        .sc-card-title {
          font-size: var(--_typhography---font-size--h4);
          font-weight: var(--_typhography---font-weight--h4);
          color: #ffffff;
          font-family: var(--font-heading);
          margin-bottom: 16px;
        }

        .sc-divider {
          width: 32px;
          height: 2px;
          background: linear-gradient(90deg, var(--_color---crimson-red), var(--_color---golden-amber));
          border-radius: 2px;
          margin-bottom: 20px;
        }

        .sc-card-desc {
          font-size: var(--_typhography---font-size--body-font);
          line-height: var(--_typhography---font-line-height--body-font);
          color: rgba(255,255,255,0.55);
          font-family: var(--font-body);
        }
      `}</style>
    </section>
  )
}
