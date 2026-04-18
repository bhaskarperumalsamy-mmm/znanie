import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Home – Grow Your Skills, Build Your Future",
  description:
    "Start your learning path with expert-led programs designed to elevate skills and accelerate success. ZNANIE connects Indian students with world-class Russian education opportunities.",
  keywords: [
    "ZNANIE home",
    "study in Russia",
    "India Russia education",
    "Russian universities",
    "career growth Russia",
  ],
  openGraph: {
    title: "ZNANIE – Grow Your Skills, Build Your Future",
    description:
      "Start your learning path with expert-led programs designed to elevate skills and accelerate success.",
    url: "/home",
    images: [
      {
        url: "/images/startup-stock.jpg",
        width: 1200,
        height: 630,
        alt: "ZNANIE – India-Russia Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZNANIE – Grow Your Skills, Build Your Future",
    description:
      "Start your learning path with expert-led programs designed to elevate skills and accelerate success.",
    images: ["/images/startup-stock.jpg"],
  },
  alternates: {
    canonical: "/home",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
