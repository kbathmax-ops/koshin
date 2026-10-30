import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { SelectedWorks } from "@/components/selected-works";
import { projects } from "@/lib/projects";

const revopsProjects = projects.filter((p) => !p.hidden && p.category === "revops");

export const metadata: Metadata = {
  title: "revops",
  description: "RevOps and GTM automations by Koshin Bathmax.",
  openGraph: {
    title: "revops | Koshin Bathmax",
    description: "RevOps and GTM automations by Koshin Bathmax.",
    url: "https://kbathmax.com/revops",
  },
  alternates: { canonical: "https://kbathmax.com/revops" },
};

export default function RevopsPage() {
  return (
    <div style={{ background: "var(--paper)", minHeight: "100dvh" }}>
      <Nav />

      <SelectedWorks products={revopsProjects} designs={[]} title="RevOps" filters={false} />

      <footer style={{ background: "var(--paper)", borderTop: "1px solid rgb(var(--ink-rgb) / 0.10)" }}>
        <div className="flex flex-col items-center gap-2 px-6 py-12 md:px-12 md:py-14">
          <span
            className="text-lg font-medium tracking-tighter"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            koshin<span style={{ color: "var(--ink)" }}>.</span>
          </span>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: "rgb(var(--ink-rgb) / 0.45)" }}>
            © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
