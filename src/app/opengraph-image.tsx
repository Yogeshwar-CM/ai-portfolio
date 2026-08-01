import { ImageResponse } from "next/og";
import { charset, frauncesTTF, og } from "./og-font";

export const alt = "Yogeshwar CM — AI Engineer, production agentic systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const name = "Yogeshwar CM";

/**
 * Rendered at build time by Satori — keep to the CSS subset it supports (flex
 * only, no CSS variables, and an explicit `display` on anything with more than
 * one child). Paper stock, so the card reads as a printed cover in a timeline
 * that is mostly dark cards.
 */
export default async function OpengraphImage() {
  const fonts = await frauncesTTF(
    charset(
      name,
      "Available for AI engineering roles",
      "Chennai, IN",
      "AI Engineer at Pickyourtrail — production agentic systems. B.Tech CSE (AI & ML), HITS Chennai.",
      "github.com/Yogeshwar-CM",
      "Selected work · Case studies",
    ),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 76px",
          backgroundColor: og.paper,
          color: og.ink,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderBottom: `2px solid ${og.ruleStrong}`,
            paddingBottom: 20,
            fontSize: 21,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", color: og.accent }}>
            Available for AI engineering roles
          </div>
          <div style={{ display: "flex", color: og.faint }}>Chennai, IN</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              fontSize: 132,
              letterSpacing: -4,
              lineHeight: 1,
              color: og.ink,
            }}
          >
            {name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 32,
              lineHeight: 1.35,
              color: og.muted,
              maxWidth: 880,
            }}
          >
            AI Engineer at Pickyourtrail — production agentic systems. B.Tech
            CSE (AI &amp; ML), HITS Chennai.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${og.rule}`,
            paddingTop: 22,
            fontSize: 22,
            color: og.faint,
          }}
        >
          <div style={{ display: "flex" }}>github.com/Yogeshwar-CM</div>
          <div style={{ display: "flex" }}>Selected work · Case studies</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
