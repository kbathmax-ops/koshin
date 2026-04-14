import type { Metadata } from "next";
import { HomeClient } from "./home-client";

export const metadata: Metadata = {
  title: "Koshin — Student Developer & AI Builder",
  description:
    "Portfolio of Koshin — 17-year-old student developer building AI-powered travel software, sanctions research tools, and B2B SaaS with Next.js and Claude API.",
  alternates: { canonical: "https://portfolio-koshin2.vercel.app" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Koshin",
  url: "https://portfolio-koshin2.vercel.app",
  sameAs: ["https://github.com/koshinbathmax"],
  jobTitle: "Student Developer & Founder",
  description:
    "17-year-old developer and student founder building AI-powered travel software, sanctions research tools, and B2B SaaS platforms.",
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "Claude API",
    "AI Agent Architecture",
    "Full-stack Development",
    "Supabase",
    "Stripe",
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
