"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#where-we-invest", label: "Thesis" },
  { href: "#team", label: "About" },
];

/**
 * Wordmark + split nav. Desktop shows every link; phones get a "Menu" button
 * whose panel opens straight to the links, with Pitch Us first.
 */
export function IvHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="iv-header iv-wrap">
      <a href="#hero" className="iv-wordmark" aria-label="Impression Ventures, home">
        IMPRESSION
      </a>
      <span className="iv-wordmark-sub" aria-hidden>
        Ventures
      </span>

      <nav className="iv-nav" aria-label="Main">
        <ul className="iv-nav-links iv-caps">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <ul className="iv-nav-right iv-caps">
          <li className="iv-nav-quiet-item">
            <a href="#closing" className="iv-nav-quiet">
              Investor login
            </a>
          </li>
          <li>
            <a href="#closing" className="iv-btn iv-btn--sm">
              Pitch us
            </a>
          </li>
          <li>
            <button
              type="button"
              className="iv-menu-toggle"
              aria-expanded={open}
              aria-controls="iv-menu"
              onClick={() => setOpen(true)}
            >
              Menu
            </button>
          </li>
        </ul>
      </nav>

      {open && (
        <div className="iv-menu" id="iv-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="iv-menu-top">
            <span className="iv-menu-mark">IMPRESSION</span>
            <button type="button" className="iv-menu-toggle" style={{ display: "inline-flex" }} onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <nav className="iv-menu-links" aria-label="Menu links">
            <a href="#closing" onClick={() => setOpen(false)}>
              Pitch us
            </a>
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="iv-menu-foot">
            <span>2300 Yonge St, Suite 2003, Toronto</span>
            <span>info@impressionventures.com</span>
            <a href="#closing" onClick={() => setOpen(false)}>
              Investor login
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
