import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { TravelMap } from "@/components/travel-map";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "travels",
  description: "Where I've been — solo travel map.",
  alternates: { canonical: "https://kbathmax.com/travels" },
};

export default function TravelsPage() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100dvh" }}>
      <Nav />

      <main
        style={{
          paddingTop: "clamp(7rem, 16vh, 10rem)",
          paddingBottom: "4rem",
          paddingLeft: "clamp(1rem, 4vw, 3rem)",
          paddingRight: "clamp(1rem, 4vw, 3rem)",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: "var(--ink)",
            textAlign: "center",
            margin: "0 0 2.5rem",
          }}
        >
          where I've been
        </h1>

        <div style={{ width: "100%", maxWidth: "1240px", margin: "0 auto" }}>
          <TravelMap />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
