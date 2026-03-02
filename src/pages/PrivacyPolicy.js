import React from 'react';
import Hero from '../components/Hero';
import './LegalPage.css';

function PrivacyPolicy() {
    return (
        <div className="legal-page atmosphere-orbs">
            <Hero
                title="Privacy | Policy"
                subtitle="Your data security is our institutional priority. Learn how we safeguard your information across our global network."
                heroBackgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029"
                layout="perspective"
                eyebrow="Data Protection Standards"
                showStats={false}
                isInner={true}
            />

            <section className="section legal-content">
                <div className="container">
                    <div className="legal-container">
                        <article className="legal-article">
                            <h2>1. Introduction</h2>
                            <p>
                                India-Russia Education & Cultural Exchange ("we," "our," or "us") is committed to protecting
                                your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                                information when you visit our website or use our services.
                            </p>

                            <h2>2. Information We Collect</h2>
                            <h3>2.1 Personal Information</h3>
                            <p>We may collect personal information that you voluntarily provide to us, including:</p>
                            <ul>
                                <li>Name and contact information (email, phone number, address)</li>
                                <li>Educational background and academic records</li>
                                <li>Passport and visa details (for study abroad services)</li>
                                <li>Payment information for donations or course fees</li>
                                <li>Any other information you choose to provide</li>
                            </ul>

                            <h3>2.2 Automatically Collected Information</h3>
                            <p>When you visit our website, we may automatically collect:</p>
                            <ul>
                                <li>IP address and browser type</li>
                                <li>Device information</li>
                                <li>Pages visited and time spent</li>
                                <li>Referral sources</li>
                            </ul>

                            <h2>3. How We Use Your Information</h2>
                            <p>We use the information we collect to:</p>
                            <ul>
                                <li>Provide and improve our services</li>
                                <li>Process applications and enrollments</li>
                                <li>Communicate with you about our programs</li>
                                <li>Send newsletters and updates (with your consent)</li>
                                <li>Process donations and issue receipts</li>
                                <li>Comply with legal obligations</li>
                            </ul>

                            <h2>4. Information Sharing</h2>
                            <p>
                                We do not sell your personal information. We may share your information with:
                            </p>
                            <ul>
                                <li>Partner universities for admission purposes</li>
                                <li>Government authorities for visa processing</li>
                                <li>Service providers who assist our operations</li>
                                <li>As required by law or legal process</li>
                            </ul>

                            <h2>5. Data Security</h2>
                            <p>
                                We implement appropriate security measures to protect your personal information.
                                However, no method of transmission over the internet is 100% secure.
                            </p>

                            <h2>6. Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul>
                                <li>Access your personal information</li>
                                <li>Correct inaccurate information</li>
                                <li>Request deletion of your data</li>
                                <li>Opt-out of marketing communications</li>
                            </ul>

                            <h2>7. Contact Us</h2>
                            <p>
                                If you have questions about this Privacy Policy, please contact us at:
                            </p>
                            <p>
                                <strong>Email:</strong> privacy@indiarussiaedu.org<br />
                                <strong>Phone:</strong> +91 123 456 7890<br />
                                <strong>Address:</strong> 123, Education Plaza, Connaught Place, New Delhi - 110001
                            </p>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default PrivacyPolicy;
