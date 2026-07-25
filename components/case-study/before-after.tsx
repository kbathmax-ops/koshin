import type { BeforeAfter } from "@/lib/case-studies/types";

/**
 * Before/after pair. Stacked at 375px, side by side from 768px.
 *
 * "Before" renders in fixed neutral greys with a system font stack and ignores
 * the case study theme completely. "After" renders in the theme. All of that
 * styling lives in app/case-studies/case-studies.css under
 * .cs-panel--before / .cs-panel--after.
 */
export function BeforeAfterBlock({ item }: { item: BeforeAfter }) {
  return (
    <section className="cs-ba" aria-labelledby={`ba-${slugify(item.label)}`}>
      <header className="cs-ba-head">
        <h3 className="cs-ba-label" id={`ba-${slugify(item.label)}`}>
          {item.label}
        </h3>
        {item.note && <p className="cs-ba-note">{item.note}</p>}
      </header>

      <div className="cs-ba-grid">
        <article className="cs-panel cs-panel--before">
          <p className="cs-panel-tag">Before</p>
          <h4 className="cs-panel-caption">{item.before.caption}</h4>
          <p className="cs-panel-body">{item.before.body}</p>
        </article>

        <article className="cs-panel cs-panel--after">
          <p className="cs-panel-tag">After</p>
          <h4 className="cs-panel-caption">{item.after.caption}</h4>
          <p className="cs-panel-body">{item.after.body}</p>
        </article>
      </div>
    </section>
  );
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
