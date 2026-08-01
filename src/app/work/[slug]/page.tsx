import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, studies } from "@/data/projects";
import { site } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight } from "@/components/icons";

type Params = { params: Promise<{ slug: string }> };

/** Stable ids for the in-page table of contents. */
const anchor = (heading: string) =>
  heading
    .toLowerCase()
    // Drop apostrophes rather than translating them into a separator, so
    // "What I'd do differently" reads as `what-id-do-differently`.
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function generateStaticParams() {
  return studies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} · ${site.name}`;

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title,
      description: project.summary,
      url: `/work/${project.slug}`,
      type: "article",
    },
    // Without this the card inherits the root layout's twitter title, so every
    // shared case study would advertise itself as the home page.
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      creator: site.xHandle,
    },
  };
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project?.study) notFound();

  const study = project.study;
  /* Cycle through the studies in order rather than always landing on the
     first sibling — otherwise two case studies point at each other forever. */
  const position = studies.findIndex((p) => p.slug === project.slug);
  const next = studies[(position + 1) % studies.length];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: project.title,
        description: project.summary,
        author: { "@type": "Person", name: site.name, url: site.url },
        publisher: { "@type": "Person", name: site.name },
        url: `${site.url}/work/${project.slug}`,
        mainEntityOfPage: `${site.url}/work/${project.slug}`,
        about: project.stack,
        articleSection: study.sections.map((s) => s.heading),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Selected work",
            item: `${site.url}/#work`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `${site.url}/work/${project.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <article className="relative z-10 pb-24 pt-28 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="shell">
        <Reveal>
          <Link
            href="/#work"
            className="link-draw font-mono text-[0.72rem] uppercase tracking-[0.16em] text-faint"
          >
            ← Selected work
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-faint">
            <span className="text-accent/80">{project.kind}</span>
            <span aria-hidden="true">/</span>
            <span>{project.year}</span>
            <span aria-hidden="true">/</span>
            <span>{project.role}</span>
          </div>

          <h1 className="mercury balance mt-5 text-[clamp(2.4rem,6vw,4rem)] font-medium leading-[1.02] tracking-[-0.04em]">
            {project.title}
          </h1>

          <p className="pretty measure mt-6 text-[1.05rem] leading-relaxed text-muted">
            {project.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-ghost"
              >
                View repo
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
              </a>
            ) : null}
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-ghost"
              >
                Visit
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
              </a>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal delay={80} className="lg:col-span-8">
            <p className="pretty serif measure text-[1.35rem] leading-[1.6] text-text/90 md:text-[1.5rem]">
              {study.intro}
            </p>

            <div className="mt-14 space-y-14">
              {study.sections.map((section, i) => (
                <section
                  key={section.heading}
                  id={anchor(section.heading)}
                  className="scroll-mt-28"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="kicker tabular-nums text-accent/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-[1.35rem] font-medium tracking-[-0.025em] text-text">
                      {section.heading}
                    </h2>
                  </div>
                  <span className="hairline mt-4 block" />
                  <div className="mt-5 space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="pretty measure text-[0.98rem] leading-[1.75] text-muted"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140} className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <nav aria-label="On this page" className="mb-6 hidden lg:block">
                <p className="kicker">On this page</p>
                <ol className="mt-3 space-y-2 border-l border-line pl-4">
                  {study.sections.map((section, i) => (
                    <li key={section.heading}>
                      <a
                        href={`#${anchor(section.heading)}`}
                        className="link-draw inline-flex gap-2 text-[0.82rem] text-muted"
                      >
                        <span className="font-mono text-[0.68rem] tabular-nums text-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <dl className="glass divide-y divide-line">
                {study.facts.map((fact) => (
                  <div key={fact.label} className="px-5 py-4">
                    <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-[0.88rem] text-muted">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6">
                <p className="kicker">Stack</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass mt-6 p-5">
                <p className="text-[0.88rem] leading-relaxed text-muted">
                  Want the longer version, or the parts that don&apos;t fit on a
                  page?
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="link-draw mt-3 inline-block text-[0.85rem]"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {next ? (
          <Reveal delay={60}>
            <div className="mt-24 border-t border-line pt-8">
              <p className="kicker">Next</p>
              <Link
                href={`/work/${next.slug}`}
                className="group mt-3 flex items-baseline justify-between gap-6"
              >
                <span className="text-2xl font-medium tracking-[-0.025em] text-text transition-colors group-hover:text-white md:text-3xl">
                  {next.title}
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        ) : null}
      </div>
    </article>
  );
}
