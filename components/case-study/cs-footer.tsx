import Link from "next/link";

/**
 * Same structure as the footer on /work, but drawn with case study tokens so
 * it inherits whichever theme is active instead of hardcoding black.
 */
export function CsFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--cs-hairline)" }}>
      <div className="flex flex-col items-center gap-2 px-6 py-12 md:px-12 md:py-14">
        <Link
          href="/"
          className="text-lg font-black tracking-tighter"
          style={{
            fontFamily: "var(--cs-font-display)",
            color: "var(--cs-color-text)",
          }}
        >
          koshin<span style={{ color: "var(--cs-color-accent)" }}>.</span>
        </Link>
        <p
          className="text-xs uppercase tracking-[0.2em] font-semibold"
          style={{
            fontFamily: "var(--cs-font-mono)",
            color: "var(--cs-color-muted)",
          }}
        >
          © 2026
        </p>
      </div>
    </footer>
  );
}
