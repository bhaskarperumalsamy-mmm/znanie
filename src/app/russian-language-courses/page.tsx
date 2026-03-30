import type { Metadata } from "next";
import RussianCoursesContent from "./RussianCoursesContent";

export const metadata: Metadata = {
  title: "Russian Language Courses – Beginner to Advanced Fluency",
  description:
    "Master the Russian language with ZNANIE's online courses. From beginner basics to advanced fluency, our certified programs prepare you for study, work, and life in Russia.",
  keywords: [
    "Russian language course",
    "learn Russian online",
    "Russian language for beginners",
    "Russian language certification",
    "ZNANIE Russian courses",
    "Russian fluency program",
    "Russian language India",
    "online Russian classes",
  ],
  openGraph: {
    title: "Russian Language Courses – Master Russian with ZNANIE",
    description:
      "From beginner basics to advanced fluency — certified Russian language programs designed for study, work, and life in Russia.",
    url: "/russian-language-courses",
    images: [
      {
        url: "/images/freestocks.jpg",
        width: 1200,
        height: 630,
        alt: "Russian Language Courses by ZNANIE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Russian Language Courses – Master Russian with ZNANIE",
    description:
      "From beginner basics to advanced fluency — certified Russian language programs.",
    images: ["/images/freestocks.jpg"],
  },
  alternates: {
    canonical: "/russian-language-courses",
  },
};

export default function BlogPage() {
  return <RussianCoursesContent />;
}
