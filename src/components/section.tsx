import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

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
      className="relative z-10 scroll-mt-24 border-t border-line/70 py-20 md:py-28"
    >
      <div className="shell">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="kicker tabular-nums text-accent/70">{index}</span>
            <span className="kicker">{label}</span>
            <span className="hairline hidden flex-1 sm:block" />
          </div>

          <h2
            id={`${id}-title`}
            className="mercury balance mt-6 text-3xl font-medium tracking-[-0.03em] md:text-[2.6rem] md:leading-[1.08]"
          >
            {title}
          </h2>

          {lede ? (
            <p className="pretty mt-4 max-w-2xl text-[0.975rem] leading-relaxed text-muted">
              {lede}
            </p>
          ) : null}
        </Reveal>

        <div className="mt-12 md:mt-14">{children}</div>
      </div>
    </section>
  );
}
