import Image from "next/image";
import Link from "next/link";
import { IvHeader } from "./iv-header";
import { ivFontVars } from "./fonts";
import "./iv.css";

/*
 * Impression Ventures homepage — redesign concept. Every block answers a note
 * from the teardown (lib/teardowns/impression-ventures.ts). Facts come from
 * their own site; anything not on it is marked as a placeholder.
 */

const PORTFOLIO = [
  { name: "Fraction", year: "2020", stage: "Series A" },
  { name: "Goose", year: "2018", stage: "Series A" },
  { name: "HONK", year: "2015", stage: "Seed" },
  { name: "Juno", year: "2025", stage: null },
  { name: "Finaeo", year: "2017", stage: "Seed-ext" },
];

const QUOTES = [
  {
    quote:
      "Working with the Impression team has been invaluable in providing guidance and insight. An investor that's providing more than just capital and really cares about what we're trying to do.",
    name: "Dan",
    role: "CEO, 401GO",
  },
  {
    quote:
      "The value Impression Ventures has delivered is beyond that of any introductions to customers or candidates: it is the understanding of what it means to be an entrepreneur of an early stage venture.",
    name: "Corey",
    role: "CEO, Sensibill",
  },
];

/** Abstract card art in brand colours — stands in for each company's own imagery. */
function CardArt({ i, name }: { i: number; name: string }) {
  const bg = ["#1b66c0", "#ff8a6b", "#0e1726", "#eef3fa", "#12487f"][i % 5];
  const fg = ["#ff8a6b", "#0e1726", "#1b66c0", "#1b66c0", "#ff8a6b"][i % 5];
  const text = i === 3 ? "#0e1726" : "#ffffff";
  const shapes = [
    <circle key="c" cx="200" cy="230" r="120" fill={fg} />,
    <rect key="r" x="70" y="110" width="260" height="260" fill={fg} transform="rotate(12 200 240)" />,
    <path key="p" d="M60 380 L200 90 L340 380 Z" fill={fg} />,
    <g key="b" fill={fg}>
      {[0, 1, 2, 3].map((k) => (
        <rect key={k} x={70 + k * 70} y={360 - (k + 1) * 60} width="46" height={(k + 1) * 60} />
      ))}
    </g>,
    <path key="a" d="M60 380 A140 140 0 0 1 340 380 Z" fill={fg} />,
  ][i % 5];
  return (
    <svg className="iv-card-art" viewBox="0 0 400 500" role="img" aria-label={`${name} card artwork`}>
      <rect width="400" height="500" fill={bg} />
      {shapes}
      <text x="28" y="468" fill={text} style={{ font: "400 44px var(--iv-condensed), Impact, sans-serif", textTransform: "uppercase" }}>
        {name}
      </text>
    </svg>
  );
}

