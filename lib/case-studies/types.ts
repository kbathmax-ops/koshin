/**
 * Case study content + theme contract.
 *
 * A case study is ONE file in lib/case-studies/. It carries its own content,
 * its own design tokens, and its own font URL. Nothing else in the codebase
 * needs to change to add one — see CASE_STUDIES.md.
 */

/** Design tokens. Every field is optional; anything omitted falls back to the
 *  global site value in app/case-studies/case-studies.css. */
export type CaseStudyTheme = {
  fontDisplay?: string;
  fontBody?: string;
  fontMono?: string;

  colorBg?: string;
  colorSurface?: string;
  colorText?: string;
  colorMuted?: string;
  colorAccent?: string;
  /** Text/icon colour placed ON colorAccent. Must hit 4.5:1 against it. */
  colorAccentContrast?: string;

  radius?: string;
  maxWidth?: string;
};

/** Maps theme object keys to the CSS custom properties they emit. */
export const THEME_TOKEN_MAP: Record<keyof CaseStudyTheme, string> = {
  fontDisplay: "--cs-font-display",
  fontBody: "--cs-font-body",
  fontMono: "--cs-font-mono",
  colorBg: "--cs-color-bg",
  colorSurface: "--cs-color-surface",
  colorText: "--cs-color-text",
  colorMuted: "--cs-color-muted",
  colorAccent: "--cs-color-accent",
  colorAccentContrast: "--cs-color-accent-contrast",
  radius: "--cs-radius",
  maxWidth: "--cs-max-width",
};

/** A single before/after pair inside "The work". */
export type BeforeAfter = {
  /** What aspect of the brand this pair compares, e.g. "Wordmark". */
  label: string;
  /** Optional sentence explaining what changed and why. */
  note?: string;
  before: { caption: string; body: string };
  after: { caption: string; body: string };
};

/** Web fonts for this case study. Loaded on this route only. */
export type CaseStudyFonts = {
  /** Full stylesheet URL. Include &display=swap. Google Fonts css2 already
   *  serves latin-subset unicode-range files, so browsers fetch only what
   *  they need; add &text= for a hard subset on display-only faces. */
  href: string;
  /**
   * Optional lighter stylesheet for the index page, where only the display
   * face is needed for the card. Use Google Fonts `&text=` to subset it to
   * just the company name. Falls back to `href` if omitted — which means the
   * index downloads every study's full font set, so set this once you have
   * more than two or three studies.
   */
  indexHref?: string;
  /** Origins to preconnect to, in order. */
  preconnect?: string[];
};

export type CaseStudy = {
  slug: string;
  company: string;
  /** One line. Renders under the title. */
  thesis: string;
  /** ISO 8601, e.g. "2026-03-14". */
  date: string;
  disclaimer: string;

  fonts?: CaseStudyFonts;
  theme: CaseStudyTheme;

  sections: {
    /** Each string is one <p>. */
    setup: string[];
    diagnosis: string[];
    bet: string[];
    tradeoff: string[];
  };

  work: BeforeAfter[];
};
