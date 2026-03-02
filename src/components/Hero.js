import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import './ZnanieHero.css';
import './HeroAcademy.css';
import './HeroEduFull.css';
import './HeroEduPrime.css';
function Hero({ title, subtitle, ctaButtons, heroBackgroundImage, layout = 'center', eyebrow, showStats = true, isInner = false, nodes, menuItems, hideMainBg = false }) {
    // Default background if none provided
    const bgStyle = heroBackgroundImage
        ? { backgroundImage: `url(${heroBackgroundImage})` }
        : { backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070')` }; // College Campus / Convocation

    const defaultMenuItems = [];
    const activeMenuItems = menuItems || defaultMenuItems;

    const contentClass = layout === 'left' || layout === 'split' ? 'hero-content-left' : 'hero-content-center';
    const buttonClass = layout === 'left' || layout === 'split' ? 'hero-buttons-left' : 'hero-buttons-center';

    // Special Rendering for Education Prime (Ultra-Premium)
    if (layout === 'edu-prime') {
        return (
            <section className={`hero-edu-prime ${isInner ? 'hero-inner' : ''}`}>
                <div className="hep-bg">
                    <div className="hep-bg-image" style={bgStyle}></div>
                    <div className="hep-noise"></div>
                    <div className="hep-gradient"></div>
                </div>

                <div className="hep-container">
                    <div className="hep-content">
                        <div className="hep-eyebrow-box">
                            <span className="hep-line"></span>
                            <span className="hep-eyebrow-text">{eyebrow || 'Institutions & International Relations'}</span>
                        </div>

                        <h1 className="hep-title">
                            {typeof title === 'string' && title.includes('.') ? (
                                title.split('.').filter(Boolean).map((word, i) => (
                                    <span key={i} className="hep-word">
                                        {word.trim()}<span className="hep-dot">.</span>
                                    </span>
                                ))
                            ) : (
                                <span className="hep-word">{title}</span>
                            )}
                        </h1>

                        <p className="hep-subtitle">{subtitle}</p>

                        <div className="hep-actions">
                            {ctaButtons && ctaButtons.length > 0 ? (
                                ctaButtons.map((btn, index) => (
                                    btn.href ? (
                                        <a
                                            key={index}
                                            href={btn.href}
                                            className={btn.variant === 'primary' ? 'hep-btn hep-btn-primary' : 'hep-btn hep-btn-outline'}
                                        >
                                            <span className="hep-btn-text">{btn.label}</span>
                                            {btn.variant === 'primary' && <span className="hep-btn-icon">↗</span>}
                                        </a>
                                    ) : (
                                        <Link
                                            key={index}
                                            to={btn.path}
                                            className={btn.variant === 'primary' ? 'hep-btn hep-btn-primary' : 'hep-btn hep-btn-outline'}
                                        >
                                            <span className="hep-btn-text">{btn.label}</span>
                                            {btn.variant === 'primary' && <span className="hep-btn-icon">↗</span>}
                                        </Link>
                                    )
                                ))
                            ) : (
                                <>
                                    <Link to="/study-in-russia" className="hep-btn hep-btn-primary">
                                        <span className="hep-btn-text">Discover Programs</span>
                                        <span className="hep-btn-icon">↗</span>
                                    </Link>
                                    <Link to="/contact" className="hep-btn hep-btn-outline">
                                        <span className="hep-btn-text">Contact Admissions</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Floating Education Info Cards */}
                    <div className="hep-floating-cards">
                        <div className="hep-glass-card hep-card-1">
                            <div className="hep-card-icon">🏛️</div>
                            <div className="hep-card-info">
                                <span className="hep-card-val">State Universities</span>
                                <span className="hep-card-lbl">Direct Admission</span>
                            </div>
                        </div>
                        <div className="hep-glass-card hep-card-2">
                            <div className="hep-card-icon">🎓</div>
                            <div className="hep-card-info">
                                <span className="hep-card-val">Global Degree</span>
                                <span className="hep-card-lbl">WHO & NMC Recognized</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="hep-scroll">
                    <div className="hep-mouse">
                        <div className="hep-wheel"></div>
                    </div>
                    <span className="hep-scroll-text">Scroll to explore</span>
                </div>
            </section>
        );
    }

    // Special Rendering for Education Full Background Layout
    if (layout === 'edu-full') {
        return (
            <section className={`hero-edu-full ${isInner ? 'hero-inner' : ''}`}>
                {/* Background Group */}
                <div className="hed-bg-wrapper">
                    <div className="hed-bg-image" style={bgStyle}></div>
                </div>
                <div className="hed-overlay"></div>

                {/* Floating Educational Icons */}
                <div className="hed-floating-elements">
                    <div className="hed-float-item hed-icon-1">🎓</div>
                    <div className="hed-float-item hed-icon-2">🌍</div>
                    <div className="hed-float-item hed-icon-3">📚</div>
                    <div className="hed-float-item hed-icon-4">🔬</div>
                </div>

                {/* Main Content */}
                <div className="hed-container">
                    <div className="hed-content">
                        <div className="hed-badge">
                            <span className="hed-badge-icon">🏛️</span>
                            <span className="hed-badge-text">{eyebrow || 'Global Education Network'}</span>
                        </div>

                        <h1 className="hed-title">
                            {typeof title === 'string' && title.includes('.') ? (
                                title.split('.').filter(Boolean).map((word, i, arr) => (
                                    <span key={i} className={i === 1 ? 'hed-highlight' : ''}>
                                        {word.trim()}{(i < arr.length || true) ? '.' : ''}
                                    </span>
                                ))
                            ) : (
                                <span>{title}</span>
                            )}
                        </h1>

                        <p className="hed-subtitle">{subtitle}</p>

                        <div className="hed-actions">
                            {ctaButtons && ctaButtons.length > 0 ? (
                                ctaButtons.map((btn, index) => (
                                    btn.href ? (
                                        <a
                                            key={index}
                                            href={btn.href}
                                            className={btn.variant === 'primary' ? 'hed-btn-primary' : 'hed-btn-glass'}
                                        >
                                            {btn.label}
                                        </a>
                                    ) : (
                                        <Link
                                            key={index}
                                            to={btn.path}
                                            className={btn.variant === 'primary' ? 'hed-btn-primary' : 'hed-btn-glass'}
                                        >
                                            {btn.label}
                                        </Link>
                                    )
                                ))
                            ) : (
                                <>
                                    <Link to="/study-in-russia" className="hed-btn-primary">
                                        Explore Programs
                                    </Link>
                                    <Link to="/contact" className="hed-btn-glass">
                                        Admissions
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Trust/Stats Bar at bottom */}
                {showStats && (
                    <div className="hed-trust-bar">
                        <div className="hed-trust-inner">
                            <div className="hed-trust-item">
                                <span className="hed-trust-icon">👥</span>
                                <div className="hed-trust-text">
                                    <span className="hed-trust-value">10,000+</span>
                                    <span className="hed-trust-label">Student Success</span>
                                </div>
                            </div>
                            <div className="hed-trust-item">
                                <span className="hed-trust-icon">🏛️</span>
                                <div className="hed-trust-text">
                                    <span className="hed-trust-value">25+</span>
                                    <span className="hed-trust-label">Top State Universities</span>
                                </div>
                            </div>
                            <div className="hed-trust-item">
                                <span className="hed-trust-icon">🌐</span>
                                <div className="hed-trust-text">
                                    <span className="hed-trust-value">Global</span>
                                    <span className="hed-trust-label">Recognition</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        );
    }

    // Special Rendering for Academy Layout (Best for Education)
    if (layout === 'academy') {
        return (
            <section className={`hero-academy ${isInner ? 'hero-inner' : ''}`}>
                <div className="ha-bg-grid"></div>
                <div className="ha-bg-glow"></div>

                <div className="ha-container">
                    <div className="ha-wrapper">
                        {/* Left Side */}
                        <div className="ha-content">
                            <div className="ha-eyebrow-wrap">
                                <span className="ha-eyebrow-dot"></span>
                                <span className="ha-eyebrow">{eyebrow || 'Institutions & International Relations'}</span>
                            </div>

                            <h1 className="ha-title">
                                {typeof title === 'string' && title.includes('.') ? (
                                    title.split('.').filter(Boolean).map((word, i) => (
                                        <React.Fragment key={i}>
                                            <span className={i === 1 ? 'ha-highlight' : ''}>
                                                {word.trim()}.
                                            </span>
                                            {' '}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <span className="ha-highlight">{title}</span>
                                )}
                            </h1>

                            <p className="ha-subtitle">{subtitle}</p>

                            <div className="ha-actions">
                                {ctaButtons && ctaButtons.length > 0 ? (
                                    ctaButtons.map((btn, index) => (
                                        btn.href ? (
                                            <a
                                                key={index}
                                                href={btn.href}
                                                className={btn.variant === 'primary' ? 'ha-btn-primary' : 'ha-btn-secondary'}
                                            >
                                                {btn.label}
                                                {btn.variant === 'primary' && <span className="ha-arrow">→</span>}
                                            </a>
                                        ) : (
                                            <Link
                                                key={index}
                                                to={btn.path}
                                                className={btn.variant === 'primary' ? 'ha-btn-primary' : 'ha-btn-secondary'}
                                            >
                                                {btn.label}
                                                {btn.variant === 'primary' && <span className="ha-arrow">→</span>}
                                            </Link>
                                        )
                                    ))
                                ) : (
                                    <>
                                        <Link to="/study-in-russia" className="ha-btn-primary">
                                            Explore Programs <span className="ha-arrow">→</span>
                                        </Link>
                                        <Link to="/contact" className="ha-btn-secondary">
                                            Admissions
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="ha-visual">
                            <div className="ha-image-wrap">
                                <img src={heroBackgroundImage || "/images/charlotte-may.jpg"} alt="Global Education" className="ha-image" />
                            </div>

                            {/* Floating Badges */}
                            <div className="ha-badge ha-badge-1">
                                <div className="ha-badge-icon">🏛️</div>
                                <div className="ha-badge-info">
                                    <h4>30+ Years</h4>
                                    <p>of Educational Excellence</p>
                                </div>
                            </div>

                            <div className="ha-badge ha-badge-2">
                                <div className="ha-badge-icon">🌍</div>
                                <div className="ha-badge-info">
                                    <h4>Global</h4>
                                    <p>Student Community</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Special Rendering for Znanie Custom Layout
    if (layout === 'znanie') {
        const displayNodes = nodes || [];
        return (
            <section className={`hero-znanie-layout ${isInner ? 'hero-inner' : ''}`}>
                <div className="zh-background">
                    <div className="zh-bg-image" style={bgStyle}></div>
                    <div className="zh-overlay"></div>
                    <div className="zh-gradient-sphere"></div>
                </div>

                <div className="zh-container">
                    <div className="zh-grid">
                        <div className="zh-content">
                            <div className="zh-badge">
                                <span className="zh-badge-dot"></span>
                                {eyebrow || 'S.I. Vavilov Foundation "Znanie"'}
                            </div>

                            <h1 className="zh-title">
                                {title && title.split('.').filter(Boolean).map((word, i, arr) => (
                                    <span key={i} className="zh-title-word">
                                        {word.trim()}{(i < arr.length || true) ? '.' : ''}
                                    </span>
                                ))}
                            </h1>

                            <div className="zh-divider"></div>

                            <p className="zh-subtitle">{subtitle}</p>

                            <div className="zh-actions">
                                <Link to="/study-in-russia" className="zh-btn-primary">
                                    Begin Your Journey <span className="zh-arrow">→</span>
                                </Link>
                                <Link to="/contact" className="zh-btn-glass">
                                    Partnership Enquiry
                                </Link>
                            </div>
                        </div>

                        {/* Right side visual nodes */}
                        <div className="zh-visual">
                            <div className="zh-glass-panel">
                                <div className="zh-panel-header">
                                    <span className="zh-panel-title">Our Pillars of Impact</span>
                                </div>
                                <div className="zh-nodes">
                                    {displayNodes.map((node, i) => (
                                        <div key={i} className="zh-node-item">
                                            <div className="zh-node-icon">{node.icon}</div>
                                            <div className="zh-node-text">{node.text}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="zh-panel-footer">
                                    <span className="zh-pulse"></span>
                                    <span>Active Global Network</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Special Rendering for Split Layout
    if (layout === 'split') {
        return (
            <section className={`hero-split-layout ${isInner ? 'hero-inner' : ''}`}>
                <div className="hero-split-content">
                    <div className="hero-split-inner">
                        <h1 className="hero-title">{title}</h1>
                        <p className="hero-subtitle">{subtitle}</p>
                        {ctaButtons && ctaButtons.length > 0 && (
                            <div className={buttonClass}>
                                {ctaButtons.map((btn, index) => (
                                    btn.href ? (
                                        <a
                                            key={index}
                                            href={btn.href}
                                            className={btn.variant === 'primary' ? 'btn-primary-glow' : 'btn-outline-glass'}
                                        >
                                            {btn.label}
                                        </a>
                                    ) : (
                                        <Link
                                            key={index}
                                            to={btn.path}
                                            className={btn.variant === 'primary' ? 'btn-primary-glow' : 'btn-outline-glass'}
                                        >
                                            {btn.label}
                                        </Link>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="hero-split-image-wrapper">
                    <div className="hero-split-img" style={bgStyle}></div>
                </div>
            </section>
        );
    }

    // Special Rendering for Kinetic Layout (New Premium Ultra-Modern)
    if (layout === 'kinetic') {
        return (
            <section className={`hero-kinetic-layout ${isInner ? 'hero-inner' : ''}`} style={bgStyle}>
                <div className="hero-kinetic-overlay"></div>

                {/* Decorative floating glass shards */}
                <div className="kinetic-shard shard-1"></div>
                <div className="kinetic-shard shard-2"></div>
                <div className="kinetic-shard shard-3"></div>

                <div className="hero-container">
                    <div className="hero-kinetic-content">
                        <div className="hero-eyebrow-container">
                            <span className="hero-eyebrow-line"></span>
                            <span className="hero-eyebrow">{eyebrow || "Excellence in Global Harmony"}</span>
                            <span className="hero-eyebrow-line"></span>
                        </div>

                        <h1 className="hero-title kinetic-title">
                            {title.split(' ').map((word, i) => (
                                <span key={i} className="kinetic-word">{word} </span>
                            ))}
                        </h1>

                        <p className="hero-subtitle kinetic-subtitle">{subtitle}</p>

                        {ctaButtons && ctaButtons.length > 0 && (
                            <div className="hero-buttons-center kinetic-buttons">
                                {ctaButtons.map((btn, index) => (
                                    btn.href ? (
                                        <a
                                            key={index}
                                            href={btn.href}
                                            className={btn.variant === 'primary' ? 'btn-kinetic-primary' : 'btn-kinetic-glass'}
                                        >
                                            {btn.label}
                                            {btn.variant === 'primary' && <span className="btn-arrow">→</span>}
                                        </a>
                                    ) : (
                                        <Link
                                            key={index}
                                            to={btn.path}
                                            className={btn.variant === 'primary' ? 'btn-kinetic-primary' : 'btn-kinetic-glass'}
                                        >
                                            {btn.label}
                                            {btn.variant === 'primary' && <span className="btn-arrow">→</span>}
                                        </Link>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="kinetic-scroll-indicator">
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                    <div className="scroll-arrows">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </section>
        );
    }

    // Special Rendering for Glass Card Layout (New Premium View)
    if (layout === 'glass') {
        return (
            <section className={`hero-glass-layout ${isInner ? 'hero-inner' : ''}`} style={bgStyle}>
                <div className="hero-glass-overlay"></div>
                <div className="hero-container">
                    <div className="hero-glass-card">
                        <div className="hero-glass-content">
                            <span className="hero-eyebrow">{eyebrow || "Institutions & International Relations"}</span>
                            <h1 className="hero-title">{title}</h1>
                            <p className="hero-subtitle">{subtitle}</p>
                            {ctaButtons && ctaButtons.length > 0 && (
                                <div className="hero-buttons-left">
                                    {ctaButtons.map((btn, index) => (
                                        btn.href ? (
                                            <a
                                                key={index}
                                                href={btn.href}
                                                className={btn.variant === 'primary' ? 'btn-primary-glow' : 'btn-outline-light'}
                                            >
                                                {btn.label}
                                            </a>
                                        ) : (
                                            <Link
                                                key={index}
                                                to={btn.path}
                                                className={btn.variant === 'primary' ? 'btn-primary-glow' : 'btn-outline-light'}
                                            >
                                                {btn.label}
                                            </Link>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Special Rendering for Monolith Layout (Architectural / High-End Editorial)
    if (layout === 'monolith') {
        return (
            <section className={`hero-monolith-layout ${isInner ? 'hero-inner' : ''}`}>
                <div className="monolith-bg-wrap">
                    <div className="monolith-img" style={bgStyle}></div>
                    <div className="monolith-overlay"></div>
                </div>

                <div className="hero-container monolith-container">
                    <div className="monolith-content">
                        <div className="monolith-header">
                            <div className="monolith-line"></div>
                            <span className="monolith-eyebrow">{eyebrow || "Institutions & International Relations"}</span>
                        </div>

                        <h1 className="hero-title monolith-title">
                            {title.split(' ').map((word, i) => (
                                <span key={i} className="monolith-word-wrap">
                                    <span className="monolith-word">{word}</span>
                                </span>
                            ))}
                        </h1>

                        <div className="monolith-footer">
                            <p className="hero-subtitle monolith-subtitle">{subtitle}</p>

                            {ctaButtons && ctaButtons.length > 0 && (
                                <div className="monolith-actions">
                                    {ctaButtons.map((btn, index) => (
                                        btn.href ? (
                                            <a
                                                key={index}
                                                href={btn.href}
                                                className={btn.variant === 'primary' ? 'btn-monolith-primary' : 'btn-monolith-outline'}
                                            >
                                                {btn.label}
                                                <span className="btn-monolith-icon">→</span>
                                            </a>
                                        ) : (
                                            <Link
                                                key={index}
                                                to={btn.path}
                                                className={btn.variant === 'primary' ? 'btn-monolith-primary' : 'btn-monolith-outline'}
                                            >
                                                {btn.label}
                                                <span className="btn-monolith-icon">→</span>
                                            </Link>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Decorative Side Pillar */}
                    <div className="monolith-side-nav">
                        <div className="monolith-nav-item active">01 <span className="nav-dot"></span></div>
                        <div className="monolith-nav-item">02 <span className="nav-dot"></span></div>
                        <div className="monolith-nav-item">03 <span className="nav-dot"></span></div>
                        <div className="monolith-nav-label">EXPLORE THE FUTURE</div>
                    </div>
                </div>

                {/* Bottom Brand Strip */}
                {showStats && (
                    <div className="monolith-brand-strip">
                        <div className="brand-stat">
                            <span className="brand-stat-num">25+</span>
                            <span className="brand-stat-lbl">Partner Universities</span>
                        </div>
                        <div className="brand-stat">
                            <span className="brand-stat-num">10k+</span>
                            <span className="brand-stat-lbl">Student Success</span>
                        </div>
                        <div className="brand-stat">
                            <span className="brand-stat-num">50+</span>
                            <span className="brand-stat-lbl">Cultural Events</span>
                        </div>
                    </div>
                )}
            </section>
        );
    }

    // Special Rendering for Aura Layout (Premium Mesh / Fluid Design)
    if (layout === 'aura') {
        return (
            <section className={`hero-aura-layout ${isInner ? 'hero-inner' : ''}`}>
                {/* Mesh Gradient Background */}
                <div className="aura-bg">
                    <div className="aura-blob aura-blob-1"></div>
                    <div className="aura-blob aura-blob-2"></div>
                    <div className="aura-blob aura-blob-3"></div>
                </div>

                <div className="hero-container aura-container">
                    <div className="aura-glass-card">
                        <div className="aura-content">
                            <span className="aura-eyebrow">{eyebrow || "A Vision for Global Unity"}</span>
                            <h1 className="hero-title aura-title">{title}</h1>
                            <div className="aura-divider"></div>
                            <p className="hero-subtitle aura-subtitle">{subtitle}</p>

                            {ctaButtons && ctaButtons.length > 0 && (
                                <div className="aura-actions">
                                    {ctaButtons.map((btn, index) => (
                                        btn.href ? (
                                            <a
                                                key={index}
                                                href={btn.href}
                                                className={btn.variant === 'primary' ? 'btn-aura-primary' : 'btn-aura-outline'}
                                            >
                                                {btn.label}
                                            </a>
                                        ) : (
                                            <Link
                                                key={index}
                                                to={btn.path}
                                                className={btn.variant === 'primary' ? 'btn-aura-primary' : 'btn-aura-outline'}
                                            >
                                                {btn.label}
                                            </Link>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Floating Decorative Elements */}
                    <div className="aura-floating-orb aura-orb-1"></div>
                    <div className="aura-floating-orb aura-orb-2"></div>
                </div>

                {/* Bottom Trust Indicators */}
                {showStats && (
                    <div className="aura-trust-bar">
                        <div className="container">
                            <div className="aura-trust-inner">
                                <div className="trust-item">
                                    <span className="trust-icon">🏛️</span>
                                    <span>Premier Partnerships</span>
                                </div>
                                <div className="trust-sep"></div>
                                <div className="trust-item">
                                    <span className="trust-icon">🌍</span>
                                    <span>Global Recognition</span>
                                </div>
                                <div className="trust-sep"></div>
                                <div className="trust-item">
                                    <span className="trust-icon">🎓</span>
                                    <span>Expert Mentorship</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        );
    }

    // Special Rendering for Duality Layout (Symbolic / Connecting Two Worlds)
    if (layout === 'duality') {
        return (
            <section className={`hero-duality-layout ${isInner ? 'hero-inner' : ''}`}>
                <div className="duality-halves">
                    <div className="duality-half duality-left">
                        <div className="duality-img" style={bgStyle}></div>
                    </div>
                    <div className="duality-half duality-right">
                        <div className="duality-img" style={bgStyle}></div>
                    </div>
                </div>

                <div className="duality-overlay"></div>

                <div className="hero-container duality-container">
                    <div className="duality-content">
                        <div className="duality-badge-row">
                            <span className="duality-badge flag-in">India</span>
                            <span className="duality-badge-sep">×</span>
                            <span className="duality-badge flag-ru">Russia</span>
                        </div>

                        <h1 className="hero-title duality-title">
                            <span className="title-top">{title.split(' ').slice(0, 2).join(' ')}</span>
                            <span className="title-bottom">{title.split(' ').slice(2).join(' ')}</span>
                        </h1>

                        <p className="hero-subtitle duality-subtitle">{subtitle}</p>

                        {ctaButtons && ctaButtons.length > 0 && (
                            <div className="duality-actions">
                                {ctaButtons.map((btn, index) => (
                                    btn.href ? (
                                        <a
                                            key={index}
                                            href={btn.href}
                                            className={btn.variant === 'primary' ? 'btn-duality-primary' : 'btn-duality-outline'}
                                        >
                                            {btn.label}
                                        </a>
                                    ) : (
                                        <Link
                                            key={index}
                                            to={btn.path}
                                            className={btn.variant === 'primary' ? 'btn-duality-primary' : 'btn-duality-outline'}
                                        >
                                            {btn.label}
                                        </Link>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Decorative Central Line */}
                <div className="duality-axis">
                    <div className="axis-node top"></div>
                    <div className="axis-line"></div>
                    <div className="axis-node bottom"></div>
                </div>
            </section>
        );
    }

    // Special Rendering for Paramount Layout (The "Ultimate" Cinematic/Editorial View)
    if (layout === 'paramount') {
        return (
            <section className="hero-paramount-layout">
                {/* Immersive Background with Ken Burns Effect */}
                <div className="paramount-bg-container">
                    <div className="paramount-bg" style={bgStyle}></div>
                    <div className="paramount-overlay"></div>
                    <div className="paramount-grain"></div>
                </div>

                <div className="hero-container paramount-container">
                    <div className="paramount-content">
                        <div className="paramount-eyebrow-wrap">
                            <span className="paramount-eyebrow">{eyebrow || "A Legacy of Excellence"}</span>
                        </div>

                        <h1 className="hero-title paramount-title">
                            {title.split(' ').map((word, i) => (
                                <span key={i} className="paramount-span">{word} </span>
                            ))}
                        </h1>

                        <p className="hero-subtitle paramount-subtitle">{subtitle}</p>

                        {ctaButtons && ctaButtons.length > 0 && (
                            <div className="paramount-actions">
                                {ctaButtons.map((btn, index) => (
                                    btn.href ? (
                                        <a
                                            key={index}
                                            href={btn.href}
                                            className={btn.variant === 'primary' ? 'btn-paramount-primary' : 'btn-paramount-glass'}
                                        >
                                            {btn.label}
                                        </a>
                                    ) : (
                                        <Link
                                            key={index}
                                            to={btn.path}
                                            className={btn.variant === 'primary' ? 'btn-paramount-primary' : 'btn-paramount-glass'}
                                        >
                                            {btn.label}
                                        </Link>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Floating "Lens" Cards - Cinematic Detail */}
                <div className="paramount-lens-cards">
                    <div className="lens-card">
                        <span className="lens-icon">🏛️</span>
                        <div className="lens-info">
                            <strong>Global Access</strong>
                            <p>Direct entry to top-tier state universities.</p>
                        </div>
                    </div>
                    <div className="lens-card">
                        <span className="lens-icon">💎</span>
                        <div className="lens-info">
                            <strong>Elite Training</strong>
                            <p>Native speakers & professional mentors.</p>
                        </div>
                    </div>
                </div>

                {/* Vertical Progress/Status bar */}
                <div className="paramount-scroll-hint">
                    <span className="scroll-text">BEGIN YOUR ODYSSEY</span>
                    <div className="scroll-bar">
                        <div className="scroll-fill"></div>
                    </div>
                </div>
            </section>
        );
    }

    // Special Rendering for Perspective Layout (Inner Page Elite / High Readability)
    if (layout === 'perspective') {
        const titleParts = typeof title === 'string' && title.includes('|') ? title.split('|').map(s => s.trim()) : [title];

        return (
            <section className={`hero-perspective-layout ${isInner ? 'hero-inner' : ''}`}>
                <div className="perspective-bg-canvas">
                    <div className="perspective-img" style={bgStyle}></div>
                    <div className="perspective-overlay"></div>
                </div>

                <div className="hero-container perspective-container">
                    <div className="perspective-card">
                        <div className="perspective-content">
                            {eyebrow && (
                                <div className="perspective-eyebrow-wrap">
                                    <span className="perspective-eyebrow">{eyebrow}</span>
                                    <div className="perspective-eyebrow-line"></div>
                                </div>
                            )}

                            <h1 className="perspective-title">
                                {titleParts.length > 1 ? (
                                    <>
                                        <span className="part-light">{titleParts[0]}</span>
                                        <span className="part-bold">{titleParts[1]}</span>
                                    </>
                                ) : (
                                    <span className="part-bold">{title}</span>
                                )}
                            </h1>

                            <div className="perspective-divider"></div>

                            <p className="hero-subtitle perspective-subtitle">
                                {subtitle}
                            </p>

                            {ctaButtons && ctaButtons.length > 0 && (
                                <div className="perspective-actions">
                                    {ctaButtons.map((btn, index) => (
                                        btn.href ? (
                                            <a
                                                key={index}
                                                href={btn.href}
                                                className={btn.variant === 'primary' ? 'btn-perspective-primary' : 'btn-perspective-outline'}
                                            >
                                                {btn.label}
                                                <span className="btn-icon">→</span>
                                            </a>
                                        ) : (
                                            <Link
                                                key={index}
                                                to={btn.path}
                                                className={btn.variant === 'primary' ? 'btn-perspective-primary' : 'btn-perspective-outline'}
                                            >
                                                {btn.label}
                                                <span className="btn-icon">→</span>
                                            </Link>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="perspective-side-branding">
                    <span className="side-text">ESTABLISHED 1998</span>
                    <div className="side-line"></div>
                    <span className="side-text">GLOBAL UNITY</span>
                </div>

                {/* Aesthetic Atmosphere Orbs */}
                <div className="hp-branding-blob"></div>
                <div className="hp-branding-blob-alt"></div>
            </section>
        );
    }

    // Special Rendering for Paramount Layout (Cinematic / Full-Monolith / Editorial)
    if (layout === 'paramount') {
        return (
            <section className={`hero-paramount ${isInner ? 'hero-inner' : ''}`}>
                <div className="paramount-bg" style={bgStyle}>
                    <div className="paramount-overlay"></div>
                    <div className="paramount-noise"></div>
                </div>

                <div className="container paramount-container">
                    <div className="paramount-content">
                        {eyebrow && <span className="paramount-eyebrow">{eyebrow}</span>}
                        <h1 className="paramount-title">
                            {typeof title === 'string' && title.includes('|') ? (
                                <>
                                    <span className="p-thin">{title.split('|')[0]}</span>
                                    <span className="p-heavy">{title.split('|')[1]}</span>
                                </>
                            ) : title}
                        </h1>
                        <div className="paramount-divider">
                            <div className="d-line"></div>
                            <div className="d-notch"></div>
                            <div className="d-line"></div>
                        </div>
                        <p className="paramount-subtitle">{subtitle}</p>

                        <div className="paramount-actions">
                            <div className="p-scroll-indicator">
                                <div className="indicator-dot"></div>
                                <span className="indicator-text">Sovereign Mission</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="paramount-side-tag">INSTITUTIONAL // LEDGER</div>
                <div className="paramount-bottom-meta">
                    <div className="m-group">
                        <span className="m-label">COORDINATES</span>
                        <span className="m-value">MSK-DEL // BILATERAL</span>
                    </div>
                    <div className="m-divider"></div>
                    <div className="m-group">
                        <span className="m-label">MISSION_STATUS</span>
                        <span className="m-value">ACTIVE_DEPLOYMENT</span>
                    </div>
                </div>
            </section>
        );
    }

    // Special Rendering for Apex Layout (Futuristic / Orbital / Minimalist)
    if (layout === 'apex') {
        const defaultNodes = [
            { icon: '🎓', text: 'Education' },
            { icon: '🌏', text: 'Culture' },
            { icon: '🚀', text: 'Career' }
        ];
        const displayNodes = nodes || defaultNodes;

        return (
            <section className={`hero-apex-layout ${isInner ? 'hero-inner' : ''}`}>
                <div className="apex-bg-layer" style={hideMainBg ? {} : bgStyle}></div>
                <div className="apex-grid-overlay"></div>

                <div className="hero-container apex-container">
                    {/* The Central Orbital Focal Point */}
                    <div className="apex-orbital">
                        <div className="apex-circle-bg"></div>
                        <div className="apex-circle-img" style={bgStyle}></div>
                        <div className="apex-scanner-line"></div>

                        {/* Orbiting Info nodes */}
                        {displayNodes.map((node, idx) => (
                            <div key={idx} className={`apex-node node-${idx + 1} ${!node.text ? 'icon-only' : ''}`}>
                                <span className="node-icon">{node.icon}</span>
                                {node.text && <span className="node-text">{node.text}</span>}
                            </div>
                        ))}
                    </div>

                    <div className="apex-content elite-frame">
                        <div className="elite-core">
                            {eyebrow && <span className="elite-eyebrow">{eyebrow}</span>}
                            <div className="elite-title-wrap">
                                <h1 className="hero-title elite-title">
                                    {typeof title === 'string' && title.includes('|') ? (
                                        <>
                                            <span className="elite-light">{title.split('|')[0]}</span>
                                            <br />
                                            <span className="elite-bold">{title.split('|')[1]}</span>
                                        </>
                                    ) : title}
                                </h1>
                                <div className="elite-title-line"></div>
                            </div>

                            <div className="elite-narrative">
                                <p className="hero-subtitle elite-subtitle">
                                    {subtitle}
                                </p>
                            </div>
                        </div>

                        {isInner && activeMenuItems.length > 0 && (
                            <div className="hero-inpage-menu">
                                {activeMenuItems.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <span className="menu-item">{item.label}</span>
                                        {index < activeMenuItems.length - 1 && <div className="menu-dot"></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Prestige Anchors */}
                    <div className="elite-anchors">
                        <div className="elite-anchor">
                            <span className="anchor-dot"></span>
                            <span className="anchor-txt">Academic Excellence</span>
                        </div>
                        <div className="elite-anchor">
                            <span className="anchor-dot"></span>
                            <span className="anchor-txt">Diplomatic Synergy</span>
                        </div>
                    </div>

                    {/* Refined Actions */}
                    {ctaButtons && ctaButtons.length > 0 && (
                        <div className="elite-actions">
                            {ctaButtons.map((btn, index) => (
                                btn.href ? (
                                    <a
                                        key={index}
                                        href={btn.href}
                                        className={btn.variant === 'primary' ? 'btn-elite-solid' : 'btn-elite-outline'}
                                    >
                                        {btn.label}
                                    </a>
                                ) : (
                                    <Link
                                        key={index}
                                        to={btn.path}
                                        className={btn.variant === 'primary' ? 'btn-elite-solid' : 'btn-elite-outline'}
                                    >
                                        {btn.label}
                                    </Link>
                                )
                            ))}
                        </div>
                    )}
                </div>
                {/* Side Coordinates / Meta */}
                <div className="apex-side-info">
                    <div className="info-block">
                        <small>LAT / LONG</small>
                        <span>55.7558° N, 37.6173° E</span>
                    </div>
                </div>
            </section>
        );
    }

    // Default Layouts (Center / Left Overlay)
    return (
        <section className={`hero ${isInner ? 'hero-inner' : ''}`} style={bgStyle}>
            <div className="hero-overlay-gradient"></div>

            <div className="hero-container">
                <div className={contentClass}>
                    {eyebrow && <span className="hero-eyebrow">{eyebrow}</span>}
                    <h1 className="hero-title">{title}</h1>
                    <p className="hero-subtitle">{subtitle}</p>
                    {ctaButtons && ctaButtons.length > 0 && (
                        <div className={buttonClass}>
                            {ctaButtons.map((btn, index) => (
                                btn.href ? (
                                    <a
                                        key={index}
                                        href={btn.href}
                                        className={btn.variant === 'primary' ? 'btn-primary-glow' : 'btn-outline-glass'}
                                    >
                                        {btn.label}
                                    </a>
                                ) : (
                                    <Link
                                        key={index}
                                        to={btn.path}
                                        className={btn.variant === 'primary' ? 'btn-primary-glow' : 'btn-outline-glass'}
                                    >
                                        {btn.label}
                                    </Link>
                                )
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Hero;
