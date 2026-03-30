import type { Metadata } from "next";
import CareerContent from "./CareerContent";

export const metadata: Metadata = {
  title: "Careers – Join the ZNANIE Team",
  description:
    "Explore career opportunities at ZNANIE Foundation. Join our team of education counsellors, Russian language instructors, and student relations managers shaping the future of India-Russia education.",
  keywords: [
    "ZNANIE careers",
    "education jobs India",
    "Russian language instructor jobs",
    "India Russia education careers",
    "ZNANIE hiring",
    "education counsellor jobs",
  ],
  openGraph: {
    title: "Careers at ZNANIE – Become a Guide for Learners",
    description:
      "Join ZNANIE Foundation and help shape the future of India-Russia education. Explore open roles in admissions, education, student services, and marketing.",
    url: "/career",
    images: [
      {
        url: "/images/martin-adams.jpg",
        width: 1200,
        height: 630,
        alt: "Careers at ZNANIE Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at ZNANIE – Become a Guide for Learners",
    description:
      "Join ZNANIE Foundation and help shape the future of India-Russia education.",
    images: ["/images/martin-adams.jpg"],
  },
  alternates: {
    canonical: "/career",
  },
};

export default function CareerPage() {
  return <CareerContent />;
}
