import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, studies, type Project } from "@/data/projects";
import { site } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { StudyToc } from "@/components/study-toc";
import { Words } from "@/components/words";
import { NewTab } from "@/components/new-tab";

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

/**
 * Reading time from the study's own text. 220 wpm is the usual estimate for
 * screen reading; the floor of one minute keeps the short studies from
 * advertising "0 min".
 */
function readingTime(study: NonNullable<Project["study"]>) {
  const text = [
    study.intro,
    study.pullQuote,
    ...study.sections.flatMap((section) => [section.heading, ...section.body]),
    ...(study.decisions ?? []).flatMap((d) => [d.choice, d.over, d.why]),
  ].join(" ");

  const words = text.split(/\s+/).filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.round(words / 220)) };
}

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
  const toc = study.sections.map((section) => ({
    id: anchor(section.heading),
    heading: section.heading,
  }));
  const { words, minutes } = readingTime(study);

  /* Cycle through the studies in order rather than always landing on the
     first sibling — otherwise two case studies point at each other forever. */
  const position = studies.findIndex((p) => p.slug === project.slug);
  const next = studies[(position + 1) % studies.length];
  const previous = studies[(position - 1 + studies.length) % studies.length];
  // With fewer than three studies the cycle doubles back on itself, and
  // "previous" would be the same link as "next".
  const showPrevious = previous.slug !== next.slug && previous.slug !== slug;

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
        image: `${site.url}/work/${project.slug}/opengraph-image`,
        about: project.stack,
        articleSection: study.sections.map((s) => s.heading),
        wordCount: words,
        timeRequired: `PT${minutes}M`,
        inLanguage: "en",
      },
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
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule-strong pb-3">
          <Link href="/work" className="label link-quiet">
            ← Selected work
          </Link>
          <p className="label">
            Study {String(position + 1).padStart(2, "0")} of{" "}
            {String(studies.length).padStart(2, "0")} · {project.kind} ·{" "}
            {project.year} · {minutes} min read
          </p>
        </div>

        <h1 className="balance t-title mt-10 max-w-[16ch]">
          <Words text={project.title} stagger={0.9} />
        </h1>

        <Reveal delay={80}>
          <p className="pretty measure t-lede mt-6 text-muted">
            {project.summary}
          </p>

          {/* The honest result, stated before the prose rather than left for
              the reader to infer from it. It was already written for the work
              index and had no home on the page the index links to. */}
          <div className="mt-8 grid gap-1.5 border-y border-rule py-4 md:grid-cols-[7rem_1fr] md:gap-6">
            <p className="label label-accent">Outcome</p>
            <p className="pretty measure t-body text-ink">{project.outcome}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-line"
              >
                View repo
                <NewTab />
              </a>
            ) : null}
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-line"
              >
                Visit
                <NewTab />
              </a>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal delay={100} className="lg:col-span-8">
            <p className="pretty display measure text-[1.3rem] leading-[1.5] text-ink md:text-[1.45rem]">
              {study.intro}
            </p>

            <p className="pull measure mt-10">“{study.pullQuote}”</p>

            {/* Collapsed on small screens: the sticky rail that carries this
                on desktop is hidden there, and an always-open list would push
                the first paragraph a full screen down on a phone. */}
            <details className="mt-10 border-y border-rule py-4 lg:hidden">
              <summary className="label cursor-pointer list-none">
                On this page ({toc.length})
              </summary>
              <div className="mt-4">
                <StudyToc items={toc} />
              </div>
            </details>

            <div className="mt-14 space-y-14">
              {study.sections.map((section, i) => {
                const id = anchor(section.heading);
                return (
                  <section key={section.heading} id={id} className="scroll-mt-24">
                    <p className="label label-accent">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="t-h3 mt-2 text-ink">
                      {section.heading}
                      <a
                        href={`#${id}`}
                        className="anchor font-mono text-[0.6em]"
                        aria-label={`Link to “${section.heading}”`}
                      >
                        #
                      </a>
                    </h2>
                    <span className="hairline mt-4 block" />
                    <div className="mt-5 space-y-4">
                      {section.body.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 40)}
                          className="pretty measure t-body text-muted"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>

            {study.decisions?.length ? (
              <section id="decisions" className="mt-16 scroll-mt-24">
                <p className="label label-accent">
                  {String(study.sections.length + 1).padStart(2, "0")}
                </p>
                <h2 className="t-h3 mt-2 text-ink">
                  Calls I made
                  <a
                    href="#decisions"
                    className="anchor font-mono text-[0.6em]"
                    aria-label="Link to “Calls I made”"
                  >
                    #
                  </a>
                </h2>
                <span className="hairline mt-4 block" />

                {/* Chosen / instead of / why, as three typeset parts. The
                    trade-off is the content — it should not be hidden inside a
                    sentence a skimming reader will skip. */}
                <dl className="mt-6 border-t border-rule">
                  {study.decisions.map((decision) => (
                    <div key={decision.choice} className="border-b border-rule py-5">
                      <dt className="t-body text-ink">
                        {decision.choice}
                        <span className="label label-accent mx-2">over</span>
                        <span className="text-faint">{decision.over}</span>
                      </dt>
                      <dd className="pretty measure t-sm mt-2 text-muted">
                        {decision.why}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}
          </Reveal>

          <Reveal
            delay={140}
            className="lg:col-span-4 lg:border-l lg:border-rule lg:pl-10"
          >
            <div className="lg:sticky lg:top-20">
              <nav
                aria-label="On this page"
                data-print="hide"
                className="mb-8 hidden lg:block"
              >
                <p className="label mb-3">On this page</p>
                <StudyToc items={toc} />
              </nav>

              <p className="label mb-3">Particulars</p>
              <dl className="dossier">
                {study.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="label">{fact.label}</dt>
                    <dd className="t-sm leading-snug text-ink">{fact.value}</dd>
                  </div>
                ))}
                <div>
                  <dt className="label">Stack</dt>
                  <dd className="t-sm leading-snug text-ink">
                    {project.stack.join(" · ")}
                  </dd>
                </div>
              </dl>

              <p className="pretty t-sm mt-8 text-faint">
                Want the longer version, or the parts that don&apos;t fit on a
                page?{" "}
                <a href={`mailto:${site.email}`} className="link">
                  {site.email}
                </a>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <nav
            aria-label="More case studies"
            data-print="hide"
            className="mt-24 grid border-t border-rule-strong sm:grid-cols-2"
          >
            {showPrevious ? (
              <Link
                href={`/work/${previous.slug}`}
                className="group border-b border-rule py-7 sm:border-r sm:pr-8"
              >
                <span className="label">← Previous</span>
                <span className="t-h3 mt-2 block text-ink transition-colors group-hover:text-accent">
                  {previous.title}
                </span>
              </Link>
            ) : null}

            <Link
              href={`/work/${next.slug}`}
              className={`group border-b border-rule py-7 ${
                showPrevious ? "sm:pl-8 sm:text-right" : ""
              }`}
            >
              <span className="label">Next →</span>
              <span className="t-h3 mt-2 block text-ink transition-colors group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          </nav>

          {/* The prev/next pair cycles, so without this the only way back to
              the index from the foot of a study is the browser button or a
              scroll to the top. */}
          <p className="mt-8" data-print="hide">
            <Link href="/work" className="label link-quiet">
              ← All case studies
            </Link>
          </p>
        </Reveal>
      </div>
    </article>
  );
}
