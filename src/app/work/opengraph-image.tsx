import { ImageResponse } from "next/og";
import { studies } from "@/data/projects";
import { site } from "@/data/site";
import { charset, frauncesTTF, og } from "@/app/og-font";

export const alt = "Selected work — case studies by Yogeshwar CM";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const title = "Selected work";

/**
 * The index page shares as an index: the four studies listed by number and
 * title, the way they are set on the page itself. Without this the route fell
 * back to the root card, so a shared link to the work index advertised the
 * home page and named none of the work on it.
 *
 * Satori subset only — flex, no CSS variables, explicit `display` on anything
 * with more than one child.
 */
export default async function WorkIndexImage() {
  const fonts = await frauncesTTF(
    charset(
      title,
      site.name,
      site.url,
      "Index case studies",
      "What it was · how it fit · the calls I made",
      ...studies.map((project) => `${project.title} ${project.year}`),
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
          padding: "60px 76px",
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
            paddingBottom: 18,
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", color: og.accent }}>
            Index · {String(studies.length).padStart(2, "0")} case studies
          </div>
          <div style={{ display: "flex", color: og.faint }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              fontSize: 92,
              letterSpacing: -3,
              lineHeight: 1,
              color: og.ink,
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 34,
            }}
          >
            {studies.map((project, i) => (
              <div
                key={project.slug}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  borderTop: `1px solid ${og.rule}`,
                  paddingTop: 14,
                  paddingBottom: 14,
                  fontSize: 30,
                  color: og.muted,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: 78,
                    fontSize: 21,
                    letterSpacing: 2,
                    color: og.accent,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ display: "flex", flex: 1, color: og.ink }}>
                  {project.title}
                </div>
                {/* Without the shrink guard "2025 — present" is the long one,
                    and it runs off the right edge of the card. */}
                <div
                  style={{
                    display: "flex",
                    flexShrink: 0,
                    paddingLeft: 24,
                    fontSize: 21,
                    letterSpacing: 1,
                    color: og.faint,
                  }}
                >
                  {project.year}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `2px solid ${og.ruleStrong}`,
            paddingTop: 20,
            fontSize: 21,
            letterSpacing: 1,
            color: og.faint,
          }}
        >
          <div style={{ display: "flex" }}>
            What it was · how it fit · the calls I made
          </div>
          <div style={{ display: "flex" }}>
            {site.url.replace(/^https?:\/\//, "")}/work
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
