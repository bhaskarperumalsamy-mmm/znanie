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

function StudyInRussia() {
    const [activeTab, setActiveTab] = useState('higher');
    const [activeFaq, setActiveFaq] = useState(null);

    return (
        <div className="study-in-russia-page">
            {/* ═══ HERO ═══ */}
            <Hero
                title="Discover"
                subtitle="Russia, the largest nation in the world, spans two continents and offers a transcontinental gateway to academic excellence and cultural depth."
                heroBackgroundImage="/images/boris-busorgin.jpg"
                layout="apex"
                isInner={true}
            />

            {/* ═══ STATS ═══ */}
            <section className="pr-section-light" style={{ padding: '0' }}>
                <div className="container">
                    <div className="pr-stats-bar">
                        <div className="pr-stat-item"><span className="pr-stat-val">145.5M</span><span className="pr-stat-lbl">Population</span></div>
                        <div className="pr-stat-item"><span className="pr-stat-val">11th</span><span className="pr-stat-lbl">GDP Rank</span></div>
                        <div className="pr-stat-item"><span className="pr-stat-val">30</span><span className="pr-stat-lbl">UNESCO Sites</span></div>
                        <div className="pr-stat-item"><span className="pr-stat-val">62%</span><span className="pr-stat-lbl">Graduate Rate</span></div>
                    </div>
                </div>
            </section>

            {/* ═══ THE RUSSIAN FEDERATION / GEOPOLITICAL MONOLITH ═══ */}
            <section className="pr-section pr-section-light">
                <div className="container">
                    {/* CENTERED HEADER */}
                    <div className="pr-header pr-header-center" style={{ marginBottom: '80px' }}>
                        <span className="pr-eyebrow">Geopolitical Profile</span>
                        <h2 className="pr-title">The Russian <span className="pr-title-accent">Federation</span></h2>
                    </div>

                    <div className="pr-geopolitical-wrap">
                        {/* LEFT: VISUAL (SWAPPED) */}
                        <RevealDiv className="pr-geo-visual-mono">
                            <img src="/images/elly-fairytale.jpg" alt="Russia Geopolitical Core" />
                            <div className="pr-geo-badge">
                                <span className="label">Territorial Scale</span>
                                <strong>17.1 Million km²</strong>
                            </div>
                        </RevealDiv>

                        {/* RIGHT: CONTENT (SWAPPED) */}
                        <div className="pr-geo-content">
                            <RevealDiv className="pr-geo-summary" style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: '500', marginBottom: '30px' }}>
                                Russia spans eleven time zones across two continents, surrounded by sixteen sovereign states—the most of any nation on earth. As a global academic titan, it stands at the intersection of European heritage and Pacific innovation.
                            </RevealDiv>

                            <div className="pr-geo-data-blocks">
                                <RevealDiv className="pr-geo-block">
                                    <span className="label">Capital City</span>
                                    <strong className="value">Moscow</strong>

                                </RevealDiv>
                                <RevealDiv className="pr-geo-block" delay={100}>

                                    <span className="label">Cultural Heart</span>
                                    <strong className="value">St. Petersburg</strong>
                                </RevealDiv>
                                <RevealDiv className="pr-geo-block" delay={200}>
                                    <span className="label">Economic Scale</span>
                                    <strong className="value">11th Nominal</strong>

                                </RevealDiv>
                                <RevealDiv className="pr-geo-block" delay={300}>
                                    <span className="label">Global Rank</span>
                                    <strong className="value">Top 10 Pop.</strong>

                                </RevealDiv>
                            </div>

                            <RevealDiv>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '0.95rem' }}>
                                    The Russian business sector is one of the world's most resource-rich environments. Beyond its significant purchasing power parity (PPP), Russia offers a unique ecosystem for international scholars, from the technological research hubs of Novosibirsk to the cultural bridges of Kazan.
                                </p>
                            </RevealDiv>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ WHY STUDY / HONEYCOMB MATRIX ═══ */}
            <section className="pr-section pr-section-muted">
                <div className="container">
                    <div className="pr-header pr-header-center">
                        <span className="pr-eyebrow">Admission Rationale</span>
                        <h2 className="pr-title">Why Should You Study in <span className="pr-title-accent">Russia?</span></h2>
                        <p className="pr-subtitle">Discover a transcontinental academic titan where historical depth meets futuristic innovation.</p>
                    </div>

                    <div className="pr-why-grid">
                        {[
                            { title: 'Cultural Diversity', text: 'Engage with 160+ ethnic groups in a rich multicultural environment.', char: 'C' },
                            { title: 'Academic Studies', text: 'Immerse yourself in a legacy of peerless art, literature, and history.', char: 'A' },
                            { title: 'Music and Dance', text: 'Home to the Bolshoi Ballet and icons like Tchaikovsky.', char: 'M' },
                            { title: 'Language Immersion', text: 'The global standard for complete Russian language mastery.', char: 'L' },
                            { title: 'History Studies', text: 'Walk through UNESCO Heritage sites that shaped global civilization.', char: 'H' },
                            { title: 'Quality Education', text: 'Leading global rankings in mathematics, physics, and engineering.', char: 'Q' }
                        ].map((item, idx) => (
                            <RevealDiv key={idx} className="pr-why-card" delay={idx * 60}>
                                <div className="pr-why-num">STRATEGY 0{idx + 1}</div>
                                <div className="pr-why-title">{item.title}</div>
                                <div className="pr-why-text">{item.text}</div>
                                <div className="pr-why-icon">{item.char}</div>
                            </RevealDiv>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ EDUCATION SYSTEM / LINEAR LEDGER (NO CARDS) ═══ */}
            <section className="pr-section pr-section-light">
                <div className="container">
                    <div className="pr-header pr-header-center">
                        <span className="pr-eyebrow">Institutional Architecture</span>
                        <h2 className="pr-title">Academic <span className="pr-title-accent">Infrastructure</span></h2>
                        <p className="pr-subtitle">A card-less, structural framework mapping the trajectory of global academic excellence.</p>
                    </div>

                    <div className="pr-linear-ledger">
                        {[
                            {
                                num: '01', title: 'General Education',
                                lead: 'The non-optional foundation of the academic cycle, providing linguistic and scientific immersion from early childhood through university preparation.',
                                data: [
                                    { k: 'Mandatory', v: 'Grades 1-9' },
                                    { k: 'Timeline', v: '11 Years Total' },
                                    { k: 'Prep Stage', v: 'Grades 10-11' },
                                    { k: 'Credential', v: 'Attestat' }
                                ]
                            },
                            {
                                num: '02', title: 'Vocational Training',
                                lead: 'A specialized structural path offering high-speed integration into technical and industrial sectors through applied expertise.',
                                data: [
                                    { k: 'Path', v: 'Skilled Worker' },
                                    { k: 'Level', v: 'Specialist' },
                                    { k: 'Platform', v: 'Tekhnikums' },
                                    { k: 'Duration', v: '2-4 Years' }
                                ]
                            },
                            {
                                num: '03', title: 'Higher Education',
                                lead: 'A Bologna-integrated multi-tier cycle offering fundamental scientific training and specialized professional qualifications.',
                                data: [
                                    { k: 'Bachelor', v: '240 ECTS' },
                                    { k: 'Specialist', v: '360 ECTS' },
                                    { k: 'Master', v: '120 ECTS' },
                                    { k: 'Protocol', v: 'Bologna Process' }
                                ]
                            },
                            {
                                num: '04', title: 'Doctoral Studies',
                                lead: 'The elite research tier focused on original scientific field contributions and the defense of advanced academic theses.',
                                data: [
                                    { k: 'Rank I', v: 'Candidate (PhD)' },
                                    { k: 'Rank II', v: 'Doctor of Sci.' },
                                    { k: 'Defense', v: 'Public Theater' },
                                    { k: 'Focus', v: 'Elite Research' }
                                ]
                            }
                        ].map((item, idx) => (
                            <RevealDiv key={idx} className="pr-ledger-item" delay={idx * 100}>
                                <div className="pr-ledger-num-box">
                                    <span className="pr-ledger-num">{item.num}</span>
                                    <div className="pr-ledger-num-line"></div>
                                </div>
                                <div className="pr-ledger-main">
                                    <h3>{item.title}</h3>
                                    <p>{item.lead}</p>
                                </div>
                                <div className="pr-ledger-data-grid">
                                    {item.data.map((d, di) => (
                                        <div key={di} className="pr-data-cell">
                                            <span className="pr-cell-lbl">{d.k}</span>
                                            <span className="pr-cell-val">{d.v}</span>
                                        </div>
                                    ))}
                                </div>
                            </RevealDiv>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ BENEFITS / STRATEGIC TYPOGRAPHIC LEDGER ═══ */}
            <section className="pr-benefits-ledger" style={{ backgroundImage: `url('/images/radik-sitdikov.jpg')` }}>
                <div className="container">
                    <div className="pr-ledger-split">
                        {/* Column 01: Strategy & Stats */}
                        <div className="pr-ledger-info">
                            <div className="pr-header" style={{ marginBottom: 0 }}>
                                <span className="pr-eyebrow">Advantage Matrix</span>
                                <h2 className="pr-title">Benefits of Education in <span className="pr-title-accent">Russia</span></h2>
                            </div>

                            <div className="pr-ledger-stats-list">
                                <RevealDiv className="pr-ledger-stat-box">
                                    <span className="val">4M+</span>
                                    <span className="lbl">Active Students</span>
                                </RevealDiv>
                                <RevealDiv className="pr-ledger-stat-box" delay={100}>
                                    <span className="val">315K+</span>
                                    <span className="lbl">International Enrollment</span>
                                </RevealDiv>
                            </div>
                        </div>

                        {/* Column 02: Benefit Flow (Card-less Grid) */}
                        <div className="pr-benefits-flow">
                            {[
                                { title: 'Fundamental Leadership', text: 'World leader in training mathematicians, physicists, and nuclear engineers.' },
                                { title: 'Exhaustive Curriculum', text: 'Over 4000 programs covering medical, technical, and creative fields.' },
                                { title: 'Vertical Integration', text: 'From short summer schools to prestigious residency and doctorate programs.' },
                                { title: 'Value Blueprint', text: 'Premium combination with bachelor degrees starting as low as 83K RUB.' },
                                { title: 'State Scholarships', text: 'State-funded seats allocated annually for top-tier foreign talent.' },
                                { title: 'Bilingual Tracks', text: 'An increasing number of top universities offer full English-taught tracks.' },
                                { title: 'Russian Immersion', text: 'Access to long-term prep-faculty programs for non-native speakers.' },
                                { title: 'Double Certification', text: 'Joint programs with international institutions for dual degree status.' },
                                { title: 'Digital Ecosystem', text: 'Active leadership in the international MOOC and online communities.' },
                                { title: 'High-Tech Labs', text: 'State-of-the-art research centers and smart dormitory networks.' },
                                { title: 'Social Adaptation', text: 'Specific assistance for student lifestyle, culture, and social onboarding.' },
                                { title: 'National Incentives', text: 'Special cards for transport, theaters, and major museum discounts.' }
                            ].map((b, idx) => (
                                <RevealDiv key={idx} className="pr-flow-item" delay={idx * 40}>
                                    <span className="pr-flow-marker">STRAT 0{idx + 1}</span>
                                    <h4>{b.title}</h4>
                                    <p>{b.text}</p>
                                </RevealDiv>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ STUDENT LIFE ═══ */}
            <section className="pr-student-life-panorama">
                <div className="container">
                    <div className="pr-header pr-header-center">
                        <span className="pr-eyebrow">Lifestyle & Vibe</span>
                        <h2 className="pr-title">Student Life in <span className="pr-title-accent">Russia</span></h2>
                    </div>

                    <div className="pr-grid-3">
                        {[
                            { title: 'Nature & Travel', text: 'From Baikal freshwater reservoirs to the Caucasian mountains and Kamchatka geysers.', img: '/images/fortress_derbent.jpg' },
                            { title: 'Cultural Landmarks', text: 'Palace complexes, old churches of the Golden Ring, and the blue mosque of Kazan.', img: '/images/kenozero_lake.jpg' },
                            { title: 'Rich Heritage', text: 'The homeland of Tolstoy, Dostoevsky, and Tchaikovsky. A legacy of cinematic and theatrical hearts.', img: '/images/cinematic.jpg' }
                        ].map((item, idx) => (
                            <RevealDiv key={idx} className="pr-img-card" delay={idx * 80}>
                                <img src={item.img} alt={item.title} />
                                <div className="pr-img-card-overlay"></div>
                                <div className="pr-img-card-body">
                                    <h4>{item.title}</h4>
                                    <p>{item.text}</p>
                                </div>
                            </RevealDiv>
                        ))}
                    </div>
                </div>
            </section>


            {/* ═══ WELFARE & GOVERNANCE: INSTITUTIONAL REGISTRY ═══ */}
            <section className="pr-welfare-registry">
                <div className="container">
                    <div className="pr-registry-grid">
                        <div className="pr-registry-header">
                            <span className="pr-eyebrow">Institutional Support</span>
                            <h2 className="pr-title">Welfare & <br /><span className="pr-title-accent">Governance</span></h2>
                            <p className="pr-subtitle">Standard-setting oversight and universal wellness framework for every international student.</p>
                        </div>

                        <div className="pr-registry-content">
                            <RevealDiv className="pr-registry-card">
                                <div className="card-index">01</div>
                                <div className="card-info">
                                    <span className="pr-eyebrow">Public Health</span>
                                    <h3>Universal Health Coverage</h3>
                                    <p>Constitutional guarantees of free health coverage via a state-run mandatory plan. Over 2 million professionals ensure state-of-the-art care for all enrolled students.</p>
                                </div>
                            </RevealDiv>

                            <RevealDiv className="pr-registry-card" delay={100}>
                                <div className="card-index">02</div>
                                <div className="card-info">
                                    <span className="pr-eyebrow">Academic Ethics</span>
                                    <h3>The Ministry Oversight</h3>
                                    <p>Rigorous secondary and higher education governance, with the state dedicating 4.7% of GDP to maintain excellence across all 519 learning institutions.</p>
                                </div>
                            </RevealDiv>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ JOBS & INTERNSHIPS: STRATEGIC CAREER HUB ═══ */}
            <section className="pr-jobs-strategic-hub">
                <div className="container">
                    <div className="pr-header pr-header-center">
                        <span className="pr-eyebrow">Professional Corridor</span>
                        <h2 className="pr-title">Career Hub & <span className="pr-title-accent">Internships</span></h2>
                        <p className="pr-subtitle" style={{ maxWidth: '800px', margin: '0 auto' }}>Strategic pathways for professional growth and lawful employment within the Russian Federation.</p>
                    </div>

                    <div className="pr-jobs-grid">
                        <RevealDiv className="pr-jobs-main-card">
                            <div className="pr-eyebrow">Legal Guardrails</div>
                            <h3>Employment Regulations</h3>
                            <div className="pr-rules-list">
                                {[
                                    { label: 'Age Requirement', text: 'Must be 18+ with a valid migration permit.', icon: '18' },
                                    { label: 'Campus Freedom', text: 'No permit needed for university-based roles.', icon: 'U' },
                                    { label: 'Legal Validation', text: 'Permits are valid for one year (renewed annually).', icon: 'L' }
                                ].map((item, i) => (
                                    <div key={i} className="pr-rule-item">
                                        <div className="pr-rule-icon">{item.icon}</div>
                                        <div className="pr-rule-content">
                                            <strong>{item.label}</strong>
                                            <span>{item.text}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </RevealDiv>

                        <RevealDiv className="pr-jobs-main-card internships" delay={100}>
                            <div className="pr-eyebrow">Elite Placements</div>
                            <h3>Top Internship Oversight</h3>
                            <div className="pr-intern-list">
                                {[
                                    'JP Morgan Chase', 'Siemens Programs', 'Yandex AI Lab', 'Kaspersky Lab', 'Mail.ru Group', 'Gazprom Tech'
                                ].map((name, i) => (
                                    <div key={i} className="pr-intern-item">{name}</div>
                                ))}
                            </div>
                            <p style={{ marginTop: 'auto', opacity: 0.6, fontSize: '0.9rem' }}>Collaborations with major industry leaders ensuring hands-on experience in global markets.</p>
                        </RevealDiv>
                    </div>

                    <RevealDiv className="pr-apply-strip">
                        <div className="pr-apply-info">
                            <h4>The Academic Ecosystem</h4>
                            <p>Multicultural and diverse country with 519 higher learning institutions including 48 major colleges across every federal district.</p>
                        </div>
                    </RevealDiv>
                </div>
            </section>



            {/* ═══ FAQ ═══ */}
            <section className="pr-section pr-section-muted">
                <div className="container">
                    <div className="pr-header pr-header-center">
                        <span className="pr-eyebrow">Information Desk</span>
                        <h2 className="pr-title">Frequently Asked <span className="pr-title-accent">Questions</span></h2>
                    </div>

                    <div className="pr-faq-list">
                        {[
                            { q: 'What documents are required for admission?', a: 'International students must ensure they have a smooth application procedure. Start by narrowing your list of courses and researching programs at top schools.' },
                            { q: 'Can international students work while studying?', a: 'Yes, part-time work is allowed. Permits aren\'t needed for on-campus work. Off-campus requires a migration permit.' },
                            { q: 'Are English-taught programs available?', a: 'Increasingly, yes! Many universities offer programs entirely in English across various specializations.' },
                            { q: 'What is the admission process?', a: 'Step 1 is choosing your area of study. Step 2 is shortlisting universities based on ranking, accreditation, and diversity.' }
                        ].map((faq, idx) => (
                            <div key={idx} className={`pr-faq-item ${activeFaq === idx ? 'pr-faq-open' : ''}`}>
                                <button className="pr-faq-question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                                    <span>{faq.q}</span>
                                    <span className="pr-faq-icon">+</span>
                                </button>
                                <div className="pr-faq-answer" style={{ maxHeight: activeFaq === idx ? '200px' : '0px' }}>
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}

export default StudyInRussia;
