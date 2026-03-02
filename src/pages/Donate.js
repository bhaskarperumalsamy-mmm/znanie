import React from 'react';
import Hero from '../components/Hero';
import './Donate.css';

function Donate() {
    const causes = [
        { icon: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=150&h=150&fit=crop', title: 'Sponsor a Student', description: 'Help a deserving student complete their education in Russia', amount: 'From ₹10,000' },
        { icon: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=150&h=150&fit=crop', title: 'Russian Language Education', description: 'Support language training for underprivileged students', amount: 'From ₹5,000' },
        { icon: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=150&h=150&fit=crop', title: 'Study Abroad Support', description: 'Help students with travel, visa, and initial settlement costs', amount: 'From ₹25,000' },
    ];

    const donationOptions = [
        { type: 'One-Time', description: 'Make a single contribution', amounts: ['₹1,000', '₹5,000', '₹10,000', '₹25,000'] },
        { type: 'Monthly', description: 'Become a regular supporter', amounts: ['₹500/mo', '₹1,000/mo', '₹2,500/mo', '₹5,000/mo'] },
    ];

    return (
        <div className="donate-page atmosphere-orbs">
            <Hero
                title="Contributions | Supporting Success"
                subtitle="Your contribution supports education, cultural exchange, and opportunities for deserving students across the Sovereign corridor."
                heroBackgroundImage="https://images.unsplash.com/photo-1532629345422-7515f3d16bb8?q=80&w=2070"
                layout="perspective"
                eyebrow="Donor Transparency Portal"
                isInner={true}
            />

            <section className="section donate-why">
                <div className="container">
                    <div className="why-content">
                        <div className="why-text">
                            <h2 className="section-title text-left">Why Donate</h2>
                            <p className="why-description">
                                Education is the most powerful tool for changing lives and building a peaceful world.
                                By supporting our organization, you help talented students from underprivileged
                                backgrounds access quality education and career opportunities.
                            </p>
                            <p className="why-description">
                                Every contribution, no matter the size, makes a difference in someone's life.
                                Your donation directly supports student scholarships, language training programs,
                                and cultural exchange initiatives.
                            </p>
                            <div className="why-features">
                                <div className="why-feature">
                                    <span className="feature-check">✓</span>
                                    <span>100% of donations go to student support</span>
                                </div>
                                <div className="why-feature">
                                    <span className="feature-check">✓</span>
                                    <span>Tax benefits under Section 80G</span>
                                </div>
                                <div className="why-feature">
                                    <span className="feature-check">✓</span>
                                    <span>Regular impact reports to donors</span>
                                </div>
                            </div>
                        </div>
                        <div className="why-image">
                            <img
                                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop"
                                alt="Students studying together in a university"
                                className="donate-image"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section donate-causes">
                <div className="container">
                    <h2 className="section-title">Support a Cause</h2>
                    <p className="section-subtitle">
                        Choose how you want to make an impact
                    </p>
                    <div className="causes-grid">
                        {causes.map((cause, index) => (
                            <DonationCard
                                key={index}
                                icon={cause.icon}
                                title={cause.title}
                                description={cause.description}
                                amount={cause.amount}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section donate-options">
                <div className="container">
                    <h2 className="section-title">Donation Options</h2>
                    <div className="options-grid">
                        {donationOptions.map((option, index) => (
                            <div key={index} className="option-card">
                                <h3 className="option-type">{option.type} Donation</h3>
                                <p className="option-description">{option.description}</p>
                                <div className="option-amounts">
                                    {option.amounts.map((amount, i) => (
                                        <button key={i} className="amount-btn">{amount}</button>
                                    ))}
                                </div>
                                <button className="btn btn-primary option-submit">Donate Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section donate-transparency">
                <div className="container">
                    <div className="transparency-content">
                        <div className="transparency-icon">🔒</div>
                        <h2 className="transparency-title">Our Transparency Promise</h2>
                        <p className="transparency-description">
                            We are committed to ethical fund usage, complete accountability, and regular impact reporting.
                            As a registered non-profit organization, we maintain transparent financial records
                            and provide regular updates to all donors on how their contributions are being utilized.
                        </p>
                        <div className="transparency-badges">
                            <div className="badge">✓ Registered NGO</div>
                            <div className="badge">✓ Audited Accounts</div>
                            <div className="badge">✓ 80G Tax Exempt</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Donate;
