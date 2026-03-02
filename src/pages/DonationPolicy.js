import React from 'react';
import Hero from '../components/Hero';
import './LegalPage.css';

function DonationPolicy() {
    return (
        <div className="legal-page atmosphere-orbs">
            <Hero
                title="Donation | Policy"
                subtitle="Ethical philanthropy. Understand our institutional commitment to the transparent and impactful use of every contribution."
                heroBackgroundImage="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070"
                layout="perspective"
                eyebrow="Non-Profit Transparency"
                showStats={false}
                isInner={true}
            />

            <section className="section legal-content">
                <div className="container">
                    <div className="legal-container">
                        <article className="legal-article">
                            <h2>1. Our Commitment</h2>
                            <p>
                                India-Russia Education & Cultural Exchange is a registered non-profit organization
                                committed to transparency and ethical use of all donations. We ensure that your
                                contributions directly support educational initiatives and student welfare.
                            </p>

                            <h2>2. Types of Donations</h2>
                            <h3>2.1 One-Time Donations</h3>
                            <p>
                                Make a single contribution of any amount. All one-time donations are immediately
                                processed and allocated to our programs.
                            </p>

                            <h3>2.2 Recurring Donations</h3>
                            <p>
                                Become a regular supporter with monthly or annual contributions. Recurring donors
                                receive priority updates on the impact of their contributions.
                            </p>

                            <h3>2.3 Cause-Specific Donations</h3>
                            <p>
                                Direct your donation to specific causes such as student scholarships, language
                                education for underprivileged students, or study abroad support.
                            </p>

                            <h2>3. Use of Funds</h2>
                            <p>Your donations are used for:</p>
                            <ul>
                                <li>Student scholarships and financial aid</li>
                                <li>Russian language course materials and resources</li>
                                <li>Teacher training and development</li>
                                <li>Cultural exchange program expenses</li>
                                <li>Administrative costs (limited to 15% of donations)</li>
                            </ul>

                            <h2>4. Tax Benefits</h2>
                            <p>
                                Donations to our organization are eligible for tax benefits under Section 80G
                                of the Income Tax Act. Donors will receive an official receipt for tax purposes.
                            </p>

                            <h2>5. Privacy of Donors</h2>
                            <p>
                                We respect donor privacy. Personal and financial information is kept confidential
                                and used only for donation processing and communication purposes.
                            </p>

                            <h2>6. Refund of Donations</h2>
                            <p>
                                Donations are generally non-refundable as they are immediately allocated to programs.
                                However, refunds may be considered for:
                            </p>
                            <ul>
                                <li>Duplicate or erroneous transactions</li>
                                <li>Fraudulent use of payment credentials</li>
                                <li>Technical errors resulting in incorrect amounts</li>
                            </ul>

                            <h2>7. Transparency and Reporting</h2>
                            <p>We provide:</p>
                            <ul>
                                <li>Annual financial reports on our website</li>
                                <li>Quarterly impact updates to regular donors</li>
                                <li>Individual acknowledgment and receipts for all donations</li>
                            </ul>

                            <h2>8. Contact Us</h2>
                            <p>
                                For donation-related inquiries, please contact:
                            </p>
                            <p>
                                <strong>Email:</strong> donations@indiarussiaedu.org<br />
                                <strong>Phone:</strong> +91 123 456 7890
                            </p>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DonationPolicy;
