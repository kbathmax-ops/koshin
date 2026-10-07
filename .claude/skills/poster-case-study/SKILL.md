---
name: poster-case-study
description: Build or edit a website-teardown case study in the minimal stacked-pages style (their annotated screenshot page behind, my version page offset on top like two sheets of paper; bracket headlines, footer strip, a few pixel marks/badges). Use when adding a teardown under /work/case-studies, changing callouts or arrows, or styling any page to match this look.
---

# Stacked-pages case study

Started from a poster-grid reference (Coala Music), then cut back to a minimal
website that keeps ~20% of those graphics. Type is the site's Neue Haas
(`--font-display` / `--font-body`) plus `--font-mono` for numbers.

## Files

| What | Where |
|---|---|
| Content contract | `lib/teardowns/types.ts` |
| Registry | `lib/teardowns/index.ts` |
| Example teardown | `lib/teardowns/impression-ventures.ts` |
| Page template | `app/work/case-studies/[slug]/page.tsx` |
| All styles | `app/work/case-studies/teardown.css` |
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

- **Page:** plain `--paper` background, max width 76rem. Intro → one section per teardown item → takeaways → footer strip → disclaimer.
- **Section:** small `01 Label` kicker, `<bracket>` headline, then the stack.
- **Stack:** two sheets, each 72% wide from 768px. *Their site* (white, 1px rule) sits left; *My version* (cream `#f2efe6`, soft paper shadow) sits right and overlaps by `--td-overlap` (6rem desktop, 1.5rem mobile with a 1rem indent). Their sheet carries the same amount of extra bottom padding, so the overlap never covers a note.
- **Notes:** numbered `01…` in mono, the title bold, and the body in 1–2 sentences. My sheet repeats the same numbering, so fixes line up with problems.
- **Kept graphics only:** `<bracket>` headlines, `TriBadge` + `CodeTag` once in the intro, `PixelMark` (arrow in placeholders, disc by the takeaways), and `PosterFooter` once at the very bottom.
- **Don't:** reintroduce posters, black panels, corner metadata or ring text; add more than ~5 callouts per section; or write long paragraphs.
