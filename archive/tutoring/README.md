# Archived tutoring page

Taken off the site on 2026-11-15. `page.tsx` is the full `/tutoring` page as it
last stood, with the navy accents and automation copy from PR #32.

To restore it:

1. Move `page.tsx` back to `app/tutoring/page.tsx`.
2. Remove the `/tutoring` redirect in `next.config.ts`.
3. Re-add the Tutoring link to both menus in `components/nav.tsx` (desktop and
   mobile, between Work and Travels), plus the `isTutoring` active-state check.
4. Re-add the `/tutoring` entry in `app/sitemap.ts`.
