import React from 'react';
import Hero from '../components/Hero';
import './LegalPage.css';

function Disclaimer() {
    return (
        <div className="legal-page atmosphere-orbs">
            <Hero
                title="Legal | Disclaimer"
                subtitle="Institutional transparency. Highlighting the boundaries of our guidance and the independence of sovereign university decisions."
                heroBackgroundImage="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070"
                layout="perspective"
                eyebrow="Regulatory Framework"
                showStats={false}
                isInner={true}
            />

            <section className="section legal-content">
                <div className="container">
                    <div className="legal-container">
                        <article className="legal-article">
                            <h2>1. General Information</h2>
                            <p>
                                The information provided on this website is for general informational purposes only.
                                India-Russia Education & Cultural Exchange makes every effort to ensure the accuracy
                                of information but makes no warranties or representations regarding completeness,
                                accuracy, reliability, or availability.
                            </p>

                            <h2>2. Educational Guidance</h2>
                            <p>
                                Information about Russian universities, courses, fees, and admission processes is
                                based on our best knowledge and may change without notice. We recommend verifying
                                details directly with the respective institutions.
                            </p>

                            <h2>3. No Guarantee of Outcomes</h2>
                            <p>While we provide guidance and support, we cannot guarantee:</p>
                            <ul>
                                <li>Admission to any university</li>
                                <li>Visa approval or immigration outcomes</li>
                                <li>Employment or job placement</li>
                                <li>Specific language proficiency levels</li>
                            </ul>

                            <h2>4. Third-Party Links</h2>
                            <p>
                                Our website may contain links to external websites. We are not responsible for the
                                content, privacy policies, or practices of these third-party sites.
                            </p>

                            <h2>5. Testimonials and Success Stories</h2>
                            <p>
                                Testimonials and success stories represent individual experiences and may not
                                reflect typical results. Each student's journey depends on various factors
                                including personal effort, aptitude, and circumstances.
                            </p>

                            <h2>6. Changes to Information</h2>
                            <p>
                                University policies, visa regulations, course fees, and other information may
                                change at any time. We are not responsible for changes made by universities,
                                governments, or other third parties.
                            </p>

                            <h2>7. Professional Advice</h2>
                            <p>
                                Information on this website does not constitute professional legal, immigration,
                                or financial advice. Please consult appropriate professionals for specific advice
                                related to your situation.
                            </p>

                            <h2>8. Limitation of Liability</h2>
                            <p>
                                In no event shall India-Russia Education & Cultural Exchange be liable for any
                                direct, indirect, incidental, special, or consequential damages arising from the
                                use of our website or services.
                            </p>

                            <h2>9. Contact Us</h2>
                            <p>
                                If you have any questions about this Disclaimer, please contact us at:
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

export default Disclaimer;
