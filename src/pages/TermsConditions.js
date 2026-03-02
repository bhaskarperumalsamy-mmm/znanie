import React from 'react';
import Hero from '../components/Hero';
import './LegalPage.css';

function TermsConditions() {
    return (
        <div className="legal-page atmosphere-orbs">
            <Hero
                title="Terms | & Conditions"
                subtitle="The official framework governing our services, commitments, and institutional relationships."
                heroBackgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070"
                layout="perspective"
                eyebrow="Last updated: Feb 2026"
                showStats={false}
                isInner={true}
            />

            <section className="section legal-content">
                <div className="container">
                    <div className="legal-container">
                        <article className="legal-article">
                            <h2>1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using the services of India-Russia Education & Cultural Exchange,
                                you agree to be bound by these Terms and Conditions. If you do not agree with any
                                part of these terms, please do not use our services.
                            </p>

                            <h2>2. Services Offered</h2>
                            <p>We provide the following services:</p>
                            <ul>
                                <li>Russian language courses (online and offline)</li>
                                <li>Educational counselling for studying in Russia</li>
                                <li>University admission assistance</li>
                                <li>Visa guidance and documentation support</li>
                                <li>Career placement services</li>
                                <li>Cultural exchange programs</li>
                            </ul>

                            <h2>3. Enrollment and Fees</h2>
                            <ul>
                                <li>Course fees must be paid as per the payment schedule</li>
                                <li>Fees are non-refundable except as specified in our Refund Policy</li>
                                <li>We reserve the right to modify fees with prior notice</li>
                                <li>Students must provide accurate information during enrollment</li>
                            </ul>

                            <h2>4. Student Responsibilities</h2>
                            <p>Students agree to:</p>
                            <ul>
                                <li>Attend classes regularly and complete assignments</li>
                                <li>Maintain respectful behavior towards instructors and peers</li>
                                <li>Provide accurate documentation for university applications</li>
                                <li>Comply with visa and immigration requirements</li>
                                <li>Keep login credentials confidential (for online courses)</li>
                            </ul>

                            <h2>5. Intellectual Property</h2>
                            <p>
                                All course materials, content, and resources provided are the intellectual property
                                of India-Russia Education & Cultural Exchange. Students may not reproduce, distribute,
                                or share these materials without written permission.
                            </p>

                            <h2>6. Limitation of Liability</h2>
                            <p>
                                While we strive to provide accurate information and quality services, we are not
                                liable for:
                            </p>
                            <ul>
                                <li>University admission decisions</li>
                                <li>Visa rejections or immigration issues</li>
                                <li>Changes in university policies or fees</li>
                                <li>Employment outcomes</li>
                            </ul>

                            <h2>7. Termination</h2>
                            <p>
                                We reserve the right to terminate services for any student who violates these
                                terms or engages in fraudulent or inappropriate behavior.
                            </p>

                            <h2>8. Governing Law</h2>
                            <p>
                                These terms are governed by the laws of India. Any disputes shall be subject to
                                the exclusive jurisdiction of courts in New Delhi.
                            </p>

                            <h2>9. Contact Information</h2>
                            <p>
                                For questions about these Terms & Conditions, please contact us at:
                            </p>
                            <p>
                                <strong>Email:</strong> legal@indiarussiaedu.org<br />
                                <strong>Phone:</strong> +91 123 456 7890
                            </p>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default TermsConditions;
