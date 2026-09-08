import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { StoryPageClient } from "@/components/story-page-client";

export const metadata: Metadata = {
  title: "Story — Koshin",
  description:
    "The story behind the work, and where Koshin is going next.",
  alternates: { canonical: "https://kbathmax.com/story" },
};

export default function Story() {
  return (
    <>
      <Nav />
      <StoryPageClient />
    </>
  );
}
