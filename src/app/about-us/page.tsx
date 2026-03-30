import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us – Our Mission, Heritage & Vision",
  description:
    "Learn about ZNANIE Foundation's 30+ year journey bridging India and Russia through education and cultural exchange. Established in 1991, we champion transparency, equality, and lifelong learning.",
  keywords: [
    "ZNANIE about us",
    "ZNANIE Foundation history",
    "India Russia cultural exchange",
    "S.I. Vavilov Foundation",
    "education non-profit Russia",
    "ZNANIE mission",
  ],
  openGraph: {
    title: "About ZNANIE – Bridging Cultures, Building Futures",
    description:
      "Discover our 30+ year journey championing education, transparency, and bilateral excellence between India and Russia.",
    url: "/about-us",
    images: [
      {
        url: "/images/wikiimages.jpg",
        width: 1200,
        height: 630,
        alt: "ZNANIE Foundation Heritage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About ZNANIE – Bridging Cultures, Building Futures",
    description:
      "Discover our 30+ year journey championing education, transparency, and bilateral excellence between India and Russia.",
    images: ["/images/wikiimages.jpg"],
  },
  alternates: {
    canonical: "/about-us",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
