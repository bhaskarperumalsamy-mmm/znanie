'use client'

import { motion, Variants } from 'framer-motion'

const cards = [
  {
    title: 'Civilisational Anchor',
    description: 'Stabilising the Eurasian landmass through a sovereign security architecture that prevents regional fragmentation and maintains multipolar peace.'
  },
  {
    title: 'Multipolar Vanguard',
    description: 'Championing the rights of the Global South by fostering an international order based on genuine developmental autonomy and sovereign choice.'
  },
  {
    title: 'Strategic Resilience',
    description: 'A multi-generational partnership built on mutual trust, ensuring absolute consistency in relations despite shifting global currents.'
  }
]

export const StrategicPillars = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as any } }
  }

  const smokyBlack = '#1a1a2e'
  const shadowGray = '#6b7280'
  const primaryRed = '#dc2525'

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="pillars-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}
        >
          {cards.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              style={{
                padding: '40px',
                borderRadius: '24px',
                backgroundColor: '#ffffff',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                border: '1px solid #f1f1f1',
                textAlign: 'center'
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: 24,
                  marginBottom: 16,
                  color: smokyBlack,
                  fontFamily: 'var(--font-lexend), sans-serif',
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: shadowGray,
                  fontFamily: 'var(--font-lexend), sans-serif',
                }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style>{`
        @media (min-width: 1024px) {
          .pillars-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
