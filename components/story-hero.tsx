import Link from 'next/link';

/* ─── Story hero — five stacked bands, no animation ───
   Grey placeholders stand in for photography; swapping `shade` for an <img>
   later is the only change needed. The grain + warm grade sit in overlay
   layers above the image, so they survive that swap untouched.

   Band order is just this array — reorder freely. Bands without a `slot`
   are pure photography, spacing out the three that carry type. */

type Band = {
  key: string;
  shade: string;
  slot?: 'intro' | 'offer' | 'background';
};

const BANDS: Band[] = [
  { key: 'b1', shade: '#c9c9c9', slot: 'intro' },
  { key: 'b2', shade: '#b4b4b4' },
  { key: 'b3', shade: '#a1a1a1', slot: 'offer' },
  { key: 'b4', shade: '#8e8e8e' },
  { key: 'b5', shade: '#7d7d7d', slot: 'background' },
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
          min-height: clamp(3.75rem, 10dvh, 6rem);
          padding: 0.75rem clamp(1.5rem, 5vw, 5rem);
          isolation: isolate;
          overflow: hidden;
        }

        /* Clear the fixed nav pill floating over the top of the page. */
        .sh-band-intro { padding-top: clamp(5rem, 12vh, 7.5rem); }

        /* ── Vintage treatment, stacked above the image ──
           1. warm grade  2. sensor grain  3. edge falloff
           All pointer-events:none so they never block the links. */
        .sh-grade, .sh-grain, .sh-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* Pulled-back colour, lifted blacks, warm — a sun-bleached print. */
        .sh-grade {
          background: linear-gradient(
            to bottom,
            rgba(198, 166, 122, 0.30),
            rgba(150, 132, 112, 0.18)
          );
          mix-blend-mode: multiply;
          z-index: 1;
        }

        /* Two grain sizes: fine sensor noise over coarser mottling, the way
           a small sensor actually looks pushed in low light. */
        .sh-grain {
          background-image: ${GRAIN_FINE}, ${GRAIN_COARSE};
          background-size: 180px 180px, 300px 300px;
          opacity: 0.42;
          mix-blend-mode: overlay;
          z-index: 2;
        }

        .sh-vignette {
          background: radial-gradient(
            120% 160% at 50% 50%,
            rgba(0, 0, 0, 0) 55%,
            rgba(30, 24, 18, 0.22) 100%
          );
          z-index: 3;
        }

        .sh-body { position: relative; z-index: 4; }
        .sh-bare { text-decoration: none; display: inline-block; }
        .sh-bare:hover, .sh-bare:focus-visible { color: #2f5d9e; }

        .sh-text {
          font-family: 'Public Sans', sans-serif;
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #12233f;
          font-size: clamp(1.2rem, 2.8vw, 2.1rem);
          margin: 0;
        }
        .sh-note {
          font-weight: 500;
          opacity: 0.75;
          font-size: 0.5em;
          letter-spacing: 0;
        }

        /* Band three: links sit ready and appear the instant the band is
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
          color: #12233f;
          text-decoration: none;
          border-bottom: 2px solid #12233f;
          padding-bottom: 2px;
        }
        .sh-link:hover, .sh-link:focus-visible { color: #2f5d9e; border-color: #2f5d9e; }
      `}</style>

      {BANDS.map((band) => (
        <div
          key={band.key}
          className={`sh-band${band.slot ? ` sh-band-${band.slot}` : ''}`}
          style={{ background: band.shade }}
        >
          <span className="sh-grade" aria-hidden="true" />
          <span className="sh-grain" aria-hidden="true" />
          <span className="sh-vignette" aria-hidden="true" />

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
                <Link className="sh-link" href="/work">
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
