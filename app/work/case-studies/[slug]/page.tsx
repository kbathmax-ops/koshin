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

  if (t.slug === "impression-ventures") {
    return (
      <div className="td-page td-page--gallery">
        <Nav />
        <main className="td-main">
          <Intro t={t} />
          {t.sections.map((section, i) => (
            <section className="td-spread" id={section.id} key={section.id} aria-label={`${pad(i + 1)} — ${section.label}`}>
              <p className="td-spread-number" aria-hidden>{pad(i + 1)}</p>
              <div className={`td-spread-pages${section.theirs.pending ? " td-spread-pages--single" : ""}`}>
                {!section.theirs.pending && (
                  <Image src={section.theirs.src} alt={section.theirs.alt} width={section.theirs.width} height={section.theirs.height} sizes="(min-width: 768px) 46vw, 48vw" className="td-spread-image" />
                )}
                {section.mine?.shot && (
                  <Image src={section.mine.shot.src} alt={section.mine.shot.alt} width={section.mine.shot.width} height={section.mine.shot.height} sizes={section.theirs.pending ? "(min-width: 768px) 46vw, 90vw" : "(min-width: 768px) 46vw, 48vw"} className="td-spread-image" />
                )}
              </div>
            </section>
          ))}
        </main>
      </div>
    );
  }

  return (
    <div className="td-page">
      <Nav />

      <main className="td-main">
        <Intro t={t} />
        {t.slug === "impression-ventures" && <BuiltHomepage />}


        {t.sections.map((section, i) => (
          <Section key={section.id} section={section} index={i} />
        ))}

        <Takeaways t={t} />
        {t.collateral && <Collateral shots={t.collateral} />}
      </main>

      <div className="td-foot">
        <PosterFooter right={["Est.", t.date.slice(0, 4)]} />
        <p className="td-disclaimer">{t.disclaimer}</p>
      </div>
    </div>
  );
}

function BuiltHomepage() {
  const dir = "/case-studies/impression-ventures/after";
  return (
    <section className="td-section" id="built-homepage" aria-labelledby="built-homepage-title">
      <h2 className="td-display td-display--md" id="built-homepage-title">
        The <Bracketed text="built homepage" />
      </h2>
      <p className="td-lede">Newsreader headings, Manrope supporting text, and an opening wordmark that becomes the header as you scroll.</p>
      <div className="td-links">
        <Link href="/work/case-studies/impression-ventures/redesign" className="td-link td-link--strong">
          Explore the built redesign <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      <BookStack
        id="built-homepage"
        before={<Image src="/case-studies/impression-ventures/01-hero.webp" alt="Original Impression Ventures homepage hero" width={2000} height={1130} className="td-shot" sizes="(min-width: 900px) 70vw, 100vw" />}
        after={<>
          <Image src={`${dir}/impression-centred-glass-intro.png`} alt="Centred Impression Ventures wordmark and navigation over a large glass brand symbol" width={1280} height={720} className="td-shot" sizes="(min-width: 900px) 70vw, 100vw" />
          <Image src={`${dir}/impression-book-hero.png`} alt="Built hero with the original financial services headline, North America outline and vertical portfolio carousel" width={1280} height={720} className="td-shot" sizes="(min-width: 900px) 70vw, 100vw" />
          <ol className="td-notes">
            <li><span className="td-num">01</span><span><strong>Scroll into the header.</strong> The opening wordmark and links shrink into persistent navigation.</span></li>
            <li><span className="td-num">02</span><span><strong>Original content.</strong> The portfolio, investment criteria and founder quotes come from the firm’s existing website.</span></li>
            <li><span className="td-num">03</span><span><strong>Founder photos beside their words.</strong> Authentic testimonials use a horizontal layout with manual previous and next controls.</span></li>
          </ol>
        </>}
      />
      <p className="td-lede" style={{ marginTop: 64 }}>Every spread below pairs the original website with the corresponding section of the built redesign.</p>
    </section>
  );
}

function Intro({ t }: { t: Teardown }) {
  if (t.slug === "impression-ventures") {
    return (
      <header className="td-intro td-intro-minimal">
        <h1 className="sr-only">Impression Ventures</h1>
        <p>Impression Ventures invests in startups revolutionizing financial technology, from banking, insurance, and wealth management.</p>
        <p>This brand represents the foundation of cutting edge innovation in a rapidly growing sector. For this identity, the intention was to create a brand that feels innovative and egolessly bold, prioritizing their strong results to investors and preeminence for founders.</p>
        <p>I edited Impression’s classic mark - a spark, an homage to their name, but now with sharper, stronger edges to exhibit authority.</p>
      </header>
    );
  }
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
      <div className="td-links">
        {t.redesignHref && (
          <Link href={t.redesignHref} className="td-link td-link--strong">
            View the redesign <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        )}
        <a href={t.url} target="_blank" rel="noopener noreferrer" className="td-link">
          {t.url.replace("https://", "")} <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      </div>

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

/** Brand pieces made for the redesign, in a sideways-scrolling row. */
function Collateral({ shots }: { shots: Teardown["collateral"] & object }) {
  return (
    <section className="td-section td-collateral" aria-labelledby="collateral-title">
      <FadeUp>
        <h2 className="td-display td-display--md" id="collateral-title">
          Beyond the <Bracketed text="<website>" />
        </h2>
        <p className="td-lede td-collateral-lede">
          Event posters, cocktail napkins and a coffee cup in the redesign&apos;s type and colours. Concept pieces, not
          affiliated with Impression Ventures.
        </p>
      </FadeUp>
      <ul className="td-gallery">
        {shots.map((s) => (
          <li key={s.src}>
            <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(min-width: 768px) 32rem, 85vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
