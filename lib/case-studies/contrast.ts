/**
 * WCAG 2.1 contrast utilities.
 *
 * Used by app/case-studies/[slug]/page.tsx to audit every shipped theme in
 * development. Hex input only — themes are authored as hex.
 */

import type { CaseStudy, CaseStudyTheme } from "./types";

/** Global site values, mirrored from app/globals.css. Used when a theme
 *  omits a token, so the audit checks what will actually render. */
const GLOBAL_FALLBACK = {
  colorBg: "#fcf9ef",
  colorSurface: "#f7f4e9",
  colorText: "#1c1c16",
  colorMuted: "#424842",
  colorAccent: "#9d4305",
  colorAccentContrast: "#ffffff",
} as const;

function parseHex(hex: string): [number, number, number] | null {
  const m = hex.trim().replace(/^#/, "");
  const full =
    m.length === 3
      ? m
          .split("")
          .map((c) => c + c)
          .join("")
      : m;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

/** Relative luminance per WCAG 2.1. */
export function luminance(hex: string): number | null {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  const [r, g, b] = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast ratio between two hex colours, 1–21. Null if either is unparseable. */
export function contrastRatio(fg: string, bg: string): number | null {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  if (l1 === null || l2 === null) return null;
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

export type ContrastCheck = {
  pair: string;
  fg: string;
  bg: string;
  ratio: number;
  required: number;
  passes: boolean;
};

/**
 * Audits every colour pairing a case study will actually render.
 * Body text requires 4.5:1; large text (the display face) requires 3:1.
 */
export function auditTheme(theme: CaseStudyTheme): ContrastCheck[] {
  const t = { ...GLOBAL_FALLBACK, ...stripUndefined(theme) };

  const pairs: Array<[string, string, string, number]> = [
    ["text on bg", t.colorText, t.colorBg, 4.5],
    ["text on surface", t.colorText, t.colorSurface, 4.5],
    ["muted on bg", t.colorMuted, t.colorBg, 4.5],
    ["muted on surface", t.colorMuted, t.colorSurface, 4.5],
    // Accent is used for headings and eyebrow labels — large-text threshold.
    ["accent on bg", t.colorAccent, t.colorBg, 3],
    ["accent on surface", t.colorAccent, t.colorSurface, 3],
    // Accent as a filled background with text on top — body threshold.
    ["accent-contrast on accent", t.colorAccentContrast, t.colorAccent, 4.5],
  ];

  return pairs.flatMap(([pair, fg, bg, required]) => {
    const ratio = contrastRatio(fg, bg);
    if (ratio === null) return [];
    return [{ pair, fg, bg, ratio, required, passes: ratio >= required }];
  });
}

function stripUndefined(theme: CaseStudyTheme) {
  return Object.fromEntries(
    Object.entries(theme).filter(([, v]) => v !== undefined)
  ) as Partial<typeof GLOBAL_FALLBACK>;
}

/** Dev-only console report. No-ops in production. */
export function warnOnContrastFailures(study: CaseStudy): void {
  if (process.env.NODE_ENV === "production") return;
  const failures = auditTheme(study.theme).filter((c) => !c.passes);
  if (failures.length === 0) return;
  console.warn(
    `\n[case-studies] "${study.slug}" has ${failures.length} WCAG AA failure(s):\n` +
      failures
        .map(
          (f) =>
            `  ✗ ${f.pair}: ${f.fg} on ${f.bg} = ${f.ratio.toFixed(2)}:1 ` +
            `(needs ${f.required}:1)`
        )
        .join("\n") +
      "\n"
  );
}
