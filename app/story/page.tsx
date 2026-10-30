import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { StoryHero } from "@/components/story-hero";
import { SelectedWorks } from "@/components/selected-works";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "story",
  alternates: { canonical: "https://kbathmax.com/story" },
};

/* Lives here rather than on "/" because the root redirects to this page, so
   this is what search engines actually index. */
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

export default function Story() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <SmoothScroll />
      <div style={{ background: "#ffffff", minHeight: "100dvh", color: "var(--ink)" }}>
        <StoryHero />

        <div id="work" className="scroll-mt-28" style={{ background: "var(--paper)" }}>
          <SelectedWorks />

          <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-32">
            <ContactSection
              heading="Helping US VC firms look as sharp as their thesis."
              body="Identity, homepage redesigns, and visual systems for emerging and sector-focused funds."
            />
          </div>
        </div>

        <SiteFooter />
      </div>
    </>
  );
}
