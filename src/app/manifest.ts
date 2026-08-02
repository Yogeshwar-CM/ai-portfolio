import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { tokens } from "@/data/tokens";

/**
 * Not a PWA — no service worker, nothing to install. The manifest exists so
 * Android's "add to home screen" and the browser UI use the right name and
 * theme colour instead of guessing from the title tag.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.name,
    description: site.shortBio,
    start_url: "/",
    display: "browser",
    background_color: tokens["--paper"],
    theme_color: tokens["--paper"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
