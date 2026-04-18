import type { Metadata } from "next";
import { Inter, Lexend, DM_Sans } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_URL = "https://znaine.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "India-Russia Education & Cultural Exchange | ZNANIE",
    template: "%s | ZNANIE",
  },
  description:
    "ZNANIE bridges the gap between certified academic proficiency and elite professional opportunities in the Russia-India corridor. Study in Russia, learn Russian, and build your global career.",
  keywords: [
    "Study in Russia",
    "MBBS in Russia",
    "Russian language courses",
    "India Russia education",
    "ZNANIE",
    "Znaine",
    "Russian universities",
    "study abroad Russia",
    "India Russia cultural exchange",
    "Russian language online",
    "medical education Russia",
    "engineering in Russia",
  ],
  authors: [{ name: "ZNANIE Foundation" }],
  creator: "ZNANIE Foundation",
  publisher: "ZNANIE Foundation",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "ZNANIE – India-Russia Education & Cultural Exchange",
    title: "India-Russia Education & Cultural Exchange | ZNANIE",
    description:
      "ZNANIE bridges the gap between certified academic proficiency and elite professional opportunities in the Russia-India corridor.",
  },
  twitter: {
    card: "summary_large_image",
    title: "India-Russia Education & Cultural Exchange | ZNANIE",
    description:
      "ZNANIE bridges the gap between certified academic proficiency and elite professional opportunities in the Russia-India corridor.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/images/znaine-favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lexend.variable} ${dmSans.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}