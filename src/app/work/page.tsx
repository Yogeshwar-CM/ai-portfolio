import type { Metadata } from "next";
import Link from "next/link";
import { oss, projects, studies } from "@/data/projects";
import { site } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { Words } from "@/components/words";
import { WorkEntry } from "@/components/work-entry";
import { OssList } from "@/components/oss-list";

const description =
  "Case studies from Yogeshwar CM — JobHouse, production agentic systems at Pickyourtrail, a hackathon grand prize, and Mastervance. Real stacks, honest outcomes.";

export const metadata: Metadata = {
  title: "Selected work",
  description,
  alternates: { canonical: "/work" },
  openGraph: {
    title: `Selected work · ${site.name}`,
    description,
    url: "/work",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Selected work · ${site.name}`,
    description,
    creator: site.xHandle,
  },
};

export default function WorkIndex() {
  /* `/work/<slug>` existed with nothing above it, so trimming the URL — which
     people do — landed on a 404. This is that missing parent: a real index,
     in the sitemap, and the breadcrumb target for every case study. */
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Selected work — ${site.name}`,
    description,
    url: `${site.url}/work`,
    hasPart: studies.map((project) => ({
      "@type": "Article",
      headline: project.title,
      description: project.summary,
      url: `${site.url}/work/${project.slug}`,
    })),
  };

  return (
    <div className="relative z-10 pb-24 pt-28 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="shell">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule-strong pb-3">
          <Link href="/" className="label link-quiet">
            ← Home
          </Link>
          <p className="label">Index · {projects.length} entries</p>
        </div>

        <h1 className="balance t-title mt-10">
          <Words text="Selected work" stagger={1.2} />
        </h1>

        <Reveal delay={80}>
          <p className="pretty measure t-lede mt-6 text-muted">
            Four builds with a case study each — what the thing was, how the
            pieces fit, the calls I made, and what I&apos;d do differently.
            Where the detail sits behind a company login, I say so instead of
            dressing it up.
          </p>
        </Reveal>

        <div className="mt-14 border-t border-rule">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 60}>
              <WorkEntry project={project} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="mt-16 grid gap-4 lg:grid-cols-12 lg:gap-14">
            <h2 className="label lg:col-span-3">Open source · recent</h2>
            <div className="lg:col-span-9">
              <OssList items={oss} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-16 border-t border-rule pt-8">
            <p className="pretty t-body text-muted">
              Looking for something specific?{" "}
              <a href={`mailto:${site.email}`} className="link">
                {site.email}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
