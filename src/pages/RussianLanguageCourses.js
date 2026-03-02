import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import './PageRedesign.css';
import './RussianLanguageCourses.css';

const useReveal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => { if (entry.isIntersecting) setIsVisible(true); });
        }, { threshold: 0.1 });
        const current = domRef.current;
        if (current) observer.observe(current);
        return () => { if (current) observer.unobserve(current); };
    }, []);
    return [domRef, isVisible];
};

const RevealDiv = ({ children, className = "", delay = 0 }) => {
    const [ref, isVisible] = useReveal();
    return (
        <div ref={ref} className={`pr-reveal ${className} ${isVisible ? 'pr-visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

function RussianLanguageCourses() {
    return (
        <div className="russian-courses-page">
            {/* ═══ HERO ═══ */}
            <Hero
                title="Sovereign|Linguistic"
                eyebrow="Certified Academic Programs"
                subtitle="Master the Slavic frontier with TORFL-certified trainers. Engineered for absolute academic precision and global career readiness."
                heroBackgroundImage="/images/415980.jpg"
                layout="apex"
                isInner={true}
                menuItems={[
                    { label: 'Strategic Matrix' },
                    { label: 'The Curriculum' },
                    { label: 'Pedagogy' }
                ]}
            />

            {/* ═══ SECTION: LINGUISTIC SCALING (SPLIT LAYOUT) ═══ */}
            <section className="pr-section pr-section-light">
                <div className="container">
                    <div className="pr-header pr-header-center">
                        <span className="pr-eyebrow">Strategic Matrix</span>
                        <h2 className="pr-title">Linguistic <span className="pr-title-accent">Scaling</span></h2>
                        <p className="pr-subtitle">Synchronized with TORFL standards, our matrix provides a structured pathway from absolute novice to elite operational proficiency.</p>
                    </div>

                    <div className="pr-split pr-split--reverse">
                        <div className="pr-split-visual">
                            <RevealDiv className="lc-visual-monolith" delay={200}>
                                <div className="monolith-image" style={{ backgroundImage: 'url(/images/chris-montgomery.jpg)' }}></div>
                                <div className="monolith-badge">TORFL Matrix</div>
                            </RevealDiv>
                        </div>

                        <div className="pr-split-content">
                            <div className="pr-stacked-list">
                                {[
                                    { level: '01', tag: 'A1', title: 'Beginner', text: 'Foundation of the Cyrillic script and survival communication protocols.' },
                                    { level: '02', tag: 'A2', title: 'Waystage', text: 'Navigating routine social and professional interactions with confidence.' },
                                    { level: '03', tag: 'B1', title: 'Threshold', text: 'Achieving functional independence for academic and corporate environments.' },
                                    { level: '04', tag: 'B2', title: 'Vantage', text: 'Advanced fluency for analytical discourse and complex negotiations.' },
                                    { level: '05', tag: 'C1', title: 'Advanced', text: 'Near-native operational proficiency for elite leadership roles.' }
                                ].map((lvl, idx) => (
                                    <RevealDiv key={idx} className="pr-stack-item" delay={idx * 80}>
                                        <div className="pr-stack-num">{lvl.level}</div>
                                        <div className="pr-stack-details">
                                            <div className="pr-stack-head">
                                                <span className="pr-stack-tag">{lvl.tag}</span>
                                                <h4 className="pr-stack-title">{lvl.title}</h4>
                                            </div>
                                            <p className="pr-stack-text">{lvl.text}</p>
                                        </div>
                                    </RevealDiv>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ SECTION: THE CURRICULUM (MASONRY GRID) ═══ */}
            <section className="curr-section">
                <div className="container">
                    <div className="pr-header pr-header-center">
                        <span className="pr-eyebrow curr-eyebrow">Academic Progression</span>
                        <h2 className="pr-title curr-title">The <span className="curr-title-accent">Curriculum</span></h2>
                        <p className="pr-subtitle curr-subtitle">A mathematically structured pathway from your first Cyrillic letter to complete native-level operational fluency.</p>
                    </div>

                    <div className="curr-grid">
                        {[
                            {
                                level: '1. BEGINNER', badge: 'A1 - Breakthrough', tag: 'The Foundation.',
                                items: [
                                    { label: 'Alphabet & Sounds', text: 'Master Cyrillic in 3 days.' },
                                    { label: 'Zero Copula', text: 'Learn why Russians don\'t say "is" or "are".' },
                                    { label: 'Survival Vocab', text: 'Greetings, numbers, ordering food.' }
                                ],
                                outcome: 'Navigate a Russian city and introduce yourself.'
                            },
                            {
                                level: '2. WAYSTAGE', badge: 'A2 - Elementary', tag: 'The Storyteller.',
                                items: [
                                    { label: 'Time Travel', text: 'Master the Past and Future tenses.' },
                                    { label: 'The Cases (P1)', text: 'Accusative (objects) & Genitive (possession).' },
                                    { label: 'Verbs of Motion', text: 'Going on foot vs. by vehicle.' }
                                ],
                                outcome: 'Hold a 10-minute conversation about your life and weekend.'
                            },
                            {
                                level: '3. THRESHOLD', badge: 'B1 - Intermediate', tag: 'The Independent.',
                                items: [
                                    { label: 'The Cases (P2)', text: 'Dative and Instrumental cases.' },
                                    { label: 'Verb Aspects', text: 'Difference between "was reading" and "read completely".' },
                                    { label: 'Opinion & Debate', text: 'Expressing your thoughts on media and culture.' }
                                ],
                                outcome: 'Travel independently, survive emergencies, and watch YouTube.'
                            },
                            {
                                level: '4. VANTAGE', badge: 'B2 - Upper Intermediate', tag: 'The Communicator.',
                                items: [
                                    { label: 'Advanced Grammar', text: 'Participles, gerunds, complex structures.' },
                                    { label: 'Nuanced Motion', text: 'Prefixed verbs of motion (walking in/out/across).' },
                                    { label: 'Native Consumption', text: 'Slang, news, and fast-paced authentic speech.' }
                                ],
                                outcome: 'Listen to podcasts, read news, form complex arguments.'
                            },
                            {
                                level: '5. ADVANCED', badge: 'C1 - Proficiency', tag: 'The Near-Native.',
                                items: [
                                    { label: 'Stylistics', text: 'Switching between street slang and literary Russian.' },
                                    { label: 'Cultural Context', text: 'Humor, idioms, and historical references.' }
                                ],
                                outcome: 'Read Dostoevsky in original text and understand stand-up comedy.'
                            },
                            {
                                level: 'CAREER BOOSTER', badge: 'Specialized Module', tag: 'Market Unlock.',
                                items: [
                                    { label: 'Business Etiquette', text: 'Mastering formal "Вы", Name + Patronymic.' },
                                    { label: 'Professional', text: 'Writing CVs, formal emails, and presentations.' },
                                    { label: 'Industry Vocab', text: 'IT, Aerospace, Energy, Diplomacy.' }
                                ],
                                outcome: 'Pass TORFL exam, work in a corporate environment.'
                            }
                        ].map((node, idx) => (
                            <RevealDiv key={idx} className="curr-masonry-card" delay={idx * 80}>
                                <div className="curr-card-topbar"></div>
                                <div className="curr-card-inner">
                                    <div className="curr-card-head">
                                        <div className="cm-badge">{node.badge}</div>
                                        <h3 className="cm-level">{node.level}</h3>
                                        <p className="cm-tag">{node.tag}</p>
                                    </div>
                                    <ul className="cm-list">
                                        {node.items.map((item, i) => (
                                            <li key={i}>
                                                <span className="cm-check">✓</span>
                                                <div className="cm-list-content">
                                                    <strong>{item.label}:</strong> {item.text}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="cm-outcome">
                                        <div className="cm-outcome-lbl">Outcome</div>
                                        <p>{node.outcome}</p>
                                    </div>
                                </div>
                            </RevealDiv>
                        ))}
                    </div>
                </div>
            </section>


            {/* ═══ SECTION: INSTITUTIONAL PEDAGOGY ═══ */}
            <section
                className="ip-section"
                style={{
                    backgroundImage: 'linear-gradient(to right, rgba(2, 6, 23, 0.95), rgba(2, 6, 23, 0.85)), url(/images/jarmoluk-library.jpg)',
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center'
                }}
            >
                <div className="container">
                    <div className="ip-layout">
                        {/* Left Column — Header */}
                        <RevealDiv className="ip-header-col">
                            <span className="pr-eyebrow">Pedagogical Stack</span>
                            <h2 className="ip-heading">Institutional <br></br>Pedagogy</h2>
                            <p className="ip-lead">Our learning architecture is built on four pillars — each engineered for maximum retention, real-world application, and institutional certification.</p>
                            <div className="ip-header-line"></div>
                            <div className="ip-summary-stats">
                                <div className="ip-sum-stat">
                                    <span className="ip-sum-val">500+</span>
                                    <span className="ip-sum-lbl">Hours of Content</span>
                                </div>
                                <div className="ip-sum-stat">
                                    <span className="ip-sum-val">4</span>
                                    <span className="ip-sum-lbl">Learning Pillars</span>
                                </div>
                            </div>
                        </RevealDiv>

                        {/* Right Column — Cards */}
                        <div className="ip-cards-col">
                            {[
                                { title: 'Live Synchronous Classes', desc: 'Real-time interactive modules with certified TORFL examiners. Conversation labs, pronunciation clinics, and grammar workshops with native-speaking faculty.' },
                                { title: 'Session Archives', desc: 'Every lecture recorded in HD for lifelong review. Timestamped notes, searchable transcripts, and chapter markers for efficient revision.' },
                                { title: 'Scholarly Materials', desc: '500+ pages of curated pedagogical notes and vocabulary lexicons — grammar workbooks, cultural readers, and exam preparation kits.' },
                                { title: 'Sovereign Certification', desc: 'Ministry-recognized TORFL certification. Documented, stamped, globally portable proficiency verification from Level I through mastery.' }
                            ].map((item, idx) => (
                                <RevealDiv key={idx} className="ip-pillar" delay={idx * 120}>
                                    <div className="ip-pillar-body">
                                        <h3 className="ip-pillar-title">{item.title}</h3>
                                        <p className="ip-pillar-desc">{item.desc}</p>
                                    </div>
                                </RevealDiv>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ SECTION: GLOBAL VALIDATION — THE STRATEGIC HUB ═══ */}
            <section className="pr-section pr-section-muted">
                <div className="container">
                    <div className="pr-header pr-header-center">
                        <span className="pr-eyebrow">Strategic Outlook</span>
                        <h2 className="pr-title">Global <span className="pr-title-accent">Validation</span></h2>
                        <p className="pr-subtitle">Bridging the gap between certified academic proficiency and elite professional opportunities in the Russia-India corridor.</p>
                    </div>

                    <div className="gv-triptych">
                        {/* Left: TORFL Matrix */}
                        <RevealDiv className="gv-pane gv-pane-dark">
                            <span className="gv-tag">Protocol Validation</span>
                            <h3>TORFL Synchronized Matrix</h3>
                            <p>Our curriculum is mathematically aligned with the ТРКИ standards, ensuring your proficiency is validated by the highest educational authorities.</p>

                            <div className="gv-benchmarks">
                                <div className="gv-bm-item">
                                    <span className="gv-bm-val">ТРКИ-I</span>
                                    <span className="gv-bm-lbl">Certified Baseline</span>
                                </div>
                                <div className="gv-bm-item">
                                    <span className="gv-bm-val">100%</span>
                                    <span className="gv-bm-lbl">Official Syllabus</span>
                                </div>
                            </div>

                            <div className="gv-action">Protocol Standards <i>→</i></div>
                            <div className="gv-watermark">ТРКИ</div>
                        </RevealDiv>

                        {/* Center: Visual Hub */}
                        <RevealDiv className="gv-visual-hub" delay={150}>
                            <div className="gv-hub-image" style={{ backgroundImage: 'url(/images/svetlana.jpg)' }}></div>
                            <div className="gv-hub-overlay"></div>
                            <div className="gv-hub-meta">
                                <span>SINCE 1998</span>
                                <div className="hub-dot" />
                                <span>SOVEREIGN READY</span>
                            </div>
                        </RevealDiv>

                        {/* Right: Career Axis */}
                        <RevealDiv className="gv-pane gv-pane-light" delay={300}>
                            <span className="gv-tag">Market Synergy</span>
                            <h3>The Bilateral Career Axis</h3>
                            <p>Mastering Russian provides immediate access to high-impact roles in Aerospace, Quantum Computing, and International Diplomacy.</p>

                            <div className="gv-benchmarks">
                                <div className="gv-bm-item">
                                    <span className="gv-bm-val">40+</span>
                                    <span className="gv-bm-lbl">Partner Agencies</span>
                                </div>
                                <div className="gv-bm-item">
                                    <span className="gv-bm-val">High</span>
                                    <span className="gv-bm-lbl">Market Yield</span>
                                </div>
                            </div>

                            <div className="gv-action">Explore Market <i>→</i></div>
                            <div className="gv-watermark">AXIS</div>
                        </RevealDiv>
                    </div>
                </div>
            </section>

            {/* ═══ SECTION: FINAL CONDUIT ═══ */}
            <section className="pr-cta-commitment-section">
                <div className="container">
                    <RevealDiv className="pr-cta-commitment-inner">
                        <span className="pr-cta-commitment-eyebrow">Initiate Enrollment</span>
                        <h2 className="pr-cta-commitment-title">Begin Your Sovereignty <br /><i>Linguistic Journey</i></h2>
                        <p className="pr-cta-commitment-text">
                            Secure your place in our next TORFL-certified intensive batch or book a priority demo session today.
                        </p>
                        <div className="pr-cta-commitment-line" />
                    </RevealDiv>
                </div>
            </section>

        </div>
    );
}

export default RussianLanguageCourses;
