import { site } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { Spotlight } from "@/components/spotlight";
import {
  ArrowUpRight,
  Devfolio,
  GitHub,
  LinkedIn,
  Mail,
  XLogo,
} from "@/components/icons";

const channels = [
  {
    label: "GitHub",
    handle: "Yogeshwar-CM",
    href: site.links.github,
    Icon: GitHub,
  },
  {
    label: "LinkedIn",
    handle: "yogeshwar-cm",
    href: site.links.linkedin,
    Icon: LinkedIn,
  },
  { label: "X", handle: site.xHandle, href: site.links.x, Icon: XLogo },
  {
    label: "Devfolio",
    handle: "Yogeshwar_CM",
    href: site.links.devfolio,
    Icon: Devfolio,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative z-10 scroll-mt-24 border-t border-line/70 py-20 md:py-28"
    >
      <div className="shell">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="kicker tabular-nums text-accent/70">05</span>
            <span className="kicker">Contact</span>
            <span className="hairline hidden flex-1 sm:block" />
          </div>
        </Reveal>

        <Reveal delay={60}>
          <Spotlight className="glass mt-10 overflow-hidden">
            <div className="grid gap-10 p-8 md:grid-cols-12 md:gap-8 md:p-12">
              <div className="md:col-span-7">
                <h2
                  id="contact-title"
                  className="mercury balance text-3xl font-medium tracking-[-0.03em] md:text-[2.6rem] md:leading-[1.08]"
                >
                  Hiring, or just want to argue about agents?
                </h2>
                <p className="pretty mt-5 max-w-md text-[0.98rem] leading-relaxed text-muted">
                  Email is the fastest way to reach me. I reply to anything that
                  isn&apos;t a template.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href={`mailto:${site.email}`} className="btn btn-primary">
                    <Mail className="h-4 w-4" />
                    {site.email}
                  </a>
                  <a
                    href={site.links.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn btn-ghost"
                  >
                    LinkedIn
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                  </a>
                </div>

                <p className="mt-7 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">
                  {site.availability}
                </p>
              </div>

              <div className="md:col-span-5">
                <p className="kicker">Elsewhere</p>
                <ul className="mt-5 divide-y divide-line border-y border-line">
                  {channels.map(({ label, handle, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group flex items-center gap-4 py-3.5 transition-colors"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                        <span className="text-[0.88rem] text-text">
                          {label}
                        </span>
                        <span className="ml-auto truncate font-mono text-[0.72rem] text-faint">
                          {handle}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}
