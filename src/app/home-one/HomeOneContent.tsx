"use client";

import { HeroSectionThree } from '@/components/sections/HeroSectionThree';
import { IndiaRussiaEnter } from '@/components/sections/IndiaRussiaEnter';
import { PreservingKnowledge } from '@/components/sections/PreservingKnowledge';
import { PartnershipBorders } from '@/components/sections/PartnershipBorders';
import { StrategicCards } from '@/components/sections/StrategicCards';
import { IndiaRussiaStats } from '@/components/sections/IndiaRussiaStats';
import { WhyRussia } from '@/components/sections/WhyRussia';
import { LanguageMastery } from '@/components/sections/LanguageMastery';
import { SixPillars } from '@/components/sections/SixPillars';
import { FeaturedUniversities } from '@/components/sections/FeaturedUniversities';
import { SuccessStories } from '@/components/sections/SuccessStories';
import { ProgramsMarquee } from '@/components/sections/ProgramsMarquee';

import { motion } from 'framer-motion';

const ScrollReveal = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default function HomeOneContent() {
  return (
    <>
      <HeroSectionThree
        title={<>Grow your skills <br />build your <span className="rt-text-yellow">future</span></>}
        description="Start your learning path with expert-led programs designed to elevate skills and accelerate success."
        imageSrc="/images/startup-stock.jpg"
      />

      <IndiaRussiaEnter />

      <PreservingKnowledge />

      <PartnershipBorders />

      <WhyRussia />

      <ScrollReveal>
        <LanguageMastery />
      </ScrollReveal>

      <StrategicCards />

      <ScrollReveal>
        <SixPillars />
      </ScrollReveal>

      <ScrollReveal>
        <FeaturedUniversities />
      </ScrollReveal>

      <ScrollReveal>
        <SuccessStories />
      </ScrollReveal>

      <ProgramsMarquee />

    </>
  );
}
