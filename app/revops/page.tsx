import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { SelectedWorks } from "@/components/selected-works";
import { SiteFooter } from "@/components/site-footer";
import { revopsProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "revops",
  description: "RevOps and GTM case studies by Koshin Bathmax.",
  openGraph: {
    title: "revops | Koshin Bathmax",
    description: "RevOps and GTM case studies by Koshin Bathmax.",
    url: "https://kbathmax.com/revops",
  },
  alternates: { canonical: "https://kbathmax.com/revops" },
};

export default function RevopsPage() {
  return (
    <div style={{ background: "var(--paper)", minHeight: "100dvh" }}>
      <Nav />

      <SelectedWorks projects={revopsProjects} designs={[]} title="RevOps" filters={false} />

      <SiteFooter paper />
    </div>
  );
}
