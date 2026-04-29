import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { SplitContent } from '@/components/sections/SplitContent';
import { CategoryCards } from '@/components/sections/CategoryCards';
import { TestimonialSlider } from '@/components/sections/TestimonialSlider';
import { CTABanner } from '@/components/sections/CTABanner';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About Us (Alternate)',
  description: 'Learn about our vision, goals, and dedication to bridging India and Russia through education.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AboutPage() {
  const values = [
    {
      id: '1',
      title: 'Accessibility',
      subtitle: 'For everyone',
      description: 'Learning made easy for every Indian student, anytime, anywhere — from Tier 1 cities to rural India.',
    },
    {
      id: '2',
      title: 'Affordability',
      subtitle: 'Best value',
      description: 'World-class Russian education at a fraction of the cost of Western alternatives.',
    },
    {
      id: '3',
      title: 'Credibility',
      subtitle: 'Recognised degrees',
      description: 'All partner universities are WHO & MCI recognised, ensuring global career validity.',
    },
    {
      id: '4',
      title: 'Personalisation',
      subtitle: 'Your path',
      description: 'Customised guidance tailored to each student\'s goals, background, and budget.',
    },
  ];

  const testimonials = [
    {
      id: '1',
      quote: 'Professional, responsive, and genuinely caring. They understood our needs perfectly and the outcome surpassed expectations.',
      name: 'Avinash Narnaware',
      role: 'Medical Student, Kazan Federal University',
      imageSrc: '/images/avinash-narnaware.jpg',
    },
    {
      id: '2',
      quote: 'From start to finish, everything was seamless. Great attention to detail and a strong sense of what students need.',
      name: 'Charlotte May',
      role: 'Language Graduate, Moscow',
      imageSrc: '/images/charlotte-may.jpg',
    },
    {
      id: '3',
      quote: 'We are over the moon with the entire experience. The admission process was handled brilliantly.',
      name: 'Sunil Chandra Sharma',
      role: 'Parent, Delhi',
      imageSrc: '/images/sunil-chandra-sharma.jpg',
    },
  ];

  return (
    <>
      <HeroSection
        imageSrc="/images/learning_woman2.jpg"
        tag="ESSENCE OF GROWTH"
        title="Real dedication fuels your ongoing progress"
        description="Empowering Indian students with the knowledge, support, and connections they need to transform their future through education in Russia."
        primaryCtaText="Start your journey"
        primaryCtaHref="/study-in-russia"
      />

      <SplitContent
        tag="LEARNING MADE SIMPLE"
        title={<>Experience infinite learning and <span className="text-primary">endless growth</span></>}
        description="Empowering learners worldwide with flexible, expert-led support and education designed to enhance skills, boost careers, and inspire lifelong learning through an interactive, engaging, and accessible platform."
        imageSrc="/images/studying-together.jpg"
        imageAlt="Students learning together"
        imageLeft
        lightBg
        features={[
          { title: 'Expert-led guidance', description: 'Gain practical knowledge through lessons focused on real-world applications.' },
          { title: 'Global certificates', description: 'Earn globally recognised degrees from accredited Russian universities.' },
          { title: 'Learn today', description: 'Start your journey towards a world-class education today.' },
        ]}
        ctaText="Explore programs"
        ctaHref="/study-in-russia"
      />

      <section className={styles.learningPaths}>
        <div className="container">
          <SectionHeader
            tag="STRUCTURED FOR SUCCESS"
            title={<>Learning paths built for <span className="text-primary">your success</span></>}
            subtitle="Discover structured programs tailored to your goals, guiding you step by step toward mastery and lasting career success."
            align="center"
          />

          <div className={styles.pathsGrid}>
            {[
              { step: '01', title: 'Choose Your Goal', desc: 'Pick from language learning, university admission, or career guidance programs.' },
              { step: '02', title: 'Get a Custom Plan', desc: 'Our advisors will build a roadmap tailored to your background and aspirations.' },
              { step: '03', title: 'Start Learning', desc: 'Access online courses, study materials, and mentorship at your own pace.' },
              { step: '04', title: 'Achieve Your Dream', desc: 'Graduate, get placed, or advance your career with our ongoing support.' },
            ].map((p) => (
              <div key={p.step} className={styles.pathCard}>
                <div className={styles.pathStep}>{p.step}</div>
                <h3 className={styles.pathTitle}>{p.title}</h3>
                <p className={styles.pathDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CategoryCards
        tag="UNITED WE STRIVE"
        title={<>What makes <span className="text-primary">Znaine</span> different</>}
        categories={values}
      />

      <SplitContent
        tag="BECOME A MENTOR"
        title={<>Inspire the next <span className="text-primary">generation</span> of learners</>}
        description="Your experience can change lives. Mentor passionate students, share your insights about studying or working in Russia, and watch them grow into confident achievers."
        imageSrc="/images/boris-busorgi.jpg"
        imageAlt="Mentor teaching"
        ctaText="Start teaching today"
        ctaHref="/why-choose-us"
      />

      <TestimonialSlider
        tag="STUDENT SUCCESS STORIES"
        title={<>What our <span className="text-primary">students</span> say about us</>}
        testimonials={testimonials}
      />

      <CTABanner
        title="Ready to start your Russia journey?"
        description="Take the first step today. Our expert team is ready to guide you through every stage — from choosing a university to arriving in Russia."
        ctaText="Contact us now"
        ctaHref="/contact"
      />
    </>
  );
}
