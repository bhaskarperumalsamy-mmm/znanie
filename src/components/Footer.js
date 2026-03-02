import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const registryLinks = [
        { label: 'About Us', path: '/about-us' },
        { label: 'Why Choose Us', path: '/why-choose-us' },
        { label: 'Study in Russia', path: '/study-in-russia' },
        { label: 'Russian Language Courses', path: '/russian-language-courses' },
    ];

    return (
        <footer className="landmark-footer">


            <div className="container">
                <div className="landmark-grid">
                    {/* Brand Identity Pillar */}
                    <div className="landmark-brand">
                        <div className="landmark-logo-wrap">
                            <img src="/znaine-logo.png" alt="Znanie Foundation" className="landmark-logo" />
                            <div className="landmark-logo-text">
                                <span className="landmark-prefix">S.I. VAVILOV FOUNDATION</span>
                                <h2 className="landmark-title">ZNANIE</h2>
                            </div>
                        </div>
                        <p className="landmark-manifesto">
                            Architecting bilateral harmony through strategic knowledge synthesis. Since 1991,
                            facilitating the transition of academic excellence between India and Russia.
                        </p>
                        <div className="hub-secure">
                            <span className="secure-val">contact@znanie-vavilova.org</span>
                        </div>
                    </div>

                    {/* Navigational Ledger */}
                    <div className="landmark-nav">
                        <span className="landmark-label">Institutional Registry</span>
                        <ul className="landmark-menu">
                            {registryLinks.map((link, i) => (
                                <li key={i}>
                                    <Link to={link.path}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Hub */}
                    <div className="landmark-hubs">
                        <span className="landmark-label">Global Hubs</span>
                        <div className="hub-unit">
                            <span className="hub-city">ERODE</span>
                            <span className="hub-role">Regional Strategic Hub</span>
                        </div>
                    </div>
                </div>

                {/* Protocol Strip */}
                <div className="landmark-bottom">
                    <div className="landmark-sep" />
                    <div className="landmark-protocol">
                        <div className="landmark-copyright">
                            © 2026 S.I. VAVILOV FOUNDATION.
                        </div>
                        <div className="landmark-legal">
                            <Link to="/privacy-policy">Privacy Protocol</Link>
                            <span className="legal-sep">|</span>
                            <Link to="/terms-conditions">Terms of Engagement</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
