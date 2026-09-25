import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { ResumeViewer } from "@/components/resume-viewer";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "resume",
  description: "Koshin Bathmax — résumé.",
  alternates: { canonical: "https://kbathmax.com/resume" },
};

export default function Resume() {
  return (
    <>
      <Nav />
      <main style={{ background: "#d9d9d9", minHeight: "100dvh", color: "#12233f" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "clamp(6rem, 14vh, 9rem) clamp(1.25rem, 5vw, 3rem) 4rem",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-advercase), 'Public Sans', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              margin: "0 0 1.5rem",
            }}
          >
            résumé
          </h1>

          <ResumeViewer
            src="/resume-page-1.png"
            width={1854}
            height={2400}
            pdfHref="/resume.pdf"
          />
        </div>
        <SiteFooter />
      </main>
    </>
  );
}
