# Archived projects

Removed from `app/work/page.tsx` on 2026-09-06. Everything needed to restore a
card lives here: the `projects[]` entry, its JSON-LD `itemListElement`, and the
hero image (in `assets/`, restore to `public/`).

## Snap Toronto

- id: `snap-toronto`
- href: https://snaptoronto.org
- image: `assets/snap-toronto-hero.png` → `public/snap-toronto-hero.png`

Card description:

> Teaching AI to small business owners in cities across the Americas — events and webinars on using it for the admin work nobody enjoys: invoicing, scheduling, follow-ups. What I'm building during my gap year.

JSON-LD entry:

```json
{
  "@type": "EducationalOrganization",
  "name": "Snap Toronto",
  "description": "Events and webinars teaching small business owners in cities across the Americas how to use AI for admin work — invoicing, scheduling, and follow-ups.",
  "url": "https://snaptoronto.org"
}
```

## detour

- id: `detour`
- href: https://flyaround-omega.vercel.app
- image: `assets/detour-hero.png` → `public/detour-hero.png`
- source: `~/flyaround`

Card description:

> Flight search for people who would rather not transit the United States. Every itinerary connecting through the US or its territories is hidden by default — a filter no major search engine offers — and the results show what avoiding them actually costs. A retro departures board over a routing engine built on real airline hub networks.

JSON-LD entry:

```json
{
  "@type": "SoftwareApplication",
  "name": "detour",
  "description": "Flight search that hides every itinerary connecting through the US or its territories, and shows what avoiding them costs.",
  "applicationCategory": "TravelApplication",
  "operatingSystem": "Web",
  "url": "https://flyaround-omega.vercel.app"
}
```
