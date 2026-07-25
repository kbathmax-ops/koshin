import type { CaseStudyFonts } from "@/lib/case-studies/types";

/**
 * Per-case-study web fonts. Rendered inside the route, NOT in the root layout,
 * so a visitor to /case-studies or / never downloads them.
 *
 * next/font/google is not usable here: it requires statically analysable
 * literal arguments at build time, so it cannot take a font family that comes
 * from a content file. A hoisted <link> is the correct tool for per-route,
 * data-driven font loading.
 *
 * React 19 hoists <link rel="preconnect"|"stylesheet"> to <head> and dedupes.
 */
export function CaseStudyFontLinks({
  fonts,
  variant = "detail",
}: {
  fonts?: CaseStudyFonts;
  /** "index" prefers the subsetted display-only stylesheet when one exists. */
  variant?: "index" | "detail";
}) {
  if (!fonts?.href) return null;

  const href =
    variant === "index" && fonts.indexHref ? fonts.indexHref : fonts.href;

  const origins = fonts.preconnect ?? [
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
  ];

  return (
    <>
      {origins.map((origin) => (
        <link
          key={origin}
          rel="preconnect"
          href={origin}
          // gstatic serves the font binaries cross-origin.
          crossOrigin={origin.includes("gstatic") ? "anonymous" : undefined}
        />
      ))}
      <link rel="stylesheet" href={href} precedence="medium" />
    </>
  );
}
