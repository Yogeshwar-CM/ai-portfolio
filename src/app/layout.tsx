import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Background } from "@/components/background";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const sans = Geist({
  variable: "--font-sans-var",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono-var",
  subsets: ["latin"],
  display: "swap",
});

const display = Instrument_Serif({
  variable: "--font-display-var",
  subsets: ["latin"],
  weight: "400",
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
  themeColor: "#060708",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="rails flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
        >
          Skip to content
        </a>
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
