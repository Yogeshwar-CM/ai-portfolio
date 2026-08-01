import Link from "next/link";
import { site } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { ArrowDown, ArrowUpRight } from "@/components/icons";

const panel = [
  { label: "Now", value: "AI Engineer @ Pickyourtrail" },
  { label: "Focus", value: "Agentic systems, in production" },
  { label: "Based", value: "Thiruporur / Chennai, IN · UTC+5:30" },
  { label: "Open to", value: "Remote anywhere · onsite Chennai" },
];

export function Hero() {
  return (
    <section className="relative z-10 flex min-h-[92svh] items-center pb-20 pt-28 md:pb-28 md:pt-32">
      <div className="shell w-full">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-1.5 pl-2.5 pr-3.5">
                <span
                  aria-hidden="true"
                  className="dot-live h-1.5 w-1.5 rounded-full bg-accent"
                />
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                  Available for AI engineering roles
                </span>
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="mercury mt-7 text-[clamp(2.9rem,8.4vw,5.4rem)] font-medium leading-[0.94] tracking-[-0.045em]">
                Yogeshwar CM
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-muted md:text-[1.12rem]">
                <span className="text-text">AI Engineer at Pickyourtrail</span>,
                building{" "}
                <span className="text-text">production agentic systems</span>.
                B.Tech CSE (AI &amp; ML), HITS Chennai.
              </p>
            </Reveal>

            <Reveal delay={170}>
              <p className="pretty mt-5 max-w-xl text-[0.95rem] leading-relaxed text-faint">
                Two months full-time, about a year interning before that. Long
                enough to learn that most agent failures are plumbing failures,
                not model failures.
              </p>
            </Reveal>

            <Reveal delay={230}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="#work" className="btn btn-primary">
                  View work
                  <ArrowDown className="h-3.5 w-3.5" />
                </Link>
                <Link href="#contact" className="btn btn-ghost">
                  Contact
                </Link>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-ghost"
                >
                  GitHub
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={300} className="lg:col-span-5">
            <div className="glass p-1.5">
              <div className="rounded-[10px] bg-ink-950/40 p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <span className="kicker">Signal</span>
                  <span className="font-mono text-[0.65rem] text-faint">
                    /now
                  </span>
                </div>

                <dl className="mt-5 space-y-4">
                  {panel.map((row) => (
                    <div
                      key={row.label}
                      className="border-t border-line pt-4 first:border-0 first:pt-0"
                    >
                      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">
                        {row.label}
                      </dt>
                      <dd className="mt-1.5 text-[0.9rem] leading-snug text-text">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <p className="serif mt-5 pl-1 text-[0.95rem] italic leading-relaxed text-faint">
              “{site.xLine}”
              <span className="not-italic"> — {site.xHandle}</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
