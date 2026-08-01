import { skills } from "@/data/skills";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Spotlight } from "@/components/spotlight";

export function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      label="Skills"
      title="Agentic first, full-stack because someone has to ship it."
      lede="Listed in the order I actually use them. If something is on here, I have used it on something real — not read the docs once."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={i * 80}>
            <Spotlight className="glass h-full p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[1.02rem] font-medium tracking-[-0.02em] text-text">
                  {group.title}
                </h3>
                <span className="font-mono text-[0.62rem] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-2 text-[0.82rem] leading-relaxed text-faint">
                {group.note}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
