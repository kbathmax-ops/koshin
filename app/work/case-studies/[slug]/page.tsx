import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { FadeUp } from "@/components/fade-up";
import { AnnotatedShot } from "@/components/poster/annotated-shot";
import {
  Bracketed,
  CodeTag,
  CornerMeta,
  PixelMark,
  PosterFooter,
  RingText,
  TriBadge,
} from "@/components/poster/primitives";
import { getTeardown, teardowns } from "@/lib/teardowns";
import type { Teardown, TeardownSection } from "@/lib/teardowns/types";
import "../poster.css";

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

  const total = pad(t.sections.length);
  const year = t.date.slice(0, 4);

  return (
    <div className="poster-page">
      <Nav />

      <main className="poster-main">
        <Link href="/work#designs" className="poster-back">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All work
        </Link>

        <div className="poster-grid">
          <Cover t={t} total={total} year={year} />
          <Thesis t={t} total={total} />
        </div>

        {t.sections.map((section, i) => (
          <FadeUp key={section.id}>
            <div className="poster-grid">
              <Theirs t={t} section={section} index={i} total={total} />
              <Mine section={section} index={i} total={total} />
            </div>
          </FadeUp>
        ))}

        <FadeUp>
          <div className="poster-grid">
            <Principles t={t} />
            <Outro t={t} year={year} />
          </div>
        </FadeUp>

        <p className="poster-disclaimer">{t.disclaimer}</p>
      </main>
    </div>
  );
}

/* ---------- Posters ---------- */

function Cover({ t, total, year }: { t: Teardown; total: string; year: string }) {
  const hero = t.sections[0].theirs;
  return (
    <article className="poster poster--black poster--cover">
      <div className="poster-bleed">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="(min-width: 900px) 50vw, 100vw"
          className="object-cover object-left"
        />
      </div>
      <CornerMeta
        items={[
          ["Teardown"],
          [t.firm, "Website, " + year],
          [`${total} sections`, "Annotated"],
          ["Koshin", "Case study"],
        ]}
      />
      <div className="poster-cover-body">
        <div className="poster-cover-badges">
          <TriBadge lines={["K", "CS01", "TO"]} />
          <CodeTag top="KB™" bottom="CS-001" />
        </div>
        <h1 className="poster-display poster-display--xl">
          {t.firm}
          <span className="block poster-dim">
            <Bracketed text="<Teardown>" />
          </span>
        </h1>
      </div>
      <PosterFooter right={["Est.", year]} />
    </article>
  );
}

function Thesis({ t, total }: { t: Teardown; total: string }) {
  const inset = t.sections.slice(1).find((s) => !s.theirs.pending)!.theirs;
  return (
    <article className="poster poster--cream">
      <CornerMeta
        items={[
          ["Thesis"],
          ["What they", "got wrong"],
          ["What I did", "differently"],
          [t.url.replace("https://", "")],
        ]}
      />
      <h2 className="poster-display poster-display--lg">
        <Bracketed text={`${Number(total)} sections. <${Number(total)} fixes.>`} />
      </h2>
      <div className="poster-thesis-row">
        <PixelMark shape="disc" className="poster-pixel poster-pixel--disc" />
        <div className="poster-inset">
          <Image src={inset.src} alt={inset.alt} width={inset.width} height={inset.height} sizes="(min-width: 900px) 28vw, 60vw" />
        </div>
      </div>
      <p className="poster-lede">{t.thesis}</p>
      <ol className="poster-index">
        {t.sections.map((s, i) => (
          <li key={s.id}>
            <span className="poster-mono">{pad(i + 1)}</span>
            {s.label}
          </li>
        ))}
      </ol>
      <div className="poster-row-end">
        <PixelMark shape="noise" className="poster-pixel poster-pixel--noise" />
        <CodeTag top="IV" bottom={`SEC-${total}`} />
      </div>
      <PosterFooter right={["Read", "top → down"]} />
    </article>
  );
}

const toneFor = (index: number, side: "theirs" | "mine") =>
  (index % 2 === 0) === (side === "theirs") ? "cream" : "black";

