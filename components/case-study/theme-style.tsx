import { THEME_TOKEN_MAP } from "@/lib/case-studies/types";
import type { CaseStudyTheme } from "@/lib/case-studies/types";

/**
 * Emits a scoped custom-property block for one case study:
 *
 *   [data-cs-theme="linear"] { --cs-color-accent: #ff5c39; ... }
 *
 * This is how a theme reaches the DOM without inline styles and without a
 * per-study stylesheet. Only the tokens the study actually defines are
 * emitted; everything else keeps the fallback from case-studies.css.
 */

/** Strips anything that could break out of the declaration block. */
function sanitize(value: string): string {
  return value.replace(/[<>{};]/g, "").trim();
}

export function themeCss(slug: string, theme: CaseStudyTheme): string {
  const decls = (Object.keys(THEME_TOKEN_MAP) as Array<keyof CaseStudyTheme>)
    .map((key) => {
      const value = theme[key];
      if (!value) return null;
      return `${THEME_TOKEN_MAP[key]}:${sanitize(value)}`;
    })
    .filter(Boolean)
    .join(";");

  if (!decls) return "";
  return `[data-cs-theme="${sanitize(slug)}"]{${decls}}`;
}

export function ThemeStyle({
  slug,
  theme,
}: {
  slug: string;
  theme: CaseStudyTheme;
}) {
  const css = themeCss(slug, theme);
  if (!css) return null;
  // React 19 hoists <style> with a precedence into <head> and dedupes by href.
  return (
    <style
      href={`cs-theme-${slug}`}
      precedence="medium"
      dangerouslySetInnerHTML={{ __html: css }}
    />
  );
}
