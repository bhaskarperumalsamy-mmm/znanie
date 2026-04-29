import type { Metadata } from "next";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery – Visual Journey Through ZNANIE",
  description:
    "Explore our curated visual gallery showcasing ZNANIE's educational programs, cultural events, campus life, and the vibrant India-Russia educational corridor.",
  keywords: [
    "ZNANIE gallery",
    "India Russia education photos",
    "Russian university campus",
    "cultural exchange images",
    "student life Russia",
  ],
  openGraph: {
    title: "Gallery – Visual Journey Through ZNANIE",
    description:
      "Explore our curated visual gallery showcasing ZNANIE's educational programs and cultural events.",
    url: "/gallery",
    images: [
      {
        url: "/images/zn_teaching.jpg",
        width: 1200,
        height: 630,
        alt: "ZNANIE Gallery",
      },
    ],
  },
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return <GalleryContent />;
}
