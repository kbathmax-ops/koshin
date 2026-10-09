import type { Metadata } from "next";
import { IvAbout } from "@/components/redesign/iv-site";

export function generateStaticParams() {
  return [{ slug: "impression-ventures" }];
}

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Impression Ventures — About (Redesign Concept)",
  robots: { index: false, follow: false },
};

export default function RedesignAboutPage() {
  return <IvAbout />;
}
