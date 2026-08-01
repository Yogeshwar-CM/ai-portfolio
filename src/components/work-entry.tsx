import Link from "next/link";
import type { Project } from "@/data/projects";

/**
 * One line of the work index. A contents page, not a card: index number,
 * title, and the kind/year on the right margin, with the detail folded
 * underneath. The fold opens on hover or keyboard focus above `lg` and is
 * simply always open below it — there is no hover on a phone.
 *
 * The title link carries `after:absolute` so the whole row is one target; the
 * secondary links sit above it on the z-axis to stay individually clickable.
 */
export function WorkEntry({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const href = project.study
    ? `/work/${project.slug}`
    : project.repo ?? project.href;
  const external = !project.study;

  return (
    <article className="entry group">
      <div className="grid grid-cols-[2.25rem_1fr] gap-x-4 md:grid-cols-[3.5rem_1fr_auto] md:gap-x-6">
        <span className="label num pt-2 md:pt-3" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3 className="t-h3 text-ink transition-colors group-hover:text-accent">
          {href ? (
            <Link
              href={href}
              {...(external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
              {external ? (
                <span aria-hidden="true" className="t-sm align-middle">
                  {" "}
                  ↗
                </span>
              ) : null}
            </Link>
          ) : (
            project.title
          )}
        </h3>

        <p className="label col-start-2 mt-1.5 md:col-start-3 md:mt-3 md:text-right">
          {project.kind} · {project.year}
        </p>

        {/* Explicit start *and* end: `col-span-2` would emit the `grid-column`
            shorthand and blow away the start, dropping the fold into column 1
            at `md`. */}
        <div className="entry-body col-start-2 col-end-3 md:col-end-4">
          <div>
            <div className="pt-4 md:pt-5">
              <p className="pretty t-body measure text-muted">
                {project.summary}
              </p>

              <p className="pretty t-sm measure mt-4 text-faint">
                <span className="label label-accent mr-2">Outcome</span>
                {project.outcome}
              </p>

              <div className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <p className="meta">
                  {project.role} — {project.stack.join(" · ")}
                </p>

                <span className="relative z-10 flex flex-wrap gap-x-5 gap-y-1">
                  {project.study ? (
                    <Link
                      href={`/work/${project.slug}`}
                      className="label label-accent hover:text-accent-deep"
                    >
                      Case study →
                    </Link>
                  ) : null}
                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="label link-quiet"
                    >
                      Repo ↗
                    </a>
                  ) : null}
                  {project.href && !project.repo ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="label link-quiet"
                    >
                      Visit ↗
                    </a>
                  ) : null}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
