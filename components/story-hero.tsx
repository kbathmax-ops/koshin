import Image from 'next/image';

/* ─── Story hero — a pixelated portrait beside who Koshin is ───
   The photo is stored at 105×140 in black and white and scaled up with
   nearest-neighbour rendering, so the pixels stay crisp at any size. It
   skips the image optimiser, which would smooth them back out. */

const INTRO = "I'm intensely devoted to creating things that change how humans live & think";

const POINTS = [
  'Born & raised in downtown & uptown Toronto',
  "Went to arts school for 9 years, developed a strong eye for visuals & talent in all artistic mediums (developed the taste everyone's talking about in tech)",
  "@ 15, got invited to a NATO/EU conference in Halifax → wanted to use my creativity to help peoples' day-to-day",
  'High school: student council, finance for the Toronto Youth Environmental Council, 30k in sales for GradCity, marketing for Outward Bound Canada. Loved anything related to attracting people to a cause',
  'Solo travelled 9 countries in my summers → wanted adventure & got it + social intelligence skills maxxed',
];

const CURRENTLY = "Deferred Queen's University for a year, rebranding VC firms & startups and creating content";

export function StoryHero() {
  return (
    <section aria-label="Introduction" className="sh">
      <style>{`
        .sh {
          background: #ffffff;
          color: var(--ink);
          /* Clears the fixed nav pill floating over the top of the page. */
          padding: clamp(6.5rem, 14vh, 8.5rem) clamp(1.25rem, 5vw, 5rem) clamp(3rem, 8vh, 5rem);
        }
        .sh-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(2rem, 4vw, 4.5rem);
          max-width: 76rem;
          margin-inline: auto;
          align-items: start;
        }

        .sh-photo {
          position: relative;
          aspect-ratio: 3 / 4;
          width: 100%;
          max-width: 34rem;
        }
        .sh-photo img { image-rendering: pixelated; object-fit: cover; }
        @media (min-width: 900px) {
          .sh-grid { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); }
          .sh-photo { position: sticky; top: 6.5rem; }
        }

        .sh-name {
          font-family: var(--font-display);
          font-size: clamp(2.75rem, 6.5vw, 5.75rem);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 0.92;
          margin: 0;
        }
        .sh-tagline {
          font-family: var(--font-display);
          font-size: clamp(1.15rem, 1.9vw, 1.6rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 0.9rem 0 0;
          color: rgb(var(--ink-rgb) / 0.62);
        }
        .sh-intro {
          font-family: var(--font-body);
          font-size: clamp(1.05rem, 1.4vw, 1.2rem);
          line-height: 1.5;
          margin: clamp(1.75rem, 3vw, 2.5rem) 0 0;
          max-width: 46ch;
        }
        .sh-points {
          list-style: none;
          margin: 1.5rem 0 0;
          padding: 0;
          border-top: 1px solid rgb(var(--ink-rgb) / 0.14);
        }
        .sh-points li {
          font-family: var(--font-body);
          font-size: 0.98rem;
          line-height: 1.5;
          padding: 0.8rem 0;
          border-bottom: 1px solid rgb(var(--ink-rgb) / 0.14);
          color: rgb(var(--ink-rgb) / 0.78);
        }
        /* Where Koshin is right now is the line a hiring reader cares about
           most, so it gets boxed out of the run. */
        .sh-now {
          font-family: var(--font-body);
          font-size: 0.98rem;
          line-height: 1.5;
          margin: 1.5rem 0 0;
          padding: 1.1rem 1.25rem;
          border: 1.5px solid var(--ink);
        }
        .sh-now strong { font-weight: 600; }
      `}</style>

      <div className="sh-grid">
        <div className="sh-photo">
          <Image
            src="/koshin-machu-picchu.png"
            alt="Koshin at Machu Picchu, looking back over his shoulder at Huayna Picchu"
            fill
            priority
            unoptimized
            sizes="(min-width: 900px) 40vw, 100vw"
          />
        </div>

        <div>
          <h1 className="sh-name">Koshin Bathmax</h1>
          <p className="sh-tagline">changing how people see brands &amp; solo-travelling when I can</p>

          <p className="sh-intro">{INTRO}</p>

          <ul className="sh-points">
            {POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <p className="sh-now">
            <strong>Currently:</strong> {CURRENTLY}
          </p>
        </div>
      </div>
    </section>
  );
}
