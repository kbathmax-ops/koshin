import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { caseStudies, getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";
import { warnOnContrastFailures } from "@/lib/case-studies/contrast";
import { ThemeStyle } from "@/components/case-study/theme-style";
import { CaseStudyFontLinks } from "@/components/case-study/case-study-fonts";
import { BeforeAfterBlock } from "@/components/case-study/before-after";
import { CsFooter } from "@/components/case-study/cs-footer";

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const title = `${study.company} — Speculative Rebrand`;
  const url = `https://kbathmax.com/work/case-studies/${study.slug}`;

  return {
    title,
    description: study.thesis,
    openGraph: { title: `${title} | Koshin`, description: study.thesis, url },
    alternates: { canonical: url },
  };
}

/** Section order is fixed — same every time, per the template contract. */
const SECTION_ORDER = [
  { key: "setup", heading: "The setup" },
  { key: "diagnosis", heading: "The diagnosis" },
  { key: "bet", heading: "The strategic bet" },
] as const;

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  // Dev-only: logs any theme pairing that misses WCAG AA.
  warnOnContrastFailures(study);

  const others = caseStudies.filter((s) => s.slug !== study.slug);

  return (
    <div className="cs-root" data-cs-theme={study.slug}>
      <ThemeStyle slug={study.slug} theme={study.theme} />
      <CaseStudyFontLinks fonts={study.fonts} />
      <Nav />

      <article>
        {/* ── Title + thesis + disclaimer ── */}
        <header className="cs-shell cs-hero">
          <div className="cs-meta">
            <p className="cs-eyebrow">Speculative rebrand</p>
            <time
              dateTime={study.date}
              className="cs-eyebrow"
              style={{ color: "var(--cs-color-muted)" }}
            >
              {new Date(study.date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
          </div>

          <h1 className="cs-title">{study.company}</h1>
          <p className="cs-thesis">{study.thesis}</p>
          <p className="cs-disclaimer" role="note">
            {study.disclaimer}
          </p>
        </header>

        {/* ── Setup / diagnosis / bet ── */}
        {SECTION_ORDER.map(({ key, heading }) => (
          <section key={key} className="cs-shell cs-section" aria-labelledby={key}>
            <h2 className="cs-section-title" id={key}>
              {heading}
            </h2>
            <div className="cs-prose">
              {study.sections[key].map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        ))}

        {/* ── The work ── */}
        <section className="cs-shell cs-section" aria-labelledby="the-work">
          <h2 className="cs-section-title" id="the-work">
            The work
          </h2>
          {study.work.map((item) => (
            <BeforeAfterBlock key={item.label} item={item} />
          ))}
        </section>

        {/* ── The tradeoff ── */}
        <section className="cs-shell cs-section" aria-labelledby="tradeoff">
          <h2 className="cs-section-title" id="tradeoff">
            The tradeoff
          </h2>
          <div className="cs-prose">
            {study.sections.tradeoff.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>
      </article>

      <nav className="cs-shell cs-section" aria-label="More case studies">
        <Link
          href="/work/case-studies"
          className="cs-eyebrow"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        >
          <ArrowLeft aria-hidden="true" style={{ height: "0.875rem", width: "0.875rem" }} />
          All case studies
        </Link>
        {others.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, margin: "1.5rem 0 0" }}>
            {others.map((s) => (
              <li key={s.slug} style={{ marginTop: "0.5rem" }}>
                <Link
                  href={`/work/case-studies/${s.slug}`}
                  style={{
                    fontFamily: "var(--cs-font-display)",
                    fontSize: "1.5rem",
                    color: "var(--cs-color-text)",
                    textDecoration: "none",
                  }}
                >
                  {s.company}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <CsFooter />
    </div>
  );
}
