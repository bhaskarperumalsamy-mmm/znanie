import React from 'react';
import { Link } from 'react-router-dom';
import './HomeLanding.css';
import './HomeRedesign.css';

const HERO_IMG = '/images/low-angle-medium.jpg';

function HomeLanding() {
    return (
        <div className="partnership-content">

            {/* ═══ The Strategic Monolith — Architectural Intro ═══ */}
            <section className="pl-monolith-intro">
                <div className="container">
                    <div className="pl-m-split-card">
                        <div className="pl-m-visual-box">
                            <img src={HERO_IMG} alt="India Russia Partnership" className="pl-m-img" />
                            <div className="pl-m-image-overlay" />
                            <div className="pl-m-watermark">CONVERGENCE</div>
                        </div>

                        <div className="pl-m-content">
                            <div className="pl-m-header bp-header">
                                <span className="pl-m-eyebrow bp-eyebrow">A Strategic Convergence</span>
                                <h2 className="pl-m-title bp-title">
                                    <span className="pl-m-title-heavy">A Partnership</span> <br />
                                    <span className="pl-m-title-light">for a <span className="pl-m-accent">Fractured World</span></span>
                                </h2>
                            </div>

                            <div className="pl-m-body">
                                <div className="pl-m-line" />
                                <div className="pl-m-lead bp-lead">
                                    <ul className="pl-m-list">
                                        <li>Our roots are deep in Russian soil.</li>
                                        <li>We are committed to the economic, cultural, and technical revival of our nation.</li>
                                        <li>But our branches reach far beyond.</li>
                                        <li>For over 30 years, we have strengthened our position in the Middle East.</li>
                                        <li>We are promoting international cooperation.</li>
                                        <li>We are solving global problems of human development.</li>
                                        <li>We are bringing the country to the level of advanced states.</li>
                                    </ul>
                                </div>
                                <div className="pl-m-thesis">
                                    <div className="pl-m-thesis-dot" />
                                    <span>Bringing <span className="v5-highlight-alt">India closer to Russia</span> is a direct pathway to fostering global peace and harmony.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Dark Footer Strip ── */}
            <div className="rn-footer">
                <div className="container">
                    <div className="rn-footer-inner">
                        <div className="rn-footer-quote">
                            The India-Russia axis represents one of the most enduring bilateral partnerships in modern geopolitical history.
                        </div>
                        <div className="rn-footer-stats">
                            <div className="rn-footer-stat">
                                <span className="rn-footer-stat-val">🇮🇳</span>
                                <span className="rn-footer-stat-lbl">Chennai</span>
                            </div>
                            <div className="rn-footer-sep" />
                            <div className="rn-footer-stat">
                                <span className="rn-footer-stat-val">75+</span>
                                <span className="rn-footer-stat-lbl">Years of Alliance</span>
                            </div>
                            <div className="rn-footer-sep" />
                            <div className="rn-footer-stat">
                                <span className="rn-footer-stat-val">2.8B</span>
                                <span className="rn-footer-stat-lbl">Citizens</span>
                            </div>
                            <div className="rn-footer-sep" />
                            <div className="rn-footer-stat">
                                <span className="rn-footer-stat-val">🇷🇺</span>
                                <span className="rn-footer-stat-lbl">Moscow</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ Strategic Foundation — Prestige Gallery (Hidden) ═══ 
            <section className="pg-section">
                <div className="container">
                    <div className="pg-header bp-header">

                        <span className="pl-m-eyebrow bp-eyebrow">Strategic Foundation</span>

                        <h2 className="pg-title bp-title">
                            The Pillars of <br />
                            <span className="pg-accent">Global Harmony</span>
                        </h2>
                    </div>

                    <div className="pg-grid">

                        <div className="pg-card">
                            <div className="pg-visual">
                                <img src="/images/akinyemi-gbadamosi.jpg" alt="Strategic Stability" />
                            </div>
                            <div className="pg-content">
                                <span className="pg-num">01</span>
                                <h3 className="pg-item-title">Strategic Stability</h3>
                                <div className="pg-divider"></div>
                                <p className="pg-item-text">
                                    Peace requires equilibrium. Our deep strategic partnership acts as a crucial counterweight in a world at risk of unipolar dominance.
                                </p>
                                <div className="pg-stats">
                                    <div className="pg-stat">
                                        <span className="pg-stat-val">Multipolar</span>
                                        <span className="pg-stat-lbl">Vision</span>
                                    </div>
                                    <div className="pg-stat">
                                        <span className="pg-stat-val">Diplomatic</span>
                                        <span className="pg-stat-lbl">Dialogue</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pg-card">
                            <div className="pg-visual">
                                <img src="/images/jo-szczepanska.jpg" alt="Economic Synergy" />
                            </div>
                            <div className="pg-content">
                                <span className="pg-num">02</span>
                                <h3 className="pg-item-title">Economic Synergy</h3>
                                <div className="pg-divider"></div>
                                <p className="pg-item-text">
                                    Economic security is the bedrock of peace. We build shared prosperity through vital energy and trade corridors.
                                </p>
                                <div className="pg-stats">
                                    <div className="pg-stat">
                                        <span className="pg-stat-val">Energy</span>
                                        <span className="pg-stat-lbl">Security</span>
                                    </div>
                                    <div className="pg-stat">
                                        <span className="pg-stat-val">INSTC</span>
                                        <span className="pg-stat-lbl">Trade Route</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pg-card">
                            <div className="pg-visual">
                                <img src="/images/rishikesh-yogpeeth.jpg" alt="Cultural Affinity" />
                            </div>
                            <div className="pg-content">
                                <span className="pg-num">03</span>
                                <h3 className="pg-item-title">Cultural Affinity</h3>
                                <div className="pg-divider"></div>
                                <p className="pg-item-text">
                                    True harmony is born from human understanding. Our ties are a soft-power engine bridging generations.
                                </p>
                                <div className="pg-stats">
                                    <div className="pg-stat">
                                        <span className="pg-stat-val">Shared</span>
                                        <span className="pg-stat-lbl">Societal Values</span>
                                    </div>
                                    <div className="pg-stat">
                                        <span className="pg-stat-val">Intellectual</span>
                                        <span className="pg-stat-lbl">Academic Bond</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            */}

            {/* ═══ Why Russia? — Grand Exhibition ═══ */}
            <section className="ge-section">
                <div className="container">

                    {/* ── Command Header Grid ── */}
                    <div className="ge-top-grid">
                        {/* Title Block */}
                        <div className="ge-top-left bp-header">
                            <div className="ge-eyebrow bp-eyebrow">
                                <span className="ge-dot" />
                                Global Dominance
                            </div>
                            <h2 className="ge-title bp-title">
                                The Key to Success:<br />
                                <span className="ge-accent">Why Russia?</span>
                            </h2>
                            <p className="ge-lead bp-lead">
                                An unmatched fusion of academic rigor, strategic global placement, and bilateral economic supremacy.
                            </p>
                        </div>

                        {/* Monumental Stats Block */}
                        <div className="ge-top-right">
                            <div className="ge-monument-stat">
                                <span className="ge-ms-val">170+</span>
                                <span className="ge-ms-lbl">Nationalities</span>
                            </div>
                            <div className="ge-ms-divider" />
                            <div className="ge-monument-stat">
                                <span className="ge-ms-val">500+</span>
                                <span className="ge-ms-lbl">Universities</span>
                            </div>
                        </div>
                    </div>

                    {/* Symmetrical Exhibition */}
                    <div className="ge-exhibition">

                        {/* Left Wing */}
                        <div className="ge-wing ge-wing-left">
                            <div className="ge-card">
                                <span className="ge-num">01</span>
                                <h3 className="ge-card-title">Financial Advantage</h3>
                                <p className="ge-card-text">
                                    Premium global education at a fraction of Western costs. Strategic state subsidies ensure the highest tier of academic rigor remains universally accessible.
                                </p>
                            </div>

                            <div className="ge-card">
                                <span className="ge-num">02</span>
                                <h3 className="ge-card-title">Cultural Harmonization</h3>
                                <p className="ge-card-text">
                                    A vibrant, inclusive society that acts as a global melting pot. International diplomats and students converge through shared intellectual pursuit.
                                </p>
                            </div>
                        </div>

                        {/* Centerpiece Image */}
                        <div className="ge-centerpiece">
                            <div className="ge-image-wrapper">
                                <img src="/images/ockwell-branding.jpg" alt="Russian Academic Excellence" className="ge-img" />
                            </div>
                        </div>

                        {/* Right Wing */}
                        <div className="ge-wing ge-wing-right">
                            <div className="ge-card">
                                <span className="ge-num">03</span>
                                <h3 className="ge-card-title">Global Credentialing</h3>
                                <p className="ge-card-text">
                                    Degrees universally recognized for fundamental scientific rigor, setting the standard particularly in Medicine, Aerospace, and Theoretical Physics.
                                </p>
                            </div>

                            <div className="ge-card">
                                <span className="ge-num">04</span>
                                <h3 className="ge-card-title">Career Gateway</h3>
                                <p className="ge-card-text">
                                    Direct integration into the robust bilateral economic bridge between India and Russia, opening exclusive structural avenues in tech and trade.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Russian Language Course — Editorial Bento */}
            <section className="section section-russian-course">
                <div className="container">

                    {/* ── Hero Banner Card ── */}
                    <div className="rc-hero-card">
                        <img
                            className="rc-hero-bg"
                            src="/images/woman-background.jpg"
                            alt="Russian cityscape"
                        />
                        <div className="rc-hero-overlay"></div>
                        <div className="rc-hero-content bp-header">
                            <span className="rc-badge bp-eyebrow">Featured Program</span>
                            <h2 className="rc-title bp-title">
                                <span className="pl-m-title-heavy">Master the</span> <br />
                                <span className="pl-m-title-light">Russian Language</span>
                            </h2>
                            <p className="rc-tagline bp-lead">From first word to full fluency — master the language spoken by 258 million people.</p>
                        </div>
                    </div>

                    {/* ── Bento Grid ── */}
                    <div className="rc-bento">

                        {/* Stats bar — spans full width */}
                        <div className="rc-stats-bar">
                            <div className="rc-stat-item">
                                <span className="rc-stat-num">258M+</span>
                                <span className="rc-stat-lbl">Speakers Worldwide</span>
                            </div>
                            <div className="rc-stat-item">
                                <span className="rc-stat-num">6</span>
                                <span className="rc-stat-lbl">Proficiency Levels</span>
                            </div>
                            <div className="rc-stat-item">
                                <span className="rc-stat-num">A1 → C2</span>
                                <span className="rc-stat-lbl">Full CEFR Range</span>
                            </div>
                            <div className="rc-stat-item">
                                <span className="rc-stat-num">Native</span>
                                <span className="rc-stat-lbl">Russian Instructors</span>
                            </div>
                        </div>

                        {/* Feature cards — 3 columns */}
                        <div className="rc-card rc-card-vocab">
                            <div className="rc-card-icon">📖</div>
                            <h3>Vocabulary & Grammar</h3>
                            <p>Build a robust foundation with thousands of words, practical phrases, and structured grammar for real-world conversations.</p>
                        </div>

                        <div className="rc-card rc-card-culture">
                            <div className="rc-card-icon">🌍</div>
                            <h3>Cultural Immersion</h3>
                            <p>Go beyond textbooks — explore Russian traditions, contemporary life, holidays, and social etiquette.</p>
                        </div>

                        <div className="rc-card rc-card-career">
                            <div className="rc-card-icon">🚀</div>
                            <h3>Career & Opportunity</h3>
                            <p>Open doors to studying in Russia, bilateral careers in diplomacy, trade, energy, and professional translation.</p>
                        </div>

                        {/* Levels Card — now full width */}
                        <div className="rc-card rc-card-levels">
                            <div className="rc-levels-header">
                                <h3 className="rc-levels-title">
                                    <span className="v5-emphasis">The Path</span> to Proficiency
                                </h3>
                                <p className="rc-levels-subtitle">Our curriculum follows the Common European Framework of Reference for Languages (CEFR).</p>
                            </div>

                            <div className="rc-levels-path">
                                <div className="rc-path-line" />

                                <div className="rc-level-chip rc-chip-beginner">
                                    <span className="rc-chip-code">A1</span>
                                    <span className="rc-chip-name">Elementary</span>
                                    <div className="rc-chip-dot" />
                                </div>
                                <div className="rc-level-chip rc-chip-beginner">
                                    <span className="rc-chip-code">A2</span>
                                    <span className="rc-chip-name">Basic</span>
                                    <div className="rc-chip-dot" />
                                </div>
                                <div className="rc-level-chip rc-chip-intermediate">
                                    <span className="rc-chip-code">B1</span>
                                    <span className="rc-chip-name">Intermediate</span>
                                    <div className="rc-chip-dot" />
                                </div>
                                <div className="rc-level-chip rc-chip-intermediate">
                                    <span className="rc-chip-code">B2</span>
                                    <span className="rc-chip-name">Upper-Int</span>
                                    <div className="rc-chip-dot" />
                                </div>
                                <div className="rc-level-chip rc-chip-advanced">
                                    <span className="rc-chip-code">C1</span>
                                    <span className="rc-chip-name">Advanced</span>
                                    <div className="rc-chip-dot" />
                                </div>
                                <div className="rc-level-chip rc-chip-advanced">
                                    <span className="rc-chip-code">C2</span>
                                    <span className="rc-chip-name">Mastery</span>
                                    <div className="rc-chip-dot" />
                                </div>
                            </div>

                            <div className="rc-levels-footer">
                                <Link to="/russian-language-courses" className="rc-levels-link">View Full Course Details →</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══ Global Impact — The Resonance (Monument Editorial) ═══ */}
            <section className="rn-monument">

                {/* ── Watermark ── */}
                <div className="rn-watermark" aria-hidden="true">RESONANCE</div>

                {/* ── Header ── */}
                <div className="container">
                    <div className="rn-header">
                        <div className="rn-header-left">
                            <span className="rn-eyebrow bp-eyebrow">
                                <span className="rn-pulse" />
                                Strategic Analysis
                            </span>
                            <h2 className="bp-title">
                                Global Impact:<br />
                                <span className="rn-title-italic">The Resonance</span>
                            </h2>
                        </div>
                        <div className="rn-header-right">
                            <p className="rn-lead">
                                Quantifying the multi-dimensional impact of the India-Russia alliance on global stability, economic autonomy, and civilisational continuity.
                            </p>
                            <div className="rn-header-line" />
                        </div>
                    </div>
                </div>

                {/* ── Architectural Pillars ── */}
                <div className="container" style={{ position: 'relative', zIndex: 3 }}>
                    <div className="rn-pillars">

                        {/* Slab 01 */}
                        <div className="rn-slab">
                            <div className="rn-slab-watermark">01</div>
                            <div className="rn-slab-top">
                                <div className="rn-slab-stat">
                                    <span className="rn-slab-num">40</span>
                                    <span className="rn-slab-unit">%</span>
                                </div>
                                <span className="rn-slab-metric">Regional Stability Index</span>
                            </div>
                            <div className="rn-slab-bottom">
                                <h3 className="rn-slab-title">Civilisational Anchor</h3>
                                <p className="rn-slab-desc">
                                    Stabilising the Eurasian landmass through a sovereign security architecture that prevents regional fragmentation and maintains multipolar peace.
                                </p>
                                <div className="rn-slab-bar"><div className="rn-slab-fill" style={{ width: '40%' }} /></div>
                            </div>
                        </div>

                        {/* Slab 02 — Featured Dark Slab */}
                        <div className="rn-slab rn-slab-dark">
                            <div className="rn-slab-watermark">02</div>
                            <div className="rn-slab-top">

                                <div className="rn-slab-stat">
                                    <span className="rn-slab-num">2.8</span>
                                    <span className="rn-slab-unit">B+</span>
                                </div>
                                <span className="rn-slab-metric">Souls Represented</span>
                            </div>
                            <div className="rn-slab-bottom">
                                <h3 className="rn-slab-title">Multipolar Vanguard</h3>
                                <p className="rn-slab-desc">
                                    Championing the rights of the Global South by fostering an international order based on genuine developmental autonomy and sovereign choice.
                                </p>
                                <div className="rn-slab-bar"><div className="rn-slab-fill" style={{ width: '72%' }} /></div>
                            </div>
                        </div>

                        {/* Slab 03 */}
                        <div className="rn-slab">
                            <div className="rn-slab-watermark">03</div>
                            <div className="rn-slab-top">

                                <div className="rn-slab-stat">
                                    <span className="rn-slab-num">75</span>
                                    <span className="rn-slab-unit">Y</span>
                                </div>
                                <span className="rn-slab-metric">Bilateral Continuity</span>
                            </div>
                            <div className="rn-slab-bottom">
                                <h3 className="rn-slab-title">Strategic Resilience</h3>
                                <p className="rn-slab-desc">
                                    A multi-generational partnership built on mutual trust, ensuring absolute consistency in relations despite shifting global currents.
                                </p>
                                <div className="rn-slab-bar"><div className="rn-slab-fill" style={{ width: '85%' }} /></div>
                            </div>
                        </div>

                    </div>
                </div>



            </section>

        </div>
    );
}

export default HomeLanding;
