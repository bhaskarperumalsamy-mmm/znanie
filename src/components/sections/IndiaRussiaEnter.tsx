'use client'

import { motion } from 'framer-motion'

export const IndiaRussiaEnter = () => {

  return (
    <section className="axis-horizon">
      <div className="container-large">
        <div className="horizon-layout">

          {/* Left: Strategic Quote (Confirmed by user) */}
          <div className="quote-col">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="horizon-tag">India-Russia Axis</span>
              <h2 className="horizon-quote">
                "To build a world united through language, knowledge, and cultural <span className="text-crimson">harmony</span>"
              </h2>
            </motion.div>
          </div>

          {/* Right: Redesigned Metrics Pillar */}
          <div className="metrics-pillar-col">
            <div className="kinetic-axis-wrapper">

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="kinetic-item"
              >
                <div className="k-header">
                  <span className="k-code">IN</span>
                  <span className="k-loc">Chennai</span>
                </div>
                <div className="k-display">
                  <span className="k-val">2.8B</span>
                  <span className="k-unit">Citizens</span>
                </div>
              </motion.div>

              <div className="k-axis-line" />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="kinetic-item"
              >
                <div className="k-header">
                  <span className="k-code">RU</span>
                  <span className="k-loc">Moscow</span>
                </div>
                <div className="k-display">
                  <span className="k-val">75+</span>
                  <span className="k-unit">Years Alliance</span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>

      <style>{`
        .axis-horizon {
          position: relative;
          background-color: var(--_color---soft-gray);
          padding: 48px 0; /* Reduced from 80px */
          border-top: 1px solid var(--_color---silver-mist);
          border-bottom: 1px solid var(--_color---silver-mist);
        }

        .horizon-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 60px;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .horizon-layout {
            grid-template-columns: 1.2fr 1fr;
            gap: 120px;
          }
        }

        .horizon-tag {
          font-family: var(--_font-family---lexend);
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--_color---crimson-red);
          margin-bottom: 16px;
          display: block;
        }

        .horizon-quote {
          font-family: var(--_font-family---lexend);
          font-size: 2.25rem;
          line-height: 1.25;
          font-weight: 500;
          color: var(--_color---charcoal-black);
          letter-spacing: -0.02em;
          max-width: 620px;
        }

        .text-crimson {
          color: var(--_color---crimson-red);
        }

        .metrics-pillar-col {
          display: flex;
          justify-content: flex-end;
        }

        .kinetic-axis-wrapper {
          display: flex;
          align-items: center;
          gap: 40px;
          position: relative;
        }

        .kinetic-item {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .k-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .k-code {
          font-family: var(--_font-family---lexend);
          font-size: 10px;
          font-weight: 800;
          color: var(--_color---crimson-red);
          opacity: 0.6;
        }

        .k-loc {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--_color---shadow-gray);
        }

        .k-display {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .k-val {
          font-family: var(--_font-family---lexend);
          font-size: 3.5rem;
          font-weight: 500;
          color: var(--_color---charcoal-black);
          line-height: 1;
        }

        .k-unit {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--_color---golden-amber);
        }

        .k-axis-line {
          width: 2px;
          height: 80px;
          background: linear-gradient(to bottom, var(--_color---crimson-red), var(--_color---golden-amber));
          border-radius: 4px;
        }

        @media (max-width: 1024px) {
          .metrics-pillar-col {
            justify-content: center;
          }
          .k-val {
            font-size: 2.5rem;
          }
          .horizon-quote {
            font-size: 1.75rem;
          }
        }

        @media (max-width: 640px) {
          .kinetic-axis-wrapper {
            flex-direction: column;
            gap: 32px;
            align-items: center;
          }
          .k-axis-line {
            width: 80px;
            height: 2px;
            background: linear-gradient(to right, var(--_color---crimson-red), var(--_color---golden-amber));
          }
          .horizon-layout {
            gap: 48px;
          }
          .horizon-quote {
            max-width: 100%;
          }
        }
      `}</style>


    </section>
  )
}
