import Link from "next/link";
import { featured, oss } from "@/data/projects";
import { site } from "@/data/site";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { WorkEntry } from "@/components/work-entry";
import { OssList } from "@/components/oss-list";
import { NewTab } from "@/components/new-tab";

export function Work() {
  return (
    <Section
      id="work"
      index="01"
      label="Selected work"
      title="Things I built, and what actually came out of them."
      lede="Three of these shipped to real users, one won a grand prize, and none of them come with invented metrics. Where the detail sits behind a company login, I say so instead of dressing it up."
    >
      <div className="border-t border-rule">
        {featured.map((project, i) => (
          <Reveal key={project.slug} delay={i * 60}>
            <WorkEntry project={project} index={i} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={60}>
        <p className="mt-6">
          <Link href="/work" className="label link-quiet">
            All case studies →
          </Link>
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-16 grid gap-4 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-3">
            <h3 className="label">Open source · recent</h3>
          </div>

          <div className="lg:col-span-9">
            <OssList items={oss} />
            <p className="t-sm mt-3 text-faint">
              Small, specific tools — not a decade of maintainership.{" "}
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="link-quiet underline underline-offset-[0.22em]"
              >
                All repos
                <NewTab />
              </a>
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
