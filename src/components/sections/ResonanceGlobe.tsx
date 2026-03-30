'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'

const universities = [
  { name: 'Lomonosov Moscow State University', image: '/images/Universities/moscow_state_university.jpg', location: 'Moscow, Russia', programs: '200+ Programs' },
  { name: 'Bauman MSTU', image: '/images/Universities/bauman_university.jpg', location: 'Moscow, Russia', programs: '100+ Programs' },
  { name: 'RUDN University', image: '/images/Universities/rudn_university.jpg', location: 'Moscow, Russia', programs: '150+ Programs' },
  { name: 'Saint-Petersburg State University', image: '/images/Universities/spb_university.jpg', location: 'St. Petersburg, Russia', programs: '180+ Programs' },
  { name: 'MIPT (Phystech)', image: '/images/Universities/mipt_university.jpg', location: 'Moscow Region, Russia', programs: '100+ Programs' },
]

export const ResonanceGlobe = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
  }

  const smokyBlack = '#0f252a'
  const shadowGray = '#4a5568'
  const primaryRed = '#dc2525'
  const gold = '#d4a743'

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '120px 24px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-flex', padding: '6px 16px', borderRadius: 100, fontSize: 13, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', backgroundColor: 'rgba(123,26,44,0.06)', color: primaryRed, fontFamily: 'var(--font-lexend)', marginBottom: 16 }}>
             Institutional Archive
          </span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: smokyBlack, fontFamily: 'var(--font-lexend)', lineHeight: 1.15 }}>
            Resonance Across <span style={{ color: gold }}>the Globe</span>
          </h2>
          <p style={{ maxWidth: 672, margin: '0 auto', fontSize: 18, color: shadowGray, lineHeight: 1.7, fontFamily: 'var(--font-lexend)', marginTop: 16 }}>
            Explore our network of world-renowned partner universities across Russia, offering diverse programs for Indian students.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="resonance-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 24 }}
        >
          {universities.map((uni) => (
            <motion.div key={uni.name} variants={itemVariants}>
              <Link href="/study-in-russia" style={{ display: 'block', borderRadius: 24, overflow: 'hidden', backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 15px 40px rgba(0,0,0,0.05)', transition: 'transform 0.5s ease', textDecoration: 'none' }}>
                <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
                  <Image
                    src={uni.image}
                    alt={uni.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,10,16,0.8), rgba(26,10,16,0.3), transparent)' }} />
                  <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: gold, marginBottom: 8, fontFamily: 'var(--font-lexend)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{uni.programs}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#ffffff', lineHeight: 1.2, fontFamily: 'var(--font-lexend)', marginBottom: 6 }}>{uni.name}</h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-lexend)' }}>{uni.location}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/study-in-russia" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 32px', borderRadius: 12, fontWeight: 700, fontSize: 16, color: 'white', backgroundColor: primaryRed, fontFamily: 'var(--font-lexend)', transition: 'all 0.3s ease', textDecoration: 'none', boxShadow: `0 10px 25px rgba(220,31,21,0.2)` }}>
            View All Universities
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </Link>
        </div>
      </div>
      <style>{`
        @media (min-width: 640px) {
          .resonance-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .resonance-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (min-width: 1280px) {
          .resonance-grid { grid-template-columns: repeat(5, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
