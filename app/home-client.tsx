"use client";

import { Nav } from "@/components/nav";
import { StoryHero } from "@/components/story-hero";
import { SelectedWorks } from "@/components/selected-works";
import { designWork } from "@/lib/design-work";
import { projects } from "@/lib/projects";
import { SiteFooter } from "@/components/site-footer";

const visibleProjects = projects
  .filter((p) => !p.hidden)
  .sort((a, b) => Number(Boolean(b.liveUrl)) - Number(Boolean(a.liveUrl)));

export function HomeClient() {
  return (
    <>
      <Nav />

      <main className="min-h-screen" style={{ background: 'var(--paper)' }}>
        <StoryHero />

        <div id="work" className="scroll-mt-28">
          <SelectedWorks products={visibleProjects} designs={designWork} />
        </div>

        <SiteFooter />
      </main>
    </>
  );
}
