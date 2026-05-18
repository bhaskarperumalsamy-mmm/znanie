'use client'

import { motion, Variants } from 'framer-motion'

const values = [
  { name: 'Transparency', desc: '100% financial and operational integrity in every step.' },
  { name: 'Equality', desc: 'Equal academic opportunities for every prospective student.' },
  { name: 'Independence', desc: 'Impartial university guidance tailored to individual goals.' },
  { name: 'Integrity', desc: 'Over 30 years of ethical advocacy and institutional trust.' },
  { name: 'Inclusivity', desc: 'Bridging cultural and linguistic horizons across borders.' }
]

export const PreservingKnowledge = () => {

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as any } }
  }

  return (
    <section className="preserving-section">
      <div className="container-large">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="content-wrapper"
        >
          {/* Header Area */}
          <div className="top-header">
            <span className="tag-label-glowing">Bridges of Excellence</span>
            <h2 className="section-title">
              Preserving Knowledge, <br />
              <span className="red-text">Empowering Generations</span>
            </h2>
            <p className="section-subtitle">
              Bridging the gap between certified academic proficiency and global opportunities through our foundational vision.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="bento-grid">
            
            {/* Left Card: Dynamic Vision & Mission (Deep Teal Glassmorphic Card) */}
            <motion.div variants={itemVariants} className="bento-card dark-glass-card">
              <div className="radial-accent" />
              <div className="card-header">
                <span className="card-badge-red">Vision & Core Legacy</span>
                <div className="quote-mark">&ldquo;</div>
              </div>
              <div className="card-body">
                <p className="quote-text">
                  To become a globally recognized centre of excellence in promoting the Russian language, education, science, and culture—serving as a bridge between nations and inspiring generations to learn, connect, and grow together.
                </p>
                <div className="divider-glow" />
                <p className="subquote-text">
                  We envision a world where knowledge transcends borders, cultures are respected and celebrated, and international collaboration leads to peace, progress, and shared prosperity.
                </p>
              </div>
              <div className="card-footer">
                <div className="footer-line" />
                <span className="footer-label">ZNANIE FOUNDATION</span>
              </div>
            </motion.div>

            {/* Right Card: Who We Are & Core Values (Clean Light Editorial Card) */}
            <motion.div variants={itemVariants} className="bento-card light-editorial-card">
              <div className="card-header">
                <span className="card-badge-teal">OUR IDENTITY</span>
                <h3 className="card-heading">Who We Are</h3>
              </div>
              <div className="card-body">
                <p className="identity-desc">
                  We believe that knowledge is the key to unlocking human potential. For over 30 years, we have been helping students, young professionals, and creative talents turn their ideas into reality.
                </p>
                
                <div className="launchpad-banner">
                  <div className="banner-glow" />
                  <span className="banner-text">We are not just a foundation; we are a launchpad for your dreams.</span>
                </div>

                <div className="values-list">
                  {values.map((val) => (
                    <div key={val.name} className="value-row">
                      <div className="check-icon-wrapper">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div className="value-details">
                        <span className="value-heading">{val.name}</span>
                        <span className="value-desc">{val.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>

      <style>{`
        .preserving-section {
          padding: 80px 0;
          background-color: #fafbfc;
          position: relative;
          overflow: hidden;
        }

        /* Subtle grid background pattern */
        .preserving-section::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.3;
          background-image: 
            radial-gradient(var(--_color---silver-mist) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
        }

        .top-header {
          text-align: center;
          margin-bottom: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tag-label-glowing {
          font-family: var(--_font-family---lexend);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--_color---crimson-red);
          background-color: rgba(220, 37, 37, 0.06);
          padding: 6px 16px;
          border-radius: 50px;
          display: inline-block;
          margin-bottom: 20px;
          border: 1px solid rgba(220, 37, 37, 0.12);
        }

        .section-title {
          font-size: clamp(2rem, 5vw, 2.75rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--_color---charcoal-black);
          margin-bottom: 20px;
        }

        .red-text {
          color: #dc2525;
        }

        .section-subtitle {
          max-width: 620px;
          font-size: 1.0625rem;
          line-height: 1.6;
          color: var(--_color---shadow-gray);
          font-family: var(--font-body);
        }

        /* Bento Grid */
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: stretch;
        }

        @media (min-width: 1024px) {
          .bento-grid {
            grid-template-columns: 1.1fr 1fr;
            gap: 48px;
          }
        }

        .bento-card {
          background-color: var(--_color---white);
          border-radius: 24px;
          padding: 32px;
          position: relative;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease;
        }

        .bento-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
        }

        @media (min-width: 768px) {
          .bento-card {
            padding: 48px;
          }
        }

        /* Left Card: Dark Glass */
        .dark-glass-card {
          background-color: var(--_color---midnight-teal);
          border: 1px solid rgba(220, 37, 37, 0.15);
          color: var(--_color---white);
          overflow: hidden;
        }

        .dark-glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(220, 37, 37, 0.05) 0%, transparent 100%);
          pointer-events: none;
        }

        .radial-accent {
          position: absolute;
          top: -20%;
          right: -20%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 181, 2, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          position: relative;
          z-index: 2;
        }

        .card-badge-red {
          font-family: var(--_font-family---lexend);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--_color---golden-amber);
          background-color: rgba(255, 181, 2, 0.1);
          padding: 6px 12px;
          border-radius: 6px;
        }

        .quote-mark {
          font-size: 90px;
          font-family: Georgia, serif;
          color: rgba(255, 181, 2, 0.1);
          line-height: 0.2;
          transform: translateY(24px);
        }

        .card-body {
          position: relative;
          z-index: 2;
        }

        .quote-text {
          font-size: clamp(1.125rem, 3vw, 1.375rem);
          line-height: 1.55;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.95);
          font-family: var(--font-body);
          margin-bottom: 24px;
        }

        .divider-glow {
          height: 1px;
          background: linear-gradient(90deg, rgba(255, 181, 2, 0.3) 0%, transparent 100%);
          margin-bottom: 24px;
        }

        .subquote-text {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          font-family: var(--font-body);
        }

        .card-footer {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          z-index: 2;
        }

        .footer-line {
          height: 1px;
          background-color: rgba(255, 255, 255, 0.1);
          width: 100%;
        }

        .footer-label {
          font-family: var(--_font-family---lexend);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--_color---crimson-red);
        }

        /* Right Card: Light Editorial */
        .light-editorial-card {
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .card-badge-teal {
          font-family: var(--_font-family---lexend);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--_color---crimson-red);
          background-color: rgba(220, 37, 37, 0.05);
          padding: 6px 12px;
          border-radius: 6px;
          align-self: flex-start;
          display: inline-block;
          margin-bottom: 16px;
        }

        .card-heading {
          font-size: var(--_typhography---font-size--h2);
          font-weight: var(--_typhography---font-weight--h2);
          line-height: var(--_typhography---font-line-height--h2);
          color: var(--_color---charcoal-black);
          margin-bottom: 20px;
        }

        .identity-desc {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--_color---shadow-gray);
          margin-bottom: 28px;
          font-family: var(--font-body);
        }

        .launchpad-banner {
          padding: 18px 24px;
          background-color: var(--_color---charcoal-black);
          color: #ffffff;
          border-radius: var(--radius-sm);
          position: relative;
          overflow: hidden;
          margin-bottom: 32px;
          box-shadow: 0 8px 24px rgba(14, 16, 16, 0.1);
        }

        .banner-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(220, 37, 37, 0.25) 0%, transparent 80%);
          pointer-events: none;
        }

        .banner-text {
          position: relative;
          z-index: 2;
          font-size: 0.9375rem;
          font-weight: 600;
          font-family: var(--_font-family---lexend);
          letter-spacing: -0.01em;
        }

        /* Values List */
        .values-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .value-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: transform 0.2s ease;
        }

        .value-row:hover {
          transform: translateX(4px);
        }

        .check-icon-wrapper {
          width: 20px;
          height: 20px;
          min-width: 20px;
          min-height: 20px;
          border-radius: 50%;
          background: rgba(220, 37, 37, 0.08);
          color: var(--_color---crimson-red);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
        }

        .value-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .value-heading {
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--_color---charcoal-black);
          font-family: var(--_font-family---lexend);
        }

        .value-desc {
          font-size: 0.8125rem;
          line-height: 1.5;
          color: var(--_color---shadow-gray);
          font-family: var(--font-body);
        }
      `}</style>
    </section>
  )
}
