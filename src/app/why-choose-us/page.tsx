import type { Metadata } from "next";
import WhyChooseUsContent from "./WhyChooseUsContent";

export const metadata: Metadata = {
  title: "Why Choose Us – Your Gateway to World-Class Education",
  description:
    "Discover why ZNANIE is the trusted non-profit bridging India and Russia through education. India–Russia focused mission, certified trainers, end-to-end university guidance, and 100% financial transparency.",
  keywords: [
    "why choose ZNANIE",
    "ZNANIE advantages",
    "India Russia education non-profit",
    "transparent education consulting",
    "ZNANIE vs other agencies",
    "best study abroad Russia agency",
    "ZNANIE Foundation pillars",
    "ethical education consulting",
  ],
  openGraph: {
    title: "Why Choose ZNANIE – Your Gateway to World-Class Education",
    description:
      "India–Russia focused mission, certified trainers, end-to-end university guidance, and 100% financial transparency.",
    url: "/why-choose-us",
    images: [
      {
        url: "/images/women-pointing.jpg",
        width: 1200,
        height: 630,
        alt: "Why Choose ZNANIE Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Choose ZNANIE – Your Gateway to World-Class Education",
    description:
      "India–Russia focused mission, certified trainers, end-to-end guidance, and 100% transparency.",
    images: ["/images/women-pointing.jpg"],
  },
  alternates: {
    canonical: "/why-choose-us",
  },
};

export default function WhyChooseUsPage() {
  return <WhyChooseUsContent />;
}
