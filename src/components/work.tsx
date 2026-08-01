import Link from "next/link";
import { featured, oss, type Project } from "@/data/projects";
import { site } from "@/data/site";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Spotlight } from "@/components/spotlight";
import { ArrowUpRight } from "@/components/icons";

function WorkCard({ project, index }: { project: Project; index: number }) {
  const href = project.study ? `/work/${project.slug}` : project.repo ?? project.href;
  const external = !project.study;

  return (
    <Spotlight className="glass lift group relative overflow-hidden hover:border-line-strong">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-6 select-none font-mono text-[5.5rem] font-medium leading-none text-white/[0.025] md:text-[7rem]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <article className="relative grid gap-7 p-6 md:grid-cols-12 md:gap-8 md:p-8">
        <div className="md:col-span-7 lg:col-span-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint">
            <span className="text-accent/80">{project.kind}</span>
            <span aria-hidden="true">/</span>
            <span>{project.year}</span>
          </div>

          <h3 className="mt-3 text-2xl font-medium tracking-[-0.025em] text-text md:text-[1.75rem]">
            {href ? (
              <Link
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                className="after:absolute after:inset-0 after:content-[''] hover:text-white"
              >
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h3>

          <p className="pretty mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted">
            {project.summary}
          </p>

          <p className="pretty mt-5 max-w-xl border-l border-accent/40 pl-4 text-[0.9rem] leading-relaxed text-faint">
            {project.outcome}
          </p>
        </div>

        <div className="md:col-span-5 lg:col-span-4">
          <dl className="space-y-4 text-[0.8rem]">
            <div>
              <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
                Role
              </dt>
              <dd className="mt-1 text-muted">{project.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
                Stack
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <div className="relative z-10 mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8rem]">
            {project.study ? (
              <Link
                href={`/work/${project.slug}`}
                className="link-draw inline-flex items-center gap-1.5"
              >
                Case study
                <ArrowUpRight className="h-3.5 w-3.5 -rotate-45 opacity-70" />
              </Link>
            ) : null}
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="link-draw inline-flex items-center gap-1.5 text-muted"
              >
                Repo
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
              </a>
            ) : null}
            {project.href && !project.repo ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer noopener"
                className="link-draw inline-flex items-center gap-1.5 text-muted"
              >
                Link
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </Spotlight>
  );
}

export function Work() {
  return (
    <Section
      id="work"
      index="01"
      label="Selected work"
      title="Things I built, and what actually came out of them."
      lede="Three of these shipped to real users, one won a grand prize, and none of them come with invented metrics. Where the detail sits behind a company login, I say so instead of dressing it up."
    >
      <div className="space-y-5">
        {featured.map((project, i) => (
          <Reveal key={project.slug} delay={i * 70}>
            <WorkCard project={project} index={i} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={80}>
        <div className="mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="kicker">Open source · recent</h3>
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="link-draw inline-flex items-center gap-1.5 text-[0.8rem] text-muted"
            >
              All repos
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
            </a>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {oss.map((repo) => (
              <a
                key={repo.name}
                href={repo.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="glass lift group flex items-center justify-between gap-3 px-4 py-4 hover:border-line-strong"
              >
                <span className="min-w-0">
                  <span className="block truncate font-mono text-[0.82rem] text-text">
                    {repo.name}
                  </span>
                  {repo.note ? (
                    <span className="mt-0.5 block text-[0.72rem] text-faint">
                      {repo.note}
                    </span>
                  ) : null}
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
              </a>
            ))}
          </div>

          <p className="mt-4 text-[0.82rem] text-faint">
            Small, specific tools — not a decade of maintainership.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
