import { ImageResponse } from "next/og";
import { projects, studies } from "@/data/projects";
import { site } from "@/data/site";
import { charset, frauncesTTF, og } from "@/app/og-font";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Deliberately generic, and deliberately still here.
   `generateImageMetadata` is the API that can see the slug and would describe
   each card by its own study — but adding it introduces a `[__metadata_id__]`
   segment that drops all four cards out of the prerender manifest and into
   on-demand rendering. These cards fetch Fraunces from Google Fonts to render;
   doing that inside a request from a social crawler, behind a try/catch that
   silently falls back to a system sans, is a worse card than a plain alt. The
   per-study alt is set in `generateMetadata` instead, where it costs nothing. */
export const alt = "Case study — Yogeshwar CM";

export function generateStaticParams() {
  return studies.map((project) => ({ slug: project.slug }));
}

/**
 * Per-study share card, same stock as the site. Rendered at build time by
 * Satori — flex only, and every element with more than one child needs an
 * explicit display.
 */
export default async function CaseStudyImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  const title = project?.title ?? site.name;
  const summary = project?.summary ?? site.shortBio;
  const meta = project
    ? [project.kind, project.year, project.role].join("  ·  ")
    : site.role;
  const stack = project?.stack.slice(0, 5) ?? [];
  const fonts = await frauncesTTF(
    charset(title, summary, meta, stack.join(" "), site.name, "Case study", site.url),
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
          <div style={{ display: "flex", color: og.accent }}>Case study</div>
          <div style={{ display: "flex", color: og.faint }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: og.faint,
            }}
          >
            {meta}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              marginTop: 20,
              fontSize: title.length > 26 ? 78 : 98,
              letterSpacing: -3,
              lineHeight: 1.02,
              color: og.ink,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 28,
              lineHeight: 1.4,
              color: og.muted,
              maxWidth: 960,
            }}
          >
            {summary}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${og.rule}`,
            paddingTop: 22,
            fontSize: 21,
            letterSpacing: 1,
            color: og.faint,
          }}
        >
          <div style={{ display: "flex" }}>{stack.join("  ·  ")}</div>
          <div style={{ display: "flex" }}>{site.url.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
