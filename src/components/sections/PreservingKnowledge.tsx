'use client'

import { motion, Variants } from 'framer-motion'

const values = [
  'Transparency',
  'Equality',
  'Independence',
  'Integrity',
  'Inclusivity'
]

export const PreservingKnowledge = () => {

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
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
          viewport={{ once: true, amount: 0.2 }}
          className="content-wrapper"
        >
          <div className="top-header">
            <span className="tag-label" style={{ marginBottom: 16 }}>BRIDGES</span>
            <h2 style={{ fontSize: 'var(--_typhography---font-size--h2)', fontWeight: 'var(--_typhography---font-weight--h2)', lineHeight: 'var(--_typhography---font-line-height--h2)', marginBottom: 32 }}>
              Preserving Knowledge, <br /><span style={{ color: 'var(--_color---rt-text-red)' }}>Empowering Generations</span>
            </h2>
          </div>

          <div className="grid-layout">
            {/* Left Pillar: The Welcome / Legacy */}
            <motion.div variants={itemVariants} className="legacy-column">
              <div className="welcome-card">
                <div className="quote-icon">&ldquo;</div>
                <p className="welcome-text">
                  To become a globally recognized centre of excellence in promoting the Russian language, education, science, and culture—serving as a bridge between nations and inspiring generations to learn, connect, and grow together.
                  <br /><br />
                  We envision a world where knowledge transcends borders, cultures are respected and celebrated, and international collaboration leads to peace, progress, and shared prosperity.
                </p>
                <div className="attribution">
                  <div className="program">Vision & Mission </div>
                </div>
              </div>
            </motion.div>

            {/* Right Pillar: Identity & Values */}
            <motion.div variants={itemVariants} className="identity-column">
              <span className="tag-label" style={{ marginBottom: 16, alignSelf: 'flex-start' }}>OUR IDENTITY</span>
              <h3 style={{ fontSize: 'var(--_typhography---font-size--h2)', fontWeight: 'var(--_typhography---font-weight--h2)', lineHeight: 'var(--_typhography---font-line-height--h2)', color: 'var(--_color---charcoal-black)', marginBottom: 24 }}>Who We Are</h3>
              <p className="identity-desc">
                We believe that knowledge is the key to unlocking human potential. For over 30 years, we have been helping students, young professionals, and creative talents turn their ideas into reality.
              </p>
              <div className="launchpad-pill">
                We are not just a foundation; we are a launchpad for your dreams.
              </div>

              <div className="values-grid">
                {values.map((val) => (
                  <div key={val} className="value-item">
                    <div className="check-mark">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="value-name">{val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .preserving-section {
          padding: 60px 0;
          background-color: var(--_color---white);
        }

        @media (min-width: 1024px) {
          .preserving-section {
            padding: var(--_gaps---section-gap--section-gap-v1) 0;
          }
        }


        .top-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .grid-layout {
          display: flex;
          flex-direction: column;
          gap: 64px;
        }
        @media (min-width: 1024px) {
          .grid-layout { flex-direction: row; align-items: stretch; gap: 80px; }
        }

        .legacy-column { flex: 1.1; }

        .welcome-card {
           background-color: var(--_color---soft-gray);
           padding: 40px 24px;
           border-radius: var(--radius-lg);
           border: 1px solid var(--_color---silver-mist);
           position: relative;
           height: 100%;
           display: flex;
           flex-direction: column;
        }

        @media (min-width: 1024px) {
          .welcome-card { padding: 64px 48px; }
        }

        .quote-icon {
           position: absolute;
           top: 0px;
           left: 0px;
           font-size: 80px;
           font-family: serif;
           color: rgba(220, 37, 37, 0.05);
           line-height: 1;
        }

        @media (min-width: 1024px) {
          .quote-icon { top: 32px; left: 32px; font-size: 120px; }
        }

        .welcome-text {
           font-size: var(--_typhography---font-size--h5);
           line-height: var(--_typhography---font-line-height--body-font);
           color: var(--_color---shadow-gray);
           font-family: var(--font-body);
           font-weight: 500;
           position: relative;
           z-index: 10;
           margin-bottom: auto;
           padding-top: 40px;
        }

        .attribution {
           margin-top: 40px;
           padding-top: 32px;
           border-top: 1px solid var(--_color---silver-mist);
        }

        .brand {
           font-size: 14px;
           font-weight: 800;
           color: var(--_color---charcoal-black);
           letter-spacing: 0.1em;
           text-transform: uppercase;
           margin-bottom: 4px;
           font-family: var(--font-heading);
        }

        .program {
           font-size: 13px;
           font-weight: 600;
           color: var(--_color---crimson-red);
           font-family: var(--font-heading);
        }

        .identity-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .identity-desc {
          font-size: var(--_typhography---font-size--body-font);
          line-height: var(--_typhography---font-line-height--body-font);
          color: var(--_color---shadow-gray);
          margin-bottom: 32px;
          font-family: var(--font-body);
          font-weight: 400;
        }

        .launchpad-pill {
          padding: 16px 24px;
          background-color: var(--_color---midnight-teal);
          color: #ffffff;
          border-radius: var(--radius-sm);
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 40px;
          box-shadow: 0 10px 30px rgba(15,37,42,0.15);
          font-family: var(--font-heading);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px 24px;
        }

        .value-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .check-mark {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(220, 37, 37, 0.1);
          color: var(--_color---crimson-red);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .value-name {
          font-size: 15px;
          font-weight: 600;
          color: var(--_color---charcoal-black);
          font-family: var(--font-heading);
        }
      `}</style>
    </section>
  )
}
