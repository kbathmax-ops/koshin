'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WORLD, EUROPE } from '@/lib/travel-map-data';

/*
 * "X Marks The Spot" travel map — adapted from the Claude Design project into
 * a native React + framer-motion component in the site's own fonts (Plus
 * Jakarta Sans / mono) and warm palette.
 *
 * The whole world assembles on scroll-into-view and X-marks pop at every
 * visited country. The five European stops are tightly clustered, so a
 * magnifier lens zooms into Europe to make them legible.
 *
 * Geography is baked at build time (scripts/gen-travel-map.mjs) — the browser
 * ships static SVG, no d3 in the bundle, no runtime map fetch.
 */

const LAND = 'rgba(242,236,221,0.08)';
const LAND_STROKE = 'rgba(242,236,221,0.20)';
const VISITED_FILL = 'rgba(196,149,106,0.22)';
const VISITED_STROKE = '#c4956a';
const MARK = '#d9480f';
const EASE_OUT_BACK: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

// Lens geometry (fractions of the world frame). The frame aspect equals
// WORLD.W / WORLD.H, so SVG user units map linearly to frame pixels.
const LENS_W = 0.27;
const LENS_LEFT = 0.03;
const LENS_BOTTOM = 0.05;

const lensCX = (LENS_LEFT + LENS_W / 2) * WORLD.W;
const lensR = (LENS_W / 2) * WORLD.W;
const lensCY = (1 - (LENS_BOTTOM + LENS_W)) * WORLD.H;

// Connector from the Europe anchor ring to the edge of the lens.
const A = WORLD.europeAnchor;
const cdx = lensCX - A.x, cdy = lensCY - A.y, cLen = Math.hypot(cdx, cdy) || 1;
const ux = cdx / cLen, uy = cdy / cLen;
const p1 = { x: A.x + ux * A.r, y: A.y + uy * A.r };
const p2 = { x: lensCX - ux * lensR, y: lensCY - uy * lensR };

