import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { site } from "@/data/site";
import { education } from "@/data/experience";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "AI Engineer",
  email: `mailto:${site.email}`,
  url: site.url,
  worksFor: { "@type": "Organization", name: site.company },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
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
