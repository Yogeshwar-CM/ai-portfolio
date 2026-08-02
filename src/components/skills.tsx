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
        {/* The grid goes on the `Reveal` itself rather than on a child of it.
            `dl` allows a `div` around each term/value pair — it does not allow
            two, and the wrapper `Reveal` renders is one of them. Nested, the
            `dt`/`dd` pairs stop being descendants the list can associate and
            the whole taxonomy is exposed as loose text. */}
        {skills.map((group, i) => (
          <Reveal
            key={group.title}
            delay={i * 70}
            className="grid gap-3 border-b border-rule py-8 lg:grid-cols-12 lg:gap-14"
          >
            <dt className="lg:col-span-3">
              <span className="t-h3 block text-ink">{group.title}</span>
              <span className="t-sm mt-1.5 block text-faint">{group.note}</span>
            </dt>

            <dd className="pretty t-lede text-ink lg:col-span-9">
              {group.items.map((item, j) => (
                <Fragment key={item}>
                  {item}
                  {j < group.items.length - 1 ? (
                    <>
                      <span aria-hidden="true" className="text-accent">
                        {" "}
                        ·{" "}
                      </span>
                      {/* The rust middot is decoration, so it is hidden — but
                          hiding it also removes the only gap between two terms,
                          and the row is read out as "LLM orchestrationTool
                          use". This is the separator a screen reader gets. */}
                      <span className="sr-only">, </span>
                    </>
                  ) : null}
                </Fragment>
              ))}
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
