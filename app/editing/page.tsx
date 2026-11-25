import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "editing",
  description: "Short-form videos I've edited.",
  alternates: { canonical: "https://kbathmax.com/editing" },
};

type Clip = {
  platform: "Instagram" | "TikTok";
  id: string;
  url: string;
};

// Order matters: this is the order they show on the page.
const CLIPS: Clip[] = [
  {
    platform: "Instagram",
    id: "DeGX1P_R_hK",
    url: "https://www.instagram.com/reel/DeGX1P_R_hK/",
  },
  {
    platform: "TikTok",
    id: "7635350287242317063",
    url: "https://www.tiktok.com/@tattoosbyjesss/video/7635350287242317063",
  },
  {
    platform: "TikTok",
    id: "7636076016129101064",
    url: "https://www.tiktok.com/@tattoosbyjesss/video/7636076016129101064",
  },
  {
    platform: "Instagram",
    id: "Df-lWJTISmD",
    url: "https://www.instagram.com/reel/Df-lWJTISmD/",
  },
];

function embedSrc(clip: Clip) {
  return clip.platform === "TikTok"
    ? `https://www.tiktok.com/player/v1/${clip.id}?description=0&music_info=0&rel=0`
    : `https://www.instagram.com/reel/${clip.id}/embed/`;
}

export default function EditingPage() {
  return (
    <div style={{ background: "var(--paper)", minHeight: "100dvh" }}>
      <Nav />

      <main className="max-w-7xl mx-auto px-4 md:px-12 pt-28 md:pt-40 pb-24 md:pb-32">
        <h1
          className="font-medium tracking-tighter text-center"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1,
            color: "var(--ink)",
            margin: "0 0 1rem",
          }}
        >
          editing
        </h1>
        <p
          className="text-center text-base mb-12 md:mb-16"
          style={{ color: "rgb(var(--ink-rgb) / 0.62)" }}
        >
          Short-form videos I&rsquo;ve edited.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 max-w-[22rem] sm:max-w-none mx-auto">
          {CLIPS.map((clip, i) => (
            <li key={clip.id}>
              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: "9 / 16",
                  background: "var(--paper-raised)",
                  boxShadow: "0 0 0 1px rgb(var(--ink-rgb) / 0.08)",
                }}
              >
                <iframe
                  src={embedSrc(clip)}
                  title={`${clip.platform} video ${i + 1}`}
                  loading="lazy"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                  // Instagram's card isn't 9:16, so it sits at the top of the
                  // frame and any extra footer is clipped rather than scrolled.
                  scrolling="no"
                  className="block w-full h-full border-0"
                />
              </div>
              <a
                href={clip.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium tracking-tight transition-colors duration-200 text-[var(--ink)]/60 hover:text-[var(--ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {String(i + 1).padStart(2, "0")} · {clip.platform} ↗
              </a>
            </li>
          ))}
        </ul>
      </main>

      <SiteFooter />
    </div>
  );
}
