import type { Metadata } from "next";
import { IvCollateral } from "@/components/redesign/iv-collateral";

export function generateStaticParams() {
  return [{ slug: "impression-ventures" }];
}

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Impression Ventures — Event Collateral (Concept)",
  robots: { index: false, follow: false },
};

export default function BrandPage() {
  return <IvCollateral />;
}
