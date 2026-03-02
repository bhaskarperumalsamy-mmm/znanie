import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import './AboutUs.css';
import './HomeRedesign.css';

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

const RevealLine = ({ children, className = "" }) => {
    const [ref, isVisible] = useReveal();
    return (
        <p
            ref={ref}
            className={`au-reveal-line ${className} ${isVisible ? 'active' : ''}`}
        >
            {children}
        </p>
    );
};

const RevealDiv = ({ children, className = "", style = {} }) => {
    const [ref, isVisible] = useReveal();
    return (
        <div
            ref={ref}
            className={`au-reveal-div ${className} ${isVisible ? 'active' : ''}`}
            style={style}
        >
            {children}
        </div>
    );
};

function AboutUs() {
    const [activeFaq, setActiveFaq] = useState(null);
    const [activeVisionIdx, setActiveVisionIdx] = useState(0);
    const visionRefs = useRef([]);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const visionItems = [
        { num: '01', title: 'Competing Globally', desc: 'Helping Russia reach the same standards as leading nations in humanitarian, social, economic, scientific, and technical fields.', image: 'https://images.pexels.com/photos/13793585/pexels-photo-13793585.jpeg' },
        { num: '02', title: 'Building Harmony', desc: 'Working towards civil unity, social cohesion, and mutual understanding between communities and nations.', image: 'https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg' },
        { num: '03', title: 'Cultural Renewal', desc: 'Supporting the spiritual and cultural revival of communities through education and bilateral exchange.', image: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg' },
        { num: '04', title: 'Strengthening Democracy', desc: 'Promoting democratic ideals, the rule of law, and transparent governance through institutional programs.', image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg' },
        { num: '05', title: 'Protecting Rights', desc: 'Ensuring human rights are respected and upheld through advocacy, legal support, and educational outreach.', image: 'https://images.pexels.com/photos/6009802/pexels-photo-6009802.jpeg' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = visionRefs.current.indexOf(entry.target);
                        if (idx !== -1) {
                            setActiveVisionIdx(idx);
                        }
                    }
                });
            },
            { threshold: 0.5, rootMargin: "-10% 0px -30% 0px" }
        );

        const elements = visionRefs.current;
        elements.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            elements.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    return (
        <div className="au-redesign-v4">
            {/* ═══ SECTION 1: HERO (Apex Layout) ═══ */}
            <Hero
                title="BRIDGES"
                subtitle="Engineering a future of bilateral harmony. we have replaced geopolitical distance with direct pathways of mutual progress, cultural depth, and academic excellence."
                heroBackgroundImage="/images/wikiimages.jpg"
                layout="apex"
                isInner={true}
            />




            {/* ═══ ABOUT US CONTENT — Our Journey ═══ */}
            <section className="au-journey-section">
                <div className="container">
                    <div className="bp-header text-center">
                        <span className="bp-eyebrow">Heritage</span>
                        <h2 className="bp-title">Our <span className="au-journey-accent">Journey</span></h2>
                    </div>

                    <div className="au-journey-grid">
                        <div className="au-journey-origin">
                            <div className="au-journey-origin-inner">
                                <span className="au-journey-tag">Where We Began</span>
                                <p className="au-journey-text">
                                    The S.I. Vavilov Foundation "Znanie" was established on 1st October 1991, following an order by Moscow Government Premier Yu.M. Luzhkov (Order No. 435-RP). Named in honour of distinguished scientist S.I. Vavilov, our Foundation began with a clear mission: to spread knowledge and create opportunities for all.
                                </p>
                            </div>
                        </div>
                        <div className="au-journey-founders">
                            <span className="au-journey-tag">Our Founding Leaders</span>
                            <div className="au-founder-cards">
                                <div className="au-founder-card">
                                    <span className="au-founder-role">First President</span>
                                    <h4 className="au-founder-name">Academician Konstantin Vasilyevich Frolov</h4>
                                </div>
                                <div className="au-founder-card">
                                    <span className="au-founder-role">First Board Chairman</span>
                                    <h4 className="au-founder-name">Professor Fyodor Fyodorovich Svetik</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ ABOUT US CONTENT — Where We Are Today ═══ */}
            <section className="au-today-section">
                <div className="container">
                    <div className="bp-header text-center">
                        <span className="bp-eyebrow">Three Decades of Impact</span>
                        <h2 className="bp-title">Where We Are <span className="au-today-accent">Today</span></h2>
                    </div>

                    <div className="au-today-grid">
                        <RevealDiv className="au-today-visual">
                            <img
                                src="/images/freestocks.jpg"
                                alt="Professionals working together"
                                loading="lazy"
                            />
                            <div className="au-today-stats-overlay">
                                <div className="today-stat">
                                    <span className="today-stat-num">30+</span>
                                    <span className="today-stat-lbl">Years Active</span>
                                </div>
                                <div className="today-stat">
                                    <span className="today-stat-num">12</span>
                                    <span className="today-stat-lbl">Regions</span>
                                </div>
                                <div className="today-stat">
                                    <span className="today-stat-num">5k+</span>
                                    <span className="today-stat-lbl">Scholars</span>
                                </div>
                            </div>
                        </RevealDiv>

                        <div className="au-today-content">
                            <RevealDiv>
                                <p className="au-today-lead">
                                    Our operational timeline has seen vast changes across the globe, yet our structural mission remains resolute.
                                </p>
                                <div className="au-today-list">
                                    {[
                                        'Remained true to our goals whilst adapting to changing times',
                                        'Grown our presence across the Russian Federation',
                                        'Expanded our work into the Middle East',
                                        'Built lasting partnerships with educational institutions, research centres, cultural organisations, and community groups',
                                        'Helped thousands of people access education, training, and support',
                                        'Maintained our reputation for integrity and transparency',
                                    ].map((item, idx) => (
                                        <div key={idx} className="au-today-item">
                                            <span className="au-today-marker">✦</span>
                                            <p className="au-today-text">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </RevealDiv>
                        </div>

                        <RevealDiv className="au-today-closing">
                            <p>We're proud of what we've achieved, but we know there's always more to do. As long as there are people who need support, knowledge to share, and communities to strengthen, our work continues.</p>
                        </RevealDiv>
                    </div>
                </div>
            </section>

            {/* ═══ ABOUT US CONTENT — What Guides Us ═══ */}
            <section className="au-guides-section">
                <div className="container au-guides-container">
                    <div className="au-guides-header bp-header text-center mx-auto">
                        <span className="bp-eyebrow">Principles</span>
                        <h2 className="bp-title">What Guides Us</h2>
                        <p className="bp-lead mx-auto">We believe in doing things the right way. Every decision we make is guided by these overarching principles.</p>
                    </div>

                    <div className="au-guides-list">
                        {[
                            { label: 'Transparency', desc: 'We\'re open about what we do and how we do it' },
                            { label: 'Equality', desc: 'Everyone deserves the same opportunities' },
                            { label: 'Voluntary Participation', desc: 'People choose to be part of our mission' },
                            { label: 'Self-Governance', desc: 'We manage our affairs independently' },
                            { label: 'Legitimacy', desc: 'We operate within the law and uphold the highest standards' },
                        ].map((item, idx) => (
                            <div key={idx} className="au-guide-row">
                                <div className="au-guide-row-num">{'0' + (idx + 1)}</div>
                                <h4 className="au-guide-row-label">{item.label}</h4>
                                <div className="au-guide-row-line"></div>
                                <p className="au-guide-row-desc">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 9: IMPACT — THE SOVEREIGN METRICS ═══ */}
            <section className="au-impact-sovereign">
                <div className="au-impact-bg-overlay" />
                <div className="container au-impact-container">
                    <div className="au-impact-left bp-header">
                        <span className="au-impact-eyebrow bp-eyebrow">Institutional Reach</span>
                        <h2 className="au-impact-heading bp-title">Our Impact</h2>
                        <p className="au-impact-lead bp-lead">
                            Numbers don’t tell the whole story, but they reveal the vast scale of our vision. For nearly three decades, we have built bridges of opportunity across continents.
                        </p>
                        <div className="au-impact-accent-line"></div>
                    </div>

                    <div className="au-impact-grid-new impact-4-col">
                        <div className="impact-sovereign-card">
                            <span className="impact-emoji">🕊️</span>
                            <span className="impact-val">30+</span>
                            <span className="impact-lbl">Years of Service</span>
                            <p className="impact-detail">Supporting communities since 1991</p>
                        </div>
                        <div className="impact-sovereign-card highlight">
                            <span className="impact-emoji">🎓</span>
                            <span className="impact-val">5,000+</span>
                            <span className="impact-lbl">Scholarships Awarded</span>
                            <p className="impact-detail">Empowering talented youth</p>
                        </div>
                        <div className="impact-sovereign-card">
                            <span className="impact-emoji">🤝</span>
                            <span className="impact-val">50+</span>
                            <span className="impact-lbl">Partner Institutions</span>
                            <p className="impact-detail">Collaborative impact</p>
                        </div>
                        <div className="impact-sovereign-card highlight">
                            <span className="impact-emoji">🌍</span>
                            <span className="impact-val">2</span>
                            <span className="impact-lbl">Operating Regions</span>
                            <p className="impact-detail">Russia & Middle East</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="au-bento-section">
                <div className="container">
                    <RevealDiv className="au-bento-header">
                        <span className="bp-eyebrow">Our Academic Mandate</span>
                        <h2 className="bp-title">Ten Imperatives <span className="au-today-accent">of Progress</span></h2>
                        <p className="bp-lead mx-auto" style={{ maxWidth: '680px' }}>
                            A comprehensive framework driving bilateral excellence across ten strategic pillars — from STEM innovation to global diplomacy.
                        </p>
                    </RevealDiv>

                    <div className="au-bento-grid">
                        {[
                            { num: '01', title: 'Knowledge & Innovation Synthesis', desc: 'Accelerating the flow of breakthrough scientific and technical resources to global communities.', size: 'hero', accent: '#D4A03A' },
                            { num: '02', title: 'Life-Long Learning', desc: 'Investing in continuous professional evolution and career resilience far beyond formal education.', size: '', accent: '#D4A03A' },
                            { num: '03', title: 'Supporting Young Achievers', desc: 'Recognizing and funding the next generation of scientific and cultural prodigies.', size: '', accent: '#D4A03A' },
                            { num: '04', title: 'Future Entrepreneurs', desc: 'Training leaders through modern business practices inspired by bilateral success stories.', size: '', accent: '#D4A03A' },
                            { num: '05', title: 'Deep Socio-Cultural Peace', desc: 'Fostering structural harmony and bilateral friendship through deep cultural integration.', size: '', accent: '#D4A03A' },
                            { num: '06', title: 'Spiritual Maturation', desc: 'Supporting programs that promote intellectual depth and spiritual well-being across borders.', size: 'wide', accent: '#D4A03A' },
                            { num: '07', title: 'Dignity & Social Equity', desc: 'Protecting the fundamental rights of the vulnerable through direct bureaucratic and legal assistance.', size: '', accent: '#D4A03A' },
                            { num: '08', title: 'Sovereign National Revival', desc: 'Championing Russia\'s multidimensional revitalization through economic and cultural support.', size: '', accent: '#D4A03A' },
                            { num: '09', title: 'Eco-Structural Persistence', desc: 'Integrating nature preservation into the core of bilateral human development.', size: 'wide', accent: '#D4A03A' },
                            { num: '10', title: 'Global Collaborative Diplomacy', desc: 'Tackling the structural challenges of human development via high-level international partnership.', size: 'full', accent: '#D4A03A' },
                        ].map((item, idx) => (
                            <RevealDiv key={idx} className={`au-bento-card ${item.size}`} delay={idx * 50}>
                                <div className="au-bento-inner">
                                    <div className="au-bento-accent" style={{ background: item.accent }}></div>
                                    <div className="au-bento-top">
                                        <span className="au-bento-num" style={{ color: item.accent }}>{item.num}</span>
                                    </div>
                                    <div className="au-bento-content">
                                        <h4 className="au-bento-title">{item.title}</h4>
                                        <p className="au-bento-desc">{item.desc}</p>
                                    </div>
                                </div>
                            </RevealDiv>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ ABOUT US CONTENT — Our Bigger Picture ═══ */}
            <section className="au-vision-section">
                <div className="au-vision-split">
                    {/* Left: Sticky Image Panel */}
                    <div className="au-vision-sticky">
                        <div className="au-vision-image">
                            <img
                                src="/images/girl-writing-notebook.jpg"
                                alt="Nature and education"
                                loading="lazy"
                            />
                            <div className="au-vision-overlay"></div>
                            <div className="au-vision-caption">
                                <span className="au-vision-badge">National Vision</span>
                                <h2 className="au-vision-heading">Our Bigger<br />Picture</h2>
                                <p className="au-vision-tagline">Five pillars driving national impact through education and collaboration.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Scrolling Text */}
                    <div className="au-vision-scroll">
                        {visionItems.map((item, idx) => (
                            <div key={idx} ref={(el) => (visionRefs.current[idx] = el)}>
                                <RevealDiv className={`au-vision-item ${activeVisionIdx === idx ? 'au-vision-item-active' : ''}`} delay={0}>
                                    <div className="au-vision-item-num">{item.num}</div>
                                    <div className="au-vision-item-body">
                                        <h4 className="au-vision-item-title">{item.title}</h4>
                                        <p className="au-vision-item-desc">{item.desc}</p>
                                    </div>
                                </RevealDiv>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ ABOUT US CONTENT — Join Our Mission ═══ */}
            <section className="au-join-section">
                <div className="container">
                    <div className="au-join-inner">
                        <h2 className="au-join-title">Join Our Mission</h2>
                        <p className="hp-welcome-subtitle">
                            Whether you're a student seeking a scholarship, an organisation looking to partner, or someone who shares our values and wants to contribute — we'd love to hear from you.
                        </p>
                        <p className="au-join-statement">
                            Together, we can build a society where everyone has access to knowledge, opportunity, and support.
                        </p>
                        <div className="au-join-line" />
                    </div>
                </div>
            </section>


            {/* ═══ SECTION 2: THE SOVEREIGN APERTURE (Profile & Vision) — Insight ═══ */}
            {/* <section className="au-manifesto">
                <div className="container">
                    <div className="sovereign-profile-header centered">
                        <div className="profile-intro">
                            <span className="profile-eyebrow">Institutional Profile</span>
                            <h2 className="profile-heading">Insight</h2>
                        </div>

                        <div className="profile-details">
                            <p className="profile-statement">
                                "We are a <span className="highlight">non-profit organization</span>, <i>engineered</i> to bridge civilizations through strategic cultural exchange and academic merit."
                            </p>
                        </div>
                    </div>

                    <div className="aperture-matrix-grid">
                        <div
                            className="matrix-card feature-wide has-bg"
                            style={{ backgroundImage: 'url(/images/book-read.jpg)' }}
                        >
                            <div className="matrix-card-overlay" />
                            <div className="matrix-card-inner">
                                <h3 className="matrix-title">Strategic <strong>Education</strong> is the foundation of peace.</h3>
                                <p className="matrix-description">We believe that classrooms are the primary architects of lasting international stability.</p>
                            </div>
                            <div className="matrix-indicator" />
                        </div>

                        <div className="grid-sub-group">
                            <RevealDiv className="matrix-card">
                                <div className="matrix-card-inner">
                                    <h3 className="matrix-title">Cultural <strong>Continuity</strong> heals fractured relations.</h3>
                                    <p className="matrix-description">Ancient heritage serves as the glue that binds modern civilizations together.</p>
                                </div>
                                <div className="matrix-indicator" />
                            </RevealDiv>

                            <RevealDiv className="matrix-card">
                                <div className="matrix-card-inner">
                                    <h3 className="matrix-title">Bilateral <strong>Excellence</strong> defines our mission.</h3>
                                    <p className="matrix-description">A historic alliance between India and Russia, forged in wisdom and strategic trust.</p>
                                </div>
                                <div className="matrix-indicator" />
                            </RevealDiv>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* ═══ SECTION 6: THE STRATEGIC MANDATE (Mission & Vision) — Architecting ═══ */}
            {/* <section className="au-strategic-mandate">
                <div className="container">
                    <div className="mandate-header bp-header text-center mx-auto">
                        <span className="strategy-meta bp-eyebrow">BLUEPRINT</span>
                        <h2 className="mandate-title bp-title">Architecting <br /><span className="italic">the Future</span></h2>
                    </div>

                    <div className="mandate-grid">
                        <div className="mandate-panel mission-panel" data-aos="fade-right">
                            <div className="panel-inner">
                                <div className="panel-header">
                                    <span className="panel-num">01 /</span>
                                    <h3>Our Mission</h3>
                                </div>
                                <p className="panel-text">
                                    To promote global peace and understanding by strengthening educational, cultural, and human connections between India and Russia — one program, one person, one moment at a time.
                                </p>
                                <div className="panel-marker">EX_M_01</div>
                            </div>
                        </div>

                        <div className="mandate-panel vision-panel" data-aos="fade-left">
                            <div className="panel-inner">
                                <div className="panel-header">
                                    <span className="panel-num">02 /</span>
                                    <h3>Our Vision</h3>
                                </div>
                                <p className="panel-text">
                                    A world where no border is stronger than a book, no wall is taller than a shared song, and no distance is greater than the reach of education and empathy.
                                </p>
                                <div className="panel-marker">EX_V_02</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* ═══ SECTION 4: THE ARCHITECTURAL STRATEGY (What We Do) ═══ */}
            {/* <section className="au-strategy-grid">
                <div className="container">
                    <div className="strategy-header bp-header text-center mx-auto">
                        <span className="strategy-meta bp-eyebrow">PRIMARY PILLARS</span>
                        <h2 className="strategy-title bp-title">Bridging Two Worlds in <strong>Four Ways</strong></h2>
                        <p className="strategy-lead bp-lead mx-auto">Our architectural strategy for bilateral excellence, driving progress through four distinct domains.</p>
                    </div>

                    <div className="strategy-columns">
                        <div className="strategy-card">
                            <div className="card-image-wrap">
                                <img src="/images/study-work.jpg" alt="Education" />
                                <span className="card-index">01</span>
                            </div>
                            <div className="card-content">
                                <span className="card-label">Academic Merit</span>
                                <h3>The Knowledge Bridge</h3>
                                <p>We facilitate academic exchanges that go beyond textbooks, connecting students in India and Russia to cultivate global leadership.</p>
                            </div>
                        </div>

                        <div className="strategy-card">
                            <div className="card-image-wrap">
                                <img src="/images/yogpeeth.jpg" alt="Wellness" />
                                <span className="card-index">02</span>
                            </div>
                            <div className="card-content">
                                <span className="card-label">Holistic Growth</span>
                                <h3>Bilateral Wellness</h3>
                                <p>Building emotional resilience and mental clarity through community-focused mental health support and cultural mindfulness.</p>
                            </div>
                        </div>

                        <div className="strategy-card">
                            <div className="card-image-wrap">
                                <img src="/images/simon-kessler.jpg" alt="Sports" />
                                <span className="card-index">03</span>
                            </div>
                            <div className="card-content">
                                <span className="card-label">Shared Vitality</span>
                                <h3>Atlantic Athletics</h3>
                                <p>Unifying nations through the spirit of sportsmanship and shared physical excellence, fostering a resilient culture of health.</p>
                            </div>
                        </div>

                        <div className="strategy-card">
                            <div className="card-image-wrap">
                                <img src="/images/elly-fairytale.jpg" alt="Media" />
                                <span className="card-index">04</span>
                            </div>
                            <div className="card-content">
                                <span className="card-label">Creative Spark</span>
                                <h3>Cultural Narratives</h3>
                                <p>Using theater, film, and digital media to drive social transformation and amplify the voices of a unified bilateral community.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}



            {/* ═══ SECTION 12: THE PERPETUAL PROMISE — SOVEREIGN TECHNICAL LEDGER (REDESIGN) ═══ */}
            {/* <section className="au-pledge-ledger">
                <div className="ledger-header bp-header">
                    <span className="ledger-eyebrow bp-eyebrow">Institutional Integrity</span>
                    <h2 className="ledger-title bp-title">The Perpetual <span className="ledger-accent">Pledge</span></h2>
                </div>

                <div className="ledger-grid">
                    {[
                        { num: "01", category: "KNOWLEDGE", action: "To never stop teaching.", detail: "Fostering an environment where wisdom flows without boundaries." },
                        { num: "02", category: "SYNERGY", action: "To never stop connecting.", detail: "Building corridors of understanding that transcend modern distance." },
                        { num: "03", category: "VITALITY", action: "To never stop healing.", detail: "Nurturing the mental and physical well-being of the community." },
                        { num: "04", category: "RESONANCE", action: "To never stop creating.", detail: "Crafting cultural milestones that resonate across civilizations." }
                    ].map((item, idx) => (
                        <div key={idx} className="ledger-item">
                            <span className="ledger-num">{item.num}</span>
                            <div className="ledger-content">
                                <div className="ledger-main-text">
                                    <span className="ledger-cat">{item.category}</span>
                                    <h3 className="ledger-action">{item.action}</h3>
                                </div>
                                <p className="ledger-detail">{item.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section> */}


            {/* ═══ SECTION 13: THE SOVEREIGN ACTION CTA (Elite Dark Redesign) ═══ */}
            <section className="au-cta-master">
                <div className="container au-cta-container">
                    <div className="au-cta-header bp-header">
                        <span className="au-cta-eyebrow bp-eyebrow">Engagement</span>
                        <h2 className="au-cta-title bp-title">
                            This Story Isn't <br />
                            <span className="au-cta-accent">Complete Without You</span>
                        </h2>
                        <p className="au-cta-lead bp-lead">
                            Join our mission to build resilient bridges, empower international study, and foster structural cross-cultural dialogue. Whether you give your time, your resources, or your voice, your contribution changes the world.
                        </p>
                    </div>

                    <div className="au-cta-cards">
                        <Link to="/contact" className="au-cta-card">
                            <div className="au-cta-card-top">
                                <span className="au-cta-card-num">01</span>
                                <div className="au-cta-arrow-circle">↗</div>
                            </div>
                            <span className="au-cta-card-tag">Human Capital</span>
                            <h3>Volunteer <br />Time</h3>
                            <p>Give your time and unparalleled talent to help build resilient bridges and support global educational initiatives.</p>
                        </Link>

                        <Link to="/contact" className="au-cta-card primary">
                            <div className="au-cta-card-top">
                                <span className="au-cta-card-num">02</span>
                                <div className="au-cta-arrow-circle">↗</div>
                            </div>
                            <span className="au-cta-card-tag">Resources</span>
                            <h3>Contribute <br />Support</h3>
                            <p>Your resources empower students to embrace international study and foster a deeper structural cross-cultural dialogue.</p>
                        </Link>

                        <Link to="/contact" className="au-cta-card">
                            <div className="au-cta-card-top">
                                <span className="au-cta-card-num">03</span>
                                <div className="au-cta-arrow-circle">↗</div>
                            </div>
                            <span className="au-cta-card-tag">Network</span>
                            <h3>Collaborative <br />Link</h3>
                            <p>Start a conversation with our organizational leadership to explore distinct academic pipelines and expansions.</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 11: FAQ ═══ */}
            {/* <section className="au-faq">
                <div className="container">
                    <div className="bp-header text-center">
                        <h2 className="au-faq-heading bp-title">Questions You Might Have</h2>
                        <p className="au-faq-subheading bp-lead mx-auto">We believe in transparency — ask us anything</p>
                    </div>

                    <div className="au-faq-accordion">
                        {[
                            { q: "Are you really a non-profit?", a: "Yes — 100%. We have been a registered non-profit since 2025. Every rupee goes back into our programs and the communities we serve." },
                            { q: "Why only India and Russia?", a: "Because focus creates depth. India and Russia share a unique bond — and by deepening that connection, we create a model that can inspire global cooperation everywhere." },
                            { q: "How can I get involved?", a: "Volunteer, collaborate, donate, or simply spread the word. Every action — big or small — helps us build a more peaceful world." },
                            { q: "Do you work with governments?", a: "We collaborate with educational institutions, cultural bodies, and civic organizations in both countries. Our work complements diplomacy — but our focus is always people-to-people connection." },
                            { q: "What makes you different from other NGOs?", a: "Our multi-domain approach. We don't just educate — we heal minds, strengthen bodies, and amplify voices. Peace isn't one-dimensional, and neither are we." }
                        ].map((item, idx) => (
                            <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`} onClick={() => toggleFaq(idx)}>
                                <div className="faq-question">
                                    <span>{item.q}</span>
                                    <span className="faq-toggle">{activeFaq === idx ? '−' : '+'}</span>
                                </div>
                                {activeFaq === idx && <div className="faq-answer">{item.a}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}
            <div className="au-footer-tag">
                <span>🕊️ Together, we are the bridge.</span>
            </div>
        </div>
    );
}

export default AboutUs;
