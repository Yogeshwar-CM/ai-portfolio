import { site } from "@/data/site";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

const channels = [
  { label: "GitHub", handle: "Yogeshwar-CM", href: site.links.github },
  { label: "LinkedIn", handle: "yogeshwar-cm", href: site.links.linkedin },
  { label: "X", handle: site.xHandle, href: site.links.x },
  { label: "Devfolio", handle: "Yogeshwar_CM", href: site.links.devfolio },
];

export function Contact() {
  return (
    <Section
      id="contact"
      index="05"
      label="Contact"
      title="Hiring, or just want to argue about agents?"
      lede="Email is the fastest way to reach me. I reply to anything that isn’t a template."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-7">
          {/* Set in mono, not the display serif: an address is a value to be
              copied, and the mono reads as one. */}
          <a
            href={`mailto:${site.email}`}
            className="group block break-words font-mono text-[clamp(1.05rem,0.75rem+1.2vw,1.65rem)] tracking-tight text-ink"
          >
            <span className="border-b border-rule-strong pb-1.5 transition-colors group-hover:border-accent group-hover:text-accent">
              {site.email}
            </span>
          </a>

          <p className="t-sm mt-8 text-faint">{site.availability}</p>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-5 lg:pl-2">
          <p className="label mb-3">Elsewhere</p>

          <dl className="dossier">
            {channels.map(({ label, handle, href }) => (
              <div key={label}>
                <dt className="label">{label}</dt>
                <dd className="t-sm leading-snug">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link"
                  >
                    {handle}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
