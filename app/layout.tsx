import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "ai-portfolio-git-main-yogeshwar-cms-projects.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${productionUrl}`),
  title: "Yogeshwar CM — Internal tools & AI automation",
  description: "Yogeshwar CM builds internal tools, business automations, CRM workflows, voice agents, and document parsers for individuals, founders, and teams.",
  authors: [{ name: "Yogeshwar CM" }],
  robots: { index: true, follow: true },
  openGraph: { title: "Yogeshwar CM — AI systems & automation", description: "Internal tools and AI automation for individuals, founders, and teams. Turn your everyday work into connected systems.", type: "profile", images: [{ url: "/social-preview.png", width: 1200, height: 630, alt: "Yogeshwar CM — AI systems & automation" }] },
  twitter: { card: "summary_large_image", title: "Yogeshwar CM — AI systems & automation", description: "Internal tools and AI automation for individuals, founders, and teams.", images: ["/social-preview.png"] },
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = { themeColor: "#0d0e10" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<Analytics /><SpeedInsights /></body></html>;
}
