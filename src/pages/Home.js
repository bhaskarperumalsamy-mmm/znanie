import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import './Home.css';
import './HomeBridging.css';
import './HomeRedesign.css';
import './WhyChooseUs.css';
import HomeLanding from './HomeLanding';

/* ────── Custom hook for scroll reveals ────── */
const useReveal = (threshold = 0.15) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setIsVisible(true);
            });
        }, { threshold });

        const current = domRef.current;
        if (current) observer.observe(current);
        return () => { if (current) observer.unobserve(current); };
    }, [threshold]);

    return [domRef, isVisible];
};

const RevealDiv = ({ children, className = "", delay = 0 }) => {
    const [ref, isVisible] = useReveal();
    return (
        <div
            ref={ref}
            className={`wcu-reveal ${className} ${isVisible ? 'wcu-visible' : ''}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};


function Home() {


    const [activeCategory, setActiveCategory] = useState(0);
    const [activeSaTestimonial, setActiveSaTestimonial] = useState(0);

    /* ── Auto-rotate SA testimonials ── */
    const nextSaTestimonial = useCallback(() => {
        // Assume testimonials array length is available in scope below, or hardcode/reference safely
        setActiveSaTestimonial(prev => (prev + 1) % 6); // 6 testimonials in the array
    }, []);

    useEffect(() => {
        const timer = setInterval(nextSaTestimonial, 5000);
        return () => clearInterval(timer);
    }, [nextSaTestimonial]);

    const categories = [
        {
            title: 'MEDICINE',
            count: '06 Courses',
            icon: '🏥',
            link: '/study-in-russia',
            color: '#e74c3c',
            img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070'
        },
        {
            title: 'AVIATION / AEROSPACE',
            count: '07 Courses',
            icon: '✈️',
            link: '/study-in-russia',
            color: '#3498db',
            img: 'https://images.unsplash.com/photo-1559067515-bf7d799b6d42?q=80&w=2070'
        },
        {
            title: 'COMPUTER / IT',
            count: '08 Courses',
            icon: '💻',
            link: '/study-in-russia',
            color: '#9b59b6',
            img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070'
        },
        {
            title: 'ENGINEERING',
            count: '16 Courses',
            icon: '⚙️',
            link: '/study-in-russia',
            color: '#f39c12',
            img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070'
        },
        {
            title: 'ECONOMICS & MANAGEMENT',
            count: '07 Courses',
            icon: '📊',
            link: '/study-in-russia',
            color: '#27ae60',
            img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070'
        },
    ];

    const universities = [
        { name: 'Lomonosov Moscow State University', location: 'Moscow', ranking: '#1 National Registry', color: '#004d40', img: '/images/Universities/moscow_state_university.jpg' },
        { name: 'Bauman Moscow State Technical University', location: 'Moscow', ranking: 'Top Aerospace & Tech', color: '#b71c1c', img: '/images/Universities/bauman_university.jpg' },
        { name: 'RUDN University', location: 'Moscow', ranking: 'Global Diplomacy Hub', color: '#e65100', img: '/images/Universities/rudn_university.jpg' },
        { name: 'Saint-Petersburg State University', location: 'St. Petersburg', ranking: 'Historical Academic Center', color: '#1a237e', img: '/images/Universities/spb_university.jpg' },
        { name: 'Higher School of Economics (HSE)', location: 'Moscow', ranking: '#2 National Ranking', color: '#311b92', img: '/images/Universities/hse_university.jpg' },
        { name: 'Tomsk State University', location: 'Tomsk', ranking: 'Premier Research Hub', color: '#01579b', img: '/images/Universities/tomsk_state_university.jpg' },
        { name: 'Novosibirsk State University', location: 'Novosibirsk', ranking: 'Siberian Scientific Center', color: '#1b5e20', img: '/images/Universities/ns_university.jpg' },
        { name: 'Moscow Institute of Physics & Technology', location: 'Moscow', ranking: 'Elite Physics & Science', color: '#ff6f00', img: '/images/Universities/mipt_university.jpg' },
        { name: 'MEPhI Nuclear Research University', location: 'Moscow', ranking: 'Global Nuclear Excellence', color: '#b91d47', img: '/images/Universities/mephi_university.jpg' },
        { name: 'Ural Federal University', location: 'Yekaterinburg', ranking: 'Industrial Innovation', color: '#00ABA9', img: '/images/Universities/ural_university.jpg' },
    ];

    const testimonials = [
        {
            name: 'Shraddha Chaturvedi',
            text: 'The personalized guidance I received was transformative. From complex visa paperwork to choosing the right specialization at Sechenov University, the team was with me every step of the way. Today, I am living my dream of becoming a surgeon.',
            role: 'Medical Student',
            university: 'Lomonosov Moscow State University',
            img: '/images/mimi-thian.jpg'
        },
        {
            name: 'Amit Kumar',
            text: 'Russia’s engineering programs are world-class, but navigating the transition from India could have been daunting without Znanie Vavilova. Their orientation and ongoing support made me feel at home in Moscow instantly.',
            role: 'Aviation Engineer',
            university: 'Bauman Moscow State Technical University',
            img: '/images/akinyemi-gbadamosi.jpg'
        },
        {
            name: 'Priya Sharma',
            text: 'Learning the Russian language was my biggest fear. The immersive techniques and the support from native instructors provided by the center helped me achieve TORFL level 2 in record time. It opened doors I never knew existed.',
            role: 'Diplomatic Aide',
            university: 'RUDN University',
            img: '/images/jo-szczepanska.jpg'
        },
        {
            name: 'Rahul Verma',
            text: 'The scholarship assistance was the turning point for my family. We managed to secure a fully-funded program that covers everything. The transparency and integrity of this center are truly commendable.',
            role: 'Research Scholar',
            university: 'Saint-Petersburg State University',
            img: '/images/eliason.jpg'
        },
        {
            name: 'Ananya Iyer',
            text: 'Innopolis University is a futuristic hub for tech. Znanie Vavilova helped me navigate the grueling admissions process and the coding interviews. I am now working on world-class AI projects with global experts.',
            role: 'Software Architect',
            university: 'Moscow Institute of Physics & Technology',
            img: '/images/alina-grubnyak.jpg'
        },
        {
            name: 'Vikram Singh',
            text: 'Kazan is the heart of Russia’s energy sector. The bridging program facilitated my entry into Petroleum Engineering. The cultural immersion activities helped me integrate into the vibrant student life of Tatarstan seamlessly.',
            role: 'Petroleum Engineer',
            university: 'Ural Federal University',
            img: '/images/eliason.jpg'
        },
    ];

    return (
        <div className="home">
            <Hero
                eyebrow='S.I. Vavilov Foundation "Znanie"'
                title="Two Nations. One Future."
                subtitle="Since 1991, we've been investing in people through education, science, and culture."
                heroBackgroundImage="/images/learning_woman2.jpg"
                layout="apex"
                hideMainBg={true}
                nodes={[
                    { icon: '🎓', text: 'Education' },
                    { icon: '🌏', text: 'Culture' },
                    { icon: '🚀', text: 'Career' }
                ]}
                ctaButtons={[]}
            />

            {/* ═══ HOME CONTENT — Welcome Section ═══ */}
            <section className="hp-welcome-section">
                <div className="container">
                    <div className="hp-welcome-inner">
                        <div className="bp-header text-center">
                            <span className="bp-eyebrow">Est. 1991</span>
                            <h2 className="bp-title">Enlightened <span className="hp-diff-accent"> Futures</span></h2>
                            <p className="bp-lead mx-auto"> Welcome to the Regional Charitable Public Foundation "Znanie" named after S.I. Vavilov.</p>
                        </div>

                        <p className="hp-welcome-subtitle">
                            Imagine a place where science, art, and technology come together to shape the future. That is what we are. We are a team of dreamers and doers, officially established in 1991 to support the brightest minds in Russia and beyond.
                        </p>
                        <div className="hp-welcome-divider" />
                    </div>
                </div>
            </section>

            {/* ═══ HOME CONTENT — Who We Are ═══ */}
            <section className="hp-whoweare-section">
                <div className="container">
                    <div className="hp-whoweare-grid">
                        <div className="hp-whoweare-left">
                            <span className="bp-eyebrow">Our Identity</span>
                            <h2 className="bp-title">Who We Are</h2>
                            <p className="hp-whoweare-lead">
                                We believe that knowledge is the key to unlocking human potential. For over 30 years, we have been helping students, young professionals, and creative talents turn their ideas into reality. From the laboratories of Moscow to the deserts of the Middle East, our mission is simple: to build a world where everyone has the chance to learn, create, and succeed.
                            </p>
                            <div className="hp-whoweare-highlight">
                                We are not just a foundation; we are a launchpad for your dreams.
                            </div>
                        </div>
                        <div className="hp-whoweare-right">
                            <div className="hp-values-strip">
                                <span className="hp-values-label">Our Foundation Values</span>
                                <div className="hp-values-row">
                                    {['Transparency', 'Equality', 'Independence', 'Integrity', 'Inclusivity'].map((val, i) => (
                                        <span key={i} className="hp-value-chip">
                                            <span className="hp-value-dot" />
                                            {val}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ═══ HOME CONTENT — How We Make a Difference — Impact Bento ═══ */}
            <section className="ib-section" id="impact-bento">
                <div className="container">
                    <div className="ib-header">
                        <span className="bp-eyebrow">
                            <span className="ib-pulse-dot" /> Our Impact
                        </span>
                        <h2 className="bp-title">
                            How We Make <span className="ib-title-accent">a Difference</span>
                        </h2>
                        <p className="ib-subtitle">
                            Six pillars of purpose driving meaningful change across communities, borders, and generations.
                        </p>
                    </div>

                    <div className="ib-pillar-accordion">
                        {[
                            { title: 'Learning for Life', desc: 'Creating opportunities for continuous education, skills training, and career development particularly for young people starting their journey.', num: '01', img: '/images/students-studying.jpg', tag: 'Pedagogy' },
                            { title: 'Nurturing Talent', desc: 'Supporting the next generation through scholarships and recognition programmes.', num: '02', img: '/images/young-student.jpg', tag: 'Merit' },
                            { title: 'Advancing Innovation', desc: 'Championing scientific progress and technological development.', num: '03', img: '/images/ofspace-llc.jpg', tag: 'Discovery' },
                            { title: 'Strengthening Communities', desc: 'Providing practical support and promoting cultural enrichment.', num: '04', img: '/images/friends-cheering-world.jpg', tag: 'Unity' },
                            { title: 'Building Bridges', desc: 'Fostering international cooperation and working together on global challenges.', num: '05', img: '/images/tourist-carrying.jpg', tag: 'Diplomacy' },
                            { title: 'Protecting Our Future', desc: 'Supporting environmental conservation and sustainable initiatives for a healthier planet.', num: '06', img: '/images/verdealbastrui.jpg', tag: 'Ecology' },
                        ].map((item, idx) => (
                            <div key={idx} className="ib-pillar">
                                <div className="ib-pillar-bg">
                                    <img src={item.img} alt={item.title} className="ib-pillar-img" />
                                    <div className="ib-pillar-overlay" />
                                </div>
                                <div className="ib-pillar-content">
                                    <div className="ib-pillar-collapsed">
                                        <h3 className="ib-pillar-label">{item.title}</h3>
                                    </div>
                                    <div className="ib-pillar-expanded">
                                        <div className="ib-pillar-header">
                                            <span className="ib-pillar-tag">{item.tag}</span>
                                        </div>
                                        <h3 className="ib-pillar-title">{item.title}</h3>
                                        <p className="ib-pillar-desc">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <HomeLanding />


            {/* ═══ Academic Anthology — The Sovereign Cinematic Anthology (Interactive Canvas) ═══ */}
            <section className="wcu-testimonials" style={{ width: '100%', overflow: 'hidden', paddingTop: '40px' }}>
                <div className="wcu-container" style={{ maxWidth: '100%', margin: '0 auto', padding: '0 5%' }}>
                    <RevealDiv className="wcu-section-header text-center">
                        <span className="wcu-eyebrow">Champions of Cross-Border Excellence</span>
                        <h2 className="wcu-section-title">Academic Anthology</h2>
                        <p className="wcu-section-sub">Discover the defining journeys of our most esteemed scholars</p>
                    </RevealDiv>

                    <div className="wcu-testimonial-carousel" style={{ maxWidth: '1600px', margin: '0 auto' }}>
                        <button
                            className="wcu-carousel-btn wcu-carousel-prev"
                            onClick={() => setActiveSaTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
                            aria-label="Previous scholar"
                        >
                            ‹
                        </button>

                        <div className="wcu-testimonial-track" style={{ position: 'relative', minHeight: '350px' }}>
                            {testimonials.map((t, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className={`wcu-testimonial-card ${idx === activeSaTestimonial ? 'wcu-testimonial-active' : ''}`}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            gap: '24px'
                                        }}
                                    >
                                        <div className="wcu-testimonial-quote-icon" style={{ margin: '0 auto', color: '#1a1a1a' }}>"</div>
                                        <p className="wcu-testimonial-text" style={{ fontSize: '1.25rem', lineHeight: '1.8', margin: '0 auto' }}>{t.text}</p>
                                        <div className="wcu-testimonial-author" style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            gap: '12px',
                                            marginTop: 'auto',
                                            borderTop: '1px solid rgba(255,255,255,0.1)',
                                            paddingTop: '32px'
                                        }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <span style={{
                                                    fontSize: '0.75rem',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '4px',
                                                    color: '#D4A03A',
                                                    fontWeight: '900',
                                                    marginBottom: '8px'
                                                }}>
                                                    Scholar Residency
                                                </span>
                                                <span style={{
                                                    fontSize: '1.45rem',
                                                    color: '#D4A03A',
                                                    fontWeight: '700',
                                                    letterSpacing: '-0.01em',
                                                    lineHeight: '1.3',
                                                    marginBottom: '12px',
                                                    maxWidth: '600px'
                                                }}>
                                                    {t.university}
                                                </span>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '16px'
                                                }}>
                                                    <span style={{ width: '24px', height: '1.5px', background: '#D4A03A', opacity: '0.6' }} />
                                                    <span className="wcu-testimonial-name" style={{
                                                        margin: 0,
                                                        fontSize: '1.1rem',
                                                        color: 'rgba(255,255,255,0.9)',
                                                        fontWeight: '700',
                                                        letterSpacing: '1px'
                                                    }}>
                                                        {t.name}
                                                    </span>
                                                    <span style={{ width: '24px', height: '1.5px', background: '#D4A03A', opacity: '0.6' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            className="wcu-carousel-btn wcu-carousel-next"
                            onClick={nextSaTestimonial}
                            aria-label="Next scholar"
                        >
                            ›
                        </button>

                        <div className="wcu-carousel-dots">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`wcu-dot ${idx === activeSaTestimonial ? 'wcu-dot-active' : ''}`}
                                    onClick={() => setActiveSaTestimonial(idx)}
                                    aria-label={`Go to scholar ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Universities Section — The Scholarly Pantheon (Sovereign Archive) ═══ */}
            <section className="sia-section" style={{ width: '100%', overflow: 'hidden' }}>
                <div style={{ width: '100%' }}>

                    {/* Centered Monumental Header */}
                    <header className="sia-header bp-header text-center">
                        <div className="sia-eyebrow bp-eyebrow">
                            <span className="resonance-dot" />
                            Architects of Intellectual Merit
                        </div>
                        <h2 className="bp-title">
                            The Sovereign  <span className="sia-accent">Institutional Archive</span>
                        </h2>
                    </header>

                    {/* Sovereign Architectural Portfolio Grid */}
                    <div className="sia-portfolio-grid">
                        {universities.map((uni, index) => (
                            <Link
                                key={index}
                                to="/study-in-russia"
                                className="sia-portfolio-card"
                            >
                                <div className="sia-portfolio-visual">
                                    <img src={uni.img} alt={uni.name} className="sia-p-img" />
                                    <div className="sia-p-overlay" />
                                    <div className="sia-p-corner" />
                                </div>

                                <div className="sia-portfolio-info">
                                    <h3 className="sia-portfolio-name">{uni.name}</h3>
                                    <div className="sia-portfolio-meta">
                                        <div className="sia-pm-item">
                                            <span className="sia-pm-val">{uni.ranking}</span>
                                        </div>
                                        <div className="sia-pm-row">
                                            <span className="sia-pm-loc">{uni.location}</span>
                                            <div className="sia-pm-line" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </section>

            <section className="as-marquee-section">

                <div className="as-m-wrapper">
                    {/* Track 1: Left Scroll */}
                    <div className="as-m-track as-m-track-1">
                        {[
                            "Medicine", "Dentistry", "Pediatrics", "Nursing", "Marketing",
                            "Computer Science", "Aviation", "Tourism", "Pharmacy", "International Relations"
                        ].concat([
                            "Medicine", "Dentistry", "Pediatrics", "Nursing", "Marketing",
                            "Computer Science", "Aviation", "Tourism", "Pharmacy", "International Relations"
                        ]).map((s, i) => (
                            <div key={i} className="as-m-item">
                                <span className="as-m-text">{s}</span>
                            </div>
                        ))}
                    </div>

                    {/* Track 2: Right Scroll */}
                    <div className="as-m-track as-m-track-2">
                        {[
                            "International Economics", "Business", "Post-Graduate Courses",
                            "Banking and Finance", "Cyber Security", "Web-Development",
                            "Engineering", "Law", "Social Sciences"
                        ].concat([
                            "International Economics", "Business", "Post-Graduate Courses",
                            "Banking and Finance", "Cyber Security", "Web-Development",
                            "Engineering", "Law", "Social Sciences"
                        ]).map((s, i) => (
                            <div key={i} className="as-m-item">
                                <span className="as-m-text as-m-outline">{s}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </section>

            {/* ═══ HOME CONTENT — Our Commitment ═══ */}
            <section className="hp-commitment-section">
                <div className="container">
                    <div className="hp-commitment-inner">
                        <span className="hp-commitment-eyebrow">Our Pledge</span>
                        <h2 className="hp-commitment-title">Our Commitment</h2>
                        <p className="hp-commitment-text">
                            We're dedicated to helping Russia thrive in education, science, culture, and society — whilst promoting human rights, social harmony, and democratic values that benefit everyone.
                        </p>
                        <div className="hp-commitment-line" />
                    </div>
                </div>
            </section>

        </div >
    );

}

export default Home;
