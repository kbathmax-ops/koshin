'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Lenis from 'lenis';

/* ─── Landscape images (curated for story mood) ─── */
const IMAGES = [
  '/photo-concert.jpg', // concert hero
  '/photo-spain.jpg',   // Spain solo photo (Origin row)
  '/photo-monaco.jpg',  // Monaco group photo (atmospheric wide)
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=1600', // forest path
];

/* ─── Sticky hero image that clips → expands on scroll ─── */
function CenterImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const clipProgress = useTransform(scrollY, [200, 1400], [0, 1]);
  const scale = useTransform(clipProgress, [0, 1], [1, 1.06]);

  const clip = useTransform(clipProgress, (v) => {
    const top = 28 - v * 28;
    const bottom = 72 + v * 28;
    const left = 22 - v * 22;
    const right = 78 + v * 22;
    return `polygon(${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%)`;
  });

  return (
    <div
      ref={ref}
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: clip,
          scale,
          transformOrigin: 'center center',
        }}
      >
        <img
          src={IMAGES[0]}
          alt="Mountain landscape"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.45) saturate(0.7)',
          }}
        />
        {/* Overlay tint */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.1) 50%, rgba(13,13,13,0.5) 100%)',
          }}
        />
      </motion.div>
    </div>
  );
}

/* ─── Section label + heading + body as a text block ─── */
interface StoryBlockProps {
  label: string;
  heading: string;
  children: React.ReactNode;
}

function StoryBlock({ label, heading, children }: StoryBlockProps) {
  return (
    <div>
      <p
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          fontWeight: 900,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: '#9d4305',
          marginBottom: '1rem',
        }}
      >
        {label}
      </p>
      <h2
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 900,
          color: '#f2ecdd',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          marginBottom: '1rem',
        }}
      >
        {heading}
      </h2>
      <div
        style={{
          color: 'rgba(242,236,221,0.6)',
          fontSize: '1rem',
          lineHeight: 1.75,
          maxWidth: '32ch',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ─── Single parallax image+text row ─── */
interface ParallaxRowProps {
  src: string;
  alt: string;
  flip?: boolean;
  speed?: number;
  compact?: boolean;
  text: React.ReactNode;
}

function ParallaxRow({ src, alt, flip = false, speed = 1, compact = false, text }: ParallaxRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60 * speed, -60 * speed]);

  const imgFlex = compact ? '0 0 30%' : '0 0 42%';
  const aspectRatio = compact ? '3/4' : '4/5';

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: flip ? 'row-reverse' : 'row',
        alignItems: 'center',
        gap: 'clamp(2rem, 5vw, 5rem)',
        padding: '0 clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      {/* Image */}
      <motion.div
        style={{
          flex: imgFlex,
          y,
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            aspectRatio,
            objectFit: 'cover',
            display: 'block',
            filter: 'brightness(0.75) saturate(0.8)',
          }}
        />
      </motion.div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        {text}
      </div>
    </div>
  );
}

/* ─── Wide atmospheric image (no text) ─── */
function AtmosphericImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div
      ref={ref}
      style={{
        padding: '0 clamp(1.5rem, 5vw, 5rem)',
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{
          y,
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            aspectRatio: '4/3',
            objectFit: 'cover',
            objectPosition: 'center 55%',
            display: 'block',
            filter: 'brightness(0.6) saturate(0.7)',
          }}
        />
      </motion.div>
    </div>
  );
}

