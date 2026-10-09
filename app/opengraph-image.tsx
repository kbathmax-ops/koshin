import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, ogAssets } from "@/components/og-card";

export const alt = "Koshin Bathmax — changing how people see brands & solo-travelling when I can";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  // Fonts and photo come off disk so generating this never depends on a
  // network round-trip (Satori also throws with no fonts loaded).
  const { fonts, photo } = await ogAssets();

  return new ImageResponse(
    <OgCard subtitle="changing how people see brands & solo-travelling when I can" photo={photo} />,
    { ...size, fonts },
  );
}
