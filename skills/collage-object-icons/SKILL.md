---
name: collage-object-icons
description: Generate editorial "paper-collage" object icons — vintage black-and-white engraved/halftone objects (coins, keys, compasses, chess pieces, pocket watches, etc.) cut out and layered with scraps of printed documents and hand-torn pastel paper shapes on a warm off-white background. Use when the user asks for icons, spot illustrations, or visual elements in this collage style, or names an object/concept to turn into one.
---

# Collage Object Icons

Create standalone spot illustrations in a **mixed-media editorial collage** style: a single vintage object, photographed in grayscale, cut out like a magazine clipping, and partially filled/overlaid with printed-document scraps and torn pastel paper.

## When to use
- User wants an icon, spot illustration, feature graphic, or icon set in this style.
- User gives a concept (e.g. "trust", "speed", "strategy") → pick a vintage object metaphor first (see table), then render.

## Style rules (always apply)

**Object**
- One real, vintage/antique object per image, centered, ~60–70% of frame.
- Rendered as a **monochrome photo / engraving** — black, white, grays. High contrast, fine halftone or etched texture. No color on the object itself.
- Slight 3/4 or tilted angle (10–30°) for depth; never perfectly flat-on unless the object is a coin.

**Collage treatment**
- Silhouette has a **hand-cut / slightly torn paper edge**; a thin white paper border is visible in places.
- 20–40% of the object is "cut away" and replaced by **scraps of printed paperwork**: forms, ledgers, typewritten text, checkboxes, tables, small serif headings. Text is tiny and illegible-ish (texture, not message).
- Add 3–6 **organic, torn paper blobs** in flat pastel colors, layered at the object's lower edge or inside cut-out areas. Irregular, wavy, striped-like shapes — not geometric.

**Palette**
| Role | Color |
|---|---|
| Background | warm off-white `#FAF5F1` |
| Object | grayscale `#111` → `#EEE` |
| Accent 1 | mint `#BFE8D6` |
| Accent 2 | lilac `#B9A6E8` |
| Accent 3 | peach `#F4C4A8` |
| Accent 4 | cream `#F3E6C8` |
| Accent 5 | chocolate brown `#4A2A1E` |
Use 3–4 accents per icon; always include brown + at least one pastel.

**Composition & finish**
- Plain off-white background, no scene, no frame, no text labels.
- Very soft, short drop shadow under the paper cutout (like it's lying on a desk).
- Subtle paper grain over everything. Matte, tactile, analog feel.
- Square 1:1 by default. For sets: same scale, lighting, angle logic, and accent mix across all items; arrange in a clean grid with generous spacing.

**Avoid**: glossy 3D render, gradients, neon, outlines/strokes, cartoon/flat vector look, colored objects, busy backgrounds, readable words, logos.

## Concept → object metaphors
| Concept | Object |
|---|---|
| Money / value / pricing | silver dollar coin |
| Send / launch / messaging | folded paper airplane |
| Time / deadlines / history | pocket watch |
| Rhythm / pace / productivity | metronome |
| Search / research / audit | magnifying glass |
| Strategy / competition | chess knight |
| Access / security / unlock | skeleton key |
| Direction / guidance / navigation | brass compass |
| Communication | rotary telephone |
| Growth | potted plant in terracotta |
| Ideas | vintage light bulb |
| Writing / content | fountain pen |
| Data / storage | card catalog drawer |
| Balance / legal | scale of justice |
| Precision / goals | dart / archery target |
| Building / tools | wrench or hand plane |

## Workflow
1. Identify the concept(s); map each to one vintage object (ask only if truly ambiguous).
2. Write one image prompt per object using the template below.
3. Generate. For a set, generate one at a time but reuse the exact same style block.
4. Check each output against the "Avoid" list; regenerate if it drifts (e.g. object turned colored or 3D-glossy).

## Prompt template
```
Editorial mixed-media paper collage spot illustration of a single vintage [OBJECT], [ANGLE, e.g. tilted 3/4 view], centered on a plain warm off-white background (#FAF5F1).
The [OBJECT] is a high-contrast black-and-white halftone/engraved photograph, cut out with slightly torn paper edges and a thin white border.
Parts of the object are cut away and replaced with scraps of vintage printed paperwork — forms, ledgers, typewritten text, checkboxes, tiny illegible serif type.
Layered irregular hand-torn paper blobs in flat mint (#BFE8D6), lilac (#B9A6E8), peach (#F4C4A8) and chocolate brown (#4A2A1E), tucked at the base and inside the cut-outs.
Soft short drop shadow, subtle paper grain, matte analog texture. Minimal, modern editorial design. No text, no logos, no gradients, no glossy 3D, no outlines. Square 1:1.
```

## Example
User: "Make an icon for 'onboarding'."
→ Object: skeleton key (access). Fill template with `vintage ornate skeleton key`, `diagonal, tilted 30°`.
