export const site = {
  name: "Yogeshwar CM",
  role: "AI Engineer",
  company: "Pickyourtrail",
  headline:
    "AI Engineer @ Pickyourtrail · production agentic systems · B.Tech CSE (AI & ML), HITS Chennai",
  shortBio:
    "AI Engineer at Pickyourtrail, working on agentic systems in production. Early in the career, deliberate about the craft.",
  location: "Thiruporur / Chennai, India",
  availability: "Open to remote anywhere · onsite or hybrid in Chennai",
  email: "cmyogeshwar@gmail.com",
  // Set NEXT_PUBLIC_SITE_URL at deploy time; the fallback is a placeholder.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yogeshwar-cm.vercel.app",
  links: {
    github: "https://github.com/Yogeshwar-CM",
    linkedin: "https://www.linkedin.com/in/yogeshwar-cm",
    x: "https://x.com/yogeshwarcodes",
    devfolio: "https://devfolio.co/@Yogeshwar_CM",
  },
  xHandle: "@yogeshwarcodes",
  xLine:
    "I argue with AI until one of us learns something… usually, it's me.",
} as const;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;
