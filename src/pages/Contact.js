import React, { useEffect, useRef, useState } from 'react';
import Hero from '../components/Hero';
import './PageRedesign.css';
import './ContactNew.css';

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

function Contact() {
    const contactChannels = [
        {
            num: '01',
            label: 'Institutional HQ',
            tag: 'Visit',
            lines: [
                'No. 8, Solakalipalayam Road,',
                'Thannasi Kovil Street,',
                'Kodumudi, Erode District,',
                'Tamil Nadu, India - 638151'
            ],
            accent: 'primary',
        },
        {
            num: '02',
            label: 'Priority Hotlines',
            tag: 'Call',
            lines: ['8925269033', '9344882288'],
            accent: 'secondary',
        },
        {
            num: '03',
            label: 'Strategic Inquiries',
            tag: 'Email',
            lines: ['info@indiarussiaedu.org', 'support@znaine.org'],
            accent: 'primary',
        }
    ];

    return (
        <div className="contact-page">
            <Hero
                title="Connection"
                subtitle="The bridge to your global career starts here. Reach out to our institutional advisors for priority guidance on Indo-Russian educational pathways."
                heroBackgroundImage="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070"
                layout="apex"
                showStats={false}
                isInner={true}
            />

            {/* ═══ SECTION: CONNECTIVITY HUB — SPLIT-PANEL EDITORIAL ═══ */}
            <section className="chub-section">
                <div className="chub-split">
                    {/* Left: Dark Narrative Sidebar */}
                    <div className="chub-sidebar">
                        <div className="chub-sidebar-inner">
                            <span className="chub-sidebar-eyebrow">Institutional Access</span>
                            <h2 className="chub-sidebar-title">
                                Connectivity<br /><i>Hub</i>
                            </h2>
                            <p className="chub-sidebar-lead">
                                Multiple channels curated for direct engagement with our institutional
                                network. Select your preferred conduit.
                            </p>
                            <div className="chub-sidebar-stats">
                                <div className="chub-stat">
                                    <span className="chub-stat-val">3</span>
                                    <span className="chub-stat-label">Channels</span>
                                </div>
                                <div className="chub-stat">
                                    <span className="chub-stat-val">24h</span>
                                    <span className="chub-stat-label">Response</span>
                                </div>
                                <div className="chub-stat">
                                    <span className="chub-stat-val">1</span>
                                    <span className="chub-stat-label">Main HQ</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Matrix Grid */}
                    <div className="chub-matrix">
                        {contactChannels.map((ch, idx) => (
                            <RevealDiv key={idx} className={`chcard chcard--${ch.accent}`} delay={idx * 150}>
                                <div className="chcard-bg" />
                                <div className="chcard-content">
                                    <div className="chcard-header">
                                        <span className="chcard-num">{ch.num}</span>
                                        <span className="chcard-tag">{ch.tag}</span>
                                    </div>
                                    <h3 className="chcard-title">{ch.label}</h3>
                                    <div className="chcard-details">
                                        {ch.lines.map((line, i) => (
                                            <p key={i} className="chcard-detail">{line}</p>
                                        ))}
                                    </div>
                                    <div className="chcard-footer">
                                        <span className="chcard-action">Initialize Channel <span className="chcard-arrow">→</span></span>
                                    </div>
                                </div>
                            </RevealDiv>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ MAP SECTION ═══ */}
            <section className="pr-section pr-section-muted">
                <div className="container">
                    <div className="pr-header pr-header-center">
                        <span className="pr-eyebrow">Location Matrix</span>
                        <h2 className="pr-title">Visit Our Strategic <span className="pr-title-accent">Office</span></h2>
                        <p className="pr-subtitle">
                            Our headquarters is located in the Erode District of Tamil Nadu. We welcome institutional visits
                            by appointment for personalized consultations.
                        </p>
                    </div>

                    <RevealDiv className="pr-map-frame">
                        <iframe
                            title="Office Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15655.807907584166!2d77.8829566!3d11.0796791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9619629191e4b%3A0xe510f2292f7a0dc!2sKodumudi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1707660000000!5m2!1sen!2sin"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <div className="pr-map-badge">
                            <span className="pr-map-badge-dot"></span>
                            <span className="pr-map-badge-text">Kodumudi, Tamil Nadu</span>
                        </div>
                    </RevealDiv>
                </div>
            </section>
        </div>
    );
}

export default Contact;
