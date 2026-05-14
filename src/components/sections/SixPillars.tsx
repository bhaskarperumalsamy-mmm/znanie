'use client'

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'

const services = [
  {
    num: '01',
    title: 'Learning for Life',
    description: 'Comprehensive educational programs designed to empower students with world-class knowledge and practical skills for lifelong success.',
    image: '/images/zn_learning_life.jpg',
  },
  {
    num: '02',
    title: 'Nurturing Talent',
    description: 'Identifying and cultivating exceptional potential through scholarships, mentorship programs, and hands-on research opportunities.',
    image: '/images/zn_nurturing_talent.jpg',
  },
  {
    num: '03',
    title: 'Advancing Innovation',
    description: 'Fostering cutting-edge research and technological breakthroughs by connecting brilliant minds across borders.',
    image: '/images/zn_advancing_innovation.jpg',
  },
  {
    num: '04',
    title: 'Strengthening Communities',
    description: 'Building resilient partnerships between Indian and Russian academic communities through shared values and mutual growth.',
    image: '/images/zn_strengthening.jpg',
  },
  {
    num: '05',
    title: 'Building Bridges',
    description: 'Creating lasting diplomatic and cultural connections that unite India and Russia through education and shared aspirations.',
    image: '/images/zn_building_bridges.jpg',
  },
  {
    num: '06',
    title: 'Protecting Our Future',
    description: 'Safeguarding the next generation through sustainable development initiatives and responsible global citizenship programs.',
    image: '/images/zn_protecting.jpg',
  },
]

export const SixPillars = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as any } }
  }

  return (
    <section className="sp-section">
      <div className="container-large">

        {/* ─── Header ─── */}
        <div className="sp-header">
          <motion.span
            className="sp-tag"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            OUR SIX PILLARS
          </motion.span>

          <motion.div
            className="sp-title-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="sp-title">
              Impact Through <span className="sp-accent">Purpose</span>
            </h2>
            <p className="sp-subtitle">
              We are a team of dreamers and doers, officially established in 1991 to support the brightest minds in Russia and beyond.
            </p>
          </motion.div>
        </div>

        {/* ─── Grid ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="sp-grid"
        >
          {services.map((service) => (
            <motion.div
              key={service.num}
              variants={itemVariants}
            >
              <div className="sp-card">

                {/* ─── Hover Elements (Vistario Background & Overlay) ─── */}
                <div className="sp-card-hover-bg">
                  <Image src={service.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="sp-card-hover-overlay" />

                {/* Red Pillar Badge (At root level to stay visible) */}
                <div className="sp-badge">
                  PILLAR {service.num}
                </div>

                {/* ─── Top Image Area ─── */}
                <div className="sp-card-img-wrap">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover sp-card-img"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* ─── Content Area ─── */}
                <div className="sp-card-content">
                  <h3 className="sp-card-title">{service.title}</h3>
                  <p className="sp-card-desc">{service.description}</p>

                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        /* ─── Section ─── */
        .sp-section {
          padding: var(--_gaps---section-gap--section-gap-v1) 0;
          background: var(--_color---soft-gray);
        }

        /* ─── Header ─── */
        .sp-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 72px;
        }
        
        .sp-tag {
          font-family: var(--_font-family---lexend);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.25em;
          color: var(--_color---shadow-gray);
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .sp-title-wrap {
          max-width: 720px;
        }

        .sp-title {
          font-size: var(--_typhography---font-size--h2);
          font-weight: var(--_typhography---font-weight--h2);
          line-height: var(--_typhography---font-line-height--h2);
          color: var(--_color---charcoal-black);
          margin-bottom: 24px;
        }

        .sp-accent {
          color: var(--_color---crimson-red);
        }

        .sp-subtitle {
          font-size: 1.125rem;
          color: var(--_color---shadow-gray);
          line-height: 1.8;
          font-family: var(--font-body);
        }

        /* ─── Grid ─── */
        .sp-grid {
          display: grid;
          gap: 32px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) { .sp-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .sp-grid { grid-template-columns: repeat(3, 1fr); gap: 40px; } }

        /* ─── Vistario Style Card ─── */
        .sp-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 8px;
          overflow: hidden;
          text-decoration: none;
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
          position: relative; /* Essential for absolutely positioned overlays */
          height: 100%;
        }

        .sp-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
          border-color: transparent;
        }

        /* ─── Hover Background (rt-course-v3-card-background) ─── */
        .sp-card-hover-bg {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 1; /* Above white background, below content */
        }
        .sp-card:hover .sp-card-hover-bg {
          opacity: 1;
        }

        /* Hover Overlay (rt-course-v3-card-overlay) */
        .sp-card-hover-overlay {
          position: absolute;
          inset: 0;
          opacity: 0;
          background: rgba(10,20,25,0.78); /* Deep dark overlay */
          transition: opacity 0.4s ease;
          z-index: 2; /* Above the hover bg, below content */
        }
        .sp-card:hover .sp-card-hover-overlay {
          opacity: 1;
        }

        /* ─── Top Image Area ─── */
        .sp-card-img-wrap {
          position: relative;
          width: 100%;
          height: 280px; /* Increased from 220px */
          background: #eeeeee;
          overflow: hidden;
          z-index: 3; /* Always visible until hover */
          transition: opacity 0.4s ease;
        }
        .sp-card:hover .sp-card-img-wrap {
          opacity: 0; /* Fades out smoothly so the full-card hover-bg takes over */
        }

        .sp-card-img {
          transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
        }
        .sp-card:hover .sp-card-img {
          transform: scale(1.08); 
        }

        /* Top Right Red Badge */
        .sp-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: var(--_color---crimson-red);
          color: #ffffff;
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          z-index: 15; /* Absolute priority over everything */
          transition: background 0.4s ease;
        }
        .sp-card:hover .sp-badge {
          background: #ffffff;
          color: var(--_color---crimson-red);
        }

        /* ─── Content Area ─── */
        .sp-card-content {
          padding: 40px; /* Increased from 32px */
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          position: relative;
          z-index: 10; /* Ensures text stays above the dark overlay */
        }

        .sp-card-title {
          font-family: var(--font-heading);
          font-size: 1.5rem; /* Increased from 1.25rem */
          font-weight: 700;
          color: var(--_color---charcoal-black);
          line-height: 1.4;
          margin-bottom: 20px;
          transition: color 0.4s ease;
        }
        .sp-card:hover .sp-card-title {
          color: #ffffff; /* Turns white for readability on dark overlay */
        }

        .sp-card-desc {
          font-family: var(--font-body);
          font-size: 0.9375rem; 
          color: var(--_color---shadow-gray);
          line-height: 1.6;
          margin-bottom: 24px;
          flex-grow: 1;
          transition: color 0.4s ease;
        }
        .sp-card:hover .sp-card-desc {
          color: rgba(255,255,255,0.7);
        }

        /* removed footer styles */
      `}</style>
    </section>
  )
}
