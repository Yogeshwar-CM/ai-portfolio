import { site } from "@/data/site";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

const facts = [
  { label: "Based", value: "Thiruporur, outside Chennai" },
  { label: "Studying", value: "B.Tech CSE (AI & ML), HITS Chennai" },
  { label: "Working on", value: "Agentic systems at Pickyourtrail" },
  { label: "Reading", value: "Traces, more often than docs" },
];

export function About() {
  return (
    <Section
      id="about"
      index="04"
      label="About"
      title="Chennai, mostly at a terminal."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-7">
          <div className="measure space-y-5 text-muted">
            <p className="pretty dropcap t-body">
              I&apos;m Yogeshwar — based in Thiruporur, just outside Chennai. I
              got here the ordinary way: built things, broke them, sat with the
              logs until I understood why. That habit turned out to be the whole
              job.
            </p>
            <p className="pretty t-body">
              Right now I work on agentic systems at Pickyourtrail. What I like
              about the work is that it punishes hand-waving. A model demo can
              be impressive and still be wrong; an agent in production is
              measured by what it does when a tool call times out and nobody is
              watching.
            </p>
            <p className="pretty t-body">
              I&apos;m early in this. Two months full-time, a year interning
              before that, and a degree still fresh. I&apos;d rather say that
              plainly than pad it — what I can offer instead is that I ship, I
              read the trace before I guess, and I don&apos;t leave the
              unglamorous parts for someone else.
            </p>
            <p className="pretty t-body">
              Outside the job: hackathons, small open-source tools, and arguing
              with models on the internet.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-5 lg:pl-2">
          <p className="label mb-3">On file</p>

          <dl className="dossier">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="label">{fact.label}</dt>
                <dd className="t-sm leading-snug text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <p className="t-sm mt-5 text-faint">{site.availability}.</p>
        </Reveal>
      </div>
    </Section>
  );
}
