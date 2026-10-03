"use client";

import { useCallback, useEffect, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import type { DesignProject, Shot } from "@/lib/design-work";

type Mode = "intro" | "products" | "designs";

/* The wordmarks are drawn in the artwork's own coordinate space (1915×1067),
   so the intro lines up with the original composition and each mode is just
   a transform on the same two groups. Positions were measured off the art. */
const VB_W = 1915;
const VB_H = 1067;
const pct = (n: number) => `${(n / VB_W) * 100}%`;

const PRODUCTS_T: Record<Mode, string> = {
  intro: "translate(0px, 0px) scale(1)",
  // Top-left, shrunk to the size in the products sketch.
  products: "translate(68px, -49px) scale(0.64)",
  designs: "translate(-1100px, 0px) scale(1)",
};
const DESIGNS_T: Record<Mode, string> = {
  intro: "translate(0px, 0px) scale(1)",
  products: "translate(1100px, 0px) scale(1)",
  // Same size, pulled up beside the beads.
  designs: "translate(-637px, -402px) scale(1)",
};

/* Left edge of the bead rail, as a share of the frame width. */
const BEADS_LEFT: Record<Mode, number> = { intro: 829, products: 1570, designs: 58 };
const BEADS_W = 321;

/* How much vertical room the heading takes before the list starts (cqw). */
const HEADER_H: Record<Mode, string> = { intro: "55.7cqw", products: "17cqw", designs: "28.5cqw" };

/* The floating nav pill sits over the top of the page; everything starts below it. */
const NAV_CLEARANCE = 92;

const EASE = "cubic-bezier(0.77, 0, 0.18, 1)";
const DURATION = 900;

const display = "var(--font-display)";
const text = "var(--font-body)";

function modeFromHash(hash: string, productSlugs: string[]): Mode {
  const h = hash.replace("#", "");
  if (h === "products" || h === "builds" || productSlugs.includes(h)) return "products";
  if (h === "designs" || h === "design" || h.startsWith("design-")) return "designs";
  return "intro";
}

export function WorkStage({ products, designs }: { products: Project[]; designs: DesignProject[] }) {
  const [mode, setMode] = useState<Mode>("intro");
  const [animate, setAnimate] = useState(false);

  // Deep links (#products, #designs, a project slug) open straight into a
  // view without playing the transition.
  useEffect(() => {
    const slugs = products.map((p) => p.slug);
    const apply = () => setMode(modeFromHash(window.location.hash, slugs));
    apply();
    const target = window.location.hash.slice(1);
    if (target && target !== "products" && target !== "designs") {
      requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView());
    }
    const raf = requestAnimationFrame(() => setAnimate(true));
    window.addEventListener("popstate", apply);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("popstate", apply);
    };
  }, [products]);

  const go = useCallback((next: Mode) => {
    setMode(next);
    const url = next === "intro" ? window.location.pathname : `#${next}`;
    window.history.pushState(null, "", url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onKey = (next: Mode) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      go(next);
    }
  };

  const transition = animate
    ? `transform ${DURATION}ms ${EASE}, opacity ${DURATION * 0.6}ms ${EASE}, left ${DURATION}ms ${EASE}, height ${DURATION}ms ${EASE}`
    : "none";

  // Clicking a heading that's already open goes back to the split view.
  const productsTarget: Mode = mode === "products" ? "intro" : "products";
  const designsTarget: Mode = mode === "designs" ? "intro" : "designs";
  const beadsTarget: Mode | null = mode === "products" ? "designs" : mode === "designs" ? "products" : null;

  return (
    <section className="relative bg-[var(--paper)] overflow-x-clip" style={{ paddingTop: NAV_CLEARANCE }} aria-label="Work">
      <h1 className="sr-only">Products and designs</h1>
      <div className="relative mx-auto w-full" style={{ maxWidth: `calc((100svh - ${NAV_CLEARANCE}px) * 16 / 9)`, containerType: "inline-size" }}>
        {/* Bead rail — rides along the side of whichever list is open. */}
        <div
          className="absolute top-0 bottom-0 z-10 pointer-events-none"
          style={{ left: pct(BEADS_LEFT[mode]), width: pct(BEADS_W), transition }}
        >
          <div
            className="sticky"
            style={{ top: NAV_CLEARANCE, height: `min(56.25cqw, calc(100svh - ${NAV_CLEARANCE}px))` }}
          >
            {beadsTarget ? (
              <button
                type="button"
                onClick={() => go(beadsTarget)}
                aria-label={`Switch to ${beadsTarget}`}
                className="relative block w-full h-full pointer-events-auto cursor-pointer transition-opacity hover:opacity-70"
              >
                <Image src="/work-beads.png" alt="" fill priority sizes="17vw" className="object-contain object-top" />
              </button>
            ) : (
              <div className="relative w-full h-full">
                <Image src="/work-beads.png" alt="" fill priority sizes="17vw" className="object-contain object-top" />
              </div>
            )}
          </div>
        </div>

        {/* Wordmarks */}
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute top-0 left-0 w-full h-auto z-20 overflow-visible pointer-events-none select-none"
          style={{ fontFamily: display }}
        >
          <g
            role="button"
            tabIndex={mode === "designs" ? -1 : 0}
            aria-label={mode === "products" ? "Back to overview" : "Show products"}
            onClick={() => go(productsTarget)}
            onKeyDown={onKey(productsTarget)}
            className="cursor-pointer outline-none"
            style={{
              transform: PRODUCTS_T[mode],
              opacity: mode === "designs" ? 0 : 1,
              pointerEvents: mode === "designs" ? "none" : "auto",
              transition,
            }}
          >
            <rect x={0} y={130} width={950} height={430} fill="transparent" />
            <text x={2} y={479} fontSize={475} textLength={945} lengthAdjust="spacingAndGlyphs">
              products
            </text>
            <text x={71} y={550} fontSize={68} textLength={310} lengthAdjust="spacingAndGlyphs">
              useful builds
            </text>
          </g>
          <g
            role="button"
            tabIndex={mode === "products" ? -1 : 0}
            aria-label={mode === "designs" ? "Back to overview" : "Show designs"}
            onClick={() => go(designsTarget)}
            onKeyDown={onKey(designsTarget)}
            className="cursor-pointer outline-none"
            style={{
              transform: DESIGNS_T[mode],
              opacity: mode === "products" ? 0 : 1,
              pointerEvents: mode === "products" ? "none" : "auto",
              transition,
            }}
          >
            <rect x={1070} y={465} width={845} height={455} fill="transparent" />
            <text x={1078} y={834} fontSize={500} textLength={835} lengthAdjust="spacingAndGlyphs">
              designs
            </text>
            <text x={1073} y={901} fontSize={69} textLength={452} lengthAdjust="spacingAndGlyphs">
              taste &amp; judgement
            </text>
          </g>
        </svg>

        {/* Room for the heading; the list starts underneath it. */}
        <div style={{ height: HEADER_H[mode], transition }} />

        {mode === "products" && <ProductsList products={products} />}
        {mode === "designs" && <DesignsList designs={designs} />}
      </div>
    </section>
  );
}

