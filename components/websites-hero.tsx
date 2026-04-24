'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function WebsitesHero() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const applyParallax = (px: number, py: number) => {
      const x = (window.innerWidth / 2 - px) / 12;
      const y = (window.innerHeight / 2 - py) / 12;
      canvas.style.transform = `rotateX(${55 + y / 1.5}deg) rotateZ(${-25 + x / 1.5}deg)`;
      layersRef.current.forEach((layer, i) => {
        if (!layer) return;
        layer.style.transform = `translateZ(${(i + 1) * 15}px) translate(${x * (i + 1) * 0.35}px, ${y * (i + 1) * 0.35}px)`;
      });
    };

    const handleMouseMove = (e: MouseEvent) => applyParallax(e.pageX, e.pageY);
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      applyParallax(t.pageX, t.pageY);
    };

    // Entrance: start collapsed, unfold into position
    canvas.style.opacity = '0';
    canvas.style.transform = 'rotateX(90deg) rotateZ(0deg) scale(0.85)';

    const t = setTimeout(() => {
      canvas.style.transition = 'all 2.5s cubic-bezier(0.16, 1, 0.3, 1)';
      canvas.style.opacity = '1';
      canvas.style.transform = 'rotateX(55deg) rotateZ(-25deg) scale(1)';
    }, 250);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      clearTimeout(t);
    };
  }, []);

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

      {/* 3D viewport */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          perspective: '2000px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          ref={canvasRef}
          style={{
            position: 'relative',
            width: '1000px', height: '640px',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Layer 1 — mountain peaks */}
          <div
            ref={el => { layersRef.current[0] = el; }}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1400)',
              backgroundSize: 'cover', backgroundPosition: 'center',
              filter: 'grayscale(1) brightness(2.2)',
              opacity: 0.20,
              border: '1px solid rgba(23,51,33,0.05)',
              transition: 'transform 0.5s ease',
            }}
          />
          {/* Layer 2 — lake valley */}
          <div
            ref={el => { layersRef.current[1] = el; }}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1400)',
              backgroundSize: 'cover', backgroundPosition: 'center',
              filter: 'grayscale(1) brightness(2.4)',
              opacity: 0.13,
              mixBlendMode: 'multiply',
              transition: 'transform 0.5s ease',
            }}
          />
          {/* Layer 3 — rolling hills */}
          <div
            ref={el => { layersRef.current[2] = el; }}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1400)',
              backgroundSize: 'cover', backgroundPosition: 'center',
              filter: 'grayscale(1) brightness(2.6)',
              opacity: 0.09,
              mixBlendMode: 'overlay',
              transition: 'transform 0.5s ease',
            }}
          />
          {/* Topographic contour lines */}
          <div
            style={{
              position: 'absolute',
              width: '200%', height: '200%',
              top: '-50%', left: '-50%',
              backgroundImage: 'repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, rgba(23,51,33,0.18) 41px, transparent 42px)',
              transform: 'translateZ(120px)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Text — sits above the 3D layer */}
      <div
        className="relative flex flex-col md:flex-row md:items-end justify-between gap-8 max-w-7xl mx-auto px-6 md:px-12"
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
        <div className="shrink-0">
          <Link
            href="/work#contact"
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-bold text-sm px-6 py-3 rounded-full hover:-translate-y-0.5 transition-transform duration-200"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Want one? Let&apos;s talk
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Soft bottom fade into page */}
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
