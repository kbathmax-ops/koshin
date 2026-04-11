import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const BASE_URL = "https://portfolio-koshin2.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Koshin — Student Developer & AI Builder",
    template: "%s | Koshin",
  },
  description:
    "Portfolio of Koshin — 17-year-old student developer and founder building AI-powered travel software, sanctions research tools, and B2B SaaS. Next.js, TypeScript, Claude API.",
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
    siteName: "Koshin — Developer Portfolio",
    title: "Koshin — Student Developer & AI Builder",
    description:
      "17-year-old developer and student founder. AI-powered travel software, sanctions research tools, and B2B SaaS — built with Next.js and Claude API.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Koshin — Student Developer & AI Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Koshin — Student Developer & AI Builder",
    description:
      "17-year-old developer building AI travel software, sanctions research tools, and B2B SaaS with Next.js and Claude API.",
    images: ["/og.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${manrope.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