export function TravelMap() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const marksBase = reduced ? 0 : 1.0;
  const lensDelay = reduced ? 0.1 : marksBase + WORLD.marks.length * 0.07 + 0.25;

  const flyIn = (c: (typeof WORLD.countries)[number]) => ({
    hidden: reduced ? { opacity: 0 } : { opacity: 0, x: c.dx, y: c.dy, rotate: c.rot },
    shown: {
      opacity: 1, x: 0, y: 0, rotate: 0,
      transition: { duration: reduced ? 0.4 : 0.8, delay: reduced ? 0 : c.delay * 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  });

  const landStyle = (visited: boolean) => ({
    fill: visited ? VISITED_FILL : LAND,
    stroke: visited ? VISITED_STROKE : LAND_STROKE,
    strokeWidth: visited ? 1 : 0.6,
    strokeLinejoin: 'round' as const,
    transformBox: 'fill-box' as const,
    transformOrigin: 'center',
  });

  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.3 }}
        style={{ position: 'relative', width: '100%', maxWidth: '980px', aspectRatio: `${WORLD.W} / ${WORLD.H}` }}
      >
        <svg viewBox={`0 0 ${WORLD.W} ${WORLD.H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
          {WORLD.countries.map((c, i) => (
            <motion.path key={c.name + i} d={c.d} variants={flyIn(c)} style={landStyle(c.visited)} />
          ))}

          {/* Region ring + connector to the magnifier lens */}
          <motion.circle
            cx={A.x} cy={A.y} r={A.r} fill="none" stroke={VISITED_STROKE} strokeWidth={2} strokeDasharray="5 6"
            variants={{ hidden: { opacity: 0 }, shown: { opacity: 0.9, transition: { duration: 0.4, delay: lensDelay - 0.15 } } }}
          />
          <motion.line
            x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={VISITED_STROKE} strokeWidth={1.6} strokeDasharray="5 6"
            variants={{ hidden: { opacity: 0 }, shown: { opacity: 0.65, transition: { duration: 0.4, delay: lensDelay - 0.1 } } }}
          />

          {/* X-marks. European ones are small (the lens carries the detail). */}
          {WORLD.marks.map((m, i) => {
            const s = m.europe ? 9 : 15;
            return (
              <g key={m.name}>
                <motion.g
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    shown: { scale: 1, opacity: 1, transition: { duration: reduced ? 0.3 : 0.5, delay: marksBase + i * 0.07, ease: reduced ? 'easeOut' : EASE_OUT_BACK } },
                  }}
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                >
                  <line x1={m.x - s} y1={m.y - s} x2={m.x + s} y2={m.y + s} stroke={MARK} strokeWidth={m.europe ? 4 : 6} strokeLinecap="round" />
                  <line x1={m.x + s} y1={m.y - s} x2={m.x - s} y2={m.y + s} stroke={MARK} strokeWidth={m.europe ? 4 : 6} strokeLinecap="round" />
                </motion.g>
                {m.label && (
                  <motion.text
                    x={m.x} y={m.y + 34} textAnchor="middle"
                    variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.35, delay: marksBase + i * 0.07 + 0.12 } } }}
                    style={{ fontFamily: "'Public Sans', sans-serif", fontSize: '22px', fontWeight: 800, fill: '#f2ecdd', paintOrder: 'stroke', stroke: '#0d0d0d', strokeWidth: 4, strokeLinejoin: 'round' }}
                  >
                    {m.name}
                  </motion.text>
                )}
              </g>
            );
          })}
        </svg>

        {/* ── Magnifier lens: zoomed Europe ── */}
        <motion.div
          variants={{
            hidden: { scale: 0.4, opacity: 0 },
            shown: { scale: 1, opacity: 1, transition: { duration: reduced ? 0.3 : 0.55, delay: lensDelay, ease: reduced ? 'easeOut' : EASE_OUT_BACK } },
          }}
          style={{
            position: 'absolute', left: `${LENS_LEFT * 100}%`, bottom: `${LENS_BOTTOM * 100}%`,
            width: `${LENS_W * 100}%`, aspectRatio: '1', borderRadius: '50%', overflow: 'hidden',
            border: `2.5px solid ${VISITED_STROKE}`, background: '#0d0d0d',
            boxShadow: '0 12px 40px rgba(0,0,0,0.55), inset 0 0 30px rgba(0,0,0,0.5)',
            transformOrigin: 'center',
          }}
        >
          <svg viewBox={`0 0 ${EUROPE.W} ${EUROPE.H}`} preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {EUROPE.countries.map((c, i) => (
              <path key={c.name + i} d={c.d} style={{ fill: c.visited ? VISITED_FILL : LAND, stroke: c.visited ? VISITED_STROKE : LAND_STROKE, strokeWidth: c.visited ? 1.4 : 0.9, strokeLinejoin: 'round' }} />
            ))}
            {EUROPE.marks.map((m) => (
              <g key={m.name}>
                <line x1={m.x - 15} y1={m.y - 15} x2={m.x + 15} y2={m.y + 15} stroke={MARK} strokeWidth={6} strokeLinecap="round" />
                <line x1={m.x + 15} y1={m.y - 15} x2={m.x - 15} y2={m.y + 15} stroke={MARK} strokeWidth={6} strokeLinecap="round" />
                <text x={m.x} y={m.y + 36} textAnchor="middle" style={{ fontFamily: "'Public Sans', sans-serif", fontSize: '30px', fontWeight: 800, fill: '#f2ecdd', paintOrder: 'stroke', stroke: '#0d0d0d', strokeWidth: 6, strokeLinejoin: 'round' }}>{m.name}</text>
              </g>
            ))}
          </svg>
          <span style={{ position: 'absolute', top: '7%', left: 0, right: 0, textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: VISITED_STROKE, pointerEvents: 'none' }}>
            Europe
          </span>
        </motion.div>
      </motion.div>

      {/* Visited chips */}
      <figcaption style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem 1.1rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(242,236,221,0.5)' }}>
        {WORLD.marks.map((m) => (
          <span key={m.name} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ color: MARK }}>✕</span>
            {m.name}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
