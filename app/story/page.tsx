import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { StoryPageClient } from "@/components/story-page-client";

export const metadata: Metadata = {
  title: "story",
  description:
    "The story behind the work, and where Koshin is going next.",
  alternates: { canonical: "https://kbathmax.com/story" },
};

/* Lives here rather than on "/" because the root redirects to this page, so
   this is what search engines actually index. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Koshin Bathmax",
  url: "https://kbathmax.com",
  sameAs: [
    "https://github.com/koshinbathmax",
    "https://www.linkedin.com/in/koshinbathmax/",
  ],
  description:
    "Changing how people see brands & solo-travelling when I can. On a gap year from Queen's University, rebranding VC firms & startups and creating content.",
};

export default function Story() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <StoryPageClient />
    </>
  );
}
