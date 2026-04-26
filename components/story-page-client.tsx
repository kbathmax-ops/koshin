'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
        {/* Section header before Monaco photo */}
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

        <AtmosphericImage src={IMAGES[2]} alt="Rolling hills" />

        {/* 03 — What makes me different */}
        <ParallaxRow
          src={IMAGES[3]}
          alt="Forest path"
          flip
          speed={1.1}
          text={
            <StoryBlock label="03 — What makes me different" heading="Experimenting as of April 2026">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {['builds + distribution', 'marketing campaigns'].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#9d4305', flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </StoryBlock>
          }
        />


      </div>

      {/* CTA */}
      <div style={{ position: 'relative', zIndex: 2, background: '#0d0d0d' }}>
        <StoryCTA />
      </div>
    </div>
  );
}
