import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-rule-strong py-10">
      <div className="shell grid gap-6 lg:grid-cols-12 lg:gap-14">
        <p className="label lg:col-span-3">
          © {year} {site.name} · Chennai, IN
        </p>

        {/* Colophon. Cheap to write, and it tells a designer reading the page
            that the type was chosen rather than defaulted into. */}
        <p className="label lg:col-span-5">
          Set in Fraunces &amp; IBM Plex · Built with Next.js
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-4 lg:justify-end">
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="label link-quiet"
          >
            GitHub
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="label link-quiet"
          >
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="label link-quiet">
            Email
          </a>
          <Link href="#top" className="label link-quiet">
            Top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
