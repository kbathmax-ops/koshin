export function SiteFooter() {
  return (
    <footer className="bg-surface-container-low mt-0">
      <div className="flex flex-col items-center text-center gap-1 px-6 py-12 md:px-12 md:py-14 max-w-7xl mx-auto">
        <span
          className="text-lg font-medium tracking-tighter block"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          koshin<span style={{ color: "var(--ink)" }}>.</span>
        </span>
        <p
          className="text-xs uppercase font-semibold"
          style={{ letterSpacing: "0.2em", color: "rgb(var(--ink-rgb) / 0.4)" }}
        >
          © 2026
        </p>
      </div>
    </footer>
  );
}
