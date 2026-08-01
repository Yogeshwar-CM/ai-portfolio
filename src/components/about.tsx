import { site } from "@/data/site";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

const facts = [
  { label: "Based", value: "Thiruporur, outside Chennai" },
  { label: "Studying", value: "B.Tech CSE (AI & ML), HITS Chennai" },
  { label: "Working on", value: "Agentic systems at Pickyourtrail" },
  { label: "Reading traces", value: "More often than reading docs" },
];

export function About() {
  return (
    <Section
      id="about"
      index="04"
      label="About"
      title="Chennai, mostly at a terminal."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <div className="space-y-5 text-[1rem] leading-[1.75] text-muted">
            <p className="pretty">
              I&apos;m Yogeshwar — based in Thiruporur, just outside Chennai. I
              got here the ordinary way: built things, broke them, sat with the
              logs until I understood why. That habit turned out to be the whole
              job.
            </p>
            <p className="pretty">
              Right now I work on agentic systems at Pickyourtrail. What I like
              about the work is that it punishes hand-waving. A model demo can
              be impressive and still be wrong; an agent in production is
              measured by what it does when a tool call times out and nobody is
              watching.
            </p>
            <p className="pretty">
              I&apos;m early in this. Two months full-time, a year interning
              before that, and a degree still fresh. I&apos;d rather say that
              plainly than pad it — what I can offer instead is that I ship,
              I read the trace before I guess, and I don&apos;t leave the
              unglamorous parts for someone else.
            </p>
            <p className="pretty">
              Outside the job: hackathons, small open-source tools, and arguing
              with models on the internet.
            </p>
          </div>
        </Reveal>

        <Reveal delay={110} className="lg:col-span-5">
          <dl className="glass divide-y divide-line">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-baseline justify-between gap-4 px-5 py-4"
              >
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">
                  {fact.label}
                </dt>
                <dd className="text-right text-[0.86rem] text-muted">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-[0.85rem] leading-relaxed text-faint">
            {site.availability}.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
