import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import './PageRedesign.css';

const useReveal = (threshold = 0.15) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => { if (entry.isIntersecting) setIsVisible(true); });
        }, { threshold });
        const current = domRef.current;
        if (current) observer.observe(current);
        return () => { if (current) observer.unobserve(current); };
    }, [threshold]);
    return [domRef, isVisible];
};

const RevealDiv = ({ children, className = "", style = {}, delay = 0 }) => {
    const [ref, isVisible] = useReveal();
    return (
        <div ref={ref} className={`pr-reveal ${className} ${isVisible ? 'pr-visible' : ''}`} style={{ ...style, transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

function WhyChooseUs() {
    const [activeFAQ, setActiveFAQ] = useState(null);

    const faqs = [
        { q: "How are your trainers certified?", a: "All our trainers hold recognized certifications in their respective domains. Our Russian language instructors are native or near-native speakers with formal teaching qualifications and years of classroom experience." },
        { q: "Do you charge any hidden fees?", a: "Absolutely not. We are upfront about every cost from day one. No commissions, no surprise charges, no fine print. What we quote is what you pay." },
        { q: "What kind of universities do you partner with?", a: "We partner with top-tier, government-recognized Russian universities known for academic excellence. Every university in our network is vetted for quality, student support, and recognition." },
        { q: "Do you help after admission too?", a: "Yes — our support continues well beyond admission. We assist with visa processing, pre-departure orientation, on-ground support in Russia, and even career guidance and placement after graduation." },
        { q: "How is your approach different from for-profit agencies?", a: "We don't earn commissions from universities. We have no financial incentive to push you toward a particular institution. Our only agenda is your best interest — and that changes everything." },
        { q: "Can I see your financial reports?", a: "Yes. We believe in full transparency. Our annual reports and financial statements are available upon request, and we welcome any questions about how our funds are used." }
    ];

    const pillars = [
        {
            num: "01", heading: "India–Russia Focused Educational Mission",
            tagline: "One Mission. Two Nations. Unlimited Potential.",
            body: "We are not a generic educational consultancy. Our entire existence is built around one powerful purpose — strengthening the educational and cultural bridge between India and Russia.",
            points: ["Deep expertise in India-Russia academic pathways", "Strong institutional relationships in both countries", "Programs designed specifically for cross-border success", "Cultural context that generic agencies simply cannot offer"],
            quote: "Focus creates depth — and depth creates real impact.",
            image: "/images/friends-cheering-world.jpg"
        },
        {
            num: "02", heading: "Certified and Experienced Trainers",
            tagline: "Learn From Those Who've Lived It, Not Just Read It.",
            body: "Our trainers are not just qualified on paper — they are passionate educators with real-world experience in their fields.",
            points: ["Trainers with recognized national and international certifications", "Years of practical teaching experience — not just theory", "Native and near-native Russian language instructors", "Continuous professional development and quality checks"],
            quote: "A great teacher doesn't just transfer knowledge — they transform lives.",
            image: "/images/mimi-thian.jpg"
        },
        {
            num: "03", heading: "University & Employer Guidance",
            tagline: "From Admission to Employment — We Walk With You.",
            body: "Choosing the right university is just the beginning. We provide comprehensive, end-to-end guidance — from selecting the best-fit institution to career placement after graduation.",
            points: ["Personalized university selection based on goals and budget", "Complete admissions and documentation support", "Visa processing and pre-departure orientation", "Post-graduation career guidance and employer connections"],
            quote: "We don't just help you get in — we help you get ahead.",
            image: "/images/thirdman.jpg"
        },
        {
            num: "04", heading: "Transparent and Ethical Non-Profit Organization",
            tagline: "No Hidden Agendas. No Hidden Fees. Just Honest Work.",
            body: "We are a registered non-profit — and we wear that identity with pride. Every rupee we receive is accounted for. Every decision we make is guided by ethics, not profit margins.",
            points: ["Registered non-profit with full legal compliance", "Published annual reports and financial statements", "Zero hidden charges or commission-based recommendations", "Ethical partnerships — we recommend what's best for you, not us"],
            quote: "Trust is not given — it is earned through transparency.",
            image: "/images/students-studying.jpg"
        },
        {
            num: "05", heading: "Student-Centric and Socially Responsible Approach",
            tagline: "You Are Not a Number. You Are Our Mission.",
            body: "At the heart of everything we do is one simple belief — the student comes first. We don't mass-process applications or push one-size-fits-all solutions.",
            points: ["Personalized counseling — no cookie-cutter approach", "Dedicated support throughout your entire journey", "Alumni network and lifelong connection", "Community programs in health, wellness, sports, and arts", "A team that genuinely cares about your success"],
            quote: "When you succeed, our mission succeeds. It's that simple.",
            image: "/images/ofspace-llc.jpg"
        }
    ];

    const officeBearers = [
        { name: "Mr. KUMYKOV KAZBEK KHUSEINOVICH", region: "Russia", role: "Chairman (President)", image: "/images/team/kumykov_kazbek.jpg" },
        { name: "Mr. YUSHKOV PAVEL ALEXANDROVICH", region: "Russia", role: "Chief Executive Officer", image: "/images/team/yushko_ pavel.jpg" },
        { name: "Mr. P. RAMESH KUMAR", region: "Russia", role: "Global Representative", image: "/images/team/ramesh_kumar.jpg" },
        { name: "Dr. NIJIL JOBI BENSAM", region: "India", role: "India Representative & All-India President", image: "/images/team/nijil_jobi.jpg" },
        { name: "Dr. M. SHANTHAKUMAR", region: "India", role: "All-India Chief Executive Officer & Director", image: "/images/team/shanthakumar.jpg" },
        { name: "Dr. T.M. UVARAJ", region: "India", role: "All-India Programme Coordinator", image: "/images/team/placeholder.jpg" },
        { name: "Mr. VIJAY BHASKAR PERUMALSAMY", region: "India", role: "All-India ICT Wing Coordinator", image: "/images/team/placeholder.jpg" }
    ];

    const comparison = [
        { feature: "Geopolitical Scope", typical: "Generic global coverage without specialized depth.", ours: "Exclusive Indo-Russian corridor specialization." },
        { feature: "Faculty Standards", typical: "Freelance instructors with unverified backgrounds.", ours: "Internationally certified experts with verified records." },
        { feature: "Operational Lifecycle", typical: "Disconnected support ending at enrollment.", ours: "End-to-end stewardship from admission to employment." },
        { feature: "Institutional Integrity", typical: "Commission-based agency models.", ours: "Registered non-profit governed by ethical protocols." },
        { feature: "Pedagogical Strategy", typical: "Standardized mass-processing of applications.", ours: "Personalized academic routing tailored to individual merit." },
        { feature: "Transparency & Audit", typical: "Limited disclosure and opaque fee structures.", ours: "Published annual audits and 100% financial transparency." },
        { feature: "Alumni Integration", typical: "Post-enrollment detachment.", ours: "Lifelong bond within a global elite alumni network." },
        { feature: "Sovereign Impact", typical: "Purely transactional operations.", ours: "Commitment to health, arts, and bilateral cultural harmony." }
    ];

    const promises = [
        "To always put your education above our convenience.",
        "To recommend only what is truly best for you.",
        "To be honest, even when honesty is hard.",
        "To remain transparent in every transaction.",
        "To support you not just until admission — but for life.",
        "To treat you as a person, never as a number.",
        "To use every resource we have to strengthen the India-Russia bond.",
        "To be the organization we wished existed when we started."
    ];

    return (
        <div className="why-choose-us-page">
            {/* ═══ HERO ═══ */}
            <Hero
                title="Prime"
                subtitle="Join the elite corridor of India-Russia academic excellence. We've been the primary architect of global student journeys."
                heroBackgroundImage="/images/young-indian.jpg"
                layout="apex"
                isInner={true}
            />

            {/* ═══ WHY CHOOSE US INTRO (Same as Where We Are Today) ═══ */}
            <section className="au-today-section">
                <div className="container">
                    {/* CENTERED HEADER */}
                    <div className="pr-header pr-header-center" style={{ marginBottom: '80px' }}>
                        <span className="pr-eyebrow">THE ADVANTAGE</span>
                        <h2 className="pr-title" style={{
                            fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
                            lineHeight: '1',
                            fontWeight: '950',
                            letterSpacing: '-0.05em',
                            color: 'var(--text-main)',
                            margin: '0 auto 30px',
                            textAlign: 'center'
                        }}>
                            Why <span style={{ color: 'var(--primary)' }}>Choose</span> <br />
                            <span style={{ position: 'relative' }}>
                                The Znanie?
                                <svg style={{ position: 'absolute', bottom: '-15px', left: '10%', width: '80%', height: '20px' }} viewBox="0 0 100 20" preserveAspectRatio="none">
                                    <path d="M0,10 Q50,20 100,10" stroke="var(--primary)" strokeWidth="2" fill="none" opacity="0.3" />
                                </svg>
                            </span>
                        </h2>
                        <p className="pr-subtitle" style={{
                            maxWidth: '750px',
                            margin: '0 auto',
                            fontSize: '1.25rem',
                            lineHeight: '1.6',
                            color: 'var(--text-muted)',
                            fontWeight: '400',
                            textAlign: 'center'
                        }}>
                            We don't just facilitate education; we architect global careers through a unique India-Russia corridor built on absolute transparency.
                        </p>
                    </div>

                    <div className="au-today-grid">
                        {/* LEFT SIDE: CONTENT LIST */}
                        <div className="au-today-content">
                            <RevealDiv>
                                <p className="au-today-lead">
                                    Our operational timeline has seen vast changes across the globe, yet our structural mission remains resolute in maintaining absolute transparency.
                                </p>
                                <div className="au-today-list">
                                    {[
                                        'Retraining and professional development programmes for young people and adults, helping them thrive in a fast-changing world.',
                                        'Named scholarships, youth competitions and mentoring in science, technology, education, healthcare and the arts.',
                                        'Funding projects that bring the best of Russian and global science, technology and culture to life.',
                                        'Teaching modern entrepreneurial skills and giving direct, charitable support to those in need.',
                                        'Promoting peace, environmental protection, cultural renewal and international cooperation.'
                                    ].map((text, idx) => (
                                        <div key={idx} className="au-today-item">
                                            <p className="au-today-text" style={{ paddingLeft: '0px' }}>{text}</p>
                                        </div>
                                    ))}
                                </div>
                            </RevealDiv>
                        </div>

                        {/* RIGHT SIDE: VISUAL WITH STATS */}
                        <RevealDiv className="au-today-visual">
                            <img
                                src="/images/studying-together.jpg"
                                alt="Academic Excellence"
                                loading="lazy"
                            />

                        </RevealDiv>
                    </div>
                </div>
            </section>

            {/* ═══ OPENING STATEMENT ═══ */}
            <section className="pr-section pr-section-muted">
                <div className="container">
                    <div className="pr-split" style={{ alignItems: 'center' }}>
                        <RevealDiv>
                            <span className="pr-eyebrow">Our Foundation</span>
                            <h2 className="pr-title">
                                Built on <span className="pr-title-accent">Trust.</span><br />
                                Driven by Purpose.
                            </h2>
                            <div style={{ display: 'flex', gap: '40px', marginTop: '40px' }}>
                                <div><span className="pr-stat-val">10K+</span><span className="pr-stat-lbl">Lives Impacted</span></div>
                                <div><span className="pr-stat-val">100%</span><span className="pr-stat-lbl">Transparency</span></div>
                            </div>
                        </RevealDiv>
                        <RevealDiv delay={200}>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '24px' }}>
                                In a world full of promises, we believe in proof. We have stayed true to our founding principles — putting students first, maintaining complete transparency, and building a bridge between India and Russia.
                            </p>
                            <blockquote style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '24px', fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--text-main)', fontWeight: 400 }}>
                                "We don't just promise — we prove. Every year. Every student. Every decision."
                            </blockquote>
                        </RevealDiv>
                    </div>
                </div>
            </section>

            {/* ═══ FIVE PILLARS ═══ */}
            <section className="pr-section pr-section-light">
                <div className="container">
                    <div className="pr-header pr-header-center">
                        <span className="pr-eyebrow">The Five Pillars of Difference</span>
                        <h2 className="pr-title">Strategic <span className="pr-title-accent">Sovereignty</span></h2>
                        <p className="pr-subtitle">The architectural registry of our specialized India-Russia educational corridor. Verified institutional standards.</p>
                    </div>

                    {pillars.map((pillar, idx) => (
                        <RevealDiv key={idx} className={`pr-slab ${idx % 2 !== 0 ? 'pr-slab-reverse' : ''}`} delay={idx * 50}>
                            <div className="pr-slab-visual">
                                <img src={pillar.image} alt={pillar.heading} />
                            </div>
                            <div className="pr-slab-info">
                                <span className="pr-slab-tagline">{pillar.tagline}</span>
                                <h3>{pillar.heading}</h3>
                                <p>{pillar.body}</p>
                                <div className="pr-slab-points">
                                    {pillar.points.map((point, pIdx) => (
                                        <div key={pIdx} className="pr-slab-point">
                                            <span className="arrow">→</span>
                                            <span>{point}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="pr-slab-quote">"{pillar.quote}"</div>
                            </div>
                        </RevealDiv>
                    ))}
                </div>
            </section>

            {/* ═══ COMPARISON ═══ */}
            <section className="pr-benchmark-sec">
                <div className="container pr-benchmark-container">
                    <div className="pr-header pr-header-center">
                        <span className="pr-eyebrow">Strategic Master Registry</span>
                        <h2 className="pr-title">Bilateral <span className="pr-title-accent">Benchmarks</span></h2>
                        <p className="pr-subtitle">A comparative protocol documenting the divergence between conventional agencies and our specialized framework.</p>
                    </div>

                    <div className="pr-matrix-slab">
                        {/* HEADER */}
                        <div className="pr-matrix-head">
                            <div className="pr-matrix-label">Institutional Metric</div>
                            <div className="pr-matrix-label">Standard Industry Norms</div>
                            <div className="pr-matrix-label pr-matrix-label-ours">The ZNANIE Framework</div>
                        </div>

                        {/* ROWS */}
                        {comparison.map((item, idx) => (
                            <RevealDiv key={idx} delay={idx * 50} className="pr-matrix-row">
                                <div className="pr-matrix-feature">
                                    <h4>{item.feature}</h4>
                                </div>
                                <div className="pr-matrix-cell">
                                    {item.typical}
                                </div>
                                <div className="pr-matrix-cell pr-matrix-cell-ours">
                                    {item.ours}
                                </div>
                            </RevealDiv>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ OFFICE BEARERS ═══ */}
            <section className="pr-section pr-section-light">
                <div className="container">
                    <div className="pr-header pr-header-center" style={{ marginBottom: '120px' }}>
                        <span className="pr-eyebrow">Institutional Leadership</span>
                        <h2 className="pr-title">OFFICE <span style={{ color: 'var(--primary)' }}>BEARERS</span> - ZNANIE</h2>
                        <p className="pr-subtitle">Coordinating bilateral operations across the India-Russia academic corridor.</p>
                    </div>

                    {/* ── RUSSIA DIVISION ── */}
                    <div style={{ marginTop: '100px', marginBottom: '120px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '60px' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>Russia <span style={{ color: 'var(--primary)' }}>Division</span></h3>
                            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, #eee, transparent)' }}></div>
                        </div>
                        <div className="pr-grid-3 pr-team-russia-grid" style={{ alignItems: 'start' }}>
                            {officeBearers.filter(b => b.region === "Russia").map((bearer, idx) => (
                                <RevealDiv key={idx} delay={idx * 100} className="pr-team-card">
                                    <div className="pr-team-visual" style={{ height: '600px' }}>
                                        <img src={bearer.image} alt={bearer.name} />
                                    </div>
                                    <div className="pr-team-info">
                                        <h4 className="pr-team-name" style={{ fontSize: '1.1rem' }}>{bearer.name}</h4>
                                        <span className="pr-team-role" style={{ fontSize: '0.75rem', lineHeight: 1.4, minHeight: '3em', display: 'flex', alignItems: 'center' }}>{bearer.role}</span>
                                        <div className="pr-cta-commitment-line" style={{ marginTop: '20px', width: '40px', background: 'var(--primary)', opacity: 0.3 }}></div>
                                    </div>
                                </RevealDiv>
                            ))}
                        </div>
                    </div>

                    {/* ── INDIA DIVISION ── */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>India <span style={{ color: 'var(--primary)' }}>Division</span></h3>
                            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, #eee, transparent)' }}></div>
                        </div>
                        <div className="pr-grid-4 pr-team-india-grid" style={{ alignItems: 'start' }}>
                            {officeBearers.filter(b => b.region === "India").map((bearer, idx) => (
                                <RevealDiv key={idx} delay={idx * 100} className="pr-team-card">
                                    <div className="pr-team-visual" style={{ height: '480px' }}>
                                        <img src={bearer.image} alt={bearer.name} />
                                    </div>
                                    <div className="pr-team-info">
                                        <h4 className="pr-team-name" style={{ fontSize: '1.1rem' }}>{bearer.name}</h4>
                                        <span className="pr-team-role" style={{ fontSize: '0.75rem', lineHeight: 1.4, minHeight: '3em', display: 'flex', alignItems: 'center' }}>{bearer.role}</span>
                                        <div className="pr-cta-commitment-line" style={{ marginTop: '20px', width: '40px', background: 'var(--primary)', opacity: 0.3 }}></div>
                                    </div>
                                </RevealDiv>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ PROMISE ═══ */}
            <section className="pr-section" style={{
                backgroundImage: "linear-gradient(rgba(2, 6, 23, 0.85), rgba(2, 6, 23, 0.85)), url(/images/bruno-nascimento.jpg)",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                padding: '120px 0'
            }}>
                <div className="container">
                    <div className="pr-promise">
                        <RevealDiv>
                            <span className="pr-promise-tagline">Commitment to Excellence</span>
                            <h2>Our Promise to You</h2>
                        </RevealDiv>

                        <div className="pr-promise-grid">
                            {promises.map((line, idx) => (
                                <RevealDiv key={idx} className="pr-promise-card" delay={idx * 50}>
                                    <span className="pr-promise-card-num">{(idx + 1).toString().padStart(2, '0')}</span>
                                    <div className="pr-promise-card-text">{line}</div>
                                </RevealDiv>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ FAQ ═══ */}
            <section className="pr-section pr-section-light" style={{ paddingBottom: '40px' }}>
                <div className="container">
                    <div className="pr-header pr-header-center">
                        <span className="pr-eyebrow">FAQ</span>
                        <h2 className="pr-title">Questions You Might <span className="pr-title-accent">Have</span></h2>
                        <p className="pr-subtitle">We believe in clarity — ask us anything</p>
                    </div>

                    <div className="pr-faq-list">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className={`pr-faq-item ${activeFAQ === idx ? 'pr-faq-open' : ''}`}>
                                <button className="pr-faq-question" onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}>
                                    <span>{faq.q}</span>
                                    <span className="pr-faq-icon">+</span>
                                </button>
                                <div className="pr-faq-answer" style={{ maxHeight: activeFAQ === idx ? '200px' : '0px' }}>
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section className="pr-cta-commitment-section">
                <div className="container">
                    <RevealDiv className="pr-cta-commitment-inner">
                        <span className="pr-cta-commitment-eyebrow">The Next Step</span>
                        <h2 className="pr-cta-commitment-title">Discover More</h2>
                        <p className="hp-commitment-text">
                            Join thousands of students who chose trust, transparency, and a team that truly cares. Your journey into the elite India-Russia academic corridor begins here.
                        </p>
                        <div className="pr-cta-commitment-line" />
                    </RevealDiv>
                </div>
            </section>
        </div>
    );
}

export default WhyChooseUs;
