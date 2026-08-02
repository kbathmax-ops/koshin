'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WORLD, EUROPE } from '@/lib/travel-map-data';
import { getTravelNote, type TravelNote } from '@/lib/travel-notes';

/*
 * "X Marks The Spot" travel map — adapted from the Claude Design project into
 * a native React + framer-motion component in the site's own fonts (Plus
 * Jakarta Sans / mono) and warm palette.
 *
 * The whole world assembles on scroll-into-view and X-marks pop at every
 * visited country. The five European stops are tightly clustered, so a
 * magnifier lens zooms into Europe to make them legible.
 *
 * Any mark with a written note in lib/travel-notes.ts is clickable and opens a
 * dialog with the story for that place. Marks without a note stay decorative.
 *
 * Geography is baked at build time (scripts/gen-travel-map.mjs) — the browser
 * ships static SVG, no d3 in the bundle, no runtime map fetch.
 */

const LAND = 'rgba(18,35,63,0.10)';
const LAND_STROKE = 'rgba(18,35,63,0.28)';
const VISITED_FILL = 'rgba(47,93,158,0.22)';
const VISITED_STROKE = '#2f5d9e';
const MARK = '#1b3a6b';
const MARK_HOT = '#4b82c9';
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

/*
 * Popovers anchor to the WORLD coordinates of a mark, never the lens copy —
 * so clicking "Italy" in the magnifier still points at Italy on the globe.
 */
const WORLD_MARK_BY_NAME = new Map(WORLD.marks.map((m) => [m.name, m]));

// Popover box width, and half of it — used to clamp the card inside the frame.
const POP_W = 'min(19rem, 72vw)';
const POP_HALF = 'min(9.5rem, 36vw)';

type OpenNote = TravelNote & {
  /** Anchor position as a percentage of the map frame. */
  leftPct: number;
  topPct: number;
  /** Below the mark by default; above it when the mark sits low in the frame. */
  placement: 'above' | 'below';
};

