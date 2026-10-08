'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/* ─── Story hero ───
   Opens centred: the name, a line under it, the links, and the Machu Picchu
   photo as a big 4:3 frame. The first scroll tucks the photo into the top
   right and brings the story in underneath.

   The photo is a 480×360, 1-bit dither — black pixels on white — scaled up
   with nearest-neighbour rendering so each pixel stays a crisp square. It
   skips the image optimiser, which would smooth them back out. */

const POINTS = [
  'Born & raised in downtown & uptown Toronto',
  "Went to arts school for 9 years, developed a strong eye for visuals & talent in all artistic mediums (developed the taste everyone's talking about in tech)",
  "@ 15, got invited to a NATO/EU conference in Halifax → wanted to use my creativity to help peoples' day-to-day",
  'High school: student council, finance for the Toronto Youth Environmental Council, 30k in sales for GradCity, marketing for Outward Bound Canada. Loved anything related to attracting people to a cause',
  'Solo travelled 9 countries in my summers → wanted adventure & got it + social intelligence skills maxxed',
];

const CURRENTLY = "Deferred Queen's University for a year, rebranding VC firms & startups and creating content";

/* How far the page has to move before the hero switches to its open state. */
const THRESHOLD = 24;

const EASE = [0.77, 0, 0.18, 1] as const;

export function StoryHero() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setOpen(window.scrollY > THRESHOLD);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
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

        /* Once the photo is tucked top-right it can run under the end of the
           line; a white backing keeps the grey type readable over it. */
        .sh-tagline span {
          background: #ffffff;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
          padding: 0 0.15em;
        }

        /* The photo: centred and large to start, tucked top-right once open. */
        .sh-photo {
          position: relative;
          z-index: 1;
          aspect-ratio: 4 / 3;
          margin: clamp(1.5rem, 3vh, 2.5rem) auto 0;
          width: min(100%, 64rem, calc((100dvh - 22rem) * 4 / 3));
          min-width: min(100%, 20rem);
          background: url('/koshin-machu-picchu.png') center / cover no-repeat;
          image-rendering: pixelated;
        }
        .sh-open .sh-photo {
          position: absolute;
          top: clamp(5.5rem, 11vh, 7rem);
          right: clamp(1.25rem, 5vw, 5rem);
          margin: 0;
          width: clamp(8rem, 24vw, 22rem);
          min-width: 0;
          /* Shrunk past one screen pixel per dither pixel, nearest-neighbour
             turns to noise; let the browser average it instead. */
          image-rendering: auto;
        }

        .sh-story {
          max-width: 44rem;
          margin: clamp(3rem, 8vh, 5rem) 0 0 clamp(0rem, 8vw, 8rem);
          font-family: var(--font-body);
        }
        .sh-intro {
          font-size: clamp(1.1rem, 1.5vw, 1.3rem);
          line-height: 1.45;
          margin: 0 0 1.25rem;
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

        @media (max-width: 767px) {
          .sh-open .sh-photo { top: 6.5rem; }
          .sh-open .sh-head { padding-top: calc(clamp(8rem, 24vw, 22rem) * 0.75 + 1.5rem); }
        }
      `}</style>

      <div className="sh-head">
        <h1 className="sh-name">Koshin Bathmax</h1>
        <p className="sh-tagline">
          <span>changing how people see brands &amp; solo-travelling when I can</span>
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
        <p className="sh-intro">
          I&apos;m intensely devoted to creating things that change how humans live &amp; think
        </p>
        <ul className="sh-points">
          {POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
          <li className="sh-now">
            <strong>Currently:</strong> {CURRENTLY}
          </li>
        </ul>
      </motion.div>
    </section>
  );
}
