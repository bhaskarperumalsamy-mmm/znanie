import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import './PageRedesign.css';

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

function KeyPersons() {
    return (
        <div className="key-persons-page">
            {/* ═══ HERO ═══ */}
            <Hero
                title="The Faces | Behind the Mission"
                subtitle="Meet the visionaries, diplomats, and educators engineering the shared path between India and Russia."
                heroBackgroundImage="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974"
                layout="apex"
                eyebrow="Institutional Leadership"
                showStats={false}
                isInner={true}
                menuItems={[
                    { label: 'The Visionary' },
                    { label: 'Core Leadership' },
                    { label: 'Advisory Board' },
                    { label: 'Team Culture' }
                ]}
            />

            {/* ═══ PHILOSOPHY ═══ */}
            <section className="pr-section pr-section-muted" style={{ padding: '80px 0' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
                    <RevealDiv>
                        <blockquote style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 400, fontStyle: 'italic', color: 'var(--text-main)', lineHeight: 1.6, margin: '0 0 16px' }}>
                            "An organization is not its logo or its name. It is its people — their passion, their purpose, and their persistence."
                        </blockquote>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)' }}>— The Founding Philosophy</span>
                    </RevealDiv>
                </div>
            </section>

            {/* ═══ FOUNDER SPOTLIGHT ═══ */}
            <section className="pr-section pr-section-light">
                <div className="container">
                    <RevealDiv className="pr-slab">
                        <div className="pr-slab-visual">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974" alt="Dr. Rajesh Kumar" />
                        </div>
                        <div className="pr-slab-info">
                            <span className="pr-eyebrow">The Visionary</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>Founder & Director</span>
                            <h3>Dr. Rajesh Kumar</h3>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                <span>🇮🇳 India</span><span>/</span><span>🇷🇺 Russia</span>
                            </div>
                            <p>"In 1998, one person asked a question that would change thousands of lives: 'What if education could be the bridge between two great nations?'"</p>
                            <p style={{ marginTop: '16px' }}>That person was Dr. Rajesh Kumar. With nothing but a vision, a passport, and an unshakeable belief in the power of human connection — he founded this organization from the ground up.</p>
                            <p style={{ marginTop: '16px' }}>25+ years later, that question has become an answer — proven through thousands of students, dozens of programs, and an unbreakable bond between India and Russia.</p>
                            <div className="pr-slab-quote">"I didn't build an organization. I built a bridge. The people who cross it — they are the real achievement."</div>
                        </div>
                    </RevealDiv>
                </div>
            </section>

            {/* ═══ TRANSITION ═══ */}
            <section className="pr-section pr-section-muted" style={{ padding: '60px 0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <RevealDiv>
                        <p style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>But no bridge is built by one person alone.</p>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Meet the team that turns vision into reality — every single day.</p>
                    </RevealDiv>
                </div>
            </section>

            {/* ═══ CORE LEADERSHIP ═══ */}
            <section className="pr-section pr-section-light">
                <div className="container">
                    <div className="pr-header pr-header-center">
                        <span className="pr-eyebrow">Core Leadership</span>
                        <h2 className="pr-title">The Pillars of Our <span className="pr-title-accent">Mission</span></h2>
                        <p className="pr-subtitle">Three leaders. Three domains. One unified purpose.</p>
                    </div>

                    {[
                        {
                            name: 'Amit Sharma', role: 'Indian Official Representative 🇮🇳', count: '01 / 03',
                            bio: 'The voice of our mission in India — Amit serves as the official bridge between our organization and Indian government bodies, educational institutions, and cultural agencies.',
                            focus: ['Government & Institutional Liaison', 'Policy & Bilateral Coordination', 'Strategic Partnerships in India'],
                            img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070'
                        },
                        {
                            name: 'Dr. Elena Petrova', role: 'Academic Director — Russian Language 🇷🇺', count: '02 / 03',
                            bio: 'Language is more than grammar and vocabulary — it\'s the soul of a culture. Dr. Elena leads our entire Russian language education vertical with 20+ years of experience.',
                            focus: ['Russian Language Curriculum Design', 'Faculty Recruitment & Training', 'Academic Quality & Student Outcomes'],
                            img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2069'
                        },
                        {
                            name: 'Alexei Volkov', role: 'Russia Coordination Head 🇷🇺', count: '03 / 03',
                            bio: 'If India is the heart of our mission, Russia is its second heartbeat. Alexei operates on the ground in Russia — managing partnerships, coordinating student arrivals, and ensuring support.',
                            focus: ['Russia-based Operations & Logistics', 'University & Institutional Partnerships', 'On-ground Student Support & Welfare'],
                            img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2070'
                        }
                    ].map((leader, idx) => (
                        <RevealDiv key={idx} className={`pr-slab ${idx % 2 !== 0 ? 'pr-slab-reverse' : ''}`} delay={idx * 50}>
                            <div className="pr-slab-visual">
                                <img src={leader.img} alt={leader.name} />
                            </div>
                            <div className="pr-slab-info">
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>◦ {leader.count}</span>
                                <span className="pr-slab-tagline">{leader.role}</span>
                                <h3>{leader.name}</h3>
                                <p>{leader.bio}</p>
                                <div className="pr-slab-points">
                                    {leader.focus.map((f, i) => (
                                        <div key={i} className="pr-slab-point">
                                            <span className="arrow">→</span>
                                            <span>{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealDiv>
                    ))}
                </div>
            </section>

            {/* ═══ OPERATIONS TEAM ═══ */}
            <section className="pr-section" style={{ background: '#020617', color: '#ffffff' }}>
                <div className="container">
                    <div className="pr-header">
                        <span className="pr-eyebrow">Operations & Management</span>
                        <h2 className="pr-title" style={{ color: '#ffffff' }}>The Engine Behind the <span className="pr-title-accent">Mission</span></h2>
                        <p className="pr-subtitle" style={{ color: 'rgba(255,255,255,0.5)' }}>Precision. Transparency. Impact.</p>
                    </div>

                    <div className="pr-grid-4">
                        {[
                            { name: 'Priya Menon', role: 'Higher Studies Officer 🇮🇳', bio: 'End-to-end guidance for higher education in Russia — from university selection to scholarships.', focus: ['University Selection & Admissions', 'Visa & Documentation Support', 'Scholarship & Financial Guidance'], img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961' },
                            { name: 'Vikram Singh', role: 'Job & Placement Manager 🇮🇳', bio: 'Ensures our alumni don\'t just graduate — they thrive with industry partnerships and placement drives.', focus: ['Campus Placement Drives', 'Industry & Corporate Partnerships', 'Career Counseling & Resume Building'], img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974' },
                            { name: 'Sunita Iyer', role: 'Finance & Compliance Officer 🇮🇳', bio: 'Guardian of trust — managing budgets, audits, regulatory filings, and strict compliance standards.', focus: ['Annual Budgets & Financial Planning', 'Regulatory Compliance & Audit', 'Donor Fund Tracking & Reporting'], img: 'https://images.unsplash.com/photo-1567532939847-891552b8660c?q=80&w=1974' },
                            { name: 'Anand Krishnan', role: 'Donations & CSR Manager 🇮🇳', bio: 'Cultivating donor relationships and designing strategic CSR collaborations to fuel the mission.', focus: ['Fundraising Strategy & Campaigns', 'Corporate Social Responsibility Tie-ups', 'Donor Relations & Impact Reporting'], img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974' }
                        ].map((person, idx) => (
                            <RevealDiv key={idx} delay={idx * 80} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '32px', transition: 'transform 0.4s ease, background 0.4s ease' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', marginBottom: '20px' }}>
                                    <img src={person.img} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>{person.name}</h4>
                                <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#D4A03A', display: 'block', marginBottom: '16px' }}>{person.role}</span>
                                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '20px' }}>{person.bio}</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    {person.focus.map((f, i) => (
                                        <span key={i} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>→ {f}</span>
                                    ))}
                                </div>
                            </RevealDiv>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ ADVISORY BOARD ═══ */}
            <section className="pr-section pr-section-light">
                <div className="container">
                    <div className="pr-header pr-header-center">
                        <span className="pr-eyebrow">The Wisdom Circle</span>
                        <h2 className="pr-title">Our Advisory <span className="pr-title-accent">Board</span></h2>
                        <p className="pr-subtitle">They don't run the day-to-day — they shape the decade-to-decade. Distinguished leaders from academia, diplomacy, and public service.</p>
                    </div>

                    <div className="pr-grid-4">
                        {[
                            { name: 'Prof. Mikhail Ivanov', role: 'Advisory Board Member 🇷🇺', bio: 'Distinguished academician in international education policy.', notes: ['Former Dean of Moscow State University', 'Awarded Excellence in Education (Russia)'], img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop' },
                            { name: 'Dr. Shalini Verma', role: 'Advisory Board Member 🇮🇳', bio: 'Expert in civil service and educational reforms.', notes: ['Former Secretary, Ministry of Education', 'Consultant to Global Education Initiatives'], img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop' },
                            { name: 'Dr. Natalia Sokolova', role: 'Advisory Board Member 🇷🇺', bio: 'Leading voice in Indo-Russian cultural diplomacy.', notes: ['Cultural Liaison expert for 25+ years', 'PhD in Indo-Slavic Interdisciplinary Studies'], img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop' },
                            { name: 'Mr. Suresh Pillai', role: 'Advisory Board Member 🇮🇳', bio: 'Industry veteran focused on human capital development.', notes: ['CEO of Strategic Talent Management Corp', 'Board Member of multiple non-profits'], img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' }
                        ].map((advisor, idx) => (
                            <RevealDiv key={idx} className="pr-card" delay={idx * 80} style={{ textAlign: 'center', padding: '40px 24px' }}>
                                <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px' }}>
                                    <img src={advisor.img} alt={advisor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <h3 style={{ fontSize: '1.15rem' }}>{advisor.name}</h3>
                                <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary)', display: 'block', marginBottom: '12px' }}>{advisor.role}</span>
                                <p style={{ marginBottom: '16px' }}>{advisor.bio}</p>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'left' }}>
                                    {advisor.notes.map((n, i) => <div key={i} style={{ marginBottom: '4px' }}>→ {n}</div>)}
                                </div>
                            </RevealDiv>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ TEAM VALUES ═══ */}
            <section className="pr-section pr-section-muted">
                <div className="container">
                    <div className="pr-header pr-header-center">
                        <span className="pr-eyebrow">What Unites Us</span>
                        <h2 className="pr-title">Our Team Lives By These <span className="pr-title-accent">Values</span></h2>
                    </div>

                    <div className="pr-grid-3" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {[
                            { icon: '🤝', name: 'Trust', desc: '"We earn it daily"' },
                            { icon: '🔍', name: 'Transparency', desc: '"Every action is visible"' },
                            { icon: '🌍', name: 'Global Mindset', desc: '"We think beyond borders"' },
                            { icon: '💡', name: 'Innovation', desc: '"We evolve with purpose"' },
                            { icon: '❤️', name: 'Compassion', desc: '"Behind every program is a heart"' }
                        ].map((val, idx) => (
                            <RevealDiv key={idx} className="pr-card" delay={idx * 60} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{val.icon}</div>
                                <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{val.name}</h3>
                                <p style={{ fontStyle: 'italic' }}>{val.desc}</p>
                            </RevealDiv>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ FUN FACTS ═══ */}
            <section className="pr-section-light" style={{ padding: 0 }}>
                <div className="container">
                    <div className="pr-stats-bar">
                        <div className="pr-stat-item"><span className="pr-stat-val">🗣️ 7+</span><span className="pr-stat-lbl">Languages Spoken</span></div>
                        <div className="pr-stat-item"><span className="pr-stat-val">☕ 482</span><span className="pr-stat-lbl">Cups of Tea Per Week</span></div>
                        <div className="pr-stat-item"><span className="pr-stat-val">✈️ 12</span><span className="pr-stat-lbl">Countries Visited</span></div>
                        <div className="pr-stat-item"><span className="pr-stat-val">📚 1</span><span className="pr-stat-lbl">Shared Dream</span></div>
                    </div>
                </div>
            </section>

            {/* ═══ TEAM PHOTO ═══ */}
            <section className="pr-section" style={{ background: '#020617', color: '#ffffff', textAlign: 'center' }}>
                <div className="container">
                    <RevealDiv>
                        <h2 className="pr-title" style={{ color: '#ffffff' }}>One Team. Two Nations. Infinite <span className="pr-title-accent">Possibilities.</span></h2>
                        <blockquote style={{ fontSize: '1.15rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto' }}>
                            "We are more than a team. We are a family united by purpose."
                        </blockquote>
                    </RevealDiv>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section className="pr-section pr-section-muted">
                <div className="container">
                    <RevealDiv className="pr-cta">
                        <h2>Want to Reach Our Leadership Directly?</h2>
                        <p>For partnerships, collaborations, media inquiries, or just a meaningful conversation — our doors are always open.</p>
                        <div className="pr-cta-actions">
                            <Link to="/contact" className="pr-btn-primary">Email Our Team</Link>
                            <button className="pr-btn-outline">Schedule a Call</button>
                        </div>
                    </RevealDiv>
                </div>
            </section>
        </div>
    );
}

export default KeyPersons;
