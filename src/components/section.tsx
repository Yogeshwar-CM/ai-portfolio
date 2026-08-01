import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

/**
 * Section head as a document rubric: the index and label hold a narrow left
 * column, the title and lede sit in the wide one. The asymmetry is the point —
 * nothing on this site is centred.
 */
export function Section({
  id,
  index,
  label,
  title,
  lede,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="section-y relative z-10 scroll-mt-20 border-t border-rule-strong"
    >
      <div className="shell">
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-3">
              <p className="label label-accent">{index}</p>
              <p className="label mt-1.5">{label}</p>
            </div>

            <div className="lg:col-span-9">
              <h2 id={`${id}-title`} className="t-h2 balance max-w-[20ch]">
                {title}
              </h2>

              {lede ? (
                <p className="pretty measure t-body mt-5 text-muted">{lede}</p>
              ) : null}
            </div>
          </div>
        </Reveal>

        <div className="mt-14 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
