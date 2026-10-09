import Image from "next/image";
import type { Callout, Shot } from "@/lib/teardowns/types";

/**
 * Screenshot with arrows. Labels sit in a row above and below the image;
 * each arrow runs from its label's slot to the (x, y) tip on the screenshot.
 * Everything is in percentages, so arrows stay pinned at any width.
 *
 * Under 768px the label rows and arrows hide and numbered pins mark the tips
 * instead — the numbered list under the figure carries the text.
 */
export function AnnotatedShot({ id, shot, callouts }: { id: string; shot: Shot; callouts: Callout[] }) {
  const markerId = `ann-head-${id}`;
  const numbered = callouts.map((c, i) => ({ ...c, n: i + 1 }));
  const top = numbered.filter((c) => c.side === "top");
  const bottom = numbered.filter((c) => c.side === "bottom");
  const slotX = (i: number, count: number) => ((i + 0.5) / count) * 100;

  return (
    <figure className="ann">
      <LabelRow items={top} side="top" />

      <div className="ann-frame">
        {shot.pending ? (
          <div
            className="ann-pending"
            style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
            role="img"
            aria-label={shot.alt}
          >
            <span className="poster-mono">Screenshot to add</span>
          </div>
        ) : (
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes="(min-width: 900px) 46vw, 100vw"
            className="ann-img"
          />
        )}

        <svg className="ann-lines" aria-hidden>
          <defs>
            <marker
              id={markerId}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--ink)" stroke="#fff" strokeWidth="1" />
            </marker>
          </defs>
          {[top, bottom].map((row) =>
            row.map((c, i) => {
              const x1 = `${slotX(i, row.length)}%`;
              const y1 = c.side === "top" ? "0%" : "100%";
              const tip = { x2: `${c.x}%`, y2: `${c.y}%` };
              return (
                <g key={c.n}>
                  <line x1={x1} y1={y1} {...tip} className="ann-halo" />
                  <line x1={x1} y1={y1} {...tip} className="ann-line" markerEnd={`url(#${markerId})`} />
                </g>
              );
            }),
          )}
        </svg>

        {numbered.map((c) => (
          <span
            key={c.n}
            className="ann-pin"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            aria-hidden
          >
            {c.n}
          </span>
        ))}
      </div>

      <LabelRow items={bottom} side="bottom" />
    </figure>
  );
}

function LabelRow({ items, side }: { items: (Callout & { n: number })[]; side: "top" | "bottom" }) {
  if (items.length === 0) return <div className={`ann-row ann-row--${side} ann-row--empty`} />;
  return (
    <ol
      className={`ann-row ann-row--${side}`}
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      aria-hidden
    >
      {items.map((c) => (
        <li key={c.n}>
          <span className="ann-num">{String(c.n).padStart(2, "0")}</span>
          {c.title}
        </li>
      ))}
    </ol>
  );
}
