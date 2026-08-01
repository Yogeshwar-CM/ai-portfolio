import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Background } from "@/components/background";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

/* Three faces, one job each. Plex Sans sets the prose — a grotesque drawn for
   technical documentation, which is what this is. Plex Mono carries every
   label, figure and index, so metadata never competes with reading text.
   Fraunces is the only voice: name, headings, pull quotes. */
/* 400 and 500 only, and no italic: the design sets every emphasis in Fraunces
   or in mono, so the 600 and the four italic files were three quarters of the
   sans payload downloaded to render nothing. */
const sans = IBM_Plex_Sans({
  variable: "--font-sans-var",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono-var",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/* WONK gives the italic its swashed g and y; SOFT stays low so the terminals
   keep their edge. Both are pinned in CSS — declared here only so next/font
   downloads the axes instead of flattening them to defaults. */
const display = Fraunces({
  variable: "--font-display-var",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const description =
  "Yogeshwar CM — AI Engineer at Pickyourtrail, building production agentic systems. B.Tech CSE (AI & ML), HITS Chennai. Selected work, experience and contact.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — AI Engineer`,
    template: `%s · ${site.name}`,
  },
  description,
  keywords: [
    "Yogeshwar CM",
    "AI Engineer",
    "agentic systems",
    "LLM engineer",
    "Chennai",
    "Pickyourtrail",
    "Next.js",
  ],
  authors: [{ name: site.name, url: site.links.github }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — AI Engineer`,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — AI Engineer`,
    description,
    creator: site.xHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#14120f" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-paper"
        >
          Skip to content
        </a>
        {/* Belt-and-braces for the `scripting: none` rule in globals.css,
            which older Safari and Firefox don't support. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Background />
        <Nav />
        <div id="top" />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
