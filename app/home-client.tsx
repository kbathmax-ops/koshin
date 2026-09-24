"use client";

import { Nav } from "@/components/nav";
import { StoryHero } from "@/components/story-hero";
import { SiteFooter } from "@/components/site-footer";

export function HomeClient() {
  return (
    <>
      <Nav />

      <main className="min-h-screen">
        <StoryHero backgroundHref="/story" />
        <SiteFooter />
      </main>
    </>
  );
}
