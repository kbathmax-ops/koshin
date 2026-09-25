import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

/* ─── Story hero — four stacked photo bands, no animation ───
   Band order is just this array — reorder freely. The band without a `slot`
   is pure photography, spacing out the three that carry type.

   The photos run bright (Cusco daylight) to near-black (beach at night), so
   type sits in cream over a left-hand scrim rather than relying on the image
   underneath it. `position` picks the crop, since a thin band keeps very
   little of a tall photo. */

type Band = {
  src: string;
  alt: string;
  position: string;
  slot?: 'intro' | 'offer' | 'travel' | 'background';
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
  {
    src: '/photo-flight.jpg',
    alt: 'A wing over the horizon at sunset',
    position: '50% 50%',
    slot: 'travel',
  },
  {
    src: '/photo-beach-night.jpg',
    alt: 'Friends on a pebble beach at night',
    position: '50% 56%',
    slot: 'background',
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

export function StoryHero({ backgroundHref }: { backgroundHref?: string } = {}) {
  return (
    <section aria-label="Introduction" className="sh">
      <style>{`
        /* Fixed to one viewport with the bands splitting it evenly, so the
           set always lands as a full screen rather than drifting with the
           window height. */
        .sh {
          display: flex;
          flex-direction: column;
          height: 100dvh;
        }

        .sh-band {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-height: 0;
          padding: 0.75rem clamp(1.5rem, 5vw, 5rem);
          isolation: isolate;
          overflow: hidden;
        }

        /* Clear the fixed nav pill floating over the top of the page. */
        .sh-band-intro { padding-top: clamp(5rem, 12vh, 7.5rem); }

        /* Photos run in full colour — grain is the only treatment. */
        .sh-img { object-fit: cover; z-index: 0; }

        /* Two layers above the photo: grain, then the type scrim.
           Both pointer-events:none so they never block the links. */
        .sh-grain, .sh-grain-hard, .sh-scrim {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* Heavy grain. Two tile sizes — fine sensor noise over coarser
           mottling — and a second pass in overlay on top of the soft-light
           layer, which is what pushes it past a subtle texture. */
        .sh-grain {
          background-image: ${GRAIN_FINE}, ${GRAIN_COARSE};
          background-size: 180px 180px, 300px 300px;
          opacity: 1;
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

        /* Carries the type. Without it, cream over the Cusco sky is illegible. */
        .sh-scrim {
          background: linear-gradient(
            to right,
            rgba(16, 18, 24, 0.66) 0%,
            rgba(16, 18, 24, 0.30) 40%,
            rgba(16, 18, 24, 0) 68%
          );
          z-index: 4;
        }

        .sh-body { position: relative; z-index: 5; }
        .sh-bare { text-decoration: none; display: inline-block; }

        .sh-row {
          display: inline-flex;
          align-items: center;
          gap: 0.55em;
        }
        /* Sized off the type so it tracks the heading at every breakpoint. */
        .sh-arrow {
          width: 0.82em;
          height: 0.82em;
          stroke-width: 2.6;
          flex-shrink: 0;
        }

        .sh-text {
          font-family: var(--font-advercase), 'Public Sans', sans-serif;
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #f4efe4;
          font-size: clamp(1.2rem, 2.8vw, 2.1rem);
          margin: 0;
          text-shadow: 0 1px 12px rgba(12, 14, 20, 0.45);
        }
        .sh-note {
          font-weight: 500;
          opacity: 0.8;
          font-size: 0.5em;
          letter-spacing: 0;
        }
        .sh-bare:hover, .sh-bare:focus-visible { color: #ffffff; }

        /* Always on — these are the three things a hiring reader came for, so
           they are solid pills rather than type sitting on a photo. */
        .sh-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-top: 0.8rem;
        }

        .sh-link {
          font-family: var(--font-manrope), Manrope, sans-serif;
          font-size: clamp(0.82rem, 1.3vw, 0.98rem);
          font-weight: 800;
          letter-spacing: 0.01em;
          color: #12233f;
          background: #f4efe4;
          text-decoration: none;
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          box-shadow: 0 6px 20px rgba(10, 12, 18, 0.38);
          white-space: nowrap;
        }
        .sh-link:hover, .sh-link:focus-visible {
          background: #ffffff;
          color: #2f5d9e;
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
            <p className="sh-text sh-body">
              Hi! I&apos;m Koshin <span className="sh-note">(like the ocean with a k)</span>
            </p>
          )}

          {band.slot === 'offer' && (
            <div className="sh-body">
              <p className="sh-text">what I offer</p>
              <div className="sh-links">
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
              </div>
            </div>
          )}

          {band.slot === 'travel' && (
            <Link className="sh-text sh-body sh-bare" href="/story#travel">
              where I&apos;ve been &amp; what it&apos;s taught me
            </Link>
          )}

          {band.slot === 'background' &&
            (backgroundHref ? (
              <Link className="sh-text sh-body sh-bare sh-row" href={backgroundHref}>
                my background
                <ArrowDown className="sh-arrow" aria-hidden="true" />
              </Link>
            ) : (
              <p className="sh-text sh-body sh-row">
                my background
                <ArrowDown className="sh-arrow" aria-hidden="true" />
              </p>
            ))}
        </div>
      ))}
    </section>
  );
}
