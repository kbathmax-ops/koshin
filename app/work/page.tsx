import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { FadeUp } from "@/components/fade-up";
import { ContactSection } from "@/components/contact-section";
import { SelectedWorks } from "@/components/selected-works";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "work",
  description:
    "Vibecoded builds, writing, design, and more. Here's what I can do. Let's move mountains together",
  openGraph: {
    title: "work | Koshin Bathmax",
    description:
      "Vibecoded builds, writing, design, and more. Here's what I can do. Let's move mountains together",
    url: "https://kbathmax.com/work",
  },
  alternates: { canonical: "https://kbathmax.com/work" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Work by Koshin Bathmax",
  description: "Builds and design work by Koshin Bathmax.",
  itemListElement: [
    {
      "@type": "SoftwareApplication",
      position: 1,
      name: "Toronto Cafe Roulette",
      description: "A roulette of Toronto coffee shops to discover the city & your next coffee chat.",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
    },
    {
      "@type": "SoftwareApplication",
      position: 2,
      name: "Chimp and Human",
      description:
        "3D simulator of the viral chimp vs human fight built with the help of GPT-6 Astra.",
      applicationCategory: "SimulationApplication",
      operatingSystem: "Web",
      url: "https://chimpvshuman.space",
    },
    {
      "@type": "SoftwareApplication",
      position: 3,
      name: "detour",
      description:
        "A Chrome extension that hides Google Flights itineraries connecting through the US.",
      applicationCategory: "TravelApplication",
      operatingSystem: "Chrome",
      url: "https://detour-landing-roan.vercel.app",
    },
  ],
};

/**
 * Brand work is still being built in private. Set SHOW_BRAND_WORK=true in
 * .env.local to see it in dev; it stays off (and out of the client bundle)
 * everywhere it isn't set, so nothing ships to production.
 */
const SHOW_BRAND_WORK = process.env.SHOW_BRAND_WORK === "true";

export default function WorkPage() {
  return (
    <div style={{ background: 'var(--paper)', minHeight: '100dvh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      {/* ── Builds, then design pieces ── */}
      <SelectedWorks />

      <main className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 md:space-y-32 pt-16 md:pt-24 pb-32">

        {/* ── Brand work — in progress, private until it's ready ── */}
        {SHOW_BRAND_WORK && (
          <section id="brand-work" className="scroll-mt-28">
            <FadeUp>
              <h2
                className="font-medium text-4xl md:text-5xl tracking-tighter mb-3"
                style={{ fontFamily: "var(--font-display)", color: 'var(--ink)' }}
              >
                Brand work
              </h2>
              <p className="text-base max-w-xl leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.70)' }}>
                Marketing, content, and growth work for brands. In progress.
              </p>
            </FadeUp>
          </section>
        )}

        {/* ── Contact ── */}
        <ContactSection
          heading="Looking to work somewhere that creates a true mark in their industry."
          body="Looking into design, product, and engineering."
        />
      </main>

      <SiteFooter paper />
    </div>
  );
}
