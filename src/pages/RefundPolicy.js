import React from 'react';
import Hero from '../components/Hero';
import './LegalPage.css';

function RefundPolicy() {
    return (
        <div className="legal-page atmosphere-orbs">
            <Hero
                title="Refund | Policy"
                subtitle="Transparent financial pathways. Learn about our institutional commitment to fair and structured refund processes."
                heroBackgroundImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011"
                layout="perspective"
                eyebrow="Financial Transparency"
                showStats={false}
                isInner={true}
            />

            <section className="section legal-content">
                <div className="container">
                    <div className="legal-container">
                        <article className="legal-article">
                            <h2>1. Overview</h2>
                            <p>
                                This Refund Policy outlines the terms and conditions for requesting refunds
                                for courses and services provided by India-Russia Education & Cultural Exchange.
                            </p>

                            <h2>2. Course Fee Refunds</h2>
                            <h3>2.1 Before Course Commencement</h3>
                            <ul>
                                <li>Full refund if cancellation is made 15+ days before course start</li>
                                <li>75% refund if cancellation is made 7-14 days before course start</li>
                                <li>50% refund if cancellation is made within 7 days of course start</li>
                            </ul>

                            <h3>2.2 After Course Commencement</h3>
                            <ul>
                                <li>25% refund within the first week of classes</li>
                                <li>No refund after the first week of classes</li>
                            </ul>

                            <h2>3. Counselling and Guidance Fees</h2>
                            <ul>
                                <li>Initial consultation fees are non-refundable</li>
                                <li>University application fees are non-refundable once applications are submitted</li>
                                <li>If visa is rejected, processing fees are non-refundable, but service fees may be
                                    partially refunded on a case-by-case basis</li>
                            </ul>

                            <h2>4. Exceptions</h2>
                            <p>Full or partial refunds may be considered in cases of:</p>
                            <ul>
                                <li>Medical emergencies (with valid documentation)</li>
                                <li>Course cancellation by the organization</li>
                                <li>Natural disasters or unforeseen circumstances</li>
                                <li>Other exceptional circumstances at management discretion</li>
                            </ul>

                            <h2>5. Refund Process</h2>
                            <ol>
                                <li>Submit a written refund request to refunds@indiarussiaedu.org</li>
                                <li>Include your enrollment details and reason for refund</li>
                                <li>Attach supporting documents if applicable</li>
                                <li>Requests are processed within 15 business days</li>
                                <li>Approved refunds are credited within 7-10 business days</li>
                            </ol>

                            <h2>6. Non-Refundable Items</h2>
                            <p>The following are strictly non-refundable:</p>
                            <ul>
                                <li>Registration and processing fees</li>
                                <li>Study materials already provided</li>
                                <li>Certificate issuance fees</li>
                                <li>Third-party fees (university fees, visa fees, etc.)</li>
                            </ul>

                            <h2>7. Contact Us</h2>
                            <p>
                                For refund inquiries, please contact:
                            </p>
                            <p>
                                <strong>Email:</strong> refunds@indiarussiaedu.org<br />
                                <strong>Phone:</strong> +91 123 456 7890
                            </p>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default RefundPolicy;
