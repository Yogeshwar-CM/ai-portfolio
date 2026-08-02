import type { Metadata } from "next";
import Link from "next/link";
import { oss, projects, studies, type Project } from "@/data/projects";
import { site } from "@/data/site";
import { outline, readingTime, startYear } from "@/lib/study";
import { Reveal } from "@/components/reveal";
import { Rise } from "@/components/rise";
import { Words } from "@/components/words";
import { StudyIndexEntry } from "@/components/study-index";
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
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `Selected work — ${site.name}`,
        description,
        url: `${site.url}/work`,
        author: { "@type": "Person", name: site.name, url: site.url },
        hasPart: studies.map((project) => ({
          "@type": "Article",
          headline: project.title,
          description: project.summary,
          url: `${site.url}/work/${project.slug}`,
          ...(project.study
            ? {
                articleSection: outline(project.study).map(
                  (item) => item.heading,
                ),
                timeRequired: `PT${readingTime(project.study).minutes}M`,
              }
            : {}),
        })),
      },
      /* Every case study declares a three-step trail through this page, and
         this page declared none — so the one URL all four point at was the
         only one in the set that could not render a breadcrumb in a result. */
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Selected work",
            item: `${site.url}/work`,
          },
        ],
      },
    ],
  };

  /* Grouped by the year the work started, newest first — the one axis the
     home page's flat list does not give you. `2025 — present` buckets with
     `2025` rather than opening a group of one. */
  const byYear = new Map<string, Project[]>();
  for (const project of projects) {
    const year = startYear(project.year);
    const bucket = byYear.get(year);
    if (bucket) bucket.push(project);
    else byYear.set(year, [project]);
  }
  const groups = [...byYear].sort(([a], [b]) => Number(b) - Number(a));

  // Numbering runs across the whole index, not per group.
  const position = new Map(projects.map((project, i) => [project.slug, i]));

  const totalMinutes = studies.reduce(
    (sum, project) => sum + readingTime(project.study!).minutes,
    0,
  );

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
          <p className="label">
            Index · {projects.length} entries · {totalMinutes} min in full
          </p>
        </div>

        <h1 className="balance t-title mt-10">
          <Words text="Selected work" stagger={1.2} />
        </h1>

        <Rise delay={80}>
          <p className="pretty measure t-lede mt-6 text-muted">
            Four builds with a case study each — what the thing was, how the
            pieces fit, the calls I made, and what I&apos;d do differently.
            Where the detail sits behind a company login, I say so instead of
            dressing it up.
          </p>
          <p className="pretty measure t-sm mt-4 text-faint">
            Every section of every study is listed below and linked directly.
            Skip to the part you came for.
          </p>
        </Rise>

        {/* One strong rule opens the index; after that the year rail is the
            only divider between groups, because the entries already carry
            their own rules and a second heavy line beside them reads as a
            table that lost its columns. */}
        <div className="mt-16 border-t border-rule-strong">
          {groups.map(([year, entries], group) => (
            <section
              key={year}
              aria-labelledby={`year-${year}`}
              className={`grid gap-x-10 lg:grid-cols-12 ${
                group ? "pt-12" : "pt-6"
              }`}
            >
              <h2
                id={`year-${year}`}
                className="label num label-ink lg:sticky lg:top-24 lg:col-span-2 lg:self-start lg:pt-11"
              >
                {year}
              </h2>

              <div className="mt-5 lg:col-span-10 lg:mt-0">
                {entries.map((project) => (
                  <Reveal key={project.slug} delay={40}>
                    <StudyIndexEntry
                      project={project}
                      index={position.get(project.slug) ?? 0}
                    />
                  </Reveal>
                ))}
              </div>
            </section>
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
