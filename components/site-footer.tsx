const LINKS = [
  { label: "GitHub", href: "https://github.com/koshinbathmax" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/work#contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-surface-container-low mt-0">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-6 py-12 md:px-12 md:py-14 max-w-7xl mx-auto">
        <div>
          <span
            className="text-lg font-black tracking-tighter block mb-1"
            style={{ fontFamily: "var(--font-advercase), 'Public Sans', sans-serif", color: "#12233f" }}
          >
            koshin<span style={{ color: "#2f5d9e" }}>.</span>
          </span>
          <p
            className="text-xs uppercase font-semibold"
            style={{ letterSpacing: "0.2em", color: "rgba(18,35,63,0.4)" }}
          >
            © 2026
          </p>
        </div>
        <div className="flex gap-6 sm:gap-10 -my-3">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs uppercase font-semibold transition-colors hover:opacity-100 py-3"
              style={{ letterSpacing: "0.2em", color: "rgba(18,35,63,0.5)" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
