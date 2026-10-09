import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, ogAssets } from "@/components/og-card";

/* X gets its own card so its positioning can move independently of the
   general-purpose OG image. */
export const alt = "Koshin Bathmax — 18 year old taking a gap year to work in startup growth & travel";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const { fonts, photo } = await ogAssets();

  return new ImageResponse(
    <OgCard subtitle="18 year old taking a gap year to work in startup growth & travel" photo={photo} />,
    { ...size, fonts },
  );
}
