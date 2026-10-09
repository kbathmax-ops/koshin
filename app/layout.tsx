import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { PageTransition } from "@/components/page-transition";
import "./globals.css";

// Neue Haas Grotesk (display + text) is served from an Adobe Fonts web
// project. Without the ID the type falls back to Helvetica Neue — see
// --font-display / --font-body in globals.css.
const adobeFontsId = process.env.NEXT_PUBLIC_ADOBE_FONTS_ID;

const BASE_URL = "https://kbathmax.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Koshin Bathmax",
    template: "%s | Koshin Bathmax",
  },
  description:
    "Portfolio of Koshin, a 17-year-old student developer and founder building AI-powered travel software, sanctions research tools, and B2B SaaS with Next.js, TypeScript, and the Claude API.",
  keywords: [
    "student developer portfolio",
    "17 year old developer",
    "AI developer",
    "Next.js developer portfolio",
    "Claude API developer",
    "student founder",
    "young developer",
    "AI travel agent",
    "sanctions precedent search",
    "euro summer planner",
    "full stack student developer",
    "TypeScript developer",
  ],
  authors: [{ name: "Koshin", url: BASE_URL }],
  creator: "Koshin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Koshin Bathmax",
    title: "Koshin Bathmax",
    description: "Changing how people see brands & solo-travelling when I can.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koshin Bathmax",
    description:
      "18 year old taking a gap year to work in startup growth & travel.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {adobeFontsId && (
        <head>
          <link rel="stylesheet" href={`https://use.typekit.net/${adobeFontsId}.css`} />
        </head>
      )}
      <body className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
        <PageTransition>{children}</PageTransition>
        <Analytics />
      </body>
    </html>
  );
}
