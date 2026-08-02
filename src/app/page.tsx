import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { site } from "@/data/site";
import { education } from "@/data/experience";
import { studies } from "@/data/projects";

const person = {
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  jobTitle: "AI Engineer",
  // The knowledge-panel line. Without it Google writes its own from whatever
  // it scrapes, which for a portfolio is usually the nav.
  description: site.shortBio,
  email: `mailto:${site.email}`,
  url: site.url,
  image: {
    "@type": "ImageObject",
    url: `${site.url}/opengraph-image`,
    width: 1200,
    height: 630,
  },
  worksFor: { "@type": "Organization", name: site.company },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  // Availability, in the vocabulary a recruiter's tooling actually parses.
  hasOccupation: {
    "@type": "Occupation",
    name: "AI Engineer",
    occupationLocation: [
      { "@type": "City", name: "Chennai" },
      { "@type": "AdministrativeArea", name: "Remote" },
    ],
    skills: "Agentic systems, LLM orchestration, full-stack engineering",
  },
  sameAs: [
    site.links.github,
    site.links.linkedin,
    site.links.x,
    site.links.devfolio,
  ],
  knowsAbout: [
    "Agentic systems",
    "LLM orchestration",
    "Retrieval-augmented generation",
    "Full-stack engineering",
  ],
};

/* One graph rather than three loose blocks, so `@id` references resolve and
   the Person is not re-declared per page type. */
const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    person,
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: `${site.name} — ${site.role}`,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "ProfilePage",
      url: site.url,
      isPartOf: { "@id": `${site.url}/#website` },
      mainEntity: { "@id": `${site.url}/#person` },
      about: { "@id": `${site.url}/#person` },
      hasPart: studies.map((project) => ({
        "@type": "Article",
        headline: project.title,
        url: `${site.url}/work/${project.slug}`,
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Hero />
      <Work />
      <Experience />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
