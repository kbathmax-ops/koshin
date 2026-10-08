import Image from 'next/image';
import Link from 'next/link';

/* ─── Story hero — two photo bands split by a heavy black rule ───
   Follows the "03 - Artboard 1" layout: a short intro band with the name
   top-left and a tall band with "what I offer" set large on the right (links
   beside it). Band heights and type sizes are proportions measured off that
   artboard.

   The photos vary a lot in brightness, so
   type sits in cream over a left-hand scrim rather than relying on the image
   underneath it. `position` picks the crop, since a thin band keeps very
   little of a tall photo. */

type Band = {
  src: string;
  alt: string;
  position: string;
  slot?: 'intro' | 'offer';
};

const BANDS: Band[] = [
  {
    src: '/photo-monaco-walk.jpg',
    alt: 'Koshin walking above Monaco',
    position: '34% 66%',
    slot: 'intro',
  },
  {
    src: '/photo-halifax-forum.jpg',
    alt: 'The Halifax International Security Forum in session',
    position: '38% 64%',
    slot: 'offer',
  },
];

/** A tile of desaturated fractal noise as a data URI — rendered once by the
    browser and repeated, which is far cheaper than filtering each band.
    `punch` steepens the noise's own contrast: raw turbulence clusters around
    mid-grey, which reads as haze rather than grain once blended. */
function grain(baseFrequency: number, size: number, punch = 1) {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>` +
    `<filter id='g'>` +
    `<feTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='4' stitchTiles='stitch'/>` +
    `<feColorMatrix type='saturate' values='0'/>` +
    `<feComponentTransfer>` +
    `<feFuncR type='linear' slope='${punch}' intercept='${(1 - punch) / 2}'/>` +
    `<feFuncG type='linear' slope='${punch}' intercept='${(1 - punch) / 2}'/>` +
    `<feFuncB type='linear' slope='${punch}' intercept='${(1 - punch) / 2}'/>` +
    `</feComponentTransfer>` +
    `</filter>` +
    `<rect width='100%' height='100%' filter='url(%23g)'/>` +
    `</svg>`;
  return `url("data:image/svg+xml,${svg.replace(/</g, '%3C').replace(/>/g, '%3E').replace(/#/g, '%23')}")`;
}

const GRAIN_FINE = grain(0.9, 180, 2.4);
const GRAIN_COARSE = grain(0.32, 300, 2.0);

export function StoryHero() {
  return (
    <section aria-label="Introduction" className="sh">
      <style>{`
        /* A little short of one viewport, so the writing underneath peeks
           out above the fold. The bands share it 24 / 44 like the artboard. */
        .sh {
          display: flex;
          flex-direction: column;
          height: max(26rem, calc(100dvh - 9rem));
          background: var(--ink);
        }

        .sh-band {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 0;
          padding: 0 clamp(1.25rem, 3.4vw, 4rem);
          isolation: isolate;
          overflow: hidden;
        }
        .sh-band + .sh-band { border-top: clamp(6px, 0.75vw, 12px) solid var(--ink); }

        .sh-band-intro { flex: 24; padding-left: clamp(1.5rem, 6.1vw, 7rem); }
        .sh-band-offer { flex: 44; justify-content: flex-end; }

        /* Clear the fixed nav pill floating over the top of the page. */
        .sh-band-intro { padding-top: 4.5rem; }

        /* Photos run in full colour — grain is the only treatment. */
        .sh-img { object-fit: cover; z-index: 0; }

        .sh-grain, .sh-grain-hard, .sh-scrim {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* Heavy grain: fine sensor noise over coarser mottling, with a second
           overlay pass that pushes it past a subtle texture. */
        .sh-grain {
          background-image: ${GRAIN_FINE}, ${GRAIN_COARSE};
          background-size: 180px 180px, 300px 300px;
          mix-blend-mode: soft-light;
          z-index: 2;
        }
        .sh-grain-hard {
          background-image: ${GRAIN_FINE};
          background-size: 140px 140px;
          opacity: 0.62;
          mix-blend-mode: overlay;
          z-index: 3;
        }

        /* Darkens the side the type sits on so white type holds up on bright
           photos. */
        .sh-scrim {
          background: linear-gradient(
            to right,
            rgba(16, 18, 24, 0.62) 0%,
            rgba(16, 18, 24, 0.28) 45%,
            rgba(16, 18, 24, 0) 75%
          );
          z-index: 4;
        }
        .sh-band-offer .sh-scrim {
          background: linear-gradient(
            to left,
            rgba(16, 18, 24, 0.62) 0%,
            rgba(16, 18, 24, 0.28) 45%,
            rgba(16, 18, 24, 0) 75%
          );
        }

        .sh-body { position: relative; z-index: 5; }

        .sh-text {
          font-family: var(--font-display);
          font-weight: 500;
          letter-spacing: -0.035em;
          line-height: 0.95;
          color: #ffffff;
          margin: 0;
          text-decoration: none;
          text-shadow: 0 1px 14px rgba(12, 14, 20, 0.4);
        }
        /* Sizes track width but are capped by height, so the type never
           outgrows its band on a short, wide window. */
        .sh-text-sm { font-size: min(7.1vw, 9.5dvh); }
        .sh-text-lg { font-size: min(9.9vw, 14dvh); }
        a.sh-text:hover, a.sh-text:focus-visible { opacity: 0.85; }

        /* Links sit to the left of "what I offer", on its baseline row. */
        .sh-offer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: wrap-reverse;
          gap: clamp(1rem, 2.5vw, 2.5rem);
        }
        .sh-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .sh-link {
          font-family: var(--font-body);
          font-size: clamp(0.82rem, 1.2vw, 1rem);
          font-weight: 600;
          color: var(--ink);
          background: var(--paper);
          text-decoration: none;
          padding: 0.55rem 1.15rem;
          border-radius: 999px;
          box-shadow: 0 6px 20px rgba(10, 12, 18, 0.35);
          white-space: nowrap;
        }
        .sh-link:hover, .sh-link:focus-visible {
          background: var(--ink);
          color: var(--paper);
        }

        /* Narrow screens: links drop under the heading, still right-aligned. */
        @media (max-width: 767px) {
          .sh-offer { flex-direction: column-reverse; align-items: flex-end; gap: 0.9rem; }
          .sh-links { justify-content: flex-end; }
        }
      `}</style>

      {BANDS.map((band) => (
        <div
          key={band.src}
          className={`sh-band${band.slot ? ` sh-band-${band.slot}` : ''}`}
        >
          <Image
            className="sh-img"
            src={band.src}
            alt={band.alt}
            fill
            sizes="100vw"
            priority
            style={{ objectPosition: band.position }}
          />
          <span className="sh-grain" aria-hidden="true" />
          <span className="sh-grain-hard" aria-hidden="true" />
          <span className="sh-scrim" aria-hidden="true" />

          {band.slot === 'intro' && (
            <h1 className="sh-text sh-text-sm sh-body">hi! I&rsquo;m Koshin</h1>
          )}

          {band.slot === 'offer' && (
            <div className="sh-body sh-offer">
              <nav className="sh-links" aria-label="What I offer">
                <Link className="sh-link" href="/resume">
                  resumé
                </Link>
                <Link className="sh-link" href="/work" transitionTypes={['nav-forward']}>
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
              <p className="sh-text sh-text-lg">what I offer</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
