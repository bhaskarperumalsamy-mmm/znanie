'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, Variants, useScroll, useTransform, useSpring } from 'framer-motion'
import { HeroSection } from '@/components/sections/HeroSection'
import { Button } from '@/components/ui/Button'
import styles from './about.module.css'

/* ───────────────────────────────────────────
   DATA
   ─────────────────────────────────────────── */

const principles = [
  {
    num: '01', label: 'TRANSPARENCY', text: "We're open about what we do and how we do it.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="18" cy="18" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: '02', label: 'EQUALITY', text: 'Everyone deserves the same opportunities.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="8" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="22" x2="28" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="6" x2="18" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '03', label: 'VOLUNTARY PARTICIPATION', text: 'People choose to be part of our mission.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6C12 6 8 10.5 8 15c0 7 10 15 10 15s10-8 10-15c0-4.5-4-9-10-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="18" cy="15" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    num: '04', label: 'SELF-GOVERNANCE', text: 'We manage our affairs independently.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 10v8l5.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '05', label: 'LEGITIMACY', text: 'We operate within the law and uphold the highest standards.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6l2.5 6H28l-5.5 4.5 2 7L18 19l-6.5 4.5 2-7L8 12h7.5L18 6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const impactStats = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    value: '30+', label: 'YEARS OF SERVICE', desc: 'Supporting communities since 1991'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12L12 7L20 12L12 17L4 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M20 12V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 14.5V18.5C8 19.5 12 21 12 21C12 21 16 19.5 16 18.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    value: '5,000+', label: 'SCHOLARSHIPS AWARDED', desc: 'Empowering talented youth'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M23 21V19C23 17.1352 21.7252 15.5683 19.9632 15.1213" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 3.13403C17.7667 3.5855 19 5.15844 19 7.00003C19 8.84163 17.7667 10.4146 16 10.866" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    value: '50+', label: 'PARTNER INSTITUTIONS', desc: 'Collaborative impact'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    value: '2', label: 'OPERATING REGIONS', desc: 'Russia & Middle East'
  },
]

const mandateItems = [
  { num: '01', title: 'Knowledge & Innovation Synthesis', desc: 'Accelerating the flow of breakthrough scientific and technical resources to global communities.', wide: true },
  { num: '02', title: 'Life-Long Learning', desc: 'Investing in continuous professional evolution and career resilience far beyond formal education.', wide: false },
  { num: '03', title: 'Supporting Young Achievers', desc: 'Recognizing and funding the next generation of scientific and cultural prodigies.', wide: false },
  { num: '04', title: 'Future Entrepreneurs', desc: 'Training leaders through modern business practices inspired by bilateral success stories.', wide: false },
  { num: '05', title: 'Deep Socio-Cultural Peace', desc: 'Fostering structural harmony and bilateral friendship through deep cultural integration.', wide: false },
  { num: '06', title: 'Spiritual Maturation', desc: 'Supporting programs that promote intellectual depth and spiritual well-being across borders.', wide: true },
  { num: '07', title: 'Dignity & Social Equity', desc: 'Protecting the fundamental rights of the vulnerable through direct bureaucratic and legal assistance.', wide: false },
  { num: '08', title: 'Sovereign National Revival', desc: "Championing Russia's multidimensional revitalization through economic and cultural support.", wide: true },
  { num: '09', title: 'Eco-Structural Persistence', desc: 'Integrating nature preservation into the core of bilateral human development.', wide: false },
  { num: '10', title: 'Global Collaborative Diplomacy', desc: 'Strengthening diplomatic ties through academic exchange and community engagement.', wide: true },
]

const visionPillars = [
  { num: '01', title: 'Global Impact', desc: 'Helping Russia reach the same standards as leading nations in humanitarian, social, economic, scientific, and technical fields.' },
  { num: '02', title: 'Building Harmony', desc: 'Working towards civil unity, social cohesion, and mutual understanding between communities and nations.' },
  { num: '03', title: 'Cultural Renewal', desc: 'Supporting the spiritual and cultural revival of communities through education and bilateral exchange.' },
  { num: '04', title: 'Strengthening Democracy', desc: 'Promoting democratic ideals, the rule of law, and transparent governance through institutional programs.' },
  { num: '05', title: 'Protecting Rights', desc: 'Ensuring human rights are respected and upheld through advocacy, legal support, and educational outreach.' },
]

