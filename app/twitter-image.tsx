import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { OgCard } from "@/components/og-card";

/* X gets its own card so its positioning can move independently of the
   general-purpose OG image. */
export const alt = "koshin — 18 year old taking a gap year to work in startup growth & travel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const publicSansBold = await readFile(
    join(process.cwd(), "assets/fonts/PublicSans-ExtraBold.ttf"),
  );

  return new ImageResponse(
    <OgCard subtitle="18 year old taking a gap year to work in startup growth & travel" />,
    {
      ...size,
      fonts: [
        { name: "Public Sans", data: publicSansBold, style: "normal", weight: 800 },
      ],
    },
  );
}
