import { Anton, Instrument_Sans, Playfair_Display } from "next/font/google";

/*
 * Type for the Impression Ventures redesign concept, matched to the Northzone
 * reference: a wide high-contrast serif wordmark, a condensed heavy sans for
 * headlines, and a plain sans in tracked caps for nav and body.
 */
export const ivSerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["900"],
  style: ["normal", "italic"],
  variable: "--iv-serif",
  display: "swap",
});

export const ivCondensed = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--iv-condensed",
  display: "swap",
});

export const ivSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--iv-sans",
  display: "swap",
});

export const ivFontVars = `${ivSerif.variable} ${ivCondensed.variable} ${ivSans.variable}`;
