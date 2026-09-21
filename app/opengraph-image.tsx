import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { OgCard } from "@/components/og-card";

export const alt = "Koshin — Student Developer & AI Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Satori has no built-in font fallback: an empty `fonts` array throws
  // "No fonts are loaded", which renders the whole card imageless. Read the
  // face off disk so generating this never depends on a network round-trip.
  const publicSansBold = await readFile(
    join(process.cwd(), "assets/fonts/PublicSans-ExtraBold.ttf"),
  );

  return new ImageResponse(<OgCard subtitle="Student Developer & AI Builder" />, {
    ...size,
    fonts: [
      { name: "Public Sans", data: publicSansBold, style: "normal", weight: 800 },
    ],
  });
}
