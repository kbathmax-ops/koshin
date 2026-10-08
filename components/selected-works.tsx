import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/fade-up";
import type { Project } from "@/lib/projects";
import type { DesignProject } from "@/lib/design-work";

/* One shape for both builds and design pieces, so the grid treats them alike. */
type Work = {
  id: string;
  name: string;
  line: string;
  image: string;
  fit?: "contain";
  href?: string;
  external: boolean;
};

function fromProject(p: Project): Work {
  const href = p.detailFirst ? `/work/${p.slug}` : p.liveUrl;
  return {
    id: p.slug,
    name: p.name,
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
  const misc = designs.filter((d) => !d.href || !builtUrls.has(d.href));

  return (
    <div style={{ paddingTop: "clamp(7rem, 16vh, 10rem)" }}>
      <WorkSection id="selected-works" title="Selected works" level="h1" works={products.map(fromProject)} />
      {misc.length > 0 && (
        <div style={{ paddingTop: "clamp(4rem, 10vh, 7rem)" }}>
          <WorkSection id="misc-design" title="Miscellaneous design" works={misc.map(fromDesign)} />
        </div>
      )}
    </div>
  );
}

function WorkSection({ id, title, works, level: Heading = "h2" }: { id: string; title: string; works: Work[]; level?: "h1" | "h2" }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-28">
      <Heading
        id={id}
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
        {title}
      </Heading>

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

      <h3
        className="uppercase text-center"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.1rem, 1.9vw, 1.6rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          color: "var(--ink)",
          margin: "0.75rem 0 0",
        }}
      >
        {work.name}
      </h3>

      <p
        className="text-center"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          lineHeight: 1.5,
          color: "rgb(var(--ink-rgb) / 0.6)",
          margin: "0.35rem auto 0",
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
