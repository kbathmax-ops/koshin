import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* Shared artwork for the link-preview cards.
   app/opengraph-image.tsx and app/twitter-image.tsx render the same frame; only
   the line under the name differs, so X can carry its own positioning without
   the two designs drifting apart.

   Mirrors the story hero: white, the name large, a grey line under it, and the
   dithered Machu Picchu photo drawn at its native 480×360 so every pixel lands
   on one screen pixel. Neue Haas Grotesk isn't available as a file Satori can
   load, so the card uses Inter, the closest open face. */

export const OG_SIZE = { width: 1200, height: 630 };

export async function ogAssets() {
  const [inter, photo] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Inter-Medium.woff")),
    readFile(join(process.cwd(), "public/koshin-machu-picchu.png")),
  ]);
  return {
    fonts: [{ name: "Inter", data: inter, style: "normal" as const, weight: 500 as const }],
    photo: `data:image/png;base64,${photo.toString("base64")}`,
  };
}

export function OgCard({ subtitle, photo }: { subtitle: string; photo: string }) {
  return (
    <div
      style={{
        background: "#ffffff",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 72px",
        fontFamily: "Inter",
        color: "#0b0b0b",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "360px",
          width: "540px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "104px",
              lineHeight: 0.9,
              letterSpacing: "-5px",
            }}
          >
            <span>Koshin</span>
            <span>Bathmax</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "30px",
              lineHeight: 1.25,
              letterSpacing: "-0.6px",
              color: "#6b6b68",
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Square, thin-edged, like the links under the name on the site. */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              border: "1.5px solid #0b0b0b",
              padding: "10px 20px",
              fontSize: "22px",
            }}
          >
            kbathmax.com
          </div>
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only */}
      <img src={photo} width={480} height={360} alt="" />
    </div>
  );
}
