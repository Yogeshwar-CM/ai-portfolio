import { ImageResponse } from "next/og";

export const alt = "Yogeshwar CM — AI Engineer, production agentic systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Rendered at build time by Satori — keep to the CSS subset it supports
 * (no backdrop-filter, no background-clip: text).
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#060708",
          backgroundImage:
            "radial-gradient(900px 420px at 15% -10%, rgba(110,231,249,0.16), transparent 65%), radial-gradient(700px 380px at 95% 110%, rgba(180,205,220,0.10), transparent 60%)",
          color: "#f1f3f5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.16)",
              backgroundColor: "rgba(255,255,255,0.05)",
              fontSize: 18,
              letterSpacing: -1,
            }}
          >
            YC
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#6ee7f9",
            }}
          >
            AI Engineer
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              letterSpacing: -4,
              lineHeight: 1,
              color: "#ffffff",
            }}
          >
            Yogeshwar CM
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              lineHeight: 1.3,
              color: "#9aa1a9",
              maxWidth: 900,
            }}
          >
            Production agentic systems at Pickyourtrail. B.Tech CSE (AI &amp;
            ML), HITS Chennai.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
            fontSize: 22,
            color: "#6a7078",
          }}
        >
          <div style={{ display: "flex" }}>github.com/Yogeshwar-CM</div>
          <div style={{ display: "flex" }}>Chennai, India</div>
        </div>
      </div>
    ),
    size,
  );
}
