'use client'

export const ProgramsMarquee = () => {
  return (
    <section className="as-marquee-section">
      <div className="as-m-wrapper">
        
        {/* Top Track (Moving Left) */}
        <div className="as-m-track flex as-m-track-1">
          {[...Array(2)].map((_, loopIndex) => (
            <div className="as-m-track-inner" key={`track1-${loopIndex}`}>
              <div className="as-m-item"><span className="as-m-text">Medicine</span></div>
              <div className="as-m-item"><span className="as-m-text">Dentistry</span></div>
              <div className="as-m-item"><span className="as-m-text">Pediatrics</span></div>
              <div className="as-m-item"><span className="as-m-text">Nursing</span></div>
              <div className="as-m-item"><span className="as-m-text">Marketing</span></div>
              <div className="as-m-item"><span className="as-m-text">Computer Science</span></div>
              <div className="as-m-item"><span className="as-m-text">Aviation</span></div>
              <div className="as-m-item"><span className="as-m-text">Tourism</span></div>
              <div className="as-m-item"><span className="as-m-text">Pharmacy</span></div>
              <div className="as-m-item"><span className="as-m-text">International Relations</span></div>
            </div>
          ))}
        </div>

        {/* Bottom Track (Moving Right with Outline text) */}
        <div className="as-m-track flex as-m-track-2">
          {[...Array(2)].map((_, loopIndex) => (
            <div className="as-m-track-inner" key={`track2-${loopIndex}`}>
              <div className="as-m-item"><span className="as-m-text as-m-outline">International Economics</span></div>
              <div className="as-m-item"><span className="as-m-text as-m-outline">Business</span></div>
              <div className="as-m-item"><span className="as-m-text as-m-outline">Post-Graduate Courses</span></div>
              <div className="as-m-item"><span className="as-m-text as-m-outline">Banking and Finance</span></div>
              <div className="as-m-item"><span className="as-m-text as-m-outline">Cyber Security</span></div>
              <div className="as-m-item"><span className="as-m-text as-m-outline">Web-Development</span></div>
              <div className="as-m-item"><span className="as-m-text as-m-outline">Engineering</span></div>
              <div className="as-m-item"><span className="as-m-text as-m-outline">Law</span></div>
              <div className="as-m-item"><span className="as-m-text as-m-outline">Social Sciences</span></div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .as-marquee-section {
          padding: 64px 0; /* Increased padding */
          background-color: var(--_color---soft-gray);
          overflow: hidden;
          position: relative;
          border-top: 1px solid rgba(0,0,0,0.06);
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }

        .as-m-wrapper {
          display: flex;
          flex-direction: column;
          gap: 32px; /* Increased line space between the 2 rows */
          width: 100vw;
        }

        /* Tracks */
        .as-m-track {
          display: flex;
          width: max-content;
        }

        .as-m-track-inner {
          display: flex;
          align-items: center;
          gap: 32px;
          padding-right: 32px; 
          animation: marquee-anim 35s linear infinite;
        }

        /* Reverse direction for bottom track */
        .as-m-track-2 .as-m-track-inner {
          animation: marquee-reverse-anim 35s linear infinite;
        }

        /* Keyframes */
        @keyframes marquee-anim {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        @keyframes marquee-reverse-anim {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }

        /* Hover pauses the animation for readability */
        .as-m-track:hover .as-m-track-inner {
          animation-play-state: paused;
        }

        /* Items */
        .as-m-item {
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .as-m-text {
          font-family: var(--_font-family---lexend); /* Changed to exact site heading font */
          font-size: 1.125rem; /* Significantly reduced size */
          font-weight: 700;
          color: var(--_color---charcoal-black);
          text-transform: uppercase;
          line-height: 1;
          letter-spacing: 0.1em; /* Increased spacing to make small caps look premium */
        }

        /* Redesigning the second row (formerly an outline) */
        .as-m-outline {
          color: var(--_color---shadow-gray); /* Solid subtle color instead of stroke */
          -webkit-text-stroke: 0;
          font-weight: 500;
        }

        /* Responsive Scaling */
        @media (max-width: 1024px) {
          .as-m-text { font-size: 1rem; }
        }
        @media (max-width: 768px) {
          .as-m-text { font-size: 0.875rem; }
          .as-m-track-inner { gap: 16px; padding-right: 16px; animation-duration: 25s; }
          .as-m-item { gap: 16px; }
        }
      `}</style>
    </section>
  )
}
