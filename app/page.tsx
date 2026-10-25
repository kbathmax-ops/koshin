import type { Metadata } from "next";
import { HomeClient } from "./home-client";

export const metadata: Metadata = {
  title: { absolute: "Koshin Bathmax" },
  description:
    "Branding contractor for venture capital firms. Identity, website redesigns, and visual systems that signal thesis and attract founders.",
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
    "Branding contractor for US VC firms. Specializing in identity and homepage redesigns that clarify thesis and improve founder inbound.",
  knowsAbout: [
    "VC branding",
    "Brand identity",
    "Website redesign",
    "Fintech VC",
    "Emerging managers",
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
