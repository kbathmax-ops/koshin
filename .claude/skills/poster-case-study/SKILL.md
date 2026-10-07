---
name: poster-case-study
description: Build or edit a website-teardown case study in the poster-grid style (cream/black poster panels, tiny mono corner metadata, triangle badge, boxed code tags, pixel marks, ring text, footer strip, annotated screenshots with arrows). Use when adding a teardown under /work/case-studies, changing callouts or arrows, or styling any page to match this look.
---

# Poster-grid case study

Reference: a 2×3 grid of music-brand posters (Coala Music). We copy the
**layout and graphic system**, not the brand — type stays the site's Neue Haas
(`--font-display` / `--font-body`) plus `--font-mono`.

## Files

| What | Where |
|---|---|
| Content contract | `lib/teardowns/types.ts` |
| Registry | `lib/teardowns/index.ts` |
| Example teardown | `lib/teardowns/impression-ventures.ts` |
| Page template | `app/work/case-studies/[slug]/page.tsx` |
| All styles | `app/work/case-studies/poster.css` |
| Graphic primitives | `components/poster/primitives.tsx` |
| Screenshot + arrows | `components/poster/annotated-shot.tsx` |
| Screenshots | `public/case-studies/<slug>/NN-name.webp` |

## Adding a teardown

1. Put screenshots in `public/case-studies/<slug>/`, numbered in page order, 2000px wide `.webp`. Stitch tall sections into one image with PIL instead of using two figures.
2. Copy `impression-ventures.ts`, fill in `sections`, register it in `index.ts`.
3. Missing screenshot → set `pending: true` on the shot; a hatched frame of the same size renders and the arrows still work.
4. Missing redesign → leave `mine` out; the right poster shows a dashed frame and one "still to write" row per callout.
5. `RESEND_API_KEY=re_dummy npm run build`, then screenshot at 1440 and 375 (Playwright, `executablePath: /opt/pw-browsers/chromium-1194/chrome-linux/chrome`), and check `scrollWidth` equals the viewport.

## Callouts (arrows)

- `x`, `y` = arrow tip as % of the screenshot. Measure on the 2000px source: `x = px / 2000 * 100`, `y = px / height * 100`.
- `side: "top" | "bottom"` = which label row the arrow starts from. Labels share their row in equal slots.
- **Within a row, list callouts by ascending `x`** so arrows never cross. Numbering follows array order, so put top-row items first.
- At most 3 per row; `title` is 1–3 words, and the full point goes in `body`.
- Under 768px the rows and arrows hide; numbered pins mark the tips and the list carries the text.

## Visual rules

- **Grid:** two posters per row from 900px (theirs | mine), 10px gutters on `--paper`. Posters are `aspect-ratio: 3/4` minimum and grow with content.
- **Tones:** `--poster-cream #f2efe6` and `--poster-black #0b0b0b`, alternated as a checkerboard (`toneFor`). Never add a third colour; the screenshots supply the colour.
- **Corners:** every poster opens with `CornerMeta` — 4 tiny uppercase mono blocks (0.625rem, tracking 0.08em). Last block right-aligned.
- **Headline:** display weight 500, tracking -0.035em, line-height 0.95. Wrap a phrase in `<angle brackets>` for the bracket motif (`<2014>` in the reference). One bracketed phrase per headline.
- **Footer strip:** every poster ends with `PosterFooter` — KB pixel square, two-line mono label, boxed Diagnose/Redesign/Ship stack, barcode, two-line right label.
- **Badges:** `TriBadge` (rounded triangle, 3 short lines) and `CodeTag` (two boxed rows). Use sparingly — cover and thesis only.
- **Pixel marks:** `PixelMark shape="monogram|disc|arrow|noise"`, `crispEdges`, `currentColor`. They are decoration; never more than two per poster.
- **Ring text:** `RingText` with a unique `id`, for the takeaways poster.
- **Images:** full-bleed (cover), inset (thesis), framed (annotated). Framed shots get a 1px rule outline, never a shadow or radius.
- **Don't:** rounded corners, shadows, gradients outside the cover fade, more than ~5 callouts per section, or long paragraphs — keep notes to 1–2 sentences.
