# Adding a case study

Two edits. One new file, one line in the registry. You never touch the
template, the shared CSS, or the sitemap.

---

## 1. Create the content file

Copy `lib/case-studies/linear.ts` to `lib/case-studies/<slug>.ts` and fill it
in. The shape is enforced by `CaseStudy` in `lib/case-studies/types.ts`, so
TypeScript will tell you if you miss a field.

```ts
import type { CaseStudy } from "./types";

export const notion: CaseStudy = {
  slug: "notion",              // must match the filename and the URL
  company: "Notion",
  thesis: "One line. Renders under the title and as the card blurb.",
  date: "2026-08-02",          // ISO 8601
  disclaimer: "Speculative rebrand — not affiliated with Notion.",

  fonts: { /* see §3 */ },
  theme: { /* see §2 */ },

  sections: {
    setup:     ["Paragraph.", "Another paragraph."],
    diagnosis: ["..."],
    bet:       ["..."],
    tradeoff:  ["..."],
  },

  work: [
    {
      label: "Wordmark",
      note: "Optional one-liner about what changed.",
      before: { caption: "Short label", body: "Description." },
      after:  { caption: "Short label", body: "Description." },
    },
  ],
};
```

Each string in a `sections` array becomes its own `<p>`. There is no markdown
parser — see §6 for why.

## 2. Define the theme

Every token is **optional**. Anything you omit falls back to the global site
value, so a study with `theme: {}` renders correctly in Plus Jakarta Sans on
`#fcf9ef`. Override only what makes this brand different.

| Field | CSS property | Falls back to |
|---|---|---|
| `fontDisplay` | `--cs-font-display` | `--font-headline` → Plus Jakarta Sans |
| `fontBody` | `--cs-font-body` | `--font-sans` → Manrope |
| `fontMono` | `--cs-font-mono` | `--font-mono` |
| `colorBg` | `--cs-color-bg` | `--background` → `#fcf9ef` |
| `colorSurface` | `--cs-color-surface` | `--card` → `#f7f4e9` |
| `colorText` | `--cs-color-text` | `--foreground` → `#1c1c16` |
| `colorMuted` | `--cs-color-muted` | `--muted-foreground` → `#424842` |
| `colorAccent` | `--cs-color-accent` | `--secondary` → `#9d4305` |
| `colorAccentContrast` | `--cs-color-accent-contrast` | `--secondary-foreground` → `#fff` |
| `radius` | `--cs-radius` | `--radius` → `1rem` |
| `maxWidth` | `--cs-max-width` | `64rem` |

These are emitted by `components/case-study/theme-style.tsx` as a scoped block:

```css
[data-cs-theme="notion"] { --cs-color-accent: #ff5c39; … }
```

Authored as a plain object, rendered as one hoisted `<style>` element. No
inline styles, no per-study stylesheet.

**Use hex for colours** — the contrast auditor only parses hex.

## 3. Load the fonts

Fonts load per route, never globally. A visitor to `/` or `/work` downloads
none of them.

```ts
fonts: {
  href: "https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;500;600&display=swap",
  indexHref: "https://fonts.googleapis.com/css2?family=Instrument+Serif&text=Notion&display=swap",
  preconnect: ["https://fonts.googleapis.com", "https://fonts.gstatic.com"],
},
```

- `&display=swap` is **required** — no invisible text while loading.
- `href` loads on the detail page (all faces).
- `indexHref` loads on `/case-studies`, where the card only needs the display
  face. `&text=Notion` subsets it to those characters — a ~2KB file instead of
  ~40KB. **Set this.** Without it, the index falls back to `href` and every
  visitor downloads every study's full font set, which is exactly the problem
  the split exists to avoid.
- Google's `css2` endpoint already splits by `unicode-range`, so latin-only
  visitors fetch latin only without extra configuration.

