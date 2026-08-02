import Link from "next/link";
import { site } from "@/data/site";
import { Rise } from "@/components/rise";
import { Words } from "@/components/words";
import { NewTab } from "@/components/new-tab";

/* The old glass "Available for…" chip, typeset as a running head instead. */
const panel = [
  { label: "Now", value: "AI Engineer @ Pickyourtrail" },
  { label: "Focus", value: "Agentic systems, in production" },
  { label: "Based", value: "Thiruporur / Chennai, IN · UTC+5:30" },
  { label: "Open to", value: "Remote anywhere · onsite Chennai" },
];

export function Hero() {
  return (
    <section className="relative z-10 pb-20 pt-28 md:pb-28 md:pt-36">
      <div className="shell">
        <Rise>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule-strong pb-3">
            <p className="label label-ink">Available for AI engineering roles</p>
            <p className="label">Remote anywhere · onsite Chennai</p>
          </div>
        </Rise>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h1 className="t-display mt-10 md:mt-12">
              <Words text="Yogeshwar CM" stagger={1.4} />
            </h1>

            <Rise delay={120}>
              <p className="pretty t-lede measure-lead mt-8 text-muted">
                <span className="text-ink">AI Engineer at Pickyourtrail</span>,
                building <span className="text-ink">production agentic
                systems</span>. B.Tech CSE (AI&nbsp;&amp;&nbsp;ML), HITS
                Chennai.
              </p>
            </Rise>

            <Rise delay={170}>
              <p className="pretty t-sm measure mt-6 text-faint">
                Two months full-time, about a year interning before that. Long
                enough to learn that most agent failures are plumbing failures,
                not model failures.
              </p>
            </Rise>

            <Rise delay={230}>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link href="#work" className="btn btn-ink">
                  Selected work
                </Link>
                <Link href="#contact" className="link t-sm">
                  Contact
                </Link>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link t-sm"
                >
                  GitHub
                  <NewTab />
                </a>
              </div>
            </Rise>
          </div>

          <Rise
            delay={300}
            className="lg:col-span-5 lg:border-l lg:border-rule lg:pl-12"
          >
            <div className="lg:mt-14">
              <p className="label mb-3">Standing details</p>

              <dl className="dossier">
                {panel.map((row) => (
                  <div key={row.label}>
                    <dt className="label">{row.label}</dt>
                    <dd className="t-sm leading-snug text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <figure className="mt-8">
                <blockquote className="pretty quote t-body text-muted">
                  “{site.xLine}”
                </blockquote>
                <figcaption className="label mt-2">{site.xHandle}</figcaption>
              </figure>
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}
