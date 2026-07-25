// Imported once for the whole /case-studies subtree. Adding a case study never
// requires touching this file or the stylesheet it pulls in.
import "./case-studies.css";

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
