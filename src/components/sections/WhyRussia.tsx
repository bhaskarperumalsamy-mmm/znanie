'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const reasons = [
  {
    title: 'Learn Russian, Experience Culture',
    description: ' Our initiative delivers free access to Russian language and cultural education for all, nurturing cross-cultural understanding, global collaboration, and inclusive academic advancement.',
    image: '/images/study-work.jpg'
  },
  {
    title: 'Cultural Harmonization',
    description: 'A vibrant, inclusive society that acts as a global melting pot. International diplomats and students converge through shared intellectual pursuit.',
    image: '/images/elly-fairytale.jpg'
  },
  {
    title: 'Global Credentialing',
    description: 'Degrees universally recognized for fundamental scientific rigor, setting the standard particularly in Medicine, Aerospace, and Theoretical Physics.',
    image: '/images/annika-gordon.jpg'
  },
  {
    title: 'Career Gateway',
    description: 'Direct integration into the robust bilateral economic bridge between India and Russia, opening exclusive structural avenues in tech and trade.',
    image: '/images/mimi-thian.jpg'
  }
]

export const WhyRussia = () => {

  return (
    <section className="why-russia-tight-redesign" style={{ backgroundColor: '#ffffff' }}>
      <div className="container-master-v7">

        {/* Header Block: Tighter Institutional Pivot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="header-compact"
        >
          <div className="title-stack-final">
            <span className="premium-tag">GLOBAL DOMINANCE</span>
            <h2 className="display-h2-compact">The Key to Success: <span className="text-accent-red">Why Russia?</span></h2>
          </div>

          <div className="stats-group-compact">
            <div className="stat-unit-compact">
              <span className="v-num">170+</span>
              <span className="v-lbl">Nationalities</span>
            </div>
            <div className="v-sep-line" />
            <div className="stat-unit-compact">
              <span className="v-num">500+</span>
              <span className="v-lbl">Universities</span>
            </div>
          </div>
        </motion.div>

        <div className="ledger-master-divider" />

        {/* Ledger Stack: Reduced Height & Glass-Aesthetic Redesign */}
        <div className="ledger-stack-v7">
          {reasons.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <a href="#" className="ledger-row-compact group">
                <div className="content-pivot-v7">

                  {/* Dynamic Image Overlay: Synchronized with Content Height */}
                  <div className="image-reveal-v7">
                    <div className="reveal-frame-v7">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Text-Narrative Block: Tighter Spacing */}
                  <div className="text-narrative-v7">
                    <h3 className="item-title-v7 transition-colors duration-300">{item.title}</h3>
                    <p className="item-desc-v7">{item.description}</p>
                  </div>
                </div>

                {/* Refined Arrow Portal: Scale 0.9 for Tighter Aesthetic */}
                <div className="portal-arrow-v7">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        .why-russia-tight-redesign {
          padding: 80px 0 120px;
          font-family: var(--_font-family---lexend);
          overflow: hidden;
        }

        .container-master-v7 {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .header-compact {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
          gap: 40px;
        }

        .premium-tag {
          color: var(--_color---crimson-red);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 8px;
        }

        .display-h2-compact {
          font-family: var(--_font-family---lexend);
          font-size: var(--_typhography---font-size--h2);
          font-weight: var(--_typhography---font-weight--h2);
          line-height: var(--_typhography---font-line-height--h2);
          color: var(--_color---charcoal-black);
          margin: 0 0 16px 0;
        }

        .text-accent-red {
          color: #dc2525 !important;
        }

        .stats-group-compact {
          display: flex;
          align-items: center;
          gap: 60px;
        }

        .v-num {
          display: block;
          font-size: var(--_typhography---font-size--h2);
          font-weight: var(--_typhography---font-weight--h2);
          color: var(--_color---crimson-red);
          line-height: 1;
        }

        .v-lbl {
          font-size: 13px;
          color: var(--_color---smoky-black);
          margin-top: 4px;
          display: block;
        }

        .v-sep-line {
          width: 1px;
          height: 40px;
          background-color: var(--_color---silver-mist);
        }

        .ledger-master-divider {
          height: 1px;
          background-color: var(--_color---silver-mist);
          width: 100%;
        }

        .ledger-row-compact {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 40px;
          padding: 32px 0;
          border-bottom: 1px solid var(--_color---silver-mist);
          transition: all 0.4s ease;
          text-decoration: none !important;
          position: relative;
        }

        .content-pivot-v7 {
          display: flex;
          align-items: center;
          gap: 0;
          transition: all 0.6s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .image-reveal-v7 {
          width: 0px;
          opacity: 0;
          overflow: hidden;
          transition: all 0.7s cubic-bezier(0.33, 1, 0.68, 1);
          flex-shrink: 0;
        }

        .ledger-row-compact:hover .image-reveal-v7 {
          width: 280px;
          opacity: 1;
          margin-right: 40px;
        }

        .reveal-frame-v7 {
          position: relative;
          width: 280px;
          aspect-ratio: 16/9;
          border-radius: var(--radius-sm);
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }

        .text-narrative-v7 {
          max-width: 900px;
        }

        .item-title-v7 {
          font-size: var(--_typhography---font-size--h3);
          font-weight: var(--_typhography---font-weight--h3);
          color: var(--_color---charcoal-black);
          margin: 0 0 8px;
        }

        .item-desc-v7 {
          font-size: 1.125rem;
          line-height: 1.5;
          color: var(--_color---smoky-black);
          margin: 0;
        }

        .portal-arrow-v7 {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--_color---silver-mist);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--_color---charcoal-black);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .ledger-row-compact:hover {
          background-color: var(--_color---soft-gray);
          padding-left: 20px;
          padding-right: 20px;
        }

        .ledger-row-compact:hover .item-title-v7 {
          color: var(--_color---crimson-red);
        }

        .ledger-row-compact:hover .portal-arrow-v7 {
          background-color: var(--_color---crimson-red);
          border-color: var(--_color---crimson-red);
          color: #ffffff;
        }

        .ledger-row-compact:hover svg {
          transform: rotate(-45deg);
        }

        @media (max-width: 1024px) {
          .why-russia-tight-redesign {
            padding: 40px 0;
          }
          .container-master-v7 {
            padding: 0 20px;
          }
          .header-compact {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 32px;
            gap: 24px;
          }
          .image-reveal-v7 {
            width: 100% !important;
            opacity: 1 !important;
            margin-bottom: 24px;
            margin-right: 0 !important;
          }
          .reveal-frame-v7 {
            width: 100%;
          }
          .content-pivot-v7 {
            flex-direction: column;
            align-items: flex-start;
          }
          .portal-arrow-v7 {
            display: none;
          }
          .ledger-row-compact {
            grid-template-columns: 1fr;
            padding: 24px 0;
          }
          .display-h2-compact {
            font-size: 1.75rem;
          }
          .stats-group-compact {
            gap: 32px;
          }
          .v-num {
            font-size: 2rem;
          }
        }

      `}</style>
    </section>
  )
}
