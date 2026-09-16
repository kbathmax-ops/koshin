'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  cubicBezier,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/* ─── My Background, as a canoe crossing open water ───
   Six stops on a serpentine course: top-left → top-right → down the right
   side → across to the middle-left → down to the bottom-left → bottom-right.
   The canoe parks at each one and a card surfaces beside it. Scroll is the
   only control; there is nothing to click. */

type Stop = {
  title: string;
  body: string;
  src: string;
  /** Resting point of the canoe, as a percentage of the water pane. */
  x: number;
  y: number;
  /** The same point where the full spread doesn't fit. */
  xNarrow: number;
  /** Which side of the canoe the card sits on. Bottom-row stops have no room
      below them, so their cards go above. */
  card: 'above' | 'below';
};

const STOPS: Stop[] = [
  {
    title: 'Arts School',
    body: 'Five years learning to think creatively about every situation.',
    src: '/photo-arts-school.jpg',
    x: 17,
    xNarrow: 29,
    y: 25,
    card: 'below',
  },
  {
    title: 'Environmental Nonprofit',
    body: 'Two years working on the ground for the environment.',
    src: '/photo-nonprofit.jpg',
    x: 79,
    xNarrow: 71,
    y: 22,
    card: 'below',
  },
  {
    title: 'Sales',
    body: 'With one of the best graduation-trip providers in the country.',
    src: '/photo-sales.jpg',
    x: 81,
    xNarrow: 72,
    y: 52,
    card: 'below',
  },
  {
    title: 'International Security',
    body: 'Invited to the Halifax International Security Forum, and realized national defense is something I want to work in.',
    src: '/photo-security.jpg',
    x: 19,
    xNarrow: 28,
    y: 55,
    card: 'below',
  },
  {
    title: 'Languages',
    body: 'Lived in Spain for a month, and dedicated myself to learning as many languages as I can for the rest of my life.',
    src: '/photo-languages.jpg',
    x: 21,
    xNarrow: 29,
    y: 83,
    card: 'above',
  },
  {
    title: 'Gap Year',
    body: 'Travelling for adventure, innovating at a startup, showing the whole thing as I go.',
    src: '/photo-gap-year.jpg',
    x: 79,
    xNarrow: 71,
    y: 80,
    card: 'above',
  },
];

const HEADING = 'MY BACKGROUND';

/* ─── Scroll choreography ───
   Every stop gets an equal share of DWELL, every leg an equal share of what's
   left. Travel is very slightly longer than a dwell, so the section reads as a
   crossing punctuated by pauses rather than a slideshow that drifts. */
const DWELL = 0.088;
const TRAVEL = (1 - STOPS.length * DWELL) / (STOPS.length - 1);

const stopStart = (i: number) => i * (DWELL + TRAVEL);
const stopEnd = (i: number) => stopStart(i) + DWELL;

/** Two keyframes per stop — arrive, then depart — so position holds flat
    through the dwell and only moves on the legs between. */
const TIMES = (() => {
  const t: number[] = [];
  STOPS.forEach((_, i) => t.push(stopStart(i), stopEnd(i)));
  t[t.length - 1] = 1; // the arithmetic lands a hair short of 1; pin it
  return t;
})();

const LINEAR = (t: number) => t;
const GLIDE = cubicBezier(0.55, 0, 0.35, 1);

/** Segment j runs TIMES[j] → TIMES[j+1]. Even segments are dwells, odd ones
    are legs, so position holds flat through a stop and eases along a leg. */
const MOVE_EASES = TIMES.slice(0, -1).map((_, j) => (j % 2 === 0 ? LINEAR : GLIDE));

/* Heading runs on its own three-point-per-stop schedule: hold the bearing it
   arrived on while the card is up, then pivot over the tail of the dwell so the
   turn reads as the canoe getting under way again. Sharing TIMES would have put
   the pivot across the whole stop, leaving the canoe stuck at a diagonal for the
   entire time you're reading. */
