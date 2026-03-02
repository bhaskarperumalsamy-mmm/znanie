import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
        setActiveDropdown(null);
    }, [location]);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about-us', label: 'About Us' },
        { path: '/why-choose-us', label: 'Why Choose Us' },
        {
            label: 'Study in Russia',
            dropdown: [
                { path: '/study-in-russia', label: 'Study in Russia' },
                { path: '/russian-language-courses', label: 'Russian Language Courses' },
            ]
        },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <header className={`header-dock-wrap ${isScrolled ? 'dock-scrolled' : ''}`}>
            <div className="header-dock">
                <div className="dock-left">
                    <Link to="/" className="logo-dock">
                        <img src="/znaine-logo.png" alt="ZNAINE" className="logo-img" />
                    </Link>
                </div>

                <nav className={`nav-dock ${isMenuOpen ? 'nav-open' : ''}`}>
                    <ul className="nav-list-dock">
                        {navLinks.map((link, index) => (
                            <li
                                key={index}
                                className={`nav-item-dock ${link.dropdown ? 'has-dropdown' : ''}`}
                                onMouseEnter={() => link.dropdown && setActiveDropdown(index)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                {link.dropdown ? (
                                    <>
                                        <span className="nav-link-dock nav-link-dropdown">
                                            {link.label}
                                            <svg className="dropdown-arrow-dock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M6 9l6 6 6-6" />
                                            </svg>
                                        </span>
                                        <ul className={`dropdown-card ${activeDropdown === index ? 'dropdown-active' : ''}`}>
                                            {link.dropdown.map((subLink, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link to={subLink.path} className="dropdown-link-premium">{subLink.label}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <Link
                                        to={link.path}
                                        className={`nav-link-dock ${location.pathname === link.path ? 'nav-active-dock' : ''}`}
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="dock-actions">
                    <button
                        className={`dock-menu-toggle ${isMenuOpen ? 'menu-open' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