export function IvSite() {
  return (
    <div className={`iv ${ivFontVars}`}>
      <p className="iv-concept">
        Redesign concept by Koshin — not affiliated with Impression Ventures.{" "}
        <Link href="/work/case-studies/impression-ventures">Read the teardown</Link>
      </p>

      <div id="hero">
        <IvHeader />
        <section className="iv-hero iv-wrap" aria-labelledby="iv-hero-title">
          <h1 id="iv-hero-title" className="iv-condensed">
            Building the future of finance? <em>We lead your seed.</em>
          </h1>
          <p className="iv-hero-sub">
            Seed-stage fintech across North America. We typically invest $2M in rounds of $3M+, once your first
            version is built and your first customer is in.
          </p>
          <p className="iv-proof">
            <strong>84%</strong>
            <span>of our investments went on to raise a Series A or exit.</span>
            <small>Excludes investments from the current fund.</small>
          </p>
          <div className="iv-hero-actions">
            <a href="#closing" className="iv-btn">
              Pitch us →
            </a>
            <a href="#portfolio" className="iv-link">
              See the portfolio
            </a>
          </div>
        </section>
      </div>

      <section id="portfolio" className="iv-section iv-wrap" aria-labelledby="iv-portfolio">
        <h2 id="iv-portfolio" className="iv-label">
          Portfolio
        </h2>
        <ul className="iv-row">
          {PORTFOLIO.map((c, i) => (
            <li key={c.name}>
              <a href="#portfolio">
                <CardArt i={i} name={c.name} />
                <div className="iv-card-body">
                  <span className="iv-card-name">{c.name}</span>
                  <span className="iv-chips">
                    <span className="iv-chip iv-chip--fill">{c.year}</span>
                    {c.stage && <span className="iv-chip">{c.stage}</span>}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <div className="iv-row-foot">
          <span>Scroll for more →</span>
          <a href="#portfolio" className="iv-link">
            All companies
          </a>
        </div>
      </section>

      <section id="where-we-invest" className="iv-band" aria-labelledby="iv-thesis">
        <div className="iv-section iv-wrap">
          <span className="iv-label">Where we invest</span>
          <h2 id="iv-thesis" className="iv-band-title iv-condensed">
            Seed-stage fintech. We lead.
          </h2>
          <div className="iv-stats">
            <div className="iv-stat">
              <span className="iv-stat-num iv-condensed">
                84<span>%</span>
              </span>
              <p>of our investments went on to raise a Series A or exit.*</p>
            </div>
            <div className="iv-stat">
              <span className="iv-stat-num iv-condensed">
                5<span>×</span>
              </span>
              <p>the industry average.</p>
            </div>
            <div className="iv-stat">
              <span className="iv-stat-num iv-condensed">
                <span>$</span>2M
              </span>
              <p>typical lead investment, in seed rounds of $3M+.</p>
            </div>
          </div>
          <div className="iv-band-foot">
            <small>*Excludes investments from the current fund.</small>
            <a href="#where-we-invest" className="iv-link">
              Read our thesis →
            </a>
          </div>
        </div>
      </section>

      <section id="testimonials" className="iv-section iv-wrap" aria-labelledby="iv-founders">
        <h2 id="iv-founders" className="iv-label">
          From our founders
        </h2>
        <ul className="iv-row" style={{ gridAutoColumns: "minmax(18rem, 1fr)" }}>
          {QUOTES.map((q) => (
            <li key={q.role}>
              <figure className="iv-quote">
                <span className="iv-quote-mark" aria-hidden>
                  “
                </span>
                <blockquote>{q.quote}</blockquote>
                <figcaption>
                  <b>{q.name}</b>
                  {q.role}
                </figcaption>
              </figure>
            </li>
          ))}
          <li>
            <div className="iv-quote iv-quote--cta">
              <p>More founder stories</p>
              <a href="#testimonials" className="iv-link">
                Read them →
              </a>
            </div>
          </li>
        </ul>
      </section>

      <section id="team" className="iv-section iv-wrap" aria-labelledby="iv-ethos">
        <h2 id="iv-ethos" className="iv-label">
          How we work
        </h2>
        <div className="iv-ethos">
          <p>
            Conviction investors. We lead seed rounds, keep term sheets <em>straightforward</em>, and stay in the
            room after the cheque clears.
          </p>
          <Link href="/work/case-studies/impression-ventures/redesign/about" className="iv-link">
            Meet the team and advisors →
          </Link>
        </div>
      </section>

      <section id="media" className="iv-section iv-wrap" aria-labelledby="iv-events">
        <h2 id="iv-events" className="iv-label">
          Events
        </h2>
        <ul className="iv-row iv-row--events">
          <li className="iv-event">
            <Image
              src="/case-studies/impression-ventures/brand/poster-pitch-night.png"
              alt="Pitch Night poster: blue, with PITCH NIGHT in tall condensed type and an orange date block"
              width={1200}
              height={1696}
              sizes="(min-width: 900px) 19rem, 70vw"
            />
            <h3>Pitch Night</h3>
            <p>Toronto · Date to be announced</p>
          </li>
          <li className="iv-event">
            <Image
              src="/case-studies/impression-ventures/brand/poster-breakfast.png"
              alt="Fintech Breakfast poster: orange, with Breakfast in a black serif and a cup holding a rising bar chart"
              width={1200}
              height={1696}
              sizes="(min-width: 900px) 19rem, 70vw"
            />
            <h3>Fintech Breakfast</h3>
            <p>Toronto · Date to be announced</p>
          </li>
          <li>
            <div className="iv-event--more">
              <strong>Get the next invite</strong>
              <a href="#media" className="iv-link">
                Join the list →
              </a>
            </div>
          </li>
        </ul>
      </section>

      <div id="closing">
        <section className="iv-section iv-wrap iv-closing" aria-labelledby="iv-close">
          <h2 id="iv-close" className="iv-condensed">
            Got what it takes? <span>Pitch us.</span>
          </h2>
          <a href="#closing" className="iv-btn">
            Send your pitch →
          </a>
        </section>
        <footer className="iv-footer">
          <div className="iv-wrap">
            <div className="iv-footer-grid">
              <span className="iv-footer-mark">
                IMPRESSION
                <br />
                VENTURES
              </span>
              <ul>
                <li>
                  <a href="#portfolio">Portfolio</a>
                </li>
                <li>
                  <a href="#where-we-invest">Thesis</a>
                </li>
                <li>
                  <a href="#team">About</a>
                </li>
                <li>
                  <a href="#closing">Careers</a>
                </li>
                <li>
                  <a href="#closing">Media kit</a>
                </li>
              </ul>
              <address>
                2300 Yonge St, Suite 2003
                <br />
                Toronto, ON M4P 1E4
                <br />
                info@impressionventures.com
              </address>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
                <a href="#closing" className="iv-btn iv-btn--sm">
                  Pitch us
                </a>
                <a href="#closing" style={{ fontSize: "0.875rem", opacity: 0.75 }}>
                  Investor login
                </a>
              </div>
            </div>
            <div className="iv-footer-base">
              <span>© 2026 Impression Ventures</span>
              <span>Concept redesign — not the live site</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

/** About page: where the faces live now, each with a name and a one-line background. */
export function IvAbout() {
  const placeholder = (role: string, n: number) =>
    Array.from({ length: n }, (_, i) => ({ name: `${role} name ${i + 1}`, line: "One-line background — placeholder" }));
  return (
    <div className={`iv ${ivFontVars}`}>
      <p className="iv-concept">
        Redesign concept by Koshin — names are placeholders.{" "}
        <Link href="/work/case-studies/impression-ventures/redesign">Back to the homepage</Link>
      </p>
      <IvHeader />
      <section id="team" className="iv-section iv-wrap" aria-labelledby="iv-team">
        <h1 id="iv-team" className="iv-h2 iv-condensed">
          The team
        </h1>
        <ul className="iv-people">
          {placeholder("Partner", 5).map((p) => (
            <li key={p.name} className="iv-person">
              <span className="iv-person-face" aria-hidden />
              <span>
                <b>{p.name}</b>
                <span>{p.line}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section id="advisors" className="iv-section iv-wrap" aria-labelledby="iv-advisors">
        <h2 id="iv-advisors" className="iv-h2 iv-condensed">
          Advisors
        </h2>
        <ul className="iv-people">
          {placeholder("Advisor", 5).map((p) => (
            <li key={p.name} className="iv-person">
              <span className="iv-person-face" aria-hidden />
              <span>
                <b>{p.name}</b>
                <span>{p.line}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
