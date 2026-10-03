/* Shared artwork for the link-preview cards.
   app/opengraph-image.tsx and app/twitter-image.tsx render the same frame; only
   the line under the wordmark differs, so X can carry its own positioning
   without the two designs drifting apart. */
export function OgCard({ subtitle }: { subtitle: string }) {
  return (
    <div
      style={{
        background: "#f5f5f2",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        fontFamily: "'Public Sans', sans-serif",
      }}
    >
      {/* Available badge */}
      <div style={{ display: "flex" }}>
        <div
          style={{
            background: "#0b0b0b",
            color: "#f5f5f2",
            borderRadius: "9999px",
            padding: "10px 24px",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "9999px",
              background: "#0b0b0b",
            }}
          />
          Available for hire
        </div>
      </div>

      {/* Name + line */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            fontSize: "108px",
            fontWeight: 500,
            color: "#0b0b0b",
            lineHeight: "0.88",
            letterSpacing: "-5px",
            display: "flex",
          }}
        >
          koshin
          <span style={{ color: "#0b0b0b" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "32px",
            fontWeight: 700,
            color: "#5f5f5b",
            letterSpacing: "-0.5px",
            lineHeight: 1.3,
            maxWidth: "730px",
          }}
        >
          {subtitle}
        </div>
      </div>

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div style={{ display: "flex", gap: "12px" }}>
          {["Next.js", "Claude API", "TypeScript"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "#ebebe7",
                color: "#0b0b0b",
                borderRadius: "9999px",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: 700,
                display: "flex",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        <div
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#0b0b0b",
            letterSpacing: "0.04em",
          }}
        >
          kbathmax.com
        </div>
      </div>
    </div>
  );
}
