"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/fade-up";
import { WayModel } from "@/components/way-model";
import { visibleProjects, type Project } from "@/lib/projects";
import { visibleDesigns, type DesignProject } from "@/lib/design-work";

type Category = "all" | DesignProject["category"];

type Work = {
  id: string;
  name: string;
  line: string;
  image: string;
  fit?: "contain";
  model?: "way";
  href?: string;
  category: Category;
};

function fromProject(p: Project): Work {
  return {
    id: p.slug,
    name: p.name,
    line: p.description,
    image: p.image,
    fit: p.imageFit,
    model: p.model,
    href: p.detailFirst ? `/work/${p.slug}` : p.liveUrl,
    category: "product",
  };
}

function fromDesign(d: DesignProject): Work {
  return {
    id: `design-${d.id}`,
    name: d.name,
    line: d.tagline,
    image: d.shots[0].src,
    href: d.href,
    category: d.category,
  };
}

const allWorks: Work[] = [...visibleDesigns.map(fromDesign), ...visibleProjects.map(fromProject)];

const FILTERS: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "branding", label: "Branding" },
  { id: "product", label: "Product" },
  { id: "design", label: "Design" },
];

const rule = "rgb(var(--ink-rgb) / 0.14)";

export function SelectedWorks() {
  const [active, setActive] = useState<Category>("all");

  const filtered = active === "all" ? allWorks : allWorks.filter((w) => w.category === active);

  return (
    <div style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", background: "#ffffff" }}>
      <section aria-labelledby="selected-works" className="scroll-mt-28">
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
            textAlign: "center",
            padding: "0 clamp(1rem, 2vw, 1.5rem) 1.25rem",
            margin: 0,
          }}
        >
          Selected works
        </h1>

        <div className="flex justify-center gap-2 flex-wrap px-4 mb-6">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              className="text-sm font-medium px-4 py-1.5 transition-colors"
              style={{
                fontFamily: "var(--font-display)",
                background: active === f.id ? "var(--ink)" : "transparent",
                color: active === f.id ? "#ffffff" : "var(--ink)",
                border: `1px solid ${active === f.id ? "var(--ink)" : rule}`,
                borderRadius: "999px",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2" style={{ borderTop: `1px solid ${rule}` }}>
          {filtered.map((work, i) => (
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

        {filtered.length === 0 && (
          <p className="text-center py-16" style={{ color: "rgb(var(--ink-rgb) / 0.5)" }}>
            Nothing in this category yet.
          </p>
        )}
      </section>
    </div>
  );
}

function WorkCard({ work }: { work: Work }) {
  const media = (
    <div className="relative aspect-[16/11] overflow-hidden" style={{ background: "#f7f7f5" }}>
      {work.model === "way" ? (
        <WayModel className="h-full" />
      ) : (
        <Image
          src={work.image}
          alt={`${work.name} — work by Koshin`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className={`${work.fit === "contain" ? "object-contain p-[12%]" : "object-cover"} transition-transform duration-700 group-hover:scale-[1.03]`}
        />
      )}
    </div>
  );

  const text = (
    <>
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
    </>
  );

  const link = (children: React.ReactNode) =>
    !work.href ? (
      <div>{children}</div>
    ) : !work.href.startsWith("/") ? (
      <a href={work.href} target="_blank" rel="noopener noreferrer" className="group block">
        {children}
      </a>
    ) : (
      <Link href={work.href} className="group block">
        {children}
      </Link>
    );

  const pad = { padding: "clamp(0.75rem, 1.2vw, 1rem)" };

  // The model is dragged to turn it, so only the words underneath link out.
  if (work.model) {
    return (
      <div style={pad}>
        {media}
        {link(text)}
      </div>
    );
  }

  return link(
    <div style={pad}>
      {media}
      {text}
    </div>
  );
}
