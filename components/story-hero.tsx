'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const POINTS = [
  'Born & raised in downtown & uptown Toronto',
  'Went to arts school for 9 years, developed a strong taste for visuals',
  '@ 15, got invited to a NATO/EU conference in Halifax → decided to use my creativity to improve peoples’ lives',
  'HS: Student council, finance for an environmental nonprofit, 30k in sales for GradCity, marketing for Outward Bound Canada. I loved attracting people to a cause',
  'Solo travelled 9 countries in my summers',
];

const CURRENTLY = "Deferred Queen's University for a year, rebranding VC firms & startups and creating content";

export function StoryHero() {
  const [pointsOpen, setPointsOpen] = useState(false);

  return (
    <section aria-label="Introduction" className="sh">
      <style>{`
        .sh {
          position: relative;
          background: #ffffff;
          color: var(--ink);
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

        .sh-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 52rem;
          margin: clamp(2rem, 5vh, 3.5rem) auto 0;
          text-align: center;
        }

        .sh-photo {
          position: relative;
          aspect-ratio: 4 / 3;
          width: min(100%, 42rem);
          margin-bottom: 1.75rem;
          background: url('/koshin-machu-picchu.png') center / cover no-repeat;
          image-rendering: pixelated;
        }

        .sh-story {
          width: 100%;
          font-family: var(--font-body);
        }

        .sh-intro {
          font-size: clamp(1.1rem, 1.5vw, 1.3rem);
          line-height: 1.45;
          margin: 0 auto 0.5rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          user-select: none;
          max-width: 36rem;
        }
        .sh-intro:hover { color: rgb(var(--ink-rgb) / 0.75); }
        .sh-chevron {
          display: inline-block;
          transition: transform 0.2s ease;
          font-size: 0.75em;
        }
        .sh-chevron.open { transform: rotate(90deg); }
        .sh-points {
          list-style: disc;
          margin: 0.75rem auto 0;
          padding-left: 1.2rem;
          text-align: left;
          max-width: 36rem;
          overflow: hidden;
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
          building beautiful things
        </p>
        <nav className="sh-links" aria-label="Links">
          <Link className="sh-link" href="/work">
            my work
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
        <div
          className="sh-photo"
          role="img"
          aria-label="Koshin at Machu Picchu, looking back over his shoulder at Huayna Picchu"
        />

        <div className="sh-story">
          <button
            type="button"
            className="sh-intro"
            onClick={() => setPointsOpen((v) => !v)}
            aria-expanded={pointsOpen}
            style={{ background: 'none', border: 'none', padding: 0, color: 'inherit' }}
          >
            I'm intensely devoted to creating things that change how humans live & think
            <span className={`sh-chevron${pointsOpen ? ' open' : ''}`} aria-hidden>▶</span>
          </button>

          <AnimatePresence initial={false}>
            {pointsOpen && (
              <motion.ul
                className="sh-points"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {POINTS.map((point) => (
                  <li key={point}>{point}</li>
                ))}
                <li className="sh-now">
                  <strong>Currently:</strong> {CURRENTLY}
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
