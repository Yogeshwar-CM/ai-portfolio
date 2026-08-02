import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

/* Without this the 404 inherits the root layout's title and OG block, so a
   mistyped URL shared into a chat renders the same rich card as the home page
   and the tab reads "Yogeshwar CM — AI Engineer" over an error.

   `robots` has to be restated even though Next emits its own `noindex` for
   this route: without it the root layout's `index, follow` is inherited too,
   and the page ships a contradicting pair of robots tags. */
export const metadata: Metadata = {
  title: "Not found",
  description: "That page doesn’t exist.",
  robots: { index: false, follow: true },
  openGraph: {
    title: `Not found · ${site.name}`,
    description: "That page doesn’t exist.",
  },
};

export default function NotFound() {
  return (
    <div className="relative z-10 flex min-h-[70svh] items-center">
      <div className="shell">
        <p className="label label-accent num">404</p>
        <h1 className="t-title mt-4">Nothing here.</h1>
        <p className="pretty measure-lead t-body mt-4 text-muted">
          The page you asked for doesn&apos;t exist — or it did once and
          doesn&apos;t now.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link href="/" className="btn btn-ink">
            Back home
          </Link>
          {/* Trimming a `/work/<slug>` URL is the likeliest way to land here,
              so the index is the useful second door. */}
          <Link href="/work" className="link t-sm">
            Selected work
          </Link>
        </div>
      </div>
    </div>
  );
}
