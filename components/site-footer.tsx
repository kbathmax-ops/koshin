export function SiteFooter() {
  return (
    <footer className="bg-surface-container-low mt-0">
      <div className="flex flex-col items-center text-center gap-1 px-6 py-12 md:px-12 md:py-14 max-w-7xl mx-auto">
        <span
          className="text-lg font-black tracking-tighter block"
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
    </footer>
  );
}
