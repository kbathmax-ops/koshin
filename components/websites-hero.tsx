'use client';

import Link from 'next/link';
import { ArrowUpRight, HardHat } from 'lucide-react';

export function WebsitesHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: '100vh', background: '#fcf9ef' }}
    >
      {/* SVG grain filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="ws-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, zIndex: 2,
          pointerEvents: 'none', opacity: 0.06,
          filter: 'url(#ws-grain)',
        }}
      />

      {/* Topographic contour rings */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundImage: 'repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 60px, rgba(23,51,33,0.10) 61px, transparent 62px)',
          pointerEvents: 'none',
        }}
      />

      {/* Large faded construction icon */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <HardHat
          style={{
            width: 'clamp(280px, 45vw, 520px)',
            height: 'clamp(280px, 45vw, 520px)',
            color: '#173321',
            opacity: 0.06,
          }}
          strokeWidth={1}
        />
      </div>

      {/* Text */}
      <div
        className="relative flex flex-col items-center justify-center text-center gap-6 max-w-7xl mx-auto px-6 md:px-12 h-full"
        style={{ paddingTop: '9rem', paddingBottom: '5rem', zIndex: 10 }}
      >
        <div>
          <h1
            className="font-extrabold text-7xl md:text-8xl tracking-tighter leading-[0.9] text-primary mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Websites
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-xl leading-relaxed">
            I make premium websites for reasonable prices. Client sites &amp;
            personal builds below.
          </p>
        </div>
        <Link
          href="/work#contact"
          className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full hover:-translate-y-0.5 transition-transform duration-200"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#ffffff', color: '#173321' }}
        >
          Want one? Let&apos;s talk
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '100px', zIndex: 6, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, transparent, #fcf9ef)',
        }}
      />
    </section>
  );
}
