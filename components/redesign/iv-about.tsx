import Link from "next/link";
import { IvHeader } from "./iv-header";
import { ivFontVars } from "./fonts";
import "./iv.css";

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