> `next/font/google` is **not** usable here. It requires statically analysable
> literal arguments at build time and cannot accept a family name that comes
> from a content file. Hoisted `<link>` tags are the correct tool for
> data-driven, per-route font loading.

## 4. Register it

`lib/case-studies/index.ts`:

```ts
import { notion } from "./notion";

export const caseStudies: CaseStudy[] = [linear, notion];
```

Array order is the order on the index page. The route, the sitemap entry, the
static params, and the "more case studies" links all follow automatically.

## 5. Check contrast

Run `npm run dev`, open the page, and read the server console. Any pairing
below WCAG AA prints a warning:

```
[case-studies] "notion" has 1 WCAG AA failure(s):
  ✗ muted on bg: #9a9a9a on #ffffff = 2.85:1 (needs 4.5:1)
```

Thresholds: body text 4.5:1, accent 3:1 (it is only used at display sizes and
on the accent-filled tag, which is checked separately at 4.5:1). The check is
in `lib/case-studies/contrast.ts` and no-ops in production.

**The shipped `linear` theme, verified:**

| Pairing | Ratio | Needs |
|---|---|---|
| text on bg | 15.72:1 | 4.5 |
| text on surface | 14.21:1 | 4.5 |
| muted on bg | 7.21:1 | 4.5 |
| muted on surface | 6.52:1 | 4.5 |
| accent on bg | 5.95:1 | 3 |
| accent on surface | 5.38:1 | 3 |
| accent-contrast on accent | 5.95:1 | 4.5 |
| before text on before-bg | 9.16:1 | 4.5 |
| before muted on before-bg | 4.85:1 | 4.5 |

## 6. Why TypeScript objects, not markdown + frontmatter

Markdown would need a parser and a frontmatter reader (`gray-matter` +
`remark`, or similar) — new dependencies in a project that currently has none
for content. It would also push theme tokens into untyped YAML, where a
mistyped key fails silently at runtime.

A `.ts` file gives you autocomplete on every field, a compile error when a
required section is missing, and typed theme tokens the contrast auditor can
read directly. The bodies are prose in arrays, which is marginally less
pleasant to write than markdown — that is the whole cost, and it buys type
safety across the entire content layer.

If you later want rich inline formatting inside a paragraph, the cleanest
upgrade is to let section entries be `ReactNode` rather than adding a parser.

---

## File map

```
lib/case-studies/
  types.ts        Content + theme contract. Token→CSS-property map.
  contrast.ts     WCAG maths + dev-only auditor.
  index.ts        Registry.          ← edit to add a study
  linear.ts       Reference study.   ← copy to add a study

app/case-studies/
  case-studies.css   Token fallbacks + all component styles. Never needs editing.
  layout.tsx         Imports the stylesheet once.
  page.tsx           Index. Cards preview in their own theme.
  [slug]/page.tsx    Detail template. Fixed section order.

components/case-study/
  theme-style.tsx        Object → scoped [data-cs-theme] block.
  case-study-fonts.tsx   Per-route preconnect + stylesheet links.
  before-after.tsx       Before/after pair.
  cs-footer.tsx          Themed footer.
```

## Notes on the existing site

- **Nav** is shared (`components/nav.tsx`) and keeps its cream pill on every
  page, including dark case studies. That is deliberate — it reads as site
  chrome. It hardcodes its own colours and does not consume `--cs-*` tokens.
- **`prefers-color-scheme`** is not implemented anywhere on this site;
  `globals.css` defines light values only and the `.dark` variant is unused.
  Case studies follow suit — each theme is a fixed direction, which is the
  point of the piece. Adding dark mode would be a site-wide change.
- **`prefers-reduced-motion`** is honoured: card hover transitions are
  disabled. Note `globals.css` sets `scroll-behavior: smooth` globally without
  a guard — pre-existing, not introduced here.
- **Breakpoint** for before/after side-by-side is 768px. Below that everything
  stacks; the layout is tested down to 375px.
