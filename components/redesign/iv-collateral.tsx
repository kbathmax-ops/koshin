import { ivFontVars } from "./fonts";
import "./iv.css";
import "./collateral.css";

/*
 * Event collateral for the Impression Ventures redesign concept. Each piece is
 * a fixed-size frame with an id, screenshotted to PNG for the case study.
 */

const CONCEPT = "Concept by Koshin — not affiliated with Impression Ventures";

function Wordmark({ small }: { small?: boolean }) {
  return (
    <span className={`col-wordmark${small ? " col-wordmark--sm" : ""}`}>
      IMPRESSION
      <span>Ventures</span>
    </span>
  );
}

export function PitchNightPoster() {
  return (
    <article id="poster-pitch-night" className="col-poster col-poster--blue">
      <header className="col-poster-top">
        <Wordmark />
        <span className="col-tag">Event 01</span>
      </header>
      <h2 className="col-giant">
        Pitch
        <br />
        Night
      </h2>
      <div className="col-poster-grid">
        <div className="col-date">
          <span>Date</span>
          <b>TBA</b>
          <span>18:30</span>
        </div>
        <dl className="col-details">
          <div>
            <dt>Format</dt>
            <dd>Five founders. Five minutes each. Feedback from the partners.</dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>2300 Yonge St, Suite 2003, Toronto</dd>
          </div>
          <div>
            <dt>Apply</dt>
            <dd>Pitch us on impression.ventures</dd>
          </div>
        </dl>
      </div>
      <p className="col-fine">{CONCEPT}</p>
    </article>
  );
}

export function BreakfastPoster() {
  return (
    <article id="poster-breakfast" className="col-poster col-poster--orange">
      <header className="col-poster-top">
        <Wordmark />
        <span className="col-tag">Event 02</span>
      </header>
      <p className="col-kicker">Fintech</p>
      <h2 className="col-serif-giant">Breakfast</h2>
      <svg className="col-cup-chart" viewBox="0 0 300 240" aria-hidden>
        <path d="M40 60 H220 V150 A70 70 0 0 1 150 220 H110 A70 70 0 0 1 40 150 Z" fill="#0e1726" />
        <path d="M220 85 H245 A30 30 0 0 1 245 145 H220" fill="none" stroke="#0e1726" strokeWidth="14" />
        {[0, 1, 2, 3].map((k) => (
          <rect key={k} x={68 + k * 34} y={140 - k * 22} width="22" height={50 + k * 22} fill="#1b66c0" />
        ))}
        <path d="M80 40 q10 -14 0 -28 M130 40 q10 -14 0 -28 M180 40 q10 -14 0 -28" stroke="#0e1726" strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>
      <div className="col-poster-foot">
        <p>
          Coffee with the partners.
          <br />
          Bring your questions.
        </p>
        <p className="col-time">
          08:00
          <span>Date TBA · Toronto</span>
        </p>
      </div>
      <p className="col-fine">{CONCEPT}</p>
    </article>
  );
}

export function Napkins() {
  return (
    <div id="napkins" className="col-scene">
      <div className="col-napkin col-napkin--white" style={{ rotate: "-6deg" }}>
        <span className="col-monogram">IV</span>
        <span className="col-napkin-name">Impression Ventures</span>
      </div>
      <div className="col-napkin col-napkin--orange" style={{ rotate: "5deg" }}>
        <span className="col-napkin-sketch">
          Sketch your
          <br />
          pitch here ↓
        </span>
        <span className="col-napkin-grid" aria-hidden />
        <span className="col-napkin-name col-napkin-name--corner">IV</span>
      </div>
      <p className="col-fine col-fine--scene">{CONCEPT}</p>
    </div>
  );
}

export function CoffeeCup() {
  return (
    <div id="cup" className="col-scene col-scene--cup">
      <svg viewBox="0 0 400 520" className="col-cup" role="img" aria-label="Paper coffee cup with a blue sleeve reading GOT WHAT IT TAKES?">
        <defs>
          <linearGradient id="cup-shade" x1="0" x2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0.18" />
            <stop offset="0.35" stopColor="#000" stopOpacity="0" />
            <stop offset="0.8" stopColor="#000" stopOpacity="0.05" />
            <stop offset="1" stopColor="#000" stopOpacity="0.22" />
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="500" rx="120" ry="12" fill="#0e1726" opacity="0.18" />
        {/* cup body */}
        <path d="M78 90 L322 90 L292 492 L108 492 Z" fill="#ffffff" />
        {/* sleeve */}
        <path d="M88 210 L312 210 L300 370 L100 370 Z" fill="#1b66c0" />
        <text x="200" y="275" textAnchor="middle" fill="#ffffff" style={{ font: "400 44px var(--iv-condensed), Impact, sans-serif" }}>
          GOT WHAT
        </text>
        <text x="200" y="322" textAnchor="middle" fill="#ff8a6b" style={{ font: "400 44px var(--iv-condensed), Impact, sans-serif" }}>
          IT TAKES?
        </text>
        <text x="200" y="352" textAnchor="middle" fill="#ffffff" style={{ font: "600 11px var(--iv-sans), sans-serif", letterSpacing: "0.3em" }}>
          IMPRESSION VENTURES
        </text>
        {/* lid */}
        <rect x="64" y="62" width="272" height="34" rx="8" fill="#ff8a6b" />
        <path d="M86 62 Q90 30 130 30 H270 Q310 30 314 62 Z" fill="#ff8a6b" />
        <rect x="170" y="38" width="60" height="8" rx="4" fill="#0e1726" opacity="0.35" />
        {/* monogram near base */}
        <text x="200" y="450" textAnchor="middle" fill="#0e1726" style={{ font: "900 40px var(--iv-serif), Georgia, serif" }}>
          IV
        </text>
        <path d="M78 90 L322 90 L292 492 L108 492 Z" fill="url(#cup-shade)" />
      </svg>
      <p className="col-fine col-fine--scene">{CONCEPT}</p>
    </div>
  );
}

export function IvCollateral() {
  return (
    <div className={`iv col-page ${ivFontVars}`}>
      <PitchNightPoster />
      <BreakfastPoster />
      <Napkins />
      <CoffeeCup />
    </div>
  );
}
