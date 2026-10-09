/**
 * Website teardown content contract.
 *
 * One file per teardown in lib/teardowns/, registered in index.ts. The page
 * at /work/case-studies/[slug] renders every section as a pair of posters:
 * their screenshot with arrows on the left, the redesign on the right.
 * Visual rules live in .claude/skills/poster-case-study/SKILL.md.
 */

export type Shot = {
  /** Path under /public. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Set while the image hasn't been added yet — renders a labelled empty frame at the same size. */
  pending?: boolean;
};

/** One arrow on a screenshot. */
export type Callout = {
  /** Arrow tip, as a percentage of the screenshot's width (0–100). */
  x: number;
  /** Arrow tip, as a percentage of the screenshot's height (0–100). */
  y: number;
  /** Which label row the arrow starts from. */
  side: "top" | "bottom";
  /** Short label shown at the end of the arrow — keep it to a few words. */
  title: string;
  /** The full point, shown in the numbered list under the screenshot. */
  body: string;
};

/** What changed in the redesign, matched to the callout at the same index. */
export type Fix = {
  title: string;
  why: string;
};

export type TeardownSection = {
  id: string;
  /** Section of their site, e.g. "Hero". */
  label: string;
  /** Poster headline. Wrap a phrase in <angle brackets> to set it in the bracket style. */
  headline: string;
  theirs: Shot & { callouts: Callout[] };
  /** Left out until the redesign exists — the page shows placeholder frames. */
  mine?: {
    headline?: string;
    shot?: Shot;
    fixes: Fix[];
  };
};

export type Teardown = {
  slug: string;
  firm: string;
  url: string;
  /** ISO 8601. */
  date: string;
  /** One or two sentences. Renders on the thesis poster and as the meta description. */
  thesis: string;
  disclaimer: string;
  sections: TeardownSection[];
  /** Clickable redesign concept, linked from the intro. */
  redesignHref?: string;
  /** Brand pieces made for the redesign (posters, napkins…), shown after the takeaways. */
  collateral?: Shot[];
  /** Takeaways on the closing poster. */
  principles: { title: string; body: string }[];
};
