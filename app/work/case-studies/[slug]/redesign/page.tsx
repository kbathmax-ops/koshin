import type { Metadata } from "next";
import Link from "next/link";

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
  return (
    <div style={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 20px", fontSize: 13, background: "#fafaf7", color: "#172737", borderBottom: "1px solid #dce2e7" }}>
        <Link href="/work/case-studies/impression-ventures">← Back to the case study</Link>
        <span style={{ marginLeft: 24 }}>Independent redesign concept</span>
      </div>
      <iframe
        src="/case-studies/impression-ventures/built/index.html"
        title="Impression Ventures built homepage redesign"
        style={{ width: "100%", flex: 1, border: 0, minHeight: 0 }}
      />
    </div>
  );
}
