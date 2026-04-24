'use client';

import dynamic from 'next/dynamic';

const GLSLHills = dynamic(
  () => import('@/components/ui/glsl-hills').then((m) => ({ default: m.GLSLHills })),
  { ssr: false }
);

export function WorkHillsHero() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: '100vh', background: '#000000' }}>
      {/* Hills canvas — fills container */}
      <div className="absolute inset-0">
        <GLSLHills width="100%" height="100%" cameraZ={125} speed={0.4} />
      </div>

      {/* Centered text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none px-6">
        <p
          className="text-xs font-black uppercase tracking-[0.4em] mb-6"
          style={{ color: '#d9480f' }}
        >
          Selected Work
        </p>
        <h1
          className="font-extrabold tracking-tighter leading-[0.88] mb-8"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            color: '#ffffff',
          }}
        >
          High school senior,
          <br />
          <span style={{ color: '#d9480f' }}>building for good.</span>
        </h1>
        <p
          className="text-lg font-medium max-w-xl leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          I believe AI can be used to build a world we&apos;ve always dreamed of — safe, healthy, and secure for all.
        </p>
      </div>

      {/* Subtle bottom fade so content below blends in */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #000000)' }}
      />
    </div>
  );
}