/* ─── Section 03 — overlapping landscape + portrait ─── */
function Section03() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const landscapeY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const portraitY  = useTransform(scrollYProgress, [0, 1], [80, -90]);
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 'clamp(2rem, 5vw, 5rem)',
        padding: '0 clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      {/* Image stack */}
      <div style={{ flex: '0 0 52%', position: 'relative', minHeight: 320 }}>
        {/* Landscape — wide horizontal */}
        <motion.div
          style={{
            y: landscapeY,
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
          }}
        >
          <img
            src="/photo-mountains.jpg"
            alt="Hazy mountain layers"
            style={{
              width: '100%',
              aspectRatio: '16/9',
              objectFit: 'cover',
              objectPosition: 'center 40%',
              display: 'block',
              filter: 'brightness(0.72) saturate(0.85)',
            }}
          />
        </motion.div>

        {/* Portrait — overlapping bottom-right */}
        <motion.div
          style={{
            y: portraitY,
            rotate: portraitRotate,
            position: 'absolute',
            bottom: '-3.5rem',
            right: '-2rem',
            width: '38%',
            borderRadius: '0.875rem',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            border: '2px solid rgba(255,255,255,0.07)',
          }}
        >
          <img
            src="/photo-mirror-selfie.jpg"
            alt="Mirror selfie"
            style={{
              width: '100%',
              aspectRatio: '3/4',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
              filter: 'brightness(0.85) saturate(0.9)',
            }}
          />
        </motion.div>
      </div>

      {/* Text */}
      <div style={{ flex: 1, paddingBottom: '2rem' }}>
        <StoryBlock label="03 — What makes me different" heading="Experimenting as of April 2026">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {['builds + distribution', 'marketing campaigns'].map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#9d4305', flexShrink: 0 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/work"
            style={{
              marginTop: '2rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#f2ecdd',
              color: '#0d0d0d',
              padding: '0.875rem 1.75rem',
              borderRadius: '9999px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 900,
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}
          >
            See the Work
            <ArrowRight style={{ width: '1rem', height: '1rem' }} />
          </Link>
        </StoryBlock>
      </div>
    </div>
  );
}

/* ─── Travel carousel ─── */
const TRAVEL_SLIDES = [
  {
    src: '/photo-monaco.jpg',
    alt: 'Monaco',
    caption: 'Monaco — harbour views with friends',
    captionColor: '#f0a96b',  // warm amber against cool grey overcast
  },
  {
    src: '/photo-spain-volunteer.jpg',
    alt: 'Spain volunteer program',
    caption: 'Spain — international English volunteer program',
    captionColor: '#7ee8c8',  // cool mint against warm amber night lights
  },
  {
    src: '/photo-concert.jpg',
    alt: 'Concert',
    caption: 'Live music — the energy is different',
    captionColor: '#b8ff6e',  // lime against dark stage blacks
  },
  {
    src: '/photo-jeju.jpg',
    alt: 'Jeju-do, Korea',
    caption: 'Jeju-do, Korea — volcanic coastline walks',
    captionColor: '#ff8c5a',  // warm coral against cool grey sky and green grass
  },
  {
    src: '/photo-malaga.jpg',
    alt: 'Málaga, Spain',
    caption: 'Málaga, Spain — learning expresiones malagueñas',
    captionColor: '#5ab4ff',  // electric blue against warm white/green classroom
  },
];

function TravelCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  const prev = () => go((index - 1 + TRAVEL_SLIDES.length) % TRAVEL_SLIDES.length);
  const next = () => go((index + 1) % TRAVEL_SLIDES.length);

  const slide = TRAVEL_SLIDES[index];

  return (
    <div
      style={{
        padding: '0 clamp(1.5rem, 5vw, 5rem)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
          aspectRatio: '4/3',
        }}
      >
        {/* Slides */}
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ x: dir * 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir * -60, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 55%',
                display: 'block',
                filter: 'brightness(0.6) saturate(0.7)',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        <AnimatePresence mode="wait">
          <motion.p
            key={index + '-caption'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            style={{
              position: 'absolute',
              bottom: '1.25rem',
              left: '1.5rem',
              right: '5rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: slide.captionColor,
              zIndex: 10,
              lineHeight: 1.4,
            }}
          >
            {slide.caption}
          </motion.p>
        </AnimatePresence>

        {/* Dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.4rem',
            right: '1.5rem',
            display: 'flex',
            gap: '0.4rem',
            zIndex: 10,
          }}
        >
          {TRAVEL_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                width: i === index ? '1.4rem' : '0.4rem',
                height: '0.4rem',
                borderRadius: '9999px',
                background: i === index ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Prev / Next arrows */}
        {[
          { fn: prev, label: 'Previous', side: 'left' as const, Icon: ChevronLeft },
          { fn: next, label: 'Next',     side: 'right' as const, Icon: ChevronRight },
        ].map(({ fn, label, side, Icon }) => (
          <button
            key={side}
            onClick={fn}
            aria-label={label}
            style={{
              position: 'absolute',
              top: '50%',
              [side]: '0.75rem',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '50%',
              width: '2rem',
              height: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.8)',
              zIndex: 10,
              transition: 'background 0.2s',
            }}
          >
            <Icon size={14} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Title block that fades out as you scroll ─── */
function TitleBlock() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, -40]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        pointerEvents: 'none',
        opacity,
        y,
        padding: 'clamp(5rem, 12vh, 8rem) clamp(1.5rem, 5vw, 5rem) 0',
      }}
    >
      <p
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          fontWeight: 900,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#9d4305',
          marginBottom: '1.25rem',
        }}
      >
        The Story
      </p>
      <h1
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(2.8rem, 7vw, 6rem)',
          fontWeight: 900,
          color: '#f2ecdd',
          lineHeight: 0.9,
          letterSpacing: '-0.04em',
          maxWidth: '14ch',
        }}
      >
        jack of all trades meets tech
      </h1>
    </motion.div>
  );
}

