import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { StoryPageClient } from "@/components/story-page-client";

export const metadata: Metadata = {
  title: { absolute: "Koshin Bathmax" },
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
    "Building beautiful things.",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <StoryPageClient />
    </>
  );
}
