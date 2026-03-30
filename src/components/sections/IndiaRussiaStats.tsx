'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { label: 'Strategic Partnership Year', value: 2000, suffix: '', prefix: '' },
  { label: 'Enduring Diplomatic Relations', value: 77, suffix: ' Years+', prefix: '' },
  { label: 'Bilateral Trade Goal', value: 50, suffix: 'B+', prefix: '$' },
  { label: 'Joint Projects', value: 30, suffix: '+', prefix: '' },
]

const StatCounter = ({ value, duration = 2, prefix = '', suffix = '' }: { value: number; duration?: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const totalMilestones = 60
      const increment = end / totalMilestones
      const timerDuration = (duration * 1000) / totalMilestones

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, timerDuration)

      return () => clearInterval(timer)
    }
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

export const IndiaRussiaStats = () => {
  return (
    <section className="stats-section">
      <div className="bg-glow1" />
      <div className="bg-glow2" />

      <div className="container-large" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="tag-label" style={{ marginBottom: 24 }}>
            Strategic Convergence
          </span>
          <h2 style={{ fontSize: 'var(--_typhography---font-size--h1)', fontWeight: 'var(--_typhography---font-weight--h1)', lineHeight: 'var(--_typhography---font-line-height--h1)', color: '#ffffff', marginBottom: 24 }}>
            A Legacy of <span style={{ color: 'var(--_color---golden-amber)' }}>Unshakable Trust</span>
          </h2>
          <p style={{ maxWidth: 800, margin: '0 auto', fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', lineHeight: 'var(--_typhography---line-height--p)', fontFamily: 'var(--font-body)' }}>
            The partnership between India and Russia is a cornerstone of global stability and mutual prosperity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-interactive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              className="stat-card"
            >
              <div className="stat-value">
                <StatCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="stat-label">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .stats-section {
          position: relative;
          overflow: hidden;
          background: var(--_color---midnight-teal);
          padding: var(--_gaps---section-gap--section-gap-v1) 0;
        }

        .bg-glow1 {
           position: absolute;
           top: -10%;
           right: -10%;
           width: 600px;
           height: 600px;
           background: radial-gradient(circle, var(--_color---golden-amber) 0%, transparent 60%);
           opacity: 0.1;
           filter: blur(80px);
        }

        .bg-glow2 {
           position: absolute;
           bottom: -10%;
           left: -10%;
           width: 500px;
           height: 500px;
           background: radial-gradient(circle, var(--_color---crimson-red) 0%, transparent 60%);
           opacity: 0.1;
           filter: blur(80px);
        }

        .stat-card {
           text-align: center;
           padding: 64px 32px;
           border-radius: var(--radius-lg);
           background: rgba(255,255,255,0.03);
           border: 1px solid rgba(255,255,255,0.05);
           backdrop-filter: blur(10px);
           transition: all 0.4s ease;
        }
        .stat-card:hover {
           background: rgba(255,255,255,0.05);
           transform: translateY(-8px);
           border-color: rgba(255,255,255,0.1);
        }

        .stat-value {
           font-size: var(--_typhography---font-size--h1);
           font-weight: var(--_typhography---font-weight--h1);
           line-height: var(--_typhography---font-line-height--h1);
           color: var(--_color---golden-amber);
           margin-bottom: 12px;
           font-family: var(--font-heading);
        }

        .stat-label {
           font-size: 0.875rem;
           font-weight: 700;
           color: rgba(255,255,255,0.5);
           text-transform: uppercase;
           letter-spacing: 0.25em;
           font-family: var(--font-heading);
        }

        @media (min-width: 1024px) {
          .stats-interactive-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
