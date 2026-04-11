import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Koshin — Student Developer & AI Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Load Plus Jakarta Sans 800 from Google Fonts
  let fontBold: ArrayBuffer | undefined;
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        },
      }
    ).then((r) => r.text());

    const match = css.match(/src: url\(([^)]+\.woff2)\)/);
    if (match?.[1]) {
      fontBold = await fetch(match[1]).then((r) => r.arrayBuffer());
    }
  } catch {
    /* fall through — ImageResponse uses a built-in sans-serif fallback */
  }

  const fonts: Array<{
    name: string;
    data: ArrayBuffer;
    style?: "normal" | "italic";
    weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  }> = fontBold
    ? [{ name: "Plus Jakarta Sans", data: fontBold, style: "normal", weight: 800 }]
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          background: "#fcf9ef",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* Available badge */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              background: "#2d4a36",
              color: "#98b99f",
              borderRadius: "9999px",
              padding: "10px 24px",
              fontSize: "13px",
              fontWeight: 800,
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
                background: "#f6be39",
              }}
            />
            Available for hire
          </div>
        </div>

        {/* Name + title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "108px",
              fontWeight: 800,
              color: "#173321",
              lineHeight: "0.88",
              letterSpacing: "-5px",
              display: "flex",
            }}
          >
            koshin
            <span style={{ color: "#9d4305" }}>.</span>
          </div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: "#424842",
              letterSpacing: "-0.5px",
            }}
          >
            Student Developer & AI Builder
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
          {/* Tech pills */}
          <div style={{ display: "flex", gap: "12px" }}>
            {["Next.js", "Claude API", "TypeScript"].map((tag) => (
              <div
                key={tag}
                style={{
                  background: "#e5e2d9",
                  color: "#173321",
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

          {/* Domain */}
          <div
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#9d4305",
              letterSpacing: "0.04em",
            }}
          >
            portfolio-koshin2.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
