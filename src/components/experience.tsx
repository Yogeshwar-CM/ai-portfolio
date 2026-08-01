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
      <ol className="relative border-l border-line pl-6 md:pl-10">
        {experience.map((role, i) => (
          <Reveal key={role.company} delay={i * 90} as="li">
            <div className="relative pb-12 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute -left-[1.79rem] top-1.5 h-2 w-2 rounded-full md:-left-[2.79rem] ${
                  role.current
                    ? "dot-live bg-accent"
                    : "border border-line-strong bg-ink-800"
                }`}
              />

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-medium tracking-[-0.02em] text-text md:text-xl">
                  {role.title}
                </h3>
                <span className="text-faint" aria-hidden="true">
                  ·
                </span>
                <span className="text-[0.95rem] text-muted">{role.company}</span>
                {role.current ? (
                  <span className="rounded-full border border-accent/30 bg-accent/[0.08] px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent">
                    Current
                  </span>
                ) : null}
              </div>

              <p className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">
                {role.period} · {role.location}
              </p>

              <ul className="mt-5 space-y-2.5">
                {role.points.map((point) => (
                  <li
                    key={point}
                    className="pretty relative pl-5 text-[0.92rem] leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.62rem] h-px w-2.5 bg-line-strong"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {role.stack.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={120}>
        <div className="glass mt-10 flex flex-wrap items-start justify-between gap-4 p-6">
          <div>
            <p className="kicker">Education</p>
            <p className="mt-3 text-[0.98rem] text-text">{education.degree}</p>
            <p className="mt-1 text-[0.9rem] text-muted">{education.school}</p>
          </div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">
            {education.detail}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