const reveal = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

function ProductsList({ products }: { products: Project[] }) {
  return (
    /* Two columns that zig-zag, right column first, as in the sketch. Each card
       spans two rows and starts one row below the last, so they interlock. */
    <ul
      className="grid grid-cols-1 md:grid-cols-2 gap-x-[3cqw] gap-y-[6cqw] md:gap-y-[1.5cqw] pb-[10cqw]"
      style={{ marginLeft: "9cqw", width: "64cqw", fontFamily: text }}
    >
      {products.map((project, i) => (
        <motion.li
          key={project.slug}
          id={project.slug}
          className={`scroll-mt-28 md:[grid-row:var(--row)] ${i % 2 === 0 ? "md:col-start-2" : "md:col-start-1"}`}
          style={{ "--row": `${i + 1} / span 2` } as CSSProperties}
          {...reveal}
          transition={{ duration: 0.6, delay: 0.45 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProductCard project={project} />
        </motion.li>
      ))}
    </ul>
  );
}

function ProductCard({ project }: { project: Project }) {
  const href = project.detailFirst ? `/work/${project.slug}` : project.liveUrl;
  const external = !project.detailFirst && Boolean(project.liveUrl);
  const label = project.detailFirst ? "Read the project" : (project.linkLabel ?? "Visit the site");

  const frame = (
    <div className="relative aspect-[16/10] border-[1.5px] border-black bg-white overflow-hidden">
      <Image
        src={project.image}
        alt={`${project.name} — project by Koshin`}
        fill
        sizes="(min-width: 768px) 30vw, 60vw"
        className="object-contain p-[4%] transition-transform duration-700 group-hover:scale-[1.03]"
      />
    </div>
  );

  const body = (
    <>
      {frame}
      <h3
        className="mt-[1.2cqw] text-black leading-[0.9] tracking-[-0.03em] flex items-center gap-2"
        style={{ fontFamily: display, fontSize: "max(26px, 3.4cqw)", fontWeight: 500 }}
      >
        {project.name}
        {project.inReview && <span className="status-light shrink-0" aria-hidden />}
      </h3>
      {project.inReview && <p className="text-xs mt-1 text-[#22a05a]">(under review)</p>}
      <p className="mt-2 text-sm leading-snug text-black/70 max-w-[42ch]">{project.description}</p>
      {href && (
        <span className="inline-block mt-2 text-xs text-black underline underline-offset-4 decoration-black/30 group-hover:decoration-black">
          {label} →
        </span>
      )}
    </>
  );

  if (!href) return <div>{body}</div>;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
      {body}
    </a>
  ) : (
    <Link href={href} className="group block">
      {body}
    </Link>
  );
}

function DesignsList({ designs }: { designs: DesignProject[] }) {
  return (
    <div className="pb-[10cqw]" style={{ marginLeft: "23.5cqw", width: "72cqw", fontFamily: text }}>
      {designs.map((project, i) => (
        <motion.article
          key={project.id}
          id={`design-${project.id}`}
          className="scroll-mt-28 pt-[2cqw] pb-[6cqw]"
          {...reveal}
          transition={{ duration: 0.6, delay: i === 0 ? 0.5 : 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t-[1.5px] border-black pt-[1.2cqw]">
            <h3
              className="text-black leading-[0.9] tracking-[-0.03em]"
              style={{ fontFamily: display, fontSize: "max(28px, 4cqw)", fontWeight: 500 }}
            >
              {project.name}
            </h3>
            <p className="text-xs text-black/55">
              {project.role} · {project.year}
            </p>
          </div>
          <div className="mt-[1.2cqw] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-8 gap-y-2 items-start">
            <p className="text-sm leading-relaxed text-black/70 max-w-[60ch]">{project.description}</p>
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-black underline underline-offset-4 decoration-black/30 hover:decoration-black whitespace-nowrap"
              >
                {project.href.replace("https://", "")} →
              </a>
            )}
          </div>
          <div className="mt-[2cqw] grid grid-cols-1 md:grid-cols-2 gap-[1.5cqw] items-start">
            {project.shots.map((shot, j) => (
              <DesignShot
                key={shot.src}
                shot={shot}
                href={project.href}
                wide={j === 0 && project.shots.length % 2 === 1}
              />
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function DesignShot({ shot, href, wide }: { shot: Shot; href?: string; wide: boolean }) {
  const img = (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      sizes={wide ? "(min-width: 768px) 70vw, 100vw" : "(min-width: 768px) 35vw, 100vw"}
      className="w-full h-auto"
    />
  );
  const frame = "block border-[1.5px] border-black overflow-hidden bg-white";
  return (
    <figure className={wide ? "md:col-span-2" : undefined}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`${frame} transition-opacity hover:opacity-90`}>
          {img}
        </a>
      ) : (
        <div className={frame}>{img}</div>
      )}
      <figcaption className="mt-1.5 text-[11px] text-black/50">{shot.label}</figcaption>
    </figure>
  );
}
