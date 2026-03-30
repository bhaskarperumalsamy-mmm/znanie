'use client'

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

export const SovereignArchive = () => {
    
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
  }

  return (
    <section className="sovereign-section">
      <div className="container-large">
        <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.2 }}
           className="sovereign-grid"
        >
          {/* Left Side: Content */}
          <motion.div variants={itemVariants} className="content-side">
            <span className="tag-label" style={{ marginBottom: 24 }}>
              Future Proofing Heritage
            </span>
            <h2 style={{ fontSize: 'var(--_typhography---font-size--h1)', fontWeight: 'var(--_typhography---font-weight--h1)', lineHeight: 'var(--_typhography---font-line-height--h1)', color: '#ffffff', marginBottom: 24 }}>
              The Sovereign <span style={{ color: 'var(--_color---golden-amber)' }}>Archive</span>
            </h2>
            <p className="description">
              Digitalizing, preserving, and protecting the intellectual and cultural treasures of our civilization. We are building a secure, decentralized repository for future generations.
            </p>
            
            <div className="features-stack">
                <div className="feature-small">
                    <div className="bullet-glow" />
                    <div>
                        <h4 style={{ color: '#fff', fontSize: 'var(--_typhography---font-size--h4)', fontWeight: 'var(--_typhography---font-weight--h4)', marginBottom: 8, fontFamily: 'var(--font-heading)' }}>Secure Multi-Node Storage</h4>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--_typhography---font-size--body-font)', fontFamily: 'var(--font-body)' }}>Ensuring data integrity across international digital borders.</p>
                    </div>
                </div>
                <div className="feature-small">
                    <div className="bullet-glow" />
                    <div>
                        <h4 style={{ color: '#fff', fontSize: 'var(--_typhography---font-size--h4)', fontWeight: 'var(--_typhography---font-weight--h4)', marginBottom: 8, fontFamily: 'var(--font-heading)' }}>Cultural Verification Protocol</h4>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--_typhography---font-size--body-font)', fontFamily: 'var(--font-body)' }}>Applying AI-driven analysis to maintain historical accuracy.</p>
                    </div>
                </div>
            </div>

            <button className="rt-button-one" style={{ marginTop: 40, backgroundColor: 'var(--_color---golden-amber)', color: 'var(--_color---charcoal-black)' }}>
              Access the Archive
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </button>
          </motion.div>

          {/* Right Side: Visual Projection */}
          <motion.div variants={itemVariants} className="visual-side">
            <div className="archive-visual-container">
                <div className="floating-elements">
                    <div className="node-box" />
                    <div className="node-box delay-1" />
                    <div className="node-box delay-2" />
                </div>
                <div className="visual-image-wrapper">
                    <Image 
                        src="/images/thisisengineering.jpg" 
                        alt="Digital Archive Technology" 
                        fill 
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="visual-overlay" />
                </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .sovereign-section {
           background-color: var(--color-midnight-teal);
           padding: var(--section-padding-lg) 0;
           overflow: hidden;
           position: relative;
        }

        .sovereign-grid {
           display: flex;
           flex-direction: column;
           gap: 64px;
           align-items: center;
        }
        @media (min-width: 1024px) {
           .sovereign-grid { flex-direction: row; gap: 80px; }
        }

        .content-side {
           flex: 1;
        }

        .visual-side {
           flex: 1;
           width: 100%;
        }

        .description {
           font-size: var(--_typhography---font-size--body-font);
           line-height: var(--_typhography---font-line-height--body-font);
           color: rgba(255,255,255,0.7);
           font-family: var(--font-body);
           margin-bottom: 48px;
        }

        .features-stack {
           display: flex;
           flex-direction: column;
           gap: 32px;
        }

        .feature-small {
           display: flex;
           gap: 20px;
           align-items: flex-start;
        }

        .bullet-glow {
           flex-shrink: 0;
           width: 12px;
           height: 12px;
           border-radius: 50%;
           background: var(--_color---golden-amber);
           box-shadow: 0 0 15px var(--_color---golden-amber);
           margin-top: 8px;
        }

        .archive-visual-container {
           position: relative;
           width: 100%;
           height: 550px;
           display: flex;
           align-items: center;
           justify-content: center;
        }

        .visual-image-wrapper {
           position: relative;
           width: 100%;
           height: 100%;
           border-radius: var(--radius-lg);
           overflow: hidden;
           border: 1px solid rgba(255,181,2,0.1);
        }

        .visual-overlay {
           position: absolute;
           inset: 0;
           background: linear-gradient(to top, var(--color-midnight-teal) 0%, rgba(15,37,42,0.3) 100%);
        }

        .floating-elements {
           position: absolute;
           inset: -40px;
           z-index: 20;
           pointer-events: none;
        }

        .node-box {
           position: absolute;
           top: 10%;
           right: 10%;
           width: 80px;
           height: 80px;
           background: rgba(255,181,2,0.1);
           border: 1px solid rgba(255,181,2,0.3);
           backdrop-filter: blur(10px);
           border-radius: 16px;
           animation: floating 6s infinite ease-in-out;
        }
        .node-box.delay-1 { top: 60%; left: 5%; animation-delay: 2s; width: 60px; height: 60px; }
        .node-box.delay-2 { bottom: 10%; right: 20%; animation-delay: 4s; width: 40px; height: 40px; }

        @keyframes floating {
           0%, 100% { transform: translateY(0) rotate(0); }
           50% { transform: translateY(-30px) rotate(15deg); }
        }
      `}</style>
    </section>
  );
};
