import type { Metadata } from "next";
import { HomeClient } from "./home-client";

export const metadata: Metadata = {
  title: { absolute: "Koshin Bathmax" },
  description:
    "Koshin Bathmax: changing how people see brands & solo-travelling when I can. On a gap year from Queen's University, rebranding VC firms & startups and creating content.",
  alternates: { canonical: "https://kbathmax.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Koshin Bathmax",
  url: "https://kbathmax.com",
  sameAs: [
    "https://github.com/koshinbathmax",
    "https://www.linkedin.com/in/koshinbathmax/",
  ],
  description:
    "Changing how people see brands & solo-travelling when I can. On a gap year from Queen's University, rebranding VC firms & startups and creating content.",
  knowsAbout: [
    "Brand design",
    "Rebranding",
    "Content creation",
    "Startup growth",
    "Next.js",
    "Claude API",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
