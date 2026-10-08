import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/fade-up";
import type { Project } from "@/lib/projects";
import type { DesignProject } from "@/lib/design-work";

/* One shape for both builds and design pieces, so the grid treats them alike. */
type Work = {
  id: string;
  name: string;
  meta: string[];
  line: string;
  image: string;
  fit?: "contain";
  href?: string;
  external: boolean;
};

const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

function fromProject(p: Project): Work {
  const href = p.detailFirst ? `/work/${p.slug}` : p.liveUrl;
  return {
    id: p.slug,
    name: p.name,
    meta: p.liveUrl ? [p.kind, host(p.liveUrl)] : [p.kind],
    line: p.description,
    image: p.image,
    fit: p.imageFit,
    href,
    external: !p.detailFirst && Boolean(p.liveUrl),
  };
}

function fromDesign(d: DesignProject): Work {
  return {
    id: `design-${d.id}`,
    name: d.name,
    meta: [d.role, d.year],
    line: d.tagline,
    image: d.shots[0].src,
    href: d.href,
    external: true,
  };
}

const rule = "rgb(var(--ink-rgb) / 0.14)";

export function SelectedWorks({ products, designs }: { products: Project[]; designs: DesignProject[] }) {
  // A design piece that is also a build (WAY) only shows once, as the build.
  const builtUrls = new Set(products.map((p) => p.liveUrl).filter(Boolean));
  const works = [
    ...products.map(fromProject),
    ...designs.filter((d) => !d.href || !builtUrls.has(d.href)).map(fromDesign),
  ];

  return (
    <section aria-labelledby="selected-works" style={{ paddingTop: "clamp(7rem, 16vh, 10rem)" }}>
      <h1
        id="selected-works"
        className="uppercase"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.75rem, 9vw, 8rem)",
          fontWeight: 700,
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
          color: "var(--ink)",
          padding: "0 clamp(1rem, 2vw, 1.5rem) clamp(0.5rem, 1vw, 0.75rem)",
          margin: 0,
        }}
      >
        Selected works
      </h1>

      <ul className="grid grid-cols-1 md:grid-cols-2" style={{ borderTop: `1px solid ${rule}` }}>
        {works.map((work, i) => (
          <li
            key={work.id}
            id={work.id}
            className="scroll-mt-28 md:odd:border-r"
            style={{ borderBottom: `1px solid ${rule}`, borderColor: rule }}
          >
            <FadeUp delay={(i % 2) * 0.06}>
              <WorkCard work={work} />
            </FadeUp>
          </li>
        ))}
      </ul>
    </section>
  );
}

function WorkCard({ work }: { work: Work }) {
  const body = (
    <div style={{ padding: "clamp(0.75rem, 1.2vw, 1rem)" }}>
      <div className="relative aspect-[16/11] overflow-hidden" style={{ background: "var(--paper-raised)" }}>
        <Image
          src={work.image}
          alt={`${work.name} — work by Koshin`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className={`${work.fit === "contain" ? "object-contain p-[12%]" : "object-cover"} transition-transform duration-700 group-hover:scale-[1.03]`}
        />
      </div>

      <h2
        className="uppercase text-center"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.1rem, 1.9vw, 1.6rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          color: "var(--ink)",
          margin: "0.75rem 0 0.5rem",
        }}
      >
        &ldquo;{work.name}&rdquo;
      </h2>

      <ul className="flex" style={{ border: "1px solid var(--ink)" }}>
        {work.meta.map((cell, j) => (
          <li
            key={cell}
            className="flex-1 min-w-0 truncate text-center uppercase"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              fontWeight: 500,
              letterSpacing: "0.04em",
              padding: "0.2rem 0.5rem",
              borderLeft: j > 0 ? "1px solid var(--ink)" : undefined,
              color: "var(--ink)",
            }}
          >
            {cell}
          </li>
        ))}
      </ul>

      <p
        className="text-center"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          lineHeight: 1.5,
          color: "rgb(var(--ink-rgb) / 0.6)",
          margin: "0.6rem auto 0",
          maxWidth: "52ch",
        }}
      >
        {work.line}
      </p>
    </div>
  );

  if (!work.href) return body;
  return work.external ? (
    <a href={work.href} target="_blank" rel="noopener noreferrer" className="group block">
      {body}
    </a>
  ) : (
    <Link href={work.href} className="group block">
      {body}
    </Link>
  );
}
