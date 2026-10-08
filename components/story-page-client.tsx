'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Lenis from 'lenis';
import { StoryHero } from './story-hero';
import { SiteFooter } from './site-footer';
import { TravelMap } from './travel-map';

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
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem',
          fontWeight: 500,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'var(--ink)',
          marginBottom: '1rem',
        }}
      >
        {label}
      </p>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 500,
          color: 'var(--ink)',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          marginBottom: '1rem',
        }}
      >
        {heading}
      </h2>
      <div
        style={{
          color: 'rgb(var(--ink-rgb) / 0.6)',
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

/* ─── Section 04 — values (list currently hidden; see SHOW_VALUES) ───
   Each value is a short title plus a sentence or two on what it means in
   practice. Placeholders until the real ones are written. */
const VALUES: { title: string; description: string }[] = [
  { title: 'Value one', description: 'A sentence or two on what this means to you and how it shows up in your work.' },
  { title: 'Value two', description: 'A sentence or two on what this means to you and how it shows up in your work.' },
  { title: 'Value three', description: 'A sentence or two on what this means to you and how it shows up in your work.' },
  { title: 'Value four', description: 'A sentence or two on what this means to you and how it shows up in your work.' },
  { title: 'Value five', description: 'A sentence or two on what this means to you and how it shows up in your work.' },
  { title: 'Value six', description: 'A sentence or two on what this means to you and how it shows up in your work.' },
];

/* Values list is hidden for now — flip to true to bring it back. */
const SHOW_VALUES = false;

function Section04() {
  if (SHOW_VALUES) return <ValuesList />;
  return (
    <div style={{ padding: '0 clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ borderTop: '1px solid rgb(var(--ink-rgb) / 0.14)', paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 500,
            color: 'var(--ink)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          I value innovation &amp; impact.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
            lineHeight: 1.5,
            color: 'rgb(var(--ink-rgb) / 0.7)',
            margin: '1rem 0 0',
          }}
        >
          If you&apos;re starting something big,{' '}
          <Link
            href="/work#contact"
            style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '0.2em', textDecorationThickness: '1px' }}
          >
            I want in →
          </Link>
        </p>
      </div>
    </div>
  );
}

function ValuesList() {
  return (
    <div style={{ padding: '0 clamp(1.5rem, 5vw, 5rem)' }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 500,
          color: 'var(--ink)',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
        }}
      >
        my values
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2" style={{ columnGap: 'clamp(2rem, 5vw, 5rem)' }}>
        {VALUES.map((value, i) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 'clamp(1rem, 2.5vw, 2rem)',
              padding: '1.25rem 0 1.5rem',
              borderTop: '1px solid rgb(var(--ink-rgb) / 0.14)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                color: 'var(--ink)',
                flexShrink: 0,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {value.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  lineHeight: 1.55,
                  color: 'rgb(var(--ink-rgb) / 0.62)',
                  margin: '0.5rem 0 0',
                  maxWidth: '42ch',
                }}
              >
                {value.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Closing rule so the last row doesn't hang open */}
      <div style={{ borderTop: '1px solid rgb(var(--ink-rgb) / 0.14)' }} />
    </div>
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
          background: 'rgb(var(--ink-rgb) / 0.1)',
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
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
          }}
        >
          Next
        </p>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 500,
            color: 'var(--ink)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Ready to build something?
        </p>
        <p style={{ color: 'rgb(var(--ink-rgb) / 0.5)', fontSize: '0.95rem', lineHeight: 1.7 }}>
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
            background: 'var(--ink)',
            color: '#f4f4f4',
            padding: '1rem 2rem',
            borderRadius: '9999px',
            fontFamily: "var(--font-display)",
            fontWeight: 500,
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
            background: 'rgb(var(--ink-rgb) / 0.08)',
            color: 'var(--ink)',
            padding: '1rem 2rem',
            borderRadius: '9999px',
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: '0.875rem',
            textDecoration: 'none',
            border: '1px solid rgb(var(--ink-rgb) / 0.12)',
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
    <div style={{ background: 'var(--paper)', minHeight: '100dvh', color: 'var(--ink)' }}>
      <StoryHero />

      {/* Parallax story rows */}
      <div style={{ position: 'relative', zIndex: 2, background: 'var(--paper)', paddingTop: '4rem', paddingBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>

        {/* Atmospheric — Travel. `id` is the anchor the hero's third band
            links to, and scroll-margin clears the fixed nav pill. */}
        <div
          id="travel"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '0 0 3.5rem', scrollMarginTop: 'clamp(5.5rem, 13vh, 8rem)' }}
        >
          <div style={{ width: '100%', padding: '0 clamp(1.5rem, 5vw, 5rem)', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 500,
              color: 'var(--ink)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}>
              where I&apos;ve been
            </h2>
          </div>
          {/* Zoomed-in Europe travel map — X marks the places visited */}
          <div style={{ width: '100%', maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 2.5vw, 2.5rem)' }}>
            <TravelMap />
          </div>
        </div>


        {/* 04 — Values */}
        <Section04 />


      </div>

      <SiteFooter />
    </div>
  );
}
