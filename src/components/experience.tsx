import { education, experience } from "@/data/experience";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      label="Experience"
      title="Short history, honestly told."
      lede="An internship that turned into a full-time AI engineering role, and the full-stack internship before it that taught me how money moving through code changes your testing habits."
    >
      <ol className="border-t border-rule">
        {experience.map((role, i) => (
          <Reveal key={role.company} delay={i * 80} as="li">
            <div className="grid gap-3 border-b border-rule py-8 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-3">
                <p className="label num label-ink">{role.period}</p>
                <p className="label mt-1.5">{role.location}</p>
                {role.current ? (
                  <p className="label label-accent mt-1.5">Current</p>
                ) : null}
              </div>

              <div className="lg:col-span-9">
                <h3 className="t-h3 text-ink">
                  {role.title}
                  <span className="text-faint"> · </span>
                  <span className="text-muted">{role.company}</span>
                </h3>

                <ul className="measure mt-5 space-y-3">
                  {role.points.map((point) => (
                    <li
                      key={point}
                      className="pretty t-body relative pl-6 text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 text-accent"
                      >
                        —
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                <p className="meta mt-5">{role.stack.join(" · ")}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={100}>
        <div className="grid gap-3 border-b border-rule py-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-3">
            <p className="label label-ink">Education</p>
            <p className="label num mt-1.5">{education.detail}</p>
          </div>
          <div className="lg:col-span-9">
            <p className="t-lede text-ink">{education.degree}</p>
            <p className="t-sm mt-1.5 text-muted">{education.school}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
