import type { Metadata } from "next";
import HomeOneContent from "./HomeOneContent";

export const metadata: Metadata = {
  title: "Home (Alternate)",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HomePage() {
  return <HomeOneContent />;
}
