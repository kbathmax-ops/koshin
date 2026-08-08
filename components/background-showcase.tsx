'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── Background milestones as full-bleed slides ───
   Copy is lifted/tightened from the original My Background bullets.
   Images are best-effort mappings from public/ — swap freely. */
const SLIDES = [
  {
    title: 'Arts School',
    body: 'Five years learning to think creatively about every situation.',
    src: '/photo-arts-school.jpg',
    accent: '#9dc2ee',
  },
  {
    title: 'Environmental Nonprofit',
    body: 'Two years working on the ground for the environment.',
    src: '/photo-nonprofit.jpg',
    accent: '#9dc2ee',
  },
  {
    title: 'Sales',
    body: 'With one of the best graduation-trip providers in the country.',
    src: '/photo-monaco.jpg',
    accent: '#9dc2ee',
  },
  {
    title: 'Inspired by International Security',
    body: 'Invited to the Halifax International Security Forum, realized national defense is something I want to work in in the future.',
    src: '/photo-security.jpg',
    pos: 'center 64%',
    accent: '#9dc2ee',
  },
  {
    title: 'Languages',
    body: 'Lived in Spain for a month & dedicated myself to learning as many languages as I can for the rest of my life.',
    src: '/photo-languages.jpg',
    accent: '#9dc2ee',
  },
];

const HEADING = 'MY BACKGROUND';

/* ─── Heading whose letters fall and bounce once into place ─── */
function FallingHeading({ reduced }: { reduced: boolean }) {
  return (
    <h2
      aria-label={HEADING}
      style={{
        fontFamily: "'Public Sans', sans-serif",
        fontSize: 'clamp(1.35rem, 3.2vw, 2.5rem)',
        fontWeight: 900,
        // `difference` inverts against whatever slide sits behind it, so the
        // heading stays legible on both the dark and the blown-out frames
        // without hardcoding a colour per slide.
        color: '#ffffff',
        mixBlendMode: 'difference',
        lineHeight: 1.05,
        letterSpacing: '-0.03em',
        margin: 0,
      }}
    >
      {/* Split by word so a word never breaks mid-letter; only the space
          between words is a wrap opportunity. A running index keeps the
          left-to-right stagger continuous across both words. */}
      {HEADING.split(' ').map((word, wi, words) => {
        const charsBefore = words
          .slice(0, wi)
          .reduce((n, w) => n + w.length + 1, 0);
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
                  // Fall distance must stay inside the slideshow's overflow
                  // clip, or the letters start clipped and never register as
                  // in-view — so they'd never animate in at all.
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
    </h2>
  );
}

/* ─── Full-bleed horizontal slideshow ─── */
export function BackgroundShowcase() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [reduced, setReduced] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const go = (next: number) => {
    const wrapped = (next + SLIDES.length) % SLIDES.length;
    setDir(next > index ? 1 : -1);
    setIndex(wrapped);
  };
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  const slide = SLIDES[index];
  const offset = reduced ? 0 : 80;

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(2rem, 5vw, 3.5rem)',
        color: '#12233f',
      }}
    >
      {/* Slideshow — breaks out to full viewport width */}
      <div
        ref={frameRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="My background, slide by slide"
        tabIndex={0}
        onKeyDown={onKeyDown}
        style={{
          position: 'relative',
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          height: 'clamp(28rem, 72vh, 52rem)',
          overflow: 'hidden',
          background: '#0a0a0a',
          outlineOffset: '-3px',
          // Contain the heading's blend mode to the slideshow so it composites
          // against the slides, not the page background behind them.
          isolation: 'isolate',
        }}
      >
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ x: dir * offset, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir * -offset, opacity: 0 }}
            transition={{ duration: reduced ? 0.25 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img
              src={slide.src}
              alt={slide.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                // Portrait sources crop hard in this wide frame; `pos` lets a
                // slide pick the band worth keeping.
                objectPosition: slide.pos ?? 'center 45%',
                filter: 'brightness(0.55) saturate(0.85)',
                display: 'block',
              }}
            />
            {/* Legibility gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.45) 45%, rgba(10,10,10,0.15) 100%)',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Heading — overlaid on the slides, top-left, aligned with the copy */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(2.5rem, 6vh, 4rem)',
            left: 'clamp(1.5rem, 5vw, 5rem)',
            right: 'clamp(1.5rem, 5vw, 5rem)',
            zIndex: 7,
            pointerEvents: 'none',
          }}
        >
          <FallingHeading reduced={reduced} />
        </div>

        {/* Slide text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${index}-text`}
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -10 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            style={{
              position: 'absolute',
              left: 'clamp(1.5rem, 5vw, 5rem)',
              right: 'clamp(1.5rem, 5vw, 5rem)',
              bottom: 'clamp(3.5rem, 9vh, 6rem)',
              maxWidth: '46rem',
              zIndex: 5,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-manrope), Manrope, sans-serif',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: slide.accent,
                margin: '0 0 1rem',
              }}
            >
              {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </p>
            <h3
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: '#f2ecdd',
                margin: '0 0 1rem',
                textWrap: 'balance',
              }}
            >
              {slide.title}
            </h3>
            <p
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                fontWeight: 600,
                lineHeight: 1.5,
                color: 'rgba(242,236,221,0.9)',
                margin: 0,
              }}
            >
              {slide.body}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button onClick={prev} aria-label="Previous slide" style={arrowStyle('left')}>
          <ChevronLeft size={22} />
        </button>
        <button onClick={next} aria-label="Next slide" style={arrowStyle('right')}>
          <ChevronRight size={22} />
        </button>

        {/* Dots */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(1.25rem, 3vh, 2rem)',
            left: 'clamp(1.5rem, 5vw, 5rem)',
            display: 'flex',
            gap: '0.5rem',
            zIndex: 6,
          }}
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              style={{
                width: i === index ? '2rem' : '0.55rem',
                height: '0.55rem',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                background: i === index ? 'rgba(242,236,221,0.95)' : 'rgba(242,236,221,0.35)',
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function arrowStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    [side]: 'clamp(1rem, 2.5vw, 2rem)',
    width: '3rem',
    height: '3rem',
    borderRadius: '999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.4)',
    backdropFilter: 'blur(6px)',
    border: '1px solid rgba(242,236,221,0.2)',
    color: '#f2ecdd',
    cursor: 'pointer',
    zIndex: 6,
    transition: 'background 0.2s',
  };
}