const engagementCards = [
  { num: '01', tag: 'HUMAN CAPITAL', title: 'Volunteer Time', desc: 'Give your time and unparalleled talent to help build resilient bridges and support global educational initiatives.' },
  { num: '02', tag: 'RESOURCES', title: 'Contribute Support', desc: 'Your resources empower students to embrace international study and foster a deeper structural cross-cultural dialogue.' },
  { num: '03', tag: 'NETWORK', title: 'Collaborative Link', desc: 'Start a conversation with our organizational leadership to explore distinct academic pipelines and expansions.' },
]

const decadesBullets = [
  'Remained true to our goals whilst adapting to changing times',
  'Grown our presence across the Russian Federation',
  'Expanded our work into the Middle East',
  'Built lasting partnerships with educational institutions, research centres, cultural organisations, and community groups',
  'Helped thousands of people access education, training, and support',
  'Maintained our reputation for integrity and transparency',
]

/* ───────────────────────────────────────────
   ANIMATION VARIANTS
   ─────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as any } },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

/* ───────────────────────────────────────────
   PAGE COMPONENT
   ─────────────────────────────────────────── */
export default function AboutContent() {
  /* Slider Logic Hooks - Using highly reliable Native Scroll approach */
  const trackRef = useRef<HTMLDivElement>(null)

  // Custom Drag-to-Scroll State
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Track the scroll progress uniquely inside the slider track
  const { scrollXProgress } = useScroll({ container: trackRef })

  // Smoothly interpret that 0...1 scroll percentage into a growing visual bar starting at minimum 15% width
  const smoothProgress = useSpring(scrollXProgress, { damping: 20, stiffness: 100 })
  const widthPercentage = useTransform(smoothProgress, [0, 1], ['15%', '100%'])

  // Handlers for Desktop Mouse Drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - trackRef.current.offsetLeft)
    setScrollLeft(trackRef.current.scrollLeft)
  }

  const handleMouseLeave = () => setIsDragging(false)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX) * 2
    trackRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <>
      {/* ════════ SECTION 1 — HERO — PREMIUM REDESIGN ════════ */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg}>
          <Image
            src="/images/wikiimages.jpg"
            alt="Heritage"
            fill
            className={styles.heroBgImage}
            priority
          />
          <div className={styles.heroGridOverlay} />
          <div className={styles.heroOverlayGradient} />
        </div>

        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] as any }}
          >
            <span className={styles.heroTag}>OUR MISSION & HERITAGE</span>
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] as any }}
          >
            Bridging Cultures<br />Building <span className="rt-text-yellow">future</span>
          </motion.h1>

          <motion.p
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] as any }}
          >
            A vibrant, inclusive society that acts as a global melting pot. Join our community of dreamers and doers.
          </motion.p>

        </div>
      </section>

      {/* ════════ SECTION 2 — HERITAGE: Our Journey (Vistario home-two exact design) ════════ */}
      <section className={styles.heritageSection}>
        <div className="container-large">
          <motion.div
            className={styles.heritageHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <span className={styles.sectionTag}>ESTABLISHED. DEDICATED. EXPANDING.</span>
            <h2 className={styles.sectionTitle}>
              Our Foundation
            </h2>
          </motion.div>

          <motion.div
            className={styles.seniorBentoBox}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* Left: Dark History Panel */}
            <motion.div variants={fadeUp} className={styles.bentoDark}>
              <div className={styles.bentoTagDark}>1st October 1991</div>
              <h3 className={styles.bentoTitleDark}>Where We Began</h3>
              <div className={styles.bentoDividerDark} />
              <p className={styles.bentoDescDark}>
                The S.I. Vavilov Foundation &ldquo;Znanie&rdquo; was established on 1st October 1991, following an order by Moscow Government Premier Yu.M. Luzhkov (Order No. 435-RP). Named in honour of distinguished scientist S.I. Vavilov, our Foundation began with a clear mission: to spread knowledge and create opportunities for all.
              </p>

              {/* Decorative giant watermark */}
              <div className={styles.watermarkDark}>1991</div>
            </motion.div>

            {/* Right: Light Leaders Panel */}
            <motion.div variants={fadeUp} className={styles.bentoLight}>
              <div className={styles.bentoTagLight}>Legacy</div>
              <h3 className={styles.bentoTitleLight}>Our Founding Leaders</h3>
              <div className={styles.bentoDividerLight} />

              <div className={styles.bentoLeadersGrid}>
                <div className={styles.bentoLeaderItem}>
                  <div className={styles.bentoRole}>First President</div>
                  <div className={styles.bentoName}>Academician Konstantin Vasilyevich Frolov</div>
                </div>
                <div className={styles.bentoLeaderItem}>
                  <div className={styles.bentoRole}>First Board Chairman</div>
                  <div className={styles.bentoName}>Professor Fyodor Fyodorovich Svetik</div>
                </div>
              </div>

              {/* Decorative graphic: simple minimal glow circles */}
              <div className={styles.bentoCircles}>
                <div className={styles.circleRed} />
                <div className={styles.circleAmber} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════ SECTION 2.5 — LEADERSHIP & GOVERNANCE — FULL WIDTH REDESIGN ════════ */}
      <section className={styles.leadershipSection}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div className={styles.leadershipGrid}>
            <div className={styles.leadershipVisual}>
              <div className={styles.leadershipIcon}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15 8H9L12 2Z" fill="currentColor"/>
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.477 2 12C2 17.523 6.477 22 12 22ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z" fill="currentColor"/>
                </svg>
              </div>
              <div className={styles.leadershipVerticalText}>GOVERNANCE</div>
            </div>

            <div className={styles.leadershipTextContent}>
              <span className={styles.sectionTag}>STRATEGIC OVERSIGHT</span>
              <h2 className={styles.leadershipTitle}>Leadership & Governance</h2>
              <div className={styles.leadershipMainText}>
                Guided by experienced professionals and visionaries, our leadership team is committed to promoting the Russian language, education, and global cultural integration with integrity, excellence, and a deep sense of patriotic pride.
              </div>
              <div className={styles.leadershipDivider} />
              <p className={styles.leadershipSubText}>
                Honoring the rich heritage, values, and contributions of Russia while fostering international understanding and unity, our team ensures every initiative reflects our mission to build bridges through education.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════ SECTION 3 — THREE DECADES: Where We Are Today ════════ */}
      <section className={styles.decadesSection}>
        <div className="container-large">
          <motion.div
            className={styles.heritageHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <span className={styles.sectionTag}>THREE DECADES OF IMPACT</span>
            <h2 className={styles.sectionTitle}>Where We Are <span style={{ color: 'var(--_color---crimson-red)' }}>Today</span></h2>
          </motion.div>

          <motion.div
            className={styles.decadesGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* Image + Floating Stats */}
            <motion.div variants={fadeUp} className={styles.decadesImageCol}>
              <div className={styles.decadesImageWrapper}>
                <Image
                  src="/images/jarmoluk-library.jpg"
                  alt="Library heritage"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <motion.div
                className={styles.decadesStatsOverlay}
                initial={{ opacity: 0, y: 20, scale: 0.9, x: '-50%' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className={styles.decadesStat}>
                  <div className={styles.statValue}>30+</div>
                  <div className={styles.statLabel}>YEARS ACTIVE</div>
                </div>
                <div className={styles.decadesStat}>
                  <div className={styles.statValue}>12</div>
                  <div className={styles.statLabel}>REGIONS</div>
                </div>
                <div className={styles.decadesStat}>
                  <div className={styles.statValue}>5k+</div>
                  <div className={styles.statLabel}>SCHOLARS</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Bullet Points with Stagger */}
            <motion.div variants={fadeUp} className={styles.decadesTextCol}>
              <p className={styles.decadesDesc}>
                Our operational timeline has seen vast changes across the globe, yet our structural mission remains resolute.
              </p>
              <motion.ul
                className={styles.decadesList}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {decadesBullets.map((item, idx) => (
                  <motion.li
                    key={idx}
                    className={styles.decadesListItem}
                    variants={fadeUp}
                  >
                    <div style={{ flexShrink: 0 }}>
                      <Image
                        src="https://cdn.prod.website-files.com/68b824698be8e7c047a5da51/68e7af75e2506f3c270d0299_rt-about-one-innovation-bullet.svg"
                        alt="About Innovation Bullet"
                        width={25}
                        height={25}
                      />
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>

          <motion.p
            className={styles.decadesQuote}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            We&apos;re proud of what we&apos;ve achieved, but we know there&apos;s always more to do. As long as there are people who need support, knowledge to share, and communities to strengthen, our work continues.
          </motion.p>
        </div>
      </section>

      {/* ════════ SECTION 4 — PRINCIPLES: What Guides Us (Vistario 'Empower' Style) ════════ */}
      <section className={styles.principlesSection}>
        <div className="container-large">
          <div className={styles.principlesHeader}>
            {/* Header Content on Left (Desktop) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={styles.principlesHeaderLeft}
            >
              <span className={styles.sectionTag}>GUIDING PRINCIPLES</span>
              <h2 className={styles.sectionTitle}>What <span className={styles.textAccent}>Guides Us</span></h2>
              <div className={styles.principlesAccentBar} />
              <p className={styles.principlesHeaderDesc}>
                We believe in doing things the right way. Every decision we make is guided by these high-level principles to ensure absolute transparency and progress.
              </p>
            </motion.div>

            {/* Staggered Grid on Right (Desktop) */}
            <motion.div
              className={styles.principlesStaggeredGrid}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              {principles.map((p, idx) => (
                <motion.div
                  key={p.num}
                  variants={fadeUp}
                  className={`${styles.principleCard} ${idx === 0 ? styles.principleCardCrimson : ''}`}
                  whileHover={{
                    backgroundColor: '#dc2525',
                    y: -10,
                    scale: 1.02,
                    boxShadow: '0 40px 80px -20px rgba(220, 37, 37, 0.4)'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Subtle Watermark number */}
                  <div className={styles.principleCardWatermark}>{p.num}</div>

                  {/* Icon Block */}
                  <div className={styles.principleCardIcon}>{p.icon}</div>

                  {/* Content */}
                  <div className={styles.principleCardBody}>
                    <h3 className={styles.principleCardLabel}>{p.label}</h3>
                    <p className={styles.principleCardText}>{p.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 5 — INSTITUTIONAL REACH: Our Impact ════════ */}
      <section className={styles.impactSection}>
        <div className={styles.impactBg}>
          <Image
            src="/images/students-studying.jpg"
            alt="Impact background"
            fill
            className={styles.impactBgImage}
            sizes="100vw"
          />
          <div className={styles.impactOverlay} />
        </div>

        <div className={`container-large ${styles.impactContent}`}>
          <motion.div
            className={styles.impactGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <div className={styles.impactTag}>INSTITUTIONAL REACH</div>
              <h2 className={styles.impactTitle}>Our Impact</h2>
              <p className={styles.impactDesc}>
                Numbers don&apos;t tell the whole story, but they reveal the vast scale of our vision. For nearly three decades, we have built bridges of opportunity across continents.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className={styles.impactStatsGrid}>
              {impactStats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className={styles.impactStatCard}
                >
                  <div className={styles.impactStatIcon}>{stat.icon}</div>
                  <div className={styles.impactStatValue}>{stat.value}</div>
                  <div className={styles.impactStatLabel}>{stat.label}</div>
                  <div className={styles.impactStatDesc}>{stat.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════ SECTION 6 — ACADEMIC MANDATE: Ten Imperatives (Vistario Slider Style) ════════ */}
      <section className={styles.mandateSection}>
        <div className="container-large">
          <motion.div
            className={styles.mandateHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className={styles.sectionSubtitleSmall}>OUR ACADEMIC MANDATE</span>
            <h2 className={styles.sectionTitleLarge}>Ten Imperatives of <span className={styles.textAccent}>Progress</span></h2>
            <p className={styles.sectionSubtitleText}>
              A comprehensive framework driving bilateral excellence across ten strategic pillars — from STEM innovation to global diplomacy.
            </p>
          </motion.div>

          {/* Slider Container */}
          <div className={styles.sliderWrapper}>
            <motion.div
              ref={trackRef}
              className={styles.sliderTrack}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              {mandateItems.map((item, idx) => (
                <motion.div
                  key={item.num}
                  className={styles.mandateSliderCard}
                  variants={fadeUp}
                >
                  {/* Icon Circle */}
                  <div className={styles.mandateCardIconOuter}>
                    <div className={styles.mandateCardIconInner}>
                      <span className={styles.mandateCardIconNum}>{item.num}</span>
                    </div>
                  </div>

                  <div className={styles.mandateCardContent}>
                    <h4 className={styles.mandateCardSubtitle}>PILLAR {item.num}</h4>
                    <h3 className={styles.mandateCardTitleSlider}>{item.title}</h3>
                    <div className={styles.mandateCardSeparator} />
                    <p className={styles.mandateCardDescSlider}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Progress Bar Container */}
          <div className={styles.progressContainer}>
            <div className={styles.progressTrack}>
              <motion.div
                className={styles.progressBar}
                style={{ width: widthPercentage, transformOrigin: 'left' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 7 — NATIONAL VISION: Our Bigger Picture ════════ */}
      <section className={styles.visionSection}>
        <div className="container-large">
          <motion.div
            className={styles.heritageHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className={styles.sectionTag}>NATIONAL VISION</span>
            <h2 className={styles.sectionTitle}>Our Bigger <span className={styles.textAccent}>Picture</span></h2>
            <p className={styles.sectionSubtitle}>
              Five pillars driving national impact through education and collaboration.
            </p>
          </motion.div>

          <motion.div
            className={styles.visionGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className={styles.visionImageCol}>
              <motion.div variants={fadeUp} className={styles.visionImageWrapper}>
                <Image
                  src="/images/girl-writing-notebook.jpg"
                  alt="Vision pillar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </motion.div>
            </div>

            <div className={styles.visionPillars}>
              {visionPillars.map((pillar) => (
                <motion.div
                  key={pillar.num}
                  variants={fadeUp}
                  className={styles.visionPillarRow}
                >
                  <div className={styles.visionPillarBlock} />
                  <span className={styles.visionPillarNum}>{pillar.num}</span>
                  <div className={styles.visionPillarContent}>
                    <h3 className={styles.visionPillarTitle}>{pillar.title}</h3>
                    <p className={styles.visionPillarDesc}>{pillar.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ SECTION 8 — ENGAGEMENT: CTA ════════ */}
      <section className={styles.engagementSection}>
        <div className={styles.engagementGridOverlay} />

        <div className={`container-large ${styles.engagementContent}`}>
          <motion.div
            className={styles.engagementHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className={styles.sectionTag}>ENGAGEMENT</span>
            <h2 className={styles.sectionTitle}>This Story Isn&apos;t Complete <span className={styles.textAccent}>Without You</span></h2>
            <p className={styles.sectionSubtitle}>
              Join our mission to build resilient bridges, empower international study, and foster structural cross-cultural dialogue. Whether you give your time, your resources, or your voice, your contribution changes the world.
            </p>
          </motion.div>

          <motion.div
            className={styles.engagementGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {engagementCards.map((card) => (
              <motion.div
                key={card.num}
                variants={fadeUp}
                className={styles.engagementCard}
              >
                <div className={styles.engagementCardNum}>{card.num}</div>
                <div className={styles.engagementCardTag}>{card.tag}</div>
                <h3 className={styles.engagementCardTitle}>{card.title}</h3>
                <p className={styles.engagementCardDesc}>{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