const TURN_TIMES = STOPS.flatMap((_, i) => [
  stopStart(i),
  stopStart(i) + DWELL * 0.55,
  stopEnd(i),
]);
TURN_TIMES[TURN_TIMES.length - 1] = 1;

// Per stop: hold, turn, then travel (constant, since a leg keeps its bearing).
const TURN_EASES = TURN_TIMES.slice(0, -1).map((_, j) => (j % 3 === 1 ? GLIDE : LINEAR));

/** Pick the representation of `deg` nearest `ref`, so a turn from 170° to
    -170° is a 20° nudge rather than a 340° spin. */
function unwrap(deg: number, ref: number) {
  return deg + 360 * Math.round((ref - deg) / 360);
}

export function BackgroundShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  // Waypoints are authored in percentages but driven as pixel transforms:
  // animating left/top would lay out every frame, and a heading computed from
  // percentages would point wrong on any pane that isn't square.
  const [pane, setPane] = useState({ w: 0, h: 0 });
  const narrow = pane.w > 0 && pane.w < 760;

  useEffect(() => {
    const el = paneRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setPane({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // framer hands this offset to a native ViewTimeline `contain` range, which is
  // only meaningful for a subject that fits inside the viewport. Ours is several
  // screens tall, so that range collapses and every property framer offloads to
  // it — opacity included — freezes at its first keyframe. Staying on the JS
  // path costs nothing here and is the only way the cards ever surface.
  scrollYProgress.accelerate = undefined;

  const { xs, ys, rots } = useMemo(() => {
    const px = STOPS.map((s) => ((narrow ? s.xNarrow : s.x) / 100) * pane.w);
    const py = STOPS.map((s) => (s.y / 100) * pane.h);

    const legs = STOPS.slice(0, -1).map(
      (_, i) => (Math.atan2(py[i + 1] - py[i], px[i + 1] - px[i]) * 180) / Math.PI,
    );

    const xs: number[] = [];
    const ys: number[] = [];
    const rots: number[] = [];
    let previous = legs[0] ?? 0;

    STOPS.forEach((_, i) => {
      // Arrives on the bearing of the leg behind it, leaves on the bearing of
      // the leg ahead. The first and last stops reuse their only neighbour.
      const arrive = unwrap(i === 0 ? legs[0] : legs[i - 1], previous);
      const depart = unwrap(i === legs.length ? legs[i - 1] : legs[i], arrive);
      previous = depart;

      xs.push(px[i], px[i]);
      ys.push(py[i], py[i]);
      rots.push(arrive, arrive, depart);
    });

    return { xs, ys, rots };
  }, [pane.w, pane.h, narrow]);

  const x = useTransform(scrollYProgress, TIMES, xs, { ease: MOVE_EASES });
  const y = useTransform(scrollYProgress, TIMES, ys, { ease: MOVE_EASES });
  const rotate = useTransform(scrollYProgress, TURN_TIMES, rots, { ease: TURN_EASES });

  // The wake only shows while the canoe is actually making way, which is what
  // makes the dwells read as stops rather than as pauses in a video.
  const vx = useVelocity(x);
  const vy = useVelocity(y);
  const wakeRaw = useTransform([vx, vy] as MotionValue<number>[], ([a, b]: number[]) =>
    Math.min(Math.hypot(a, b) / 850, 1),
  );
  const wake = useSpring(wakeRaw, { stiffness: 140, damping: 30, mass: 0.4 });

  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.04, 0.08], [1, 1, 0]);
  const boatOpacity = pane.w > 0 ? 1 : 0;

  const boatW = narrow ? 96 : 132;
  const boatH = narrow ? 33 : 46;
  const gap = narrow ? '1.4rem' : '2.15rem';

  return (
    <section
      aria-labelledby="background-heading"
      ref={containerRef}
      className="h-[400vh] md:h-[460vh]"
      style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
      }}
    >
      <div
        ref={paneRef}
        style={
          {
            position: 'sticky',
            top: 0,
            height: '100dvh',
            overflow: 'hidden',
            isolation: 'isolate',
            // Open ocean shading into a shallow shelf at the bottom right, the
            // way the water reads from altitude.
            background: `
              linear-gradient(118deg, rgba(6,19,36,0.9) 0%, rgba(6,19,36,0.72) 32%, rgba(31,88,131,0.1) 47%, rgba(31,88,131,0) 62%),
              radial-gradient(120% 95% at 6% 4%, #08182c 0%, rgba(8,24,44,0) 58%),
              radial-gradient(95% 85% at 94% 97%, #2a6b95 0%, rgba(42,107,149,0) 64%),
              radial-gradient(70% 60% at 74% 34%, #1a4670 0%, rgba(26,70,112,0) 72%),
              linear-gradient(142deg, #0b1f3a 0%, #10304f 46%, #1b4a70 100%)
            `,
            '--card-w': 'min(20.5rem, calc(100vw - 2.5rem))',
          } as React.CSSProperties
        }
      >
        {/* Seabed. Coarse mottling for the reef, fine grain over the top, both
            masked so the texture only surfaces where the water is shallow. */}
        <div aria-hidden="true" style={SEABED} />

        <h2
          id="background-heading"
          aria-label={HEADING}
          style={{
            position: 'absolute',
            // Clear of the page's fixed nav pill, which floats over this pane.
            top: 'clamp(5.5rem, 13vh, 8rem)',
            left: 'clamp(1.25rem, 5vw, 5rem)',
            right: 'clamp(1.25rem, 5vw, 5rem)',
            zIndex: 6,
            margin: 0,
            pointerEvents: 'none',
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 'clamp(1.35rem, 3.2vw, 2.5rem)',
            fontWeight: 900,
            color: '#f2ecdd',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          <FallingHeading reduced={reduced} />
        </h2>

        {/* Cards. A real list, so the six stops still read in order to a screen
            reader and to anyone who never scrolls the section through. */}
        <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {STOPS.map((stop, i) => (
            <StopCard
              key={stop.title}
              stop={stop}
              index={i}
              progress={scrollYProgress}
              narrow={narrow}
              gap={gap}
              reduced={reduced}
            />
          ))}
        </ol>

        {/* Canoe. A zero-size anchor carries the position and the heading, so
            `rotate` pivots around the waypoint itself. */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            x,
            y,
            rotate,
            opacity: boatOpacity,
            zIndex: 3,
            transition: 'opacity 0.4s ease',
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              left: -boatW * 1.5,
              top: -boatH * 0.34,
              width: boatW * 1.15,
              height: boatH * 0.68,
              opacity: reduced ? 0 : wake,
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse at right, rgba(226,240,255,0.42) 0%, rgba(226,240,255,0.12) 45%, rgba(226,240,255,0) 74%)',
              filter: 'blur(5px)',
            }}
          />

          <motion.div
            animate={reduced ? undefined : { y: [0, -2.5, 0, 2.5, 0], rotate: [0, 0.9, 0, -0.9, 0] }}
            transition={reduced ? undefined : { duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: -boatW / 2,
              top: -boatH / 2,
              width: boatW,
              height: boatH,
            }}
          >
            {/* Shadow cast down onto the seabed. */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transform: 'translate(5px, 15px) scale(0.95)',
                filter: 'blur(7px)',
                opacity: 0.4,
              }}
            >
              <Canoe silhouette />
            </div>
            <Canoe />
          </motion.div>
        </motion.div>

        {/* Scroll affordance — a pinned section with no hint reads as broken. */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 'clamp(2rem, 5vh, 3.25rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 6,
            opacity: hintOpacity,
            fontFamily: 'var(--font-manrope), Manrope, sans-serif',
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            color: 'rgba(242,236,221,0.62)',
          }}
        >
          SCROLL
          <ChevronDown size={13} />
        </motion.div>

        {/* Progress rail. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '2px',
            background: 'rgba(242,236,221,0.14)',
            zIndex: 6,
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'rgba(242,236,221,0.72)',
              transformOrigin: 'left center',
              scaleX: railScale,
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── One stop's card ───
   Positioned by a static wrapper — the wrapper owns the centring translate so
   the motion child is free to animate its own transform. */
function StopCard({
  stop,
  index,
  progress,
  narrow,
  gap,
  reduced,
}: {
  stop: Stop;
  index: number;
  progress: MotionValue<number>;
  narrow: boolean;
  gap: string;
  reduced: boolean;
}) {
  const start = stopStart(index);
  const end = stopEnd(index);

  // Surfaces as the canoe settles and lingers a beat into the departure.
  // Every offset has to stay inside [0, 1] — framer drives these off a scroll
  // timeline, and anything outside that range is rejected as a keyframe.
  const first = index === 0;
  const last = index === STOPS.length - 1;
  const at = [
    first ? 0 : start - 0.01,
    first ? 0.008 : start + 0.02,
    last ? 0.995 : end + 0.01,
    last ? 1 : end + 0.03,
  ];
  // The first card is up almost the moment the section pins; the last one
  // holds to the end rather than fading into the section below it.
  const fade = last ? [0, 1, 1, 1] : [0, 1, 1, 0];

  const rise = stop.card === 'below' ? 18 : -18;
  const opacity = useTransform(progress, at, fade);
  const shift = useTransform(
    progress,
    at,
    reduced ? [0, 0, 0, 0] : [rise, 0, 0, last ? 0 : -rise * 0.6],
  );

  const xPct = narrow ? stop.xNarrow : stop.x;

  return (
    <li
      style={{
        position: 'absolute',
        // Track the canoe, but never let the card hang off the pane.
        left: `clamp(calc(var(--card-w) / 2 + 1.25rem), ${xPct}%, calc(100% - var(--card-w) / 2 - 1.25rem))`,
        ...(stop.card === 'below'
          ? { top: `calc(${stop.y}% + ${gap})` }
          : { bottom: `calc(${100 - stop.y}% + ${gap})` }),
        width: 'var(--card-w)',
        transform: 'translateX(-50%)',
        zIndex: 4,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        style={{
          opacity,
          y: shift,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '0.75rem',
          padding: '1.05rem 1.1rem 1.1rem',
          background: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 20px 46px rgba(4,16,34,0.45), 0 2px 6px rgba(4,16,34,0.22)',
        }}
      >
        <div style={{ minWidth: 0, width: '100%' }}>
          <p
            style={{
              fontFamily: 'var(--font-manrope), Manrope, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.22em',
              color: '#2f5d9e',
              margin: '0 0 0.4rem',
            }}
          >
            {String(index + 1).padStart(2, '0')} / {String(STOPS.length).padStart(2, '0')}
          </p>
          <h3
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '1.15rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.01em',
              lineHeight: 1.18,
              color: '#12233f',
              margin: '0 0 0.45rem',
            }}
          >
            {stop.title}
          </h3>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 500,
              lineHeight: 1.5,
              color: '#4a5b73',
              margin: 0,
            }}
          >
            {stop.body}
          </p>
        </div>
        <img
          src={stop.src}
          alt=""
          style={{
            width: '100%',
            height: '118px',
            objectFit: 'cover',
            borderRadius: '8px',
            display: 'block',
          }}
        />
      </motion.div>
    </li>
  );
}

