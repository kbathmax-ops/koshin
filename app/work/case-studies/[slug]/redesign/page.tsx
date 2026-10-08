import type { Metadata } from "next";
import { IvSite } from "@/components/redesign/iv-site";

/* Only Impression Ventures has a redesign mock so far. */
export function generateStaticParams() {
  return [{ slug: "impression-ventures" }];
}

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Impression Ventures — Redesign Concept",
  description: "A redesign concept for the Impression Ventures homepage, built from the teardown's notes.",
  robots: { index: false, follow: false },
};

export default function RedesignPage() {
  return <IvSite />;
}
