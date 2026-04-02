'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Rahul Verma',
    university: 'Saint-Petersburg State University',
    image: '/images/user.png',
    title: 'Life-Changing Experience!',
    quote: "The ZNANIE Foundation's scholarship assistance and unwavering integrity made my dream of studying in Russia a reality. Their guidance through every step of the admission process was invaluable.",
  },
  {
    name: 'Vikram Singh',
    university: 'Ural Federal University',
    image: '/images/user.png',
    title: 'End-to-End Excellence!',
    quote: 'From visa processing to university admission, ZNANIE provided end-to-end support. The cultural immersion programs helped me adapt seamlessly to life in Russia.',
  },
  {
    name: 'Shraddha Chaturvedi',
    university: 'Lomonosov Moscow State University',
    image: '/images/user.png',
    title: 'Transparent & Dedicated!',
    quote: "Thanks to ZNANIE, I am pursuing my Master's degree at one of the world's top universities. Their transparent process and dedicated counselors made all the difference.",
  },
  {
    name: 'Priya Sharma',
    university: 'Tomsk State University',
    image: '/images/user.png',
    title: 'Perfectly Prepared!',
    quote: 'The Russian language course provided by ZNANIE prepared me perfectly for my studies. I felt confident from day one at the university.',
  },
  {
    name: 'Ankit Mehta',
    university: 'Bauman Moscow State Technical University',
    image: '/images/user.png',
    title: 'Doors Beyond Imagination!',
    quote: 'ZNANIE opened doors I never imagined possible. Studying aerospace engineering in Moscow has been life-changing. The foundation truly cares about every student.',
  },
  {
    name: 'Deepika Nair',
    university: 'RUDN University',
    image: '/images/user.png',
    title: 'Extraordinary Mentorship!',
    quote: 'The mentorship I received was extraordinary. My counselor helped me navigate the entire process, from choosing the right program to settling in at RUDN.',
  },
  {
    name: 'Rohan Kapoor',
    university: 'MIPT (Phystech)',
    image: '/images/user.png',
    title: 'Beyond Imagination!',
    quote: 'Studying physics at MIPT alongside brilliant minds from around the world — this experience is beyond anything I could have imagined. Thank you, ZNANIE.',
  },
  {
    name: 'Sneha Reddy',
    university: 'HSE University',
    image: '/images/user.png',
    title: 'Impossible Made Simple!',
    quote: "ZNANIE made the impossible feel simple. Their team handled every detail with professionalism, and I am now thriving at one of Russia's top economics universities.",
  },
  {
    name: 'Arjun Patel',
    university: 'Novosibirsk State University',
    image: '/images/user.png',
    title: 'World-Class Support!',
    quote: "Moving to Siberia was a bold decision, but ZNANIE's support network made it feel like home. The academic rigor and research facilities here are world-class.",
  },
]

// Original testimonials only for mobile to avoid massive duplication
const mobileTestimonials = testimonials;
// Duplicate for seamless infinite marquee on desktop
const marqueeItems = [...testimonials, ...testimonials]

