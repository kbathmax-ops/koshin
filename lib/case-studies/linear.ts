import type { CaseStudy } from "./types";

/**
 * REFERENCE IMPLEMENTATION — placeholder copy, replace freely.
 *
 * Theme is deliberately the opposite of the global site system
 * (cream #fcf9ef / Plus Jakarta Sans / 1rem radius) so the override is
 * obvious at a glance: near-black canvas, editorial serif, 2px corners.
 */
export const linear: CaseStudy = {
  slug: "linear",
  company: "Linear",
  thesis:
    "Placeholder thesis — one line on why the current brand undersells the product's core promise, and what a sharper position would claim instead.",
  date: "2026-07-14",
  disclaimer: "Speculative rebrand — not affiliated with Linear.",

  fonts: {
    // Google's css2 endpoint already ships per-subset files with unicode-range,
    // so a latin-only visitor downloads only latin. display=swap is required.
    href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
    // Index cards only need the display face, subset to the characters used.
    indexHref:
      "https://fonts.googleapis.com/css2?family=Instrument+Serif&text=Linear&display=swap",
    preconnect: ["https://fonts.googleapis.com", "https://fonts.gstatic.com"],
  },

  // All pairings verified against WCAG AA — see the table in CASE_STUDIES.md.
  theme: {
    fontDisplay: "'Instrument Serif', ui-serif, Georgia, serif",
    fontBody: "'Inter', ui-sans-serif, system-ui, sans-serif",
    fontMono: "'JetBrains Mono', ui-monospace, monospace",

    colorBg: "#12151c",
    colorSurface: "#1a1f29",
    colorText: "#eceef2",
    colorMuted: "#9ba3b4",
    colorAccent: "#ff5c39",
    colorAccentContrast: "#12151c",

    radius: "2px",
    maxWidth: "68rem",
  },

  sections: {
    setup: [
      "Placeholder — set the scene. What does the company do, who is it for, and what did the brand look like at the moment this study picks it up? Two or three sentences of context is plenty.",
      "A second paragraph here if the situation needs history. Keep it factual; the argument comes later.",
    ],
    diagnosis: [
      "Placeholder — name the actual problem. Not 'the logo is dated', but the strategic mismatch: what the brand communicates versus what the product is actually good at.",
      "Be specific about the cost of the gap. Who misreads the company because of it, and what do they conclude instead?",
    ],
    bet: [
      "Placeholder — state the single decision the whole rebrand hangs on. One sentence, stated plainly, before you justify it.",
      "Then justify it. Why this bet and not the safer adjacent one? What has to be true for it to pay off?",
    ],
    tradeoff: [
      "Placeholder — what does this direction give up? Every real position sacrifices something, and naming it is what separates a case study from a mood board.",
      "Close on who this is not for, and why that is acceptable.",
    ],
  },

  work: [
    {
      label: "Wordmark",
      note: "Placeholder note on what changed and the reasoning behind it.",
      before: {
        caption: "Geometric sans, tight tracking",
        body: "Placeholder description of the existing wordmark — its construction, and the impression it leaves.",
      },
      after: {
        caption: "Editorial serif, wide counters",
        body: "Placeholder description of the proposed wordmark and the specific quality it is reaching for.",
      },
    },
    {
      label: "Typography",
      note: "Placeholder note on the type system shift.",
      before: {
        caption: "One family, six weights",
        body: "Placeholder description of the existing type system and where it runs out of range.",
      },
      after: {
        caption: "Serif display against mono detail",
        body: "Placeholder description of the proposed pairing and what each face is responsible for.",
      },
    },
    {
      label: "Colour",
      note: "Placeholder note on the palette decision.",
      before: {
        caption: "Cool neutral, low contrast",
        body: "Placeholder description of the existing palette and the mood it sets.",
      },
      after: {
        caption: "Near-black ground, single signal accent",
        body: "Placeholder description of the proposed palette and where the accent is permitted to appear.",
      },
    },
  ],
};
