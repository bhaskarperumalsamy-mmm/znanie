import type { Metadata } from "next";
import StudyInRussiaContent from "./StudyInRussiaContent";

export const metadata: Metadata = {
  title: "Study in Russia – World-Class Education for Indian Students",
  description:
    "Discover world-class education in Russia with ZNANIE. MBBS, Engineering, MBA, Computer Science, and more. 50+ partner universities, 98% visa success rate. WHO & NMC recognised degrees.",
  keywords: [
    "study in Russia",
    "MBBS Russia Indian students",
    "Russian universities admission",
    "engineering in Russia",
    "MBA Russia",
    "study abroad Russia India",
    "medical education Russia",
    "ZNANIE study programs",
    "Russian university scholarships",
    "computer science Russia",
  ],
  openGraph: {
    title: "Study in Russia – World-Class Education with ZNANIE",
    description:
      "50+ partner universities, 5000+ students placed, 98% visa success rate. Discover MBBS, Engineering, MBA and more in Russia.",
    url: "/study-in-russia",
    images: [
      {
        url: "/images/zn_class_education.jpg",
        width: 1200,
        height: 630,
        alt: "Study in Russia with ZNANIE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study in Russia – World-Class Education with ZNANIE",
    description:
      "50+ partner universities, 5000+ students placed, 98% visa success rate.",
    images: ["/images/jarmoluk-library.jpg"],
  },
  alternates: {
    canonical: "/study-in-russia",
  },
};

export default function CoursesPage() {
  return <StudyInRussiaContent />;
}