export const SuccessStories = () => {
  const marqueeRef = useRef<HTMLDivElement>(null)

  return (
    <section className="vt-section">
      <div className="container-large">

        {/* ─── Centered Header (Vistario style) ─── */}
        <motion.div
          className="vt-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          viewport={{ once: true }}
        >
          <span className="vt-tag">ALUMNI SUCCESS</span>
          <h2 style={{ fontSize: 'var(--_typhography---font-size--h2)', fontWeight: 'var(--_typhography---font-weight--h2)', lineHeight: 'var(--_typhography---font-line-height--h2)', color: 'var(--_color---charcoal-black)' }}>
            Voices of <span style={{ color: 'var(--_color---crimson-red)' }}>Ambition</span>
          </h2>
        </motion.div>

      </div>

      {/* ─── Infinite Marquee Scroller (Vistario auto-scroll) ─── */}
      <div className="vt-marquee-wrapper">
        <div ref={marqueeRef} className="vt-marquee-track">
          {/* Desktop Marquee */}
          <div className="vt-marquee-desktop">
            {marqueeItems.map((t, index) => (
              <TestimonialCard key={index} t={t} />
            ))}
          </div>

          {/* Mobile Grid */}
          <div className="vt-marquee-mobile">
            {testimonials.map((t, index) => (
              <TestimonialCard key={index} t={t} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ─── Section ─── */
        .vt-section {
          padding: var(--_gaps---section-gap--section-gap-v1) 0;
          background: var(--_color---soft-gray);
          overflow: hidden;
        }

        /* ─── Header ─── */
        .vt-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .vt-tag {
          display: block;
          font-family: var(--_font-family---lexend);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.25em;
          color: var(--_color---shadow-gray);
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        /* ─── Marquee ─── */
        .vt-marquee-wrapper {
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .vt-marquee-track {
          display: flex;
          gap: 28px;
          animation: marqueeScroll 60s linear infinite;
          width: max-content;
        }

        @media (max-width: 768px) {
          .vt-marquee-wrapper {
            mask-image: none;
            -webkit-mask-image: none;
          }
          .vt-marquee-track {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
            animation: none;
            width: 100%;
            padding: 0 20px;
          }
          .vt-card {
            width: 100% !important;
          }
        }

        .vt-marquee-desktop { display: flex; gap: 28px; }
        .vt-marquee-mobile { display: none; }

        @media (max-width: 768px) {
          .vt-marquee-wrapper {
            mask-image: none;
            -webkit-mask-image: none;
          }
          .vt-marquee-track {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
            animation: none;
            width: 100%;
            padding: 0 20px;
          }
          .vt-card {
            width: 100% !important;
          }
          .vt-marquee-desktop { display: none; }
          .vt-marquee-mobile { display: grid; gap: 24px; width: 100%; }
        }

        .vt-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ─── Card (Vistario style) ─── */
        .vt-card {
          flex-shrink: 0;
          width: 380px;
          background: #ffffff;
          border-radius: 16px;
          padding: 44px 36px 40px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.04);
          transition: all 0.4s ease;
        }
        .vt-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.07);
          transform: translateY(-4px);
        }

        /* ─── Quote Icon ─── */
        .vt-quote-icon {
          font-size: 64px;
          font-family: Georgia, serif;
          color: rgba(0,0,0,0.06);
          line-height: 1;
          margin-bottom: 8px;
          user-select: none;
        }

        /* ─── Card Title ─── */
        .vt-card-title {
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--_color---charcoal-black);
          font-family: var(--font-heading);
          margin-bottom: 16px;
        }

        /* ─── Quote Text ─── */
        .vt-card-quote {
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--_color---shadow-gray);
          font-family: var(--font-body);
          margin-bottom: 28px;
          flex-grow: 1;
        }

        /* ─── Red Divider ─── */
        .vt-divider {
          width: 40px;
          height: 3px;
          background: var(--_color---crimson-red);
          border-radius: 3px;
          margin-bottom: 28px;
        }

        /* ─── Profile ─── */
        .vt-profile {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .vt-avatar {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--_color---soft-gray);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .vt-name {
          font-size: 1rem;
          font-weight: 700;
          color: var(--_color---charcoal-black);
          font-family: var(--font-heading);
        }

        .vt-role {
          font-size: 0.75rem;
          color: var(--_color---shadow-gray);
          font-family: var(--font-body);
        }
      `}</style>
    </section>
  )
}

const TestimonialCard = ({ t }: { t: any }) => (
  <div className="vt-card">
    <div className="vt-quote-icon">&ldquo;</div>
    <h4 className="vt-card-title">{t.title}</h4>
    <p className="vt-card-quote">{t.quote}</p>
    <div className="vt-divider" />
    <div className="vt-profile">
      <div className="vt-avatar">
        <Image src={t.image} alt={t.name} fill className="object-cover" sizes="64px" />
      </div>
      <div className="vt-name">{t.name}</div>
      <div className="vt-role">{t.university}</div>
    </div>
  </div>
)
