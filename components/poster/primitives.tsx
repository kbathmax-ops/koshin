/**
 * Graphic pieces for the poster-grid case study layout. All pure SVG/HTML,
 * all drawn in currentColor so they flip with the poster's tone.
 * Styles live in app/work/case-studies/teardown.css.
 */

/** Splits "Text <bracketed>" so the bracketed part keeps its angle brackets on one line. */
export function Bracketed({ text }: { text: string }) {
  const parts = text.split(/(<[^>]+>)/).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("<") ? (
          <span key={i} className="poster-bracket">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/** Rounded triangle badge with three stacked lines, after the "C / M11 / SP" mark. */
export function TriBadge({ lines }: { lines: [string, string, string] }) {
  return (
    <svg className="poster-tri" viewBox="0 0 64 58" role="img" aria-label={lines.join(" ")}>
      <path
        d="M32 4 L60 54 L4 54 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <text x="32" y="27" textAnchor="middle" className="poster-tri-text">
        {lines[0]}
      </text>
      <line x1="20" y1="31" x2="44" y2="31" stroke="currentColor" strokeWidth="1.5" />
      <text x="32" y="40" textAnchor="middle" className="poster-tri-text">
        {lines[1]}
      </text>
      <text x="32" y="50" textAnchor="middle" className="poster-tri-text">
        {lines[2]}
      </text>
    </svg>
  );
}

/** Two-row boxed code tag, after "CO ALA™ / SP-011". */
export function CodeTag({ top, bottom }: { top: string; bottom: string }) {
  return (
    <span className="poster-code">
      <span>{top}</span>
      <span>{bottom}</span>
    </span>
  );
}

/* ---------- Pixel marks ---------- */

const MONOGRAM = [
  "#...#.####.",
  "#..#..#...#",
  "#.#...#...#",
  "##....####.",
  "#.#...#...#",
  "#..#..#...#",
  "#...#.####.",
];

const ARROW_DOWN = [
  "...###...",
  "...###...",
  "...###...",
  "...###...",
  "#########",
  ".#######.",
  "..#####..",
  "...###...",
  "....#....",
];

function discRows(size = 17): string[] {
  const c = (size - 1) / 2;
  return Array.from({ length: size }, (_, y) =>
    Array.from({ length: size }, (_, x) => {
      const d = Math.hypot(x - c, y - c);
      return (d <= c + 0.3 && d > 2.6) || d <= 1.1 ? "#" : ".";
    }).join(""),
  );
}

/** Dithered strip that fades from dense to sparse — deterministic, no randomness at render. */
function noiseRows(w = 48, h = 7): string[] {
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: h }, () =>
    Array.from({ length: w }, (_, x) => (rand() < 0.85 - (x / w) * 0.7 ? "#" : ".")).join(""),
  );
}

const SHAPES = {
  monogram: MONOGRAM,
  arrow: ARROW_DOWN,
  disc: discRows(),
  noise: noiseRows(),
} as const;

export type PixelShape = keyof typeof SHAPES;

export function PixelMark({ shape, className }: { shape: PixelShape; className?: string }) {
  const rows = SHAPES[shape];
  const w = rows[0].length;
  const h = rows.length;
  return (
    <svg
      className={className}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      aria-hidden
      fill="currentColor"
    >
      {rows.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === "#" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null,
        ),
      )}
    </svg>
  );
}

/** Barcode-ish block of vertical rules, after the footer mark in the reference. */
function Barcode() {
  const bars = [2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 1];
  let x = 0;
  return (
    <svg className="poster-barcode" viewBox="0 0 48 20" aria-hidden fill="currentColor">
      {bars.map((w, i) => {
        const rect = i % 2 === 0 ? <rect key={i} x={x} y="0" width={w} height="20" /> : null;
        x += w;
        return rect;
      })}
    </svg>
  );
}

/** Footer strip shared by every poster, after "COALA MUSIC · Stereo/Sound/Quality". */
export function PosterFooter({ right }: { right: [string, string] }) {
  return (
    <footer className="poster-foot">
      <span className="poster-foot-mark">
        <PixelMark shape="monogram" />
      </span>
      <p className="poster-mono">
        <span className="block">Koshin</span>
        <span className="block">Design notes</span>
      </p>
      <ul className="poster-stack">
        {["Diagnose", "Redesign", "Ship"].map((word) => (
          <li key={word}>
            <span className="poster-stack-glyph" aria-hidden>
              ◂
            </span>
            {word}
          </li>
        ))}
      </ul>
      <Barcode />
      <p className="poster-mono poster-foot-right">
        <span className="block">{right[0]}</span>
        <span className="block">{right[1]}</span>
      </p>
    </footer>
  );
}
