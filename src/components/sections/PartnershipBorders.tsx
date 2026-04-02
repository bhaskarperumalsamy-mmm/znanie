'use client'

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'

const pillars = [
  {
    num: '01',
    title: 'Deep Russian Roots',
    desc: 'Our roots are deep in Russian soil. We are committed to the economic, cultural, and technical revival of our nation.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-6h6v6" /></svg>
    ),
  },
  {
    num: '02',
    title: 'Global Reach',
    desc: 'But our branches reach far beyond. For over 30 years, we have strengthened our position across the Middle East and South Asia.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>
    ),
  },
  {
    num: '03',
    title: 'International Cooperation',
    desc: 'We are promoting international cooperation and solving global problems of human development through education.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
  },
  {
    num: '04',
    title: 'Advancing Excellence',
    desc: 'We are bringing the country to the level of advanced states through knowledge exchange and academic partnerships.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
    ),
  },
]

export const PartnershipBorders = () => {

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
  }

  return (
    <section className="pb-section">
      <div className="container-large">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* ─── Header Row ─── */}
          <motion.div variants={itemVariants} className="pb-header">
            <div className="pb-header-left">
              <span className="tag-premium" style={{ marginBottom: 16, fontSize: '.75rem' }}>Stronger Together</span>
              <h2 className="pb-title">
                Partnership Beyond <br />
                <span className="text-crimson-v2">Borders</span>
              </h2>
            </div>
            <p className="pb-header-desc">
              For over three decades, our foundation has built bridges between nations — fostering
              education, cultural exchange, and mutual progress that transcend geographical boundaries.
            </p>
          </motion.div>

          {/* ─── Main Content: Image + Pillars ─── */}
          <div className="pb-main-grid">
            {/* Large Image */}
            <motion.div variants={itemVariants} className="pb-image-col">
              <div className="pb-image-wrapper">
                <Image
                  src="/images/alexis-brown.jpg"
                  alt="Derbent Fortress — Heritage and Strength"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="pb-image-gradient" />

                {/* Stats overlay on image */}
                <div className="pb-image-stats">
                  <div className="pb-stat-item">
                    <span className="pb-stat-value">30+</span>
                    <span className="pb-stat-label">Years of Partnership</span>
                  </div>
                  <div className="pb-stat-divider" />
                  <div className="pb-stat-item">
                    <span className="pb-stat-value">15+</span>
                    <span className="pb-stat-label">Partner Countries</span>
                  </div>
                  <div className="pb-stat-divider" />
                  <div className="pb-stat-item">
                    <span className="pb-stat-value">1991</span>
                    <span className="pb-stat-label">Established</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pillars Grid */}
            <div className="pb-pillars-col">
              {pillars.map((p) => (
                <motion.div key={p.num} variants={itemVariants} className="pb-pillar-card">
                  <div className="pb-pillar-top">
                    <div className="pb-pillar-icon">{p.icon}</div>
                    <span className="pb-pillar-num">{p.num}</span>
                  </div>
                  <h4 className="pb-pillar-title">{p.title}</h4>
                  <p className="pb-pillar-desc">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        /* ─── Section ─── */
        .pb-section {
          padding: var(--_gaps---section-gap--section-gap-v1) 0;
          background: var(--_color---soft-gray);
          position: relative;
          overflow: hidden;
        }

        /* ─── Tag ─── */
        .tag-premium {
          display: inline-block;
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--_color---crimson-red);
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        /* ─── Header ─── */
        .text-crimson-v2 { color: var(--_color---crimson-red); }

        .pb-title {
          font-family: var(--_font-family---lexend);
          font-size: 2rem;
          font-weight: var(--_typhography---font-weight--h2);
          line-height: 1.2;
          color: var(--_color---charcoal-black);
          margin-bottom: 24px;
        }

        @media (min-width: 1024px) {
          .pb-title {
            font-size: var(--_typhography---font-size--h2);
            line-height: var(--_typhography---font-line-height--h2);
            margin-bottom: 32px;
          }
          .pb-header {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            gap: 80px;
            margin-bottom: 80px;
          }
        }

        .pb-header-left {
          flex-shrink: 0;
        }

        .pb-header-desc {
          font-size: 1.0625rem;
          line-height: 1.75;
          color: var(--_color---shadow-gray);
          font-family: var(--font-body);
          max-width: 440px;
          padding-bottom: 10px;
        }

        /* ─── Main Grid ─── */
        .pb-main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }
        @media (min-width: 1024px) {
          .pb-main-grid {
            grid-template-columns: 1.15fr 1fr;
            gap: 64px;
            align-items: start;
          }
        }

        /* ─── Image ─── */
        .pb-image-wrapper {
          position: relative;
          height: 480px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 80px -20px rgba(0,0,0,0.18);
        }
        @media (min-width: 1024px) {
          .pb-image-wrapper { height: 580px; }
        }

        .pb-image-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15,37,42,0.85) 0%, rgba(15,37,42,0.2) 50%, transparent 100%);
          z-index: 2;
        }

        .pb-image-stats {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 20px 16px;
          background: rgba(15,37,42,0.6);
          backdrop-filter: blur(12px);
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        @media (min-width: 768px) {
          .pb-image-stats { gap: 32px; padding: 28px 32px; }
        }

        .pb-stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .pb-stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--_color---golden-amber);
          font-family: var(--font-heading);
          line-height: 1;
        }

        .pb-stat-label {
          font-size: 0.6875rem;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: var(--font-heading);
        }

        .pb-stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255,255,255,0.12);
        }

        /* ─── Pillars ─── */
        .pb-pillars-col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 640px) {
          .pb-pillars-col {
            grid-template-columns: 1fr 1fr;
          }
        }

        .pb-pillar-card {
          background: var(--_color---white);
          border: 1px solid var(--_color---silver-mist);
          border-radius: 16px;
          padding: 32px 28px;
          transition: all 0.4s cubic-bezier(0.33, 1, 0.68, 1);
          position: relative;
          overflow: hidden;
        }
        /* Vistario Exact Hover Animation */
        .pb-pillar-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px -10px rgba(0,0,0,0.12);
          background-color: #0e1010; /* rgb(14, 16, 16) */
          border-color: transparent;
        }

        .pb-pillar-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .pb-pillar-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(220,37,37,0.06);
          color: var(--_color---crimson-red);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
        }
        .pb-pillar-card:hover .pb-pillar-icon {
          color: var(--_color---golden-amber);
          background: rgba(255, 181, 2, 0.1);
        }

        .pb-pillar-num {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--_color---silver-mist);
          font-family: var(--font-heading);
          letter-spacing: 0.05em;
          transition: color 0.4s ease;
        }
        .pb-pillar-card:hover .pb-pillar-num {
          color: rgba(255, 255, 255, 0.25);
        }

        .pb-pillar-title {
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--_color---charcoal-black);
          font-family: var(--font-heading);
          margin-bottom: 10px;
          transition: color 0.4s ease;
        }
        .pb-pillar-card:hover .pb-pillar-title {
          color: #ffffff;
        }

        .pb-pillar-desc {
          font-size: 0.9rem;
          line-height: 1.65;
          color: var(--_color---shadow-gray);
          font-family: var(--font-body);
          transition: color 0.4s ease;
        }
        .pb-pillar-card:hover .pb-pillar-desc {
          color: #ffffff;
        }
      `}</style>
    </section>
  )
}
