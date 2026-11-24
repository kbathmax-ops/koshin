/** `paper` is the /work pages' version: paper background with a hairline on top. */
export function SiteFooter({ paper = false }: { paper?: boolean }) {
  return (
    <footer
      className={paper ? undefined : "bg-surface-container-low mt-0"}
      style={paper ? { background: "var(--paper)", borderTop: "1px solid rgb(var(--ink-rgb) / 0.10)" } : undefined}
    >
      <div
        className={`flex flex-col items-center text-center ${paper ? "gap-2" : "gap-1"} px-6 py-12 md:px-12 md:py-14 max-w-7xl mx-auto`}
      >
        <span
          className="text-lg font-medium tracking-tighter block"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          koshin.
        </span>
        <p
          className="text-xs uppercase font-semibold"
          style={{ letterSpacing: "0.2em", color: `rgb(var(--ink-rgb) / ${paper ? 0.45 : 0.4})` }}
        >
          © 2026
        </p>
      </div>
    </footer>
  );
}
