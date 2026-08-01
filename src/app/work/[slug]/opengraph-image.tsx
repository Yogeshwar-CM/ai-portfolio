import { ImageResponse } from "next/og";
import { projects, studies } from "@/data/projects";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Case study — Yogeshwar CM";

export function generateStaticParams() {
  return studies.map((project) => ({ slug: project.slug }));
}

/**
 * Per-study share card. Rendered at build time by Satori — flex only, and
 * every element with more than one child needs an explicit display.
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

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 80px",
          backgroundColor: "#060708",
          backgroundImage:
            "radial-gradient(900px 420px at 12% -12%, rgba(110,231,249,0.16), transparent 65%), radial-gradient(700px 380px at 98% 112%, rgba(180,205,220,0.10), transparent 60%)",
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
              display: "flex",
              fontSize: 19,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#6ee7f9",
            }}
          >
            Case study
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#7d848c",
            }}
          >
            {meta}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: title.length > 26 ? 74 : 92,
              letterSpacing: -3,
              lineHeight: 1.04,
              color: "#ffffff",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 28,
              lineHeight: 1.35,
              color: "#9aa1a9",
              maxWidth: 960,
            }}
          >
            {summary}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 26,
            fontSize: 21,
            color: "#6a7078",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {stack.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.12)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  fontSize: 19,
                  color: "#9aa1a9",
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div style={{ display: "flex" }}>{site.name}</div>
        </div>
      </div>
    ),
    size,
  );
}
