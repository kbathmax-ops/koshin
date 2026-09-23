import Image from 'next/image';
import Link from 'next/link';

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
  slot?: 'intro' | 'offer' | 'background';
};

const BANDS: Band[] = [
  {
    src: '/photo-cusco.jpg',
    alt: 'Koshin in the Plaza de Armas, Cusco',
    position: '58% 34%',
    slot: 'intro',
  },
  {
    src: '/photo-betakit.jpg',
    alt: 'The BetaKit Most Ambitious conference stage',
    position: '50% 46%',
    slot: 'offer',
  },
  {
    src: '/photo-flight.jpg',
    alt: 'A wing over the horizon at sunset',
    position: '50% 56%',
  },
  {
    src: '/photo-beach-night.jpg',
    alt: 'Friends on a pebble beach at night',
    position: '50% 62%',
    slot: 'background',
  },
];

/** A tile of desaturated fractal noise as a data URI — rendered once by the
    browser and repeated, which is far cheaper than filtering each band. */
function grain(baseFrequency: number, size: number) {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>` +
    `<filter id='g'>` +
    `<feTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='4' stitchTiles='stitch'/>` +
    `<feColorMatrix type='saturate' values='0'/>` +
    `</filter>` +
    `<rect width='100%' height='100%' filter='url(%23g)'/>` +
    `</svg>`;
  return `url("data:image/svg+xml,${svg.replace(/</g, '%3C').replace(/>/g, '%3E').replace(/#/g, '%23')}")`;
}

const GRAIN_FINE = grain(0.9, 180);
const GRAIN_COARSE = grain(0.32, 300);

export function StoryHero({ backgroundHref }: { backgroundHref?: string } = {}) {
  return (
    <section aria-label="Introduction" className="sh">
      <style>{`
        .sh { display: flex; flex-direction: column; }

        .sh-band {
          position: relative;
          display: flex;
          align-items: center;
          min-height: clamp(5rem, 14dvh, 8.5rem);
          padding: 0.75rem clamp(1.5rem, 5vw, 5rem);
          isolation: isolate;
          overflow: hidden;
        }

        /* Clear the fixed nav pill floating over the top of the page. */
        .sh-band-intro { padding-top: clamp(5rem, 12vh, 7.5rem); }

        /* Sun-bleached grade on the photo itself: pulled-back colour, lifted
           blacks, warm. The grain and scrim then sit on top of it. */
        .sh-img {
          object-fit: cover;
          z-index: 0;
          filter: saturate(0.62) contrast(0.93) brightness(1.04) sepia(0.20);
        }

        /* ── Vintage treatment, stacked above the photo ──
           1. warm grade  2. sensor grain  3. edge falloff  4. type scrim
           All pointer-events:none so they never block the links. */
        .sh-grade, .sh-grain, .sh-vignette, .sh-scrim {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* Pulled-back colour, lifted blacks, warm — a sun-bleached print. */
        .sh-grade {
          background: linear-gradient(
            to bottom,
            rgba(214, 178, 128, 0.16),
            rgba(150, 132, 112, 0.09)
          );
          mix-blend-mode: multiply;
          z-index: 1;
        }

        /* Two grain sizes: fine sensor noise over coarser mottling, the way
           a small sensor actually looks pushed in low light. */
        .sh-grain {
          background-image: ${GRAIN_FINE}, ${GRAIN_COARSE};
          background-size: 180px 180px, 300px 300px;
          opacity: 0.34;
          mix-blend-mode: soft-light;
          z-index: 2;
        }

        .sh-vignette {
          background: radial-gradient(
            120% 160% at 50% 50%,
            rgba(0, 0, 0, 0) 55%,
            rgba(30, 24, 18, 0.30) 100%
          );
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

        .sh-text {
          font-family: 'Public Sans', sans-serif;
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

        /* Band two: links sit ready and appear the instant the band is
           hovered or focused. No transition — the reveal is immediate. */
        .sh-links {
          display: flex;
          gap: 1.25rem;
          margin-top: 0.5rem;
          visibility: hidden;
        }
        .sh-band-offer:hover .sh-links,
        .sh-band-offer:focus-within .sh-links { visibility: visible; }

        /* Touch devices have no hover, so never hide the links there. */
        @media (hover: none) {
          .sh-links { visibility: visible; }
        }

        .sh-link {
          font-family: var(--font-manrope), Manrope, sans-serif;
          font-size: clamp(0.8rem, 1.4vw, 0.95rem);
          font-weight: 800;
          letter-spacing: 0.02em;
          color: #f4efe4;
          text-decoration: none;
          border-bottom: 2px solid #f4efe4;
          padding-bottom: 2px;
          text-shadow: 0 1px 10px rgba(12, 14, 20, 0.5);
        }
        .sh-link:hover, .sh-link:focus-visible { color: #ffffff; border-color: #ffffff; }
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
          <span className="sh-grade" aria-hidden="true" />
          <span className="sh-grain" aria-hidden="true" />
          <span className="sh-vignette" aria-hidden="true" />
          <span className="sh-scrim" aria-hidden="true" />

          {band.slot === 'intro' && (
            <p className="sh-text sh-body">
              Hi! I&apos;m Koshin <span className="sh-note">(like the ocean with a k)</span>
            </p>
          )}

          {band.slot === 'offer' && (
            <div className="sh-body">
              <p className="sh-text">what I can offer you</p>
              <div className="sh-links">
                <a className="sh-link" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  resumé
                </a>
                <Link className="sh-link" href="/work" transitionTypes={['nav-forward']}>
                  my work
                </Link>
              </div>
            </div>
          )}

          {band.slot === 'background' &&
            (backgroundHref ? (
              <Link className="sh-text sh-body sh-bare" href={backgroundHref}>
                my background
              </Link>
            ) : (
              <p className="sh-text sh-body">my background</p>
            ))}
        </div>
      ))}
    </section>
  );
}