export function TravelMap() {
  const [reduced, setReduced] = useState(false);
  const [open, setOpen] = useState<OpenNote | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  /*
   * Escape closes the popover, as does a pointer landing outside the map frame.
   * Clicks *inside* the frame are left alone so the marks keep their own
   * toggle/switch behaviour instead of fighting a close-then-reopen race.
   */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    const onPointer = (e: PointerEvent) => {
      const frame = frameRef.current;
      if (frame && !frame.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  const select = useCallback((name: string) => {
    const note = getTravelNote(name);
    const mark = WORLD_MARK_BY_NAME.get(name);
    if (!note || !mark) return;
    setOpen((prev) => {
      if (prev?.name === name) return null; // clicking the same X closes it
      return {
        ...note,
        leftPct: (mark.x / WORLD.W) * 100,
        topPct: (mark.y / WORLD.H) * 100,
        placement: mark.y > WORLD.H * 0.55 ? 'above' : 'below',
      };
    });
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
        ref={frameRef}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.3 }}
        style={{ position: 'relative', width: '100%', maxWidth: '1440px', aspectRatio: `${WORLD.W} / ${WORLD.H}` }}
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
            const note = getTravelNote(m.name);
            const active = open?.name === m.name;
            return (
              <g key={m.name}>
                {/* Outer group owns the scroll-in pop (inherits parent variants);
                    the inner group owns hover/selection so re-selecting doesn't
                    replay the staggered entrance delay. */}
                <motion.g
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    shown: { scale: 1, opacity: 1, transition: { duration: reduced ? 0.3 : 0.5, delay: marksBase + i * 0.07, ease: reduced ? 'easeOut' : EASE_OUT_BACK } },
                  }}
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                >
                  <motion.g
                    animate={{ scale: active ? 1.3 : 1 }}
                    whileHover={note ? { scale: 1.3 } : undefined}
                    transition={{ duration: 0.25, ease: EASE_OUT_BACK }}
                    onClick={note ? () => select(m.name) : undefined}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center', cursor: note ? 'pointer' : 'default' }}
                  >
                    {/* Invisible disc widens the tap target well past the stroke. */}
                    {note && <circle cx={m.x} cy={m.y} r={s * 2.1} fill="transparent" />}
                    <line x1={m.x - s} y1={m.y - s} x2={m.x + s} y2={m.y + s} stroke={active ? MARK_HOT : MARK} strokeWidth={m.europe ? 4 : 6} strokeLinecap="round" />
                    <line x1={m.x + s} y1={m.y - s} x2={m.x - s} y2={m.y + s} stroke={active ? MARK_HOT : MARK} strokeWidth={m.europe ? 4 : 6} strokeLinecap="round" />
                  </motion.g>
                </motion.g>
                {m.label && (
                  <motion.text
                    x={m.x} y={m.y + 34} textAnchor="middle"
                    variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.35, delay: marksBase + i * 0.07 + 0.12 } } }}
                    onClick={note ? () => select(m.name) : undefined}
                    style={{ fontFamily: "'Public Sans', sans-serif", fontSize: '22px', fontWeight: 800, fill: '#12233f', paintOrder: 'stroke', stroke: '#d9d9d9', strokeWidth: 4, strokeLinejoin: 'round', cursor: note ? 'pointer' : 'default' }}
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
            border: `2.5px solid ${VISITED_STROKE}`, background: '#e2e2e2',
            boxShadow: '0 12px 40px rgba(18,35,63,0.20), inset 0 0 30px rgba(18,35,63,0.06)',
            transformOrigin: 'center',
          }}
        >
          <svg viewBox={`0 0 ${EUROPE.W} ${EUROPE.H}`} preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {EUROPE.countries.map((c, i) => (
              <path key={c.name + i} d={c.d} style={{ fill: c.visited ? VISITED_FILL : LAND, stroke: c.visited ? VISITED_STROKE : LAND_STROKE, strokeWidth: c.visited ? 1.4 : 0.9, strokeLinejoin: 'round' }} />
            ))}
            {EUROPE.marks.map((m) => {
              const note = getTravelNote(m.name);
              return (
                <g
                  key={m.name}
                  onClick={note ? () => select(m.name) : undefined}
                  style={{ cursor: note ? 'pointer' : 'default' }}
                >
                  {note && <circle cx={m.x} cy={m.y} r={34} fill="transparent" />}
                  <line x1={m.x - 15} y1={m.y - 15} x2={m.x + 15} y2={m.y + 15} stroke={MARK} strokeWidth={6} strokeLinecap="round" />
                  <line x1={m.x + 15} y1={m.y - 15} x2={m.x - 15} y2={m.y + 15} stroke={MARK} strokeWidth={6} strokeLinecap="round" />
                  <text x={m.x} y={m.y + 36} textAnchor="middle" style={{ fontFamily: "'Public Sans', sans-serif", fontSize: '30px', fontWeight: 800, fill: '#12233f', paintOrder: 'stroke', stroke: '#d9d9d9', strokeWidth: 6, strokeLinejoin: 'round' }}>{m.name}</text>
                </g>
              );
            })}
          </svg>
          <span style={{ position: 'absolute', top: '7%', left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-manrope), Manrope, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: VISITED_STROKE, pointerEvents: 'none' }}>
            Europe
          </span>
        </motion.div>

        {/* ── Note popover: pops out of the X it belongs to ── */}
        <AnimatePresence>
          {open && (
            <div ref={popRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20 }}>
              {/* Pointer stays pinned to the mark even when the card is nudged
                  inward to clear the map edge. */}
              {/* Static wrappers own the placement transform — framer animates
                  `transform` too, so anchoring and animation can't share an
                  element without one overwriting the other. */}
              <span
                style={{
                  position: 'absolute',
                  left: `${open.leftPct}%`,
                  top: `${open.topPct}%`,
                  transform: open.placement === 'below'
                    ? 'translate(-50%, 14px)'
                    : 'translate(-50%, calc(-100% - 14px))',
                }}
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={{ duration: reduced ? 0.12 : 0.22 }}
                  style={{
                    display: 'block',
                    width: 0, height: 0,
                    borderLeft: '7px solid transparent',
                    borderRight: '7px solid transparent',
                    ...(open.placement === 'below'
                      ? { borderBottom: `8px solid ${MARK_HOT}` }
                      : { borderTop: `8px solid ${MARK_HOT}` }),
                  }}
                />
              </span>

              <div
                style={{
                  position: 'absolute',
                  // Clamp horizontally so the card never spills off the map.
                  left: `clamp(${POP_HALF}, ${open.leftPct}%, calc(100% - ${POP_HALF}))`,
                  top: `${open.topPct}%`,
                  width: POP_W,
                  transform: open.placement === 'below'
                    ? 'translate(-50%, 22px)'
                    : 'translate(-50%, calc(-100% - 22px))',
                }}
              >
              <motion.div
                role="dialog"
                aria-label={open.name}
                initial={{ opacity: 0, scale: 0.94, y: open.placement === 'below' ? -8 : 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: open.placement === 'below' ? -6 : 6 }}
                transition={{ duration: reduced ? 0.15 : 0.26, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'relative',
                  pointerEvents: 'auto',
                  background: '#eeeeee',
                  border: `1px solid ${MARK_HOT}55`,
                  borderRadius: '0.9rem',
                  padding: '1.15rem 1.25rem 1.3rem',
                  boxShadow: '0 18px 50px rgba(18,35,63,0.22)',
                }}
              >
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(null)}
                  aria-label="Close"
                  style={{
                    position: 'absolute', top: '0.5rem', right: '0.5rem',
                    width: '1.75rem', height: '1.75rem', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(18,35,63,0.06)', border: 'none',
                    color: 'rgba(18,35,63,0.6)', fontSize: '0.8rem', lineHeight: 1, cursor: 'pointer',
                  }}
                >
                  ✕
                </button>

                <p style={{
                  fontFamily: 'var(--font-manrope), Manrope, sans-serif', fontSize: '0.56rem', fontWeight: 900,
                  letterSpacing: '0.3em', textTransform: 'uppercase', color: MARK_HOT, margin: 0,
                }}>
                  {open.where || 'Been there'}
                </p>

                <h3 style={{
                  fontFamily: "'Public Sans', sans-serif", fontWeight: 900,
                  fontSize: '1.15rem', letterSpacing: '-0.03em', lineHeight: 1.15,
                  color: '#12233f', margin: '0.45rem 2rem 0 0',
                }}>
                  {open.name}
                </h3>

                {open.when && (
                  <p style={{
                    fontFamily: 'var(--font-manrope), Manrope, sans-serif', fontSize: '0.58rem', fontWeight: 700,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(18,35,63,0.42)', margin: '0.4rem 0 0',
                  }}>
                    {open.when}
                  </p>
                )}

                <p style={{
                  fontSize: '0.82rem', lineHeight: 1.6, color: 'rgba(18,35,63,0.72)',
                  margin: '0.8rem 0 0', whiteSpace: 'pre-line',
                }}>
                  {open.blurb}
                </p>
              </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Visited chips — the keyboard-accessible way into the same notes. */}
      <figcaption style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem 1.1rem', fontFamily: 'var(--font-manrope), Manrope, sans-serif', fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(18,35,63,0.5)' }}>
        {WORLD.marks.map((m) => {
          const note = getTravelNote(m.name);
          const inner = (
            <>
              <span style={{ color: note ? MARK_HOT : MARK }}>✕</span>
              {m.name}
            </>
          );
          if (!note) {
            return (
              <span key={m.name} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                {inner}
              </span>
            );
          }
          return (
            <button
              key={m.name}
              type="button"
              onClick={() => select(m.name)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                font: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit',
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                color: 'rgba(18,35,63,0.82)',
                borderBottom: '1px dotted rgba(18,35,63,0.35)',
              }}
            >
              {inner}
            </button>
          );
        })}
      </figcaption>

    </figure>
  );
}
