"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Side = "before" | "after";

/**
 * Two pages stacked like a book: "after" lies on top of "before", starting
 * halfway down it. Tapping the page underneath (or its tab) brings it to the
 * front and it stays there, notes and all, until the other one is tapped.
 */
export function BookStack({ id, before, after }: { id: string; before: ReactNode; after: ReactNode }) {
  const [front, setFront] = useState<Side>("after");
  const [offset, setOffset] = useState<number | null>(null);
  const beforeRef = useRef<HTMLDivElement>(null);

  // The after page starts at half the before page's height, so measure it.
  useEffect(() => {
    const el = beforeRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setOffset(entry.borderBoxSize[0].blockSize * 0.5));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pages: { side: Side; label: string; content: ReactNode }[] = [
    { side: "before", label: "Before", content: before },
    { side: "after", label: "After", content: after },
  ];

  return (
    <div className="book">
      <div className="book-tabs" role="group" aria-label="Show page">
        {pages.map((p) => (
          <button
            key={p.side}
            type="button"
            className="book-tab"
            aria-pressed={front === p.side}
            aria-controls={`${id}-${p.side}`}
            onClick={() => setFront(p.side)}
          >
            {p.label}
            <span className="book-tab-sub">{p.side === "before" ? "Their site" : "My version"}</span>
          </button>
        ))}
      </div>

      <div
        className="book-stack"
        style={offset === null ? undefined : { ["--book-offset" as string]: `${offset}px` }}
      >
        {pages.map((p) => {
          const isFront = front === p.side;
          return (
            <div
              key={p.side}
              id={`${id}-${p.side}`}
              ref={p.side === "before" ? beforeRef : undefined}
              className={`book-page book-page--${p.side}${isFront ? " is-front" : ""}`}
            >
              <p className="book-page-tag">{p.label}</p>
              {p.content}
              {!isFront && (
                <button
                  type="button"
                  className="book-page-reveal"
                  onClick={() => setFront(p.side)}
                  aria-label={`Bring the ${p.label.toLowerCase()} page to the front`}
                >
                  <span className="book-page-hint">Tap to view {p.label.toLowerCase()}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
