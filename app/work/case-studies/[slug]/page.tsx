import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { FadeUp } from "@/components/fade-up";
import { AnnotatedShot } from "@/components/poster/annotated-shot";
import { BookStack } from "@/components/poster/book-stack";
import { Bracketed, CodeTag, PixelMark, PosterFooter, TriBadge } from "@/components/poster/primitives";
import { getTeardown, teardowns } from "@/lib/teardowns";
import type { Teardown, TeardownSection } from "@/lib/teardowns/types";
import "../teardown.css";

export function generateStaticParams() {
  return teardowns.map((t) => ({ slug: t.slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const t = getTeardown(slug);
  if (!t) return {};

  const title = `${t.firm} — Website Teardown`;
  const url = `https://kbathmax.com/work/case-studies/${t.slug}`;
  return {
    title,
    description: t.thesis,
    openGraph: { title, description: t.thesis, url },
    alternates: { canonical: url },
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function TeardownPage({ params }: Params) {
  const { slug } = await params;
  const t = getTeardown(slug);
  if (!t) notFound();

  return (
    <div className="td-page">
      <Nav />

      <main className="td-main">
        <Intro t={t} />

        {t.sections.map((section, i) => (
          <Section key={section.id} section={section} index={i} />
        ))}

        <Takeaways t={t} />
      </main>

      <div className="td-foot">
        <PosterFooter right={["Est.", t.date.slice(0, 4)]} />
        <p className="td-disclaimer">{t.disclaimer}</p>
      </div>
    </div>
  );
}

function Intro({ t }: { t: Teardown }) {
  return (
    <header className="td-intro">
      <Link href="/work#designs" className="td-back">
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All work
      </Link>

      <div className="td-badges">
        <TriBadge lines={["K", "CS01", "TO"]} />
        <CodeTag top="KB™" bottom="CS-001" />
      </div>

      <h1 className="td-display td-display--xl">
        {t.firm} <Bracketed text="<teardown>" />
      </h1>
      <p className="td-lede">{t.thesis}</p>
      <a href={t.url} target="_blank" rel="noopener noreferrer" className="td-link">
        {t.url.replace("https://", "")} <ArrowUpRight className="h-4 w-4" aria-hidden />
      </a>

      <nav aria-label="Sections">
        <ol className="td-index">
          {t.sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>
                <span className="td-num">{pad(i + 1)}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}

/** Before (their annotated page) and after (my version), stacked like two pages of a book. */
function Section({ section, index }: { section: TeardownSection; index: number }) {
  const { theirs, mine } = section;
  return (
    <section className="td-section" id={section.id} aria-labelledby={`${section.id}-title`}>
      <FadeUp>
        <p className="td-kicker">
          <span className="td-num">{pad(index + 1)}</span>
          {section.label}
        </p>
        <h2 className="td-display td-display--md" id={`${section.id}-title`}>
          <Bracketed text={section.headline} />
        </h2>
      </FadeUp>

      <FadeUp>
        <BookStack
          id={section.id}
          before={
            <>
              <AnnotatedShot id={section.id} shot={theirs} callouts={theirs.callouts} />
              <ol className="td-notes">
                {theirs.callouts.map((c, i) => (
                  <li key={i}>
                    <span className="td-num">{pad(i + 1)}</span>
                    <span>
                      <strong>{c.title}.</strong> {c.body}
                    </span>
                  </li>
                ))}
              </ol>
            </>
          }
          after={
            <>
              {mine?.shot ? (
                <Image
                  src={mine.shot.src}
                  alt={mine.shot.alt}
                  width={mine.shot.width}
                  height={mine.shot.height}
                  sizes="(min-width: 900px) 70vw, 100vw"
                  className="td-shot"
                />
              ) : (
                <div className="td-placeholder" style={{ aspectRatio: `${theirs.width} / ${theirs.height}` }}>
                  <PixelMark shape="arrow" className="td-pixel-arrow" />
                  <span>Redesign coming soon</span>
                </div>
              )}
              <ol className="td-notes">
                {theirs.callouts.map((c, i) => {
                  const fix = mine?.fixes[i];
                  return (
                    <li key={i} className={fix ? undefined : "td-notes-todo"}>
                      <span className="td-num">{pad(i + 1)}</span>
                      {fix ? (
                        <span>
                          <strong>{fix.title}.</strong> {fix.why}
                        </span>
                      ) : (
                        <span>
                          <strong>Fix for “{c.title}”.</strong> Still to write.
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </>
          }
        />
      </FadeUp>
    </section>
  );
}

function Takeaways({ t }: { t: Teardown }) {
  return (
    <section className="td-section td-takeaways" aria-labelledby="takeaways-title">
      <FadeUp>
        <div className="td-takeaways-head">
          <h2 className="td-display td-display--md" id="takeaways-title">
            What I&apos;d <Bracketed text="<keep in mind>" />
          </h2>
          <PixelMark shape="disc" className="td-pixel-disc" />
        </div>
        <ol className="td-rules">
          {t.principles.map((p, i) => (
            <li key={p.title}>
              <span className="td-num">{pad(i + 1)}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </FadeUp>
    </section>
  );
}
