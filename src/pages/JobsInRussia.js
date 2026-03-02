import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import './JobsInRussia.css';

// Custom hook for scroll reveals
const useReveal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setIsVisible(entry.isIntersecting));
        }, { threshold: 0.1 });

        const current = domRef.current;
        if (current) observer.observe(current);
        return () => {
            if (current) observer.unobserve(current);
        };
    }, []);

    return [domRef, isVisible];
};

const RevealDiv = ({ children, className = "" }) => {
    const [ref, isVisible] = useReveal();
    return (
        <div
            ref={ref}
            className={`jr-reveal-div ${className} ${isVisible ? 'active' : ''}`}
        >
            {children}
        </div>
    );
};

function JobsInRussia() {
    return (
        <div className="jobs-in-russia-redesign">
            {/* ═══ HERO SECTION ═══ */}
            <Hero
                title="WORK | in Russia"
                subtitle="The India-Russia economy is booming. Companies are desperate for Indians who speak Russian. We connect you to them."
                heroBackgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
                layout="paramount"
                eyebrow="Strategic Global Placements"
                isInner={true}
            />

            {/* ═══ THE OPPORTUNITY: WHY NOW? ═══ */}
            <section className="jr-opportunity">
                <div className="container">
                    <div className="jr-header-left">
                        <span className="jr-label">01 // THE STRATEGIC VACUUM</span>
                        <h2 className="jr-title">🚀 THE OPPORTUNITY: Why Now?</h2>
                    </div>

                    <div className="jr-split-cards">
                        <RevealDiv className="opp-card">
                            <div className="opp-header">
                                <span className="opp-flag">🇨🇳</span>
                                <h3>The China Gap</h3>
                            </div>
                            <p>Thousands of Chinese managers are leaving Russia. A massive professional vacuum has been created in the market.</p>
                            <div className="opp-stat">📉 VACUUM CREATED</div>
                        </RevealDiv>

                        <RevealDiv className="opp-card alt">
                            <div className="opp-header">
                                <span className="opp-flag">🇮🇳</span>
                                <h3>The India Advantage</h3>
                            </div>
                            <p>You are the replacement. Russian companies are actively seeking Indian talent to bridge the management gap.</p>
                            <div className="opp-stat">📈 DEMAND EXPLODING</div>
                        </RevealDiv>
                    </div>
                </div>
            </section>

            {/* ═══ TWO PATHS: ONE GOAL ═══ */}
            <section className="jr-paths">
                <div className="container">
                    <div className="jr-header-center">
                        <span className="jr-label">02 // PROFESSIONAL CORRIDORS</span>
                        <h2 className="jr-title">TWO PATHS. ONE GOAL.</h2>
                    </div>

                    <div className="jr-path-matrix">
                        {/* PATH 1: INTERNSHIPS */}
                        <RevealDiv className="path-pane">
                            <div className="path-badge">PATH 01</div>
                            <h3 className="path-title">🎓 Internships (For Current Students)</h3>
                            <p className="path-desc">Perfect for 2nd, 3rd & 4th-year students currently studying in Russia.</p>

                            <div className="path-checks">
                                <div className="p-check">
                                    <span className="c-icon">✅</span>
                                    <div className="c-text">
                                        <strong>Work Part-Time</strong>
                                        <span>Work 4-6 hours/day while studying.</span>
                                    </div>
                                </div>
                                <div className="p-check">
                                    <span className="c-icon">✅</span>
                                    <div className="c-text">
                                        <strong>Build Your CV</strong>
                                        <span>Get a "Russian Work Ex" certificate.</span>
                                    </div>
                                </div>
                                <div className="p-check">
                                    <span className="c-icon">✅</span>
                                    <div className="c-text">
                                        <strong>Network with CEOs</strong>
                                        <span>Meet people who will hire you full-time.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="path-locations">
                                <strong>WHERE?</strong>
                                <span>Import/Export firms, IT startups, University departments, Event management.</span>
                            </div>
                        </RevealDiv>

                        {/* PATH 2: FULL-TIME JOBS */}
                        <RevealDiv className="path-pane highlight">
                            <div className="path-badge">PATH 02</div>
                            <h3 className="path-title">🤵 Full-Time Jobs (For Graduates)</h3>
                            <p className="path-desc">For students who just graduated or completed MBBS/B.Tech.</p>

                            <div className="sector-grid">
                                <div className="sector-box">
                                    <div className="s-icon">🏢</div>
                                    <h4>MNCs</h4>
                                    <span>Huawei, Vivo, Tata (Russia ops)</span>
                                    <p>Sales, Admin, Translator</p>
                                </div>
                                <div className="sector-box">
                                    <div className="s-icon">🏭</div>
                                    <h4>Factories</h4>
                                    <span>AvtoVAZ (Lada), Gazprom</span>
                                    <p>Engineer, Supervisor</p>
                                </div>
                                <div className="sector-box">
                                    <div className="s-icon">🏥</div>
                                    <h4>Hospitals/Pharma</h4>
                                    <span>Biocon, Dr. Reddy's</span>
                                    <p>Doctor, Rep, Sales</p>
                                </div>
                            </div>
                        </RevealDiv>
                    </div>
                </div>
            </section>

            {/* ═══ CALL TO ACTION ═══ */}
            <section className="jr-final-cta">
                <div className="container">
                    <RevealDiv className="cta-monolith">
                        <h2 className="cta-title">Ready to Launch Your Career?</h2>
                        <p className="cta-subtitle">Connect with employers looking for Russian-speaking professionals today.</p>
                        <div className="cta-actions">
                            <Link to="/contact" className="btn-monolith-primary">Upload Resume</Link>
                            <Link to="/contact" className="btn-monolith-outline">Register as Employer</Link>
                        </div>
                    </RevealDiv>
                </div>
            </section>
        </div>
    );
}

export default JobsInRussia;
