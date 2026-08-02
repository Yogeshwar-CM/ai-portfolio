import Link from "next/link";
import type { Project } from "@/data/projects";
import { outline, readingTime } from "@/lib/study";
import { NewTab } from "@/components/new-tab";

/**
 * One entry of the `/work` index.
 *
 * The home page already carries a folding version of this list, so a second
 * page of the same four rows read as padding to anyone who followed the link.
 * This is the thing the home page cannot be: a contents page. Every entry
 * exposes its study's own section list as deep links, so a reader who wants
 * the decision list or the "what I'd do differently" goes straight to it
 * instead of landing at the top of a five-section article and scrolling.
 *
 * Nothing folds here. On an index you came to on purpose, hiding the detail
 * behind a hover is the wrong trade.
 */
export function StudyIndexEntry({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const study = project.study;
  const items = study ? outline(study) : [];
  const minutes = study ? readingTime(study).minutes : null;
  const href = study ? `/work/${project.slug}` : project.repo ?? project.href;
  const external = !study;

  return (
    <article className="border-b border-rule py-9 md:py-11">
      {/* The contents list only becomes a side rail at `xl`. At `lg` the entry
          sits in ten of twelve columns of a 1024px viewport, and a third
          column there leaves the prose about 350px wide — narrower than the
          summary it has to hold. Below that it stacks under the entry. */}
      <div className="grid grid-cols-[2.25rem_1fr] gap-x-4 gap-y-7 md:grid-cols-[3.5rem_1fr] md:gap-x-6 xl:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,15rem)] xl:gap-x-10">
        <span className="label num pt-1.5 md:pt-2" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="t-h3 text-ink">
              {href ? (
                <Link
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  className="transition-colors hover:text-accent"
                >
                  {project.title}
                  {external ? (
                    <span className="t-sm align-middle">
                      <NewTab />
                    </span>
                  ) : null}
                </Link>
              ) : (
                project.title
              )}
            </h3>

            <p className="label whitespace-nowrap">
              {project.kind}
              {minutes ? ` · ${minutes} min read` : null}
            </p>
          </div>

          <p className="pretty measure t-body mt-3 text-muted">
            {project.summary}
          </p>

          <p className="pretty measure t-sm mt-3 text-faint">
            <span className="label label-accent mr-2">Outcome</span>
            {project.outcome}
          </p>

          <p className="meta mt-4">
            {project.role} — {project.stack.join(" · ")}
          </p>

          <div className="mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-2">
            {study ? (
              <Link
                href={`/work/${project.slug}`}
                className="label label-accent hover:text-accent-deep"
              >
                Read the case study →
              </Link>
            ) : null}
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="label link-quiet"
              >
                Repo
                <NewTab />
              </a>
            ) : null}
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer noopener"
                className="label link-quiet"
              >
                Visit
                <NewTab />
              </a>
            ) : null}
          </div>
        </div>

        {/* Explicit start *and* end at every step: `col-span` emits the
            `grid-column` shorthand, which would blow the start away and drop
            the contents list into the number column. */}
        {items.length ? (
          <nav
            aria-label={`Contents — ${project.title}`}
            className="col-start-2 col-end-3 xl:col-start-3 xl:col-end-4 xl:border-l xl:border-rule xl:pl-8"
          >
            <p className="label mb-2.5">Contents</p>
            <ol>
              {items.map((item, i) => (
                <li
                  key={item.id}
                  className="grid grid-cols-[1.5rem_1fr] items-baseline gap-2 border-t border-rule py-1.5 first:border-t-0 first:pt-0"
                >
                  <span className="label" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Link
                    href={`/work/${project.slug}#${item.id}`}
                    className="pretty link-quiet t-sm"
                  >
                    {item.heading}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
      </div>
    </article>
  );
}