/* ─── Bottom CTA ─── */
function StoryCTA() {
  return (
    <div
      style={{
        padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 5rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '1px',
          background: 'rgba(242,236,221,0.1)',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          maxWidth: '28ch',
        }}
      >
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            fontWeight: 900,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#9d4305',
          }}
        >
          Next
        </p>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 900,
            color: '#f2ecdd',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Ready to build something?
        </p>
        <p style={{ color: 'rgba(242,236,221,0.5)', fontSize: '0.95rem', lineHeight: 1.7 }}>
          Available for internships and freelance projects. I reply to everything.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link
          href="/work"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#f2ecdd',
            color: '#0d0d0d',
            padding: '1rem 2rem',
            borderRadius: '9999px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 900,
            fontSize: '0.875rem',
            textDecoration: 'none',
          }}
        >
          See the Work
          <ArrowRight style={{ width: '1rem', height: '1rem' }} />
        </Link>
        <Link
          href="/work#contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(242,236,221,0.08)',
            color: '#f2ecdd',
            padding: '1rem 2rem',
            borderRadius: '9999px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 900,
            fontSize: '0.875rem',
            textDecoration: 'none',
            border: '1px solid rgba(242,236,221,0.12)',
          }}
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}

/* ─── Root component ─── */
export function StoryPageClient() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 });
    let rafId: number;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  return (
    <div style={{ background: '#0d0d0d', minHeight: '100vh', color: '#f2ecdd' }}>
      {/* Fixed title (fades out on scroll) */}
      <TitleBlock />

      {/* Sticky zoom hero — takes up 100vh, scroll drives clip+zoom */}
      <div style={{ height: '280vh', position: 'relative' }}>
        <CenterImage />
      </div>

      {/* Parallax story rows */}
      <div style={{ position: 'relative', zIndex: 2, background: '#0d0d0d', paddingTop: '4rem', paddingBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '5rem' }}>

        {/* 01 — Origin */}
        <ParallaxRow
          src={IMAGES[1]}
          alt="Lake valley at dusk"
          speed={0.8}
          compact
          text={
            <div>
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                  fontWeight: 900,
                  color: '#f2ecdd',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  marginBottom: '1.5rem',
                }}
              >
                My Background
              </h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Arts school for 5 years → learned to think creatively about every situation',
                  'Environmental nonprofit for 2 years',
                  'Sales with one of the best graduation trip providers',
                  'Inspired by a NATO conference → fostered a passion in international security',
                  'Learned Korean, Spanish, and French abroad',
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      color: 'rgba(242,236,221,0.95)',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: '#d9480f', fontWeight: 900, marginTop: '0.1em', flexShrink: 0 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          }
        />

        {/* Atmospheric wide shot */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ padding: '0 clamp(1.5rem, 5vw, 5rem)' }}>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              fontWeight: 900,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#9d4305',
              marginBottom: '0.75rem',
            }}>
              Travel
            </p>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 900,
              color: '#f2ecdd',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}>
              Developed a passion for travel &amp; cultural exchange.
            </h2>
          </div>
          <TravelCarousel />
        </div>

        {/* 03 — What makes me different */}
        <Section03 />


      </div>

    </div>
  );
}
