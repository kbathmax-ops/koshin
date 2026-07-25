'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Lenis from 'lenis';
import { BackgroundShowcase } from './background-showcase';
import { TravelMap } from './travel-map';

/* ─── Landscape images (curated for story mood) ─── */
const IMAGES = [
  '/photo-concert.jpg', // concert hero
  '/photo-spain.jpg',   // Spain solo photo (Origin row)
  '/photo-monaco.jpg',  // Monaco group photo (atmospheric wide)
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=1600', // forest path
];

/* ─── Sticky hero image that clips → expands on scroll ─── */
function CenterImage({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  const clipProgress = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
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
        height: '100dvh',
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
          fontFamily: "'Public Sans', sans-serif",
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

/* ─── Section 03 — overlapping landscape + portrait ─── */
function Section03() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const landscapeY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div
      ref={ref}
      className="story-row flex flex-col md:flex-row items-center"
      style={{
        gap: 'clamp(2rem, 5vw, 5rem)',
        padding: '0 clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      {/* Single portrait */}
      <motion.div
        className="w-full flex-none md:flex-[0_0_42%]"
        style={{
          y: landscapeY,
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
        }}
      >
        {/* Placeholder — image to be added */}
        <div
          aria-hidden="true"
          style={{
            width: '100%',
            aspectRatio: '3/4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(242,236,221,0.03)',
            border: '1px dashed rgba(242,236,221,0.22)',
            color: 'rgba(242,236,221,0.35)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          Image
        </div>
      </motion.div>

      {/* Text */}
      <div className="w-full" style={{ flex: 1, paddingBottom: '2rem' }}>
        <StoryBlock label="03 — Section label" heading="Section heading">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              'Point one',
              'Point two',
              'Point three',
            ].map((text) => (
              <li key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#9d4305', flexShrink: 0 }} />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <Link
            href="#"
            style={{
              marginTop: '2rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#f2ecdd',
              color: '#0d0d0d',
              padding: '0.875rem 1.75rem',
              borderRadius: '9999px',
              fontFamily: "'Public Sans', sans-serif",
              fontWeight: 900,
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}
          >
            Button label
            <ArrowRight style={{ width: '1rem', height: '1rem' }} />
          </Link>
        </StoryBlock>
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
          fontFamily: "'Public Sans', sans-serif",
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
            fontFamily: "'Public Sans', sans-serif",
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
          looking for growth, content, ugc, ai consulting? I'll get back to you within a day
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
            fontFamily: "'Public Sans', sans-serif",
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
            fontFamily: "'Public Sans', sans-serif",
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
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 });
    let rafId: number;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  return (
    <div style={{ background: '#0d0d0d', minHeight: '100dvh', color: '#f2ecdd' }}>
      {/* Fixed title (fades out on scroll) */}
      <TitleBlock />

      {/* Sticky zoom hero — takes up 100vh, scroll drives clip+zoom */}
      <div ref={heroRef} className="h-[160vh] md:h-[200vh] lg:h-[280vh]" style={{ position: 'relative' }}>
        <CenterImage containerRef={heroRef} />
      </div>

      {/* Parallax story rows */}
      <div style={{ position: 'relative', zIndex: 2, background: '#0d0d0d', paddingTop: '4rem', paddingBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>

        {/* 01 — My Background (animated heading + full-bleed slideshow) */}
        <BackgroundShowcase />

        {/* Atmospheric — Travel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ padding: '0 clamp(1.5rem, 5vw, 5rem)', textAlign: 'center' }}>
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
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 900,
              color: '#f2ecdd',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}>
              Learned I love cultural exchange.
            </h2>
          </div>
          {/* Zoomed-in Europe travel map — X marks the places visited */}
          <div style={{ padding: '0 clamp(1.5rem, 5vw, 5rem)' }}>
            <TravelMap />
          </div>
        </div>

        {/* 03 — What makes me different */}
        <Section03 />


      </div>

    </div>
  );
}
