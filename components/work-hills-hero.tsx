'use client';

import dynamic from 'next/dynamic';

const GLSLHills = dynamic(
  () => import('@/components/ui/glsl-hills').then((m) => ({ default: m.GLSLHills })),
  { ssr: false }
);

export function WorkHillsHero() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: '100vh', background: '#000000' }}>
      <style>{`
        @keyframes beacon-pulse {
          0%   { transform: scaleX(1)   scaleY(1);   opacity: 0.55; }
          100% { transform: scaleX(3.8) scaleY(4.5); opacity: 0; }
        }
        .beacon-ring {
          animation: beacon-pulse 2.6s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
        }
      `}</style>

      {/* Hills canvas — fills container */}
      <div className="absolute inset-0">
        <GLSLHills width="100%" height="100%" cameraZ={125} speed={0.4} />
      </div>

      {/* Centered text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none px-6">
        <div className="relative inline-flex items-center justify-center mb-8">
          {/* Beacon rings — emanate from text bounds */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="beacon-ring absolute rounded-[50%] pointer-events-none"
              style={{
                width: '100%',
                height: '100%',
                border: '1.5px solid rgba(255,255,255,0.45)',
                animationDelay: `${i * 0.87}s`,
              }}
            />
          ))}
          <h1
            className="font-extrabold tracking-tighter leading-[0.88]"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              color: '#ffffff',
            }}
          >
            experimenting
          </h1>
        </div>
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