function Theirs({
  t,
  section,
  index,
  total,
}: {
  t: Teardown;
  section: TeardownSection;
  index: number;
  total: string;
}) {
  return (
    <article className={`poster poster--${toneFor(index, "theirs")}`} id={section.id}>
      <CornerMeta
        items={[
          ["Their site"],
          [t.firm, section.label],
          [`${pad(index + 1)} / ${total}`],
          ["What they", "got wrong"],
        ]}
      />
      <h2 className="poster-display poster-display--md">
        <Bracketed text={section.headline} />
      </h2>
      <AnnotatedShot id={section.id} shot={section.theirs} callouts={section.theirs.callouts} />
      <ol className="poster-notes">
        {section.theirs.callouts.map((c, i) => (
          <li key={i}>
            <span className="poster-mono poster-notes-num">{pad(i + 1)}</span>
            <span>
              <strong>{c.title}.</strong> {c.body}
            </span>
          </li>
        ))}
      </ol>
      <PosterFooter right={["Sec.", pad(index + 1)]} />
    </article>
  );
}

function Mine({
  section,
  index,
  total,
}: {
  section: TeardownSection;
  index: number;
  total: string;
}) {
  const { mine, theirs } = section;
  return (
    <article className={`poster poster--${toneFor(index, "mine")}`}>
      <CornerMeta
        items={[
          ["My version"],
          ["Koshin", section.label],
          [`${pad(index + 1)} / ${total}`],
          ["What I did", "differently"],
        ]}
      />
      <h2 className="poster-display poster-display--md">
        <Bracketed text={mine?.headline ?? "What I'd <change>"} />
      </h2>

      {mine?.shot ? (
        <div className="poster-shot">
          <Image
            src={mine.shot.src}
            alt={mine.shot.alt}
            width={mine.shot.width}
            height={mine.shot.height}
            sizes="(min-width: 900px) 46vw, 100vw"
          />
        </div>
      ) : (
        <div
          className="poster-placeholder"
          style={{ aspectRatio: `${theirs.width} / ${theirs.height}` }}
        >
          <PixelMark shape="arrow" className="poster-pixel poster-pixel--arrow" />
          <p className="poster-mono">
            Redesign — {section.label}
            <span className="block">Coming soon</span>
          </p>
        </div>
      )}

      <ol className="poster-notes">
        {theirs.callouts.map((c, i) => {
          const fix = mine?.fixes[i];
          return (
            <li key={i} className={fix ? undefined : "poster-notes--todo"}>
              <span className="poster-mono poster-notes-num">{pad(i + 1)}</span>
              {fix ? (
                <span>
                  <strong>{fix.title}.</strong> {fix.why}
                </span>
              ) : (
                <span>
                  <strong>Fix for “{c.title}”.</strong> What I did, and why it works — still to write.
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <PosterFooter right={["Fix", pad(index + 1)]} />
    </article>
  );
}

function Principles({ t }: { t: Teardown }) {
  return (
    <article className="poster poster--black">
      <CornerMeta items={[["Takeaways"], [t.firm], ["03 rules"], ["Koshin", "Design notes"]]} />
      <div className="poster-ring-wrap">
        <RingText
          id="ring-takeaways"
          text="What they missed · What works · What they missed · What works · "
          className="poster-ring"
        />
        <h2 className="poster-display poster-display--md poster-ring-title">
          Three <Bracketed text="<rules>" />
        </h2>
      </div>
      <ol className="poster-rules">
        {t.principles.map((p, i) => (
          <li key={p.title}>
            <span className="poster-mono">{pad(i + 1)}</span>
            <div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <PosterFooter right={["Rules", "01–03"]} />
    </article>
  );
}

function Outro({ t, year }: { t: Teardown; year: string }) {
  return (
    <article className="poster poster--cream">
      <CornerMeta items={[["End"], [t.firm], ["Before", "→ After"], [year]]} />
      <h2 className="poster-display poster-display--lg">
        Before → <span className="poster-dim">After</span>
      </h2>
      <div className="poster-outro-marks">
        <PixelMark shape="monogram" className="poster-pixel poster-pixel--mono" />
        <PixelMark shape="disc" className="poster-pixel poster-pixel--disc" />
      </div>
      <div className="poster-links">
        <a href={t.url} target="_blank" rel="noopener noreferrer">
          Visit {t.url.replace("https://", "")} <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
        <Link href="/work#designs">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to all work
        </Link>
      </div>
      <p className="poster-wordmark">Koshin®Design</p>
      <PosterFooter right={["Est.", year]} />
    </article>
  );
}
