import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { caseStudies } from "@/lib/case-studies";
import { ThemeStyle } from "@/components/case-study/theme-style";
import { CaseStudyFontLinks } from "@/components/case-study/case-study-fonts";
import { CsFooter } from "@/components/case-study/cs-footer";

export const metadata: Metadata = {
  title: "Case Studies — Speculative SaaS Rebrands",
  description:
    "Speculative rebrands of real SaaS companies by Koshin. Each study argues one strategic bet and shows the work in its own typography and palette.",
  openGraph: {
    title: "Case Studies — Speculative SaaS Rebrands | Koshin",
    description:
      "Speculative rebrands of real SaaS companies — each with its own brand direction, argued from setup through tradeoff.",
    url: "https://kbathmax.com/work/case-studies",
  },
  alternates: {
    canonical: "https://kbathmax.com/work/case-studies",
  },
};

export default function CaseStudiesIndexPage() {
  return (
    // No data-cs-theme on the index root: it stays on the global site system.
    <div className="cs-root">
      <Nav />

      <main>
        <header className="cs-shell cs-hero">
          <p className="cs-eyebrow">Case Studies</p>
          <h1
            className="cs-title"
            style={{
              marginTop: "1.25rem",
              fontFamily: "'Public Sans', sans-serif",
              fontWeight: 800,
              lineHeight: 0.99,
              textTransform: "none",
            }}
          >
            startup storytelling
          </h1>
          <p
            className="cs-thesis"
            style={{
              // Match the h1: same family/weight, but spanning the full shell width.
              fontFamily: "'Public Sans', sans-serif",
              fontWeight: 800,
              maxWidth: "none",
              letterSpacing: "-0.01em",
              color: "var(--cs-color-text)",
            }}
          >
            Communication is the heart of a brand — to investors, audience,
            and everyone else. I sorted through a few startups &amp; reimagined
            how they could elevate their marketing &amp; capital through
            storytelling.
          </p>
        </header>

        <section className="cs-shell" style={{ paddingBlock: "clamp(2.5rem, 6vw, 4rem)" }}>
          <h2 className="sr-only">All case studies</h2>
          <ul className="cs-index-grid">
            {caseStudies.map((study) => (
              // Each card previews in its OWN theme.
              <li key={study.slug} data-cs-theme={study.slug}>
                <ThemeStyle slug={study.slug} theme={study.theme} />
                <CaseStudyFontLinks fonts={study.fonts} variant="index" />
                <Link href={`/work/case-studies/${study.slug}`} className="cs-card">
                  <p className="cs-eyebrow">Speculative rebrand</p>
                  <h3 className="cs-card-company">{study.company}</h3>
                  <p className="cs-card-thesis">{study.thesis}</p>
                  <span className="cs-card-footer">
                    <span>
                      {new Date(study.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                        timeZone: "UTC",
                      })}
                    </span>
                    <ArrowUpRight aria-hidden="true" style={{ height: "1rem", width: "1rem" }} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <CsFooter />
    </div>
  );
}
