import { Fragment } from "react";
import { skills } from "@/data/skills";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

/**
 * A taxonomy, not a tile grid. Each group is one definition-list row: term on
 * the left margin, the terms of art set as a dense run on the right. Reading
 * it takes about as long as scanning icon cards and says considerably more.
 */
export function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      label="Skills"
      title="Agentic first, full-stack because someone has to ship it."
      lede="Listed in the order I actually use them. If something is on here, I have used it on something real — not read the docs once."
    >
      <dl className="border-t border-rule">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={i * 70}>
            <div className="grid gap-3 border-b border-rule py-8 lg:grid-cols-12 lg:gap-14">
              <dt className="lg:col-span-3">
                <span className="t-h3 block text-ink">{group.title}</span>
                <span className="t-sm mt-1.5 block text-faint">
                  {group.note}
                </span>
              </dt>

              <dd className="pretty t-lede text-ink lg:col-span-9">
                {group.items.map((item, j) => (
                  <Fragment key={item}>
                    {item}
                    {j < group.items.length - 1 ? (
                      <span aria-hidden="true" className="text-accent">
                        {" "}
                        ·{" "}
                      </span>
                    ) : null}
                  </Fragment>
                ))}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
