import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { FadeUp } from "@/components/fade-up";
import { WebsitesHero } from "@/components/websites-hero";

export const metadata: Metadata = {
  title: "Websites — Koshin",
  description:
    "Client and personal websites built by Koshin — pixel-perfect, fast, and deployed on Vercel.",
  openGraph: {
    title: "Websites — Koshin",
    description:
      "Client and personal websites built by Koshin — pixel-perfect, fast, and deployed on Vercel.",
    url: "https://portfolio-koshin2.vercel.app/websites",
  },
  alternates: { canonical: "https://portfolio-koshin2.vercel.app/websites" },
};

const sites = [
  {
    id: "northland-canoes",
    name: "Northland Canoes",
    tagline: "Outfitter · Algonquin Park, Ontario",
    description:
      "Editorial dark-theme site for a canoe outfitter. Crosshair navigation, cinematic full-bleed routes, filmstrip gear catalog, and an archival field journal grid — all hand-coded from a Claude Design wireframe.",
    url: "https://northland-canoes.vercel.app",
    tags: ["HTML/CSS", "Vercel"],
    palette: ["#1a1a1a", "#1C2A22", "#B5481D", "#C9BFA7"],
    year: "2026",
    type: "Marketing Site",
    accent: "#B5481D",
    bgPreview: "#1a1a1a",
    textPreview: "#F2ECDD",
  },
];

export default function WebsitesPage() {
  return (
    <>
      <Nav />

      <WebsitesHero />

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-32 space-y-16 md:space-y-28">

        {/* ── Site cards ── */}
        <section className="space-y-16">
          {sites.map((site, i) => (
            <FadeUp key={site.id} delay={i * 0.08}>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                  {/* Preview panel */}
                  <div className="md:col-span-7 rounded-[1.5rem] overflow-hidden shadow-[0_20px_60px_rgba(28,28,22,0.08)] transition-transform duration-500 group-hover:-translate-y-2">
                    <div
                      className="aspect-[16/10] relative flex flex-col"
                      style={{ background: site.bgPreview }}
                    >
                      {/* Mini browser chrome */}
                      <div
                        className="flex items-center gap-1.5 px-4 py-3 shrink-0"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <span
                          className="ml-3 text-[9px] font-mono tracking-wider"
                          style={{ color: "rgba(255,255,255,0.25)" }}
                        >
                          {site.url.replace("https://", "")}
                        </span>
                      </div>

                      {/* Simulated site preview */}
                      <div className="flex-1 p-6 flex flex-col justify-between overflow-hidden relative">
                        {/* Nav bar mockup */}
                        <div
                          className="flex justify-between items-center mb-auto"
                          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "12px" }}
                        >
                          <span
                            className="text-[10px] font-mono tracking-widest uppercase"
                            style={{ color: site.textPreview, opacity: 0.6 }}
                          >
                            Northland
                          </span>
                          <div className="flex gap-4">
                            {["Canoes", "Algonquin", "Reserve →"].map((item) => (
                              <span
                                key={item}
                                className="text-[9px] font-mono tracking-wider uppercase"
                                style={{
                                  color: item === "Reserve →" ? site.accent : site.textPreview,
                                  opacity: item === "Reserve →" ? 1 : 0.4,
                                }}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Hero text mockup */}
                        <div className="mt-4">
                          <div
                            className="text-[10px] font-mono tracking-[0.15em] uppercase mb-2"
                            style={{ color: site.textPreview, opacity: 0.4 }}
                          >
                            45°32′N · 78°20′W · APR 2026
                          </div>
                          <div
                            className="font-black leading-none tracking-tighter"
                            style={{
                              fontFamily: "Helvetica, Arial, sans-serif",
                              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                              color: site.textPreview,
                              opacity: 0.92,
                            }}
                          >
                            NORTH
                            <br />
                            LAND
                          </div>
                        </div>

                        {/* Colour palette strip */}
                        <div className="flex gap-1.5 mt-auto pt-4">
                          {site.palette.map((c) => (
                            <div
                              key={c}
                              className="h-3 rounded-full flex-1"
                              style={{ background: c, opacity: 0.8 }}
                            />
                          ))}
                        </div>

                        {/* Hover arrow */}
                        <div
                          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                          style={{ background: site.accent }}
                        >
                          <ArrowUpRight className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="md:col-span-5 px-2 lg:px-6">
                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-surface-container-highest text-primary">
                        {site.type}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-surface-container-highest text-primary">
                        {site.year}
                      </span>
                      {site.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-container text-on-primary-container"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2
                      className="font-extrabold text-4xl text-primary tracking-tight mb-1"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {site.name}
                    </h2>
                    <p
                      className="text-sm font-semibold mb-5 uppercase tracking-wider"
                      style={{ color: site.accent }}
                    >
                      {site.tagline}
                    </p>
                    <p className="text-on-surface-variant text-base leading-relaxed mb-8">
                      {site.description}
                    </p>

                    <div
                      className="inline-flex items-center gap-2 font-bold text-sm group-hover:gap-3 transition-all duration-200"
                      style={{ color: site.accent }}
                    >
                      Visit site
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                </div>
              </a>
            </FadeUp>
          ))}
        </section>

        {/* ── CTA ── */}
        <FadeUp>
          <div className="bg-surface-container-low rounded-[2rem] p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_10px_30px_rgba(28,28,22,0.04)] text-center md:text-left">
            <div>
              <h3
                className="font-extrabold text-3xl text-primary tracking-tight mb-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Need a site built?
              </h3>
              <p className="text-on-surface-variant max-w-md">
                I build clean, fast websites from design files or scratch — deployed and live within days.
              </p>
            </div>
            <Link
              href="/work#contact"
              className="shrink-0 inline-flex items-center gap-2 bg-primary text-on-primary font-bold text-sm px-8 py-4 rounded-full hover:-translate-y-0.5 transition-transform duration-200"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeUp>

      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low">
        <div className="flex flex-col items-center gap-2 px-6 py-12 md:px-12 md:py-14">
          <span
            className="text-lg font-black text-primary tracking-tighter"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            koshin<span className="text-secondary">.</span>
          </span>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary/40">
            © 2026
          </p>
        </div>
      </footer>
    </>
  );
}