/* ─── Heading whose letters fall and bounce once into place ─── */
function FallingHeading({ reduced }: { reduced: boolean }) {
  return (
    <>
      {/* Split by word so a word never breaks mid-letter; only the space
          between words is a wrap opportunity. A running index keeps the
          left-to-right stagger continuous across both words. */}
      {HEADING.split(' ').map((word, wi, words) => {
        const charsBefore = words.slice(0, wi).reduce((n, w) => n + w.length + 1, 0);
        return (
          <span
            key={`word-${wi}`}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              marginRight: wi < words.length - 1 ? '0.28em' : 0,
            }}
          >
            {word.split('').map((char, ci) => {
              const i = charsBefore + ci;
              return (
                <motion.span
                  key={`${wi}-${ci}`}
                  aria-hidden="true"
                  initial={reduced ? { opacity: 0 } : { y: -28, opacity: 0 }}
                  whileInView={reduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={
                    reduced
                      ? { duration: 0.4, delay: i * 0.02 }
                      : { type: 'spring', stiffness: 520, damping: 12, delay: i * 0.04 }
                  }
                  style={{ display: 'inline-block', willChange: 'transform' }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </>
  );
}

/* ─── The canoe, seen from directly overhead ─── */
const HULL = 'M3,24 C26,4 98,2 137,24 C98,46 26,44 3,24 Z';

function Canoe({ silhouette = false }: { silhouette?: boolean }) {
  if (silhouette) {
    return (
      <svg viewBox="0 0 140 48" width="100%" height="100%" style={{ display: 'block' }}>
        <path d={HULL} fill="#03101c" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 140 48" width="100%" height="100%" style={{ display: 'block' }}>
      {/* Hull, then the interior inset from it — from above, a canoe is mostly
          the pale floor with a thin band of hull around it. */}
      <path d={HULL} fill="#b0432c" />
      <path d="M15,24 C34,10 96,9 125,24 C96,39 34,38 15,24 Z" fill="#ecdfc6" />
      <path
        d="M15,24 C34,10 96,9 125,24 C96,39 34,38 15,24 Z"
        fill="none"
        stroke="#8f3421"
        strokeWidth="1.2"
      />
      {/* Thwarts */}
      <rect x="43" y="12" width="3" height="24" rx="1.5" fill="#c9b48c" />
      <rect x="92" y="14" width="3" height="20" rx="1.5" fill="#c9b48c" />
      {/* Paddler, and the paddle held out across the gunwale */}
      <g transform="rotate(-34 66 24)">
        <rect x="40" y="22.4" width="56" height="3" rx="1.5" fill="#d9c9a6" />
        <ellipse cx="99" cy="23.9" rx="8" ry="4.4" fill="#c9b48c" />
      </g>
      <ellipse cx="64" cy="24" rx="10" ry="7.4" fill="#26333f" />
      <circle cx="70" cy="24" r="4.6" fill="#38495c" />
    </svg>
  );
}

const SEABED: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  pointerEvents: 'none',
  backgroundImage: `${noise(0.014, 3, 640)}, ${noise(0.85, 4, 220)}`,
  backgroundSize: '640px 640px, 220px 220px',
  opacity: 0.5,
  mixBlendMode: 'soft-light',
  maskImage:
    'radial-gradient(115% 105% at 86% 94%, #000 0%, rgba(0,0,0,0.5) 46%, rgba(0,0,0,0) 80%)',
  WebkitMaskImage:
    'radial-gradient(115% 105% at 86% 94%, #000 0%, rgba(0,0,0,0.5) 46%, rgba(0,0,0,0) 80%)',
};

/** A tile of desaturated fractal noise, as a data URI. Rendered once by the
    browser and repeated — cheaper than filtering a full-bleed element. */
function noise(baseFrequency: number, octaves: number, size: number) {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>` +
    `<filter id='n'>` +
    `<feTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='${octaves}'/>` +
    `<feColorMatrix type='saturate' values='0'/>` +
    `</filter>` +
    `<rect width='100%' height='100%' filter='url(%23n)'/>` +
    `</svg>`;
  return `url("data:image/svg+xml,${svg.replace(/</g, '%3C').replace(/>/g, '%3E').replace(/#/g, '%23')}")`;
}
