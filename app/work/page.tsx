import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { FadeUp } from "@/components/fade-up";
import { ContactForm } from "@/components/contact-form";
import { SelectedWorks } from "@/components/selected-works";
import { designWork } from "@/lib/design-work";
import { projects } from "@/lib/projects";

/* Anything with nowhere to send people sinks to the end of the grid, so the
   cards a visitor can actually click come first. Sorted rather than hand-
   ordered, so a project that gains a URL moves up on its own. */
const visibleProjects = projects
  .filter((p) => !p.hidden)
  .sort((a, b) => Number(Boolean(b.liveUrl)) - Number(Boolean(a.liveUrl)));


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
      name: "Chimp and Human",
      description:
        "3D simulator of the viral chimp vs human fight built with the help of GPT-6 Astra.",
      applicationCategory: "SimulationApplication",
      operatingSystem: "Web",
      url: "https://chimpvshuman.space",
    },
    {
      "@type": "SoftwareApplication",
      position: 2,
      name: "Toronto Cafe Roulette",
      description: "A roulette of Toronto coffee shops to discover the city & your next coffee chat.",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
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
    {
      "@type": "CreativeWork",
      position: 4,
      name: "Snap Toronto — identity & site design",
      description:
        "Identity and site design for a Toronto AI workshop series: condensed display type, a hand-drawn mark, and full-bleed photography of the businesses it serves.",
      url: "https://snaptoronto.org",
    },
    {
      "@type": "CreativeWork",
      position: 5,
      name: "Toronto's Hot Take Slideshow Night — event poster",
      description:
        "Poster design for a Toronto slideshow night: hand-drawn brush lettering over a photograph of the room.",
    },
    {
      "@type": "CreativeWork",
      position: 6,
      name: "Ocean Management — brand identity & deck",
      description:
        "Identity and pitch deck for a Toronto influencer management agency: a geometric wordmark with the brand's shapes set into its counters.",
    },
    {
      "@type": "SoftwareApplication",
      position: 7,
      name: "The Window Seat",
      description: "A quiz for ambitious people to consider travel for their personal growth.",
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
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
      <SelectedWorks products={visibleProjects} designs={designWork} />

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
        <section id="contact" className="scroll-mt-28 max-w-4xl mx-auto py-16">
          <FadeUp>
            <div
              className="p-6 md:p-12"
              style={{ background: '#ffffff', border: '1px solid var(--ink)' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div>
                  <h2
                    className="font-medium text-3xl md:text-4xl tracking-tight mb-4 leading-tight"
                    style={{ fontFamily: "var(--font-display)", color: 'var(--ink)' }}
                  >
                    Looking to work somewhere that creates a true mark in their industry.
                    <br />
                    <br />
                    Let&apos;s talk.
                  </h2>
                  <p className="text-base leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.62)' }}>
                    Looking into design, product, and engineering.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </FadeUp>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ background: 'var(--paper)', borderTop: '1px solid rgb(var(--ink-rgb) / 0.10)' }}>
        <div className="flex flex-col items-center gap-2 px-6 py-12 md:px-12 md:py-14">
          <span
            className="text-lg font-medium tracking-tighter"
            style={{ fontFamily: "var(--font-display)", color: 'var(--ink)' }}
          >
            koshin<span style={{ color: 'var(--ink)' }}>.</span>
          </span>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: 'rgb(var(--ink-rgb) / 0.45)' }}>
            © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
