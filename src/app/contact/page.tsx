import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us – Get in Touch with ZNANIE",
  description:
    "Have questions about studying in Russia or learning Russian? Contact ZNANIE Foundation for university admissions, language courses, visa assistance, and more. We respond within 24 hours.",
  keywords: [
    "contact ZNANIE",
    "study in Russia enquiry",
    "ZNANIE phone number",
    "India Russia education contact",
    "university admission enquiry",
    "Russian language course enquiry",
  ],
  openGraph: {
    title: "Contact ZNANIE – We're Here to Help",
    description:
      "Reach out to ZNANIE Foundation for university admissions, language courses, visa assistance, and more.",
    url: "/contact",
    images: [
      {
        url: "/images/chris-montgomery.jpg",
        width: 1200,
        height: 630,
        alt: "Contact ZNANIE Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact ZNANIE – We're Here to Help",
    description:
      "Reach out to ZNANIE Foundation for university admissions, language courses, visa assistance, and more.",
    images: ["/images/chris-montgomery.jpg"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
