import type { CaseStudy } from "./types";
import { linear } from "./linear";

/**
 * The registry. Adding a case study = create the content file, then add one
 * import + one array entry here. Order in this array is the order on /case-studies.
 */
export const caseStudies: CaseStudy[] = [linear];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((s) => s.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map((s) => s.slug);
}

export type { CaseStudy } from "./types";
