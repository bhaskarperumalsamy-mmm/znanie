import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import KeyPersons from './pages/KeyPersons';
import WhyChooseUs from './pages/WhyChooseUs';
import RussianLanguageCourses from './pages/RussianLanguageCourses';
import StudyInRussia from './pages/StudyInRussia';
import JobsInRussia from './pages/JobsInRussia';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import RefundPolicy from './pages/RefundPolicy';
import DonationPolicy from './pages/DonationPolicy';
import Disclaimer from './pages/Disclaimer';

function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/key-persons" element={<KeyPersons />} />
                    <Route path="/why-choose-us" element={<WhyChooseUs />} />
                    <Route path="/russian-language-courses" element={<RussianLanguageCourses />} />
                    <Route path="/study-in-russia" element={<StudyInRussia />} />
                    <Route path="/jobs-in-russia" element={<JobsInRussia />} />
                    <Route path="/donate" element={<Donate />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-conditions" element={<TermsConditions />} />
                    <Route path="/refund-policy" element={<RefundPolicy />} />
                    <Route path="/donation-policy" element={<DonationPolicy />} />
                    <Route path="/disclaimer" element={<Disclaimer />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
