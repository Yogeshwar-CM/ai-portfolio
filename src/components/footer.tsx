import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-line py-10">
      <div className="shell flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <p className="font-mono text-[0.72rem] text-faint">
          © {year} {site.name} · Chennai, IN
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.72rem] text-faint">
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-text"
          >
            GitHub
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-text"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-text"
          >
            Email
          </a>
          <Link href="#top" className="transition-colors hover:text-text">
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
