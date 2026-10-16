import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, ogAssets } from "@/components/og-card";

export const alt = "Koshin Bathmax — building beautiful things";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  // Fonts and photo come off disk so generating this never depends on a
  // network round-trip (Satori also throws with no fonts loaded).
  const { fonts, photo } = await ogAssets();

  return new ImageResponse(
    <OgCard subtitle="building beautiful things" photo={photo} />,
    { ...size, fonts },
  );
}
