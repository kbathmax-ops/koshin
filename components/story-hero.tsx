'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/* ─── Story hero ───
   Opens centred: the name, a line under it, the links, and the Machu Picchu
   photo as a big 4:3 frame. A moment after the page loads the photo slides
   over to the right-hand side and the story comes in beside it.

   The photo is a 480×360, 1-bit dither — black pixels on white — scaled up
   with nearest-neighbour rendering so each pixel stays a crisp square. It
   skips the image optimiser, which would smooth them back out. */

const POINTS = [
  'Born & raised in downtown & uptown Toronto',
  'Went to arts school for 9 years, developed a strong taste for visuals',
  '@ 15, got invited to a NATO/EU conference in Halifax → decided to use my creativity to improve peoples’ lives',
  'HS: Student council, finance for an environmental nonprofit, 30k in sales for GradCity, marketing for Outward Bound Canada. I loved attracting people to a cause',
  'Solo travelled 9 countries in my summers → wanted adventure & got it + social intelligence skills maxxed',
];

const CURRENTLY = "Deferred Queen's University for a year, rebranding VC firms & startups and creating content";

/* How long the centred photo holds before sliding aside (ms). */
const HOLD = 700;

const EASE = [0.77, 0, 0.18, 1] as const;

export function StoryHero() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // With reduced motion there's nothing to watch, so skip straight to it.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = window.setTimeout(() => setOpen(true), reduced ? 0 : HOLD);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section aria-label="Introduction" className={`sh${open ? ' sh-open' : ''}`}>
      <style>{`
        .sh {
          position: relative;
          background: #ffffff;
          color: var(--ink);
          min-height: 100dvh;
          /* Clears the fixed nav pill floating over the top of the page. */
          padding: clamp(6rem, 13vh, 8rem) clamp(1.25rem, 5vw, 5rem) clamp(3rem, 8vh, 5rem);
        }

        .sh-head {
          position: relative;
          z-index: 2;
          text-align: center;
        }
        .sh-name {
          font-family: var(--font-display);
          font-size: clamp(3rem, 9vw, 8.5rem);
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 0.9;
          margin: 0;
        }
        .sh-tagline {
          font-family: var(--font-display);
          font-size: clamp(1.05rem, 1.8vw, 1.5rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.25;
          margin: 0.8rem 0 0;
          color: rgb(var(--ink-rgb) / 0.62);
        }

        /* Square boxes with thin black edges, close together but apart. */
        .sh-links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-top: 1.1rem;
        }
        .sh-link {
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--ink);
          background: #ffffff;
          border: 1px solid var(--ink);
          padding: 0.5rem 1rem;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .sh-link:hover, .sh-link:focus-visible { background: var(--ink); color: #ffffff; }

        /* The photo: centred and large to start, beside the story once open. */
        .sh-photo {
          position: relative;
          aspect-ratio: 4 / 3;
          margin: clamp(1.5rem, 3vh, 2.5rem) auto 0;
          width: min(100%, 64rem, calc((100dvh - 22rem) * 4 / 3));
          min-width: min(100%, 20rem);
          background: url('/koshin-machu-picchu.png') center / cover no-repeat;
          image-rendering: pixelated;
        }
        .sh-story {
          max-width: 44rem;
          margin: clamp(3rem, 8vh, 5rem) auto 0;
          font-family: var(--font-body);
        }

        @media (min-width: 900px) {
          .sh-open .sh-main {
            display: grid;
            grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
            gap: clamp(2.5rem, 5vw, 5rem);
            align-items: start;
            max-width: 76rem;
            margin: clamp(3rem, 7vh, 4.5rem) auto 0;
          }
          .sh-open .sh-photo {
            grid-column: 2;
            grid-row: 1;
            width: 100%;
            min-width: 0;
            margin: 0;
          }
          .sh-open .sh-story { grid-column: 1; grid-row: 1; margin: 0; }
        }

        .sh-points {
          list-style: disc;
          margin: 0;
          padding-left: 1.2rem;
        }
        .sh-points li {
          font-size: 1rem;
          line-height: 1.55;
          margin: 0 0 0.65rem;
          padding-left: 0.25rem;
          color: rgb(var(--ink-rgb) / 0.78);
        }
        .sh-points li::marker { color: var(--ink); }
        .sh-points .sh-now { color: var(--ink); }
        .sh-now strong { font-weight: 600; }

      `}</style>

      <div className="sh-head">
        <h1 className="sh-name">Koshin Bathmax</h1>
        <p className="sh-tagline">
          changing how people see brands &amp; solo-travelling when I can
        </p>
        <nav className="sh-links" aria-label="Links">
          <Link className="sh-link" href="/work" transitionTypes={['nav-forward']}>
            my work
          </Link>
          <Link className="sh-link" href="/resume">
            resumé
          </Link>
          <a
            className="sh-link"
            href="https://www.linkedin.com/in/koshinbathmax/"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </a>
        </nav>
      </div>

      <div className="sh-main">
        <motion.div
          layout
          transition={{ layout: { duration: 0.8, ease: EASE } }}
          className="sh-photo"
          role="img"
          aria-label="Koshin at Machu Picchu, looking back over his shoulder at Huayna Picchu"
        />

        {/* Always in the page, so it's there for search engines and screen
            readers; it only fades in once the photo has moved out of the way. */}
        <motion.div
          className="sh-story"
          initial={false}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={open ? { duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] } : { duration: 0.2 }}
        >
            <ul className="sh-points">
            {POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
            <li className="sh-now">
              <strong>Currently:</strong> {CURRENTLY}
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
