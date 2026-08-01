import { Fragment } from "react";
import type { OssProject } from "@/data/projects";

/**
 * Four repos is a sentence, not a grid. Set as a run of links so the section
 * reads as a footnote to the work index rather than competing with it.
 */
export function OssList({ items }: { items: readonly OssProject[] }) {
  return (
    <p className="pretty t-body text-muted">
      {items.map((repo, i) => (
        <Fragment key={repo.name}>
          <a
            href={repo.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="link font-mono text-[0.92em]"
          >
            {repo.name}
          </a>
          {repo.note ? (
            <span className="text-faint"> ({repo.note})</span>
          ) : null}
          {i < items.length - 1 ? (
            <span aria-hidden="true" className="text-faint">
              {" "}
              ·{" "}
            </span>
          ) : null}
        </Fragment>
      ))}
    </p>
  );
}
