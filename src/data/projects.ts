export type Project = {
  slug: string;
  title: string;
  kind: "Product" | "Work" | "Competition" | "Open source";
  year: string;
  /** One line. What it is, no adjectives. */
  summary: string;
  /** The honest outcome — shipped state, not a vanity metric. */
  outcome: string;
  stack: string[];
  role: string;
  href?: string;
  repo?: string;
  featured: boolean;
  /** Long-form case study; omitted projects render as cards only. */
  study?: {
    intro: string;
    /** The sharpest line in the study, lifted verbatim for skimmers. */
    pullQuote: string;
    sections: { heading: string; body: string[] }[];
    /**
     * The trade-offs, stated as trade-offs. An engineering reader skips the
     * prose and reads this — it is the part that shows judgement rather than
     * activity.
     */
    decisions?: { choice: string; over: string; why: string }[];
    facts: { label: string; value: string }[];
  };
};

export const projects: Project[] = [
  {
    slug: "jobhouse",
    title: "JobHouse",
    kind: "Product",
    year: "2025",
    summary:
      "A full-stack AI hiring workflow: recruiters post, candidates apply, and the interview itself runs as a voice loop.",
    outcome:
      "End-to-end loop working — posting, application, AI interview, and review all live in one app rather than four disconnected tools.",
    stack: ["Next.js", "Groq", "Tavily", "Deepgram", "Supabase"],
    role: "Full-stack integration",
    repo: "https://github.com/Yogeshwar-CM/jobhouse",
    featured: true,
    study: {
      intro:
        "Hiring tooling is usually a pile of disconnected products: one for the job post, one for the applicant tracking, one for the screening call, one for notes. JobHouse is an attempt to collapse that into a single loop where the AI does the repetitive screening pass and a human reads the result.",
      pullQuote:
        "A speech provider timing out should not look the same to the user as a model refusing to answer.",
      sections: [
        {
          heading: "The loop",
          body: [
            "A recruiter creates a role. A candidate applies against it. The screening interview runs in the browser as a spoken conversation rather than a form. What comes out the other end is a transcript plus a structured summary the recruiter can actually skim.",
            "The interesting engineering is not the model call. It is everything around it: keeping the conversation stateful, deciding what the model is allowed to ask next, handling a candidate who talks over the question, and making sure a dropped connection does not lose the session.",
          ],
        },
        {
          heading: "How the pieces fit",
          body: [
            "Next.js (App Router) carries both the UI and the server routes, so the interview session logic sits next to the pages that use it. Supabase handles auth and persistence — roles, applications, sessions, transcripts.",
            "Groq runs the inference where latency is the product: in a spoken interview, a two-second pause is the difference between a conversation and an interrogation. Deepgram handles speech, so the candidate talks instead of typing. Tavily supplies live web context when a role or company needs grounding the model does not have.",
          ],
        },
        {
          heading: "What I actually did",
          body: [
            "My role was full-stack integration — wiring the providers together into one coherent product, owning the data model, the session flow, and the interface both sides of the hiring loop see.",
            "Most of the work was reconciling four APIs with four different failure modes into a single flow that degrades gracefully. A speech provider timing out should not look the same to the user as a model refusing to answer.",
          ],
        },
        {
          heading: "What I'd do differently",
          body: [
            "Write the evaluation harness before the feature work, not after. Judging interview quality by trying it myself does not scale past about ten runs, and by then the prompt has drifted.",
            "Push more of the orchestration behind a typed boundary. Provider SDKs leak into application code faster than you expect, and swapping one out later costs more than the abstraction would have.",
          ],
        },
      ],
      decisions: [
        {
          choice: "Groq for inference",
          over: "a higher-ceiling model behind more latency",
          why: "In a spoken interview the pause is the product. Two seconds of silence turns a conversation into an interrogation, and no answer quality makes up for that.",
        },
        {
          choice: "A spoken interview",
          over: "a written screening form",
          why: "A form measures how well someone writes under no pressure. The point of the screen is to hear how they answer when they cannot edit.",
        },
        {
          choice: "Supabase for auth and persistence",
          over: "hand-rolled sessions and storage",
          why: "The risky part of this product is the interview loop. Spending the risk budget on the CRUD around it would have been a bad trade.",
        },
      ],
      facts: [
        { label: "Type", value: "Full-stack AI product" },
        { label: "Role", value: "Full-stack integration" },
        { label: "Inference", value: "Groq" },
        { label: "Speech", value: "Deepgram" },
        { label: "Web context", value: "Tavily" },
        { label: "Data & auth", value: "Supabase" },
      ],
    },
  },
  {
    slug: "pickyourtrail",
    title: "Agentic systems at Pickyourtrail",
    kind: "Work",
    year: "2025 — present",
    summary:
      "Production agentic systems inside a travel company — agents that take real actions against real systems, not demo chat.",
    outcome:
      "Shipping into production. Specifics stay inside the company; the short version is that the work is autonomy and reliability, not prompt demos.",
    stack: ["LLM orchestration", "Tool use", "Evals", "TypeScript", "Python"],
    role: "AI Engineer",
    href: "https://pickyourtrail.com",
    featured: true,
    study: {
      intro:
        "I joined Pickyourtrail as an AI Engineer after interning, and work on agentic systems that run in production. I keep the details of internal systems internal, so this page is about how I think about the work rather than what is behind the login.",
      pullQuote:
        "The failure mode that matters is not the model saying something wrong. It is the model doing something wrong, confidently, at three in the morning.",
      sections: [
        {
          heading: "What production changes",
          body: [
            "A demo agent is judged on its best run. A production agent is judged on its worst one. Once an agent can take an action that touches a customer, the interesting questions stop being about prompting and start being about blast radius: what happens on a partial failure, what is idempotent, what needs a human in the path.",
            "The failure mode that matters is not the model saying something wrong. It is the model doing something wrong, confidently, at three in the morning.",
          ],
        },
        {
          heading: "How I work on it",
          body: [
            "Narrow the tools. An agent with four well-specified tools beats one with twenty vague ones, every time, and it is far easier to reason about.",
            "Make the traces readable. If you cannot reconstruct why a run went the way it did, you are not debugging — you are guessing with extra steps.",
            "Treat prompts as code that happens to be in English: versioned, reviewed, and tested against cases that previously broke.",
          ],
        },
        {
          heading: "Where I am in this",
          body: [
            "Two months full-time, about a year interning before that. I am early, and I would rather say that plainly than dress it up. What I bring is that I have shipped agent code that other people depend on, and I have been on the receiving end of my own bugs.",
          ],
        },
      ],
      decisions: [
        {
          choice: "Four well-specified tools",
          over: "twenty flexible ones",
          why: "A narrow tool surface is easier for the model to choose correctly from and far easier for a human to reason about when a run goes sideways.",
        },
        {
          choice: "Traces you can read",
          over: "traces you can only grep",
          why: "If you cannot reconstruct why a run went the way it did, you are not debugging — you are guessing with extra steps.",
        },
        {
          choice: "Prompts versioned and reviewed like code",
          over: "prompts edited in place",
          why: "They are behaviour. Anything that changes behaviour without review is an outage waiting for a quiet afternoon.",
        },
      ],
      facts: [
        { label: "Company", value: "Pickyourtrail" },
        { label: "Role", value: "AI Engineer" },
        { label: "Focus", value: "Agentic systems in production" },
        { label: "Since", value: "2025 (intern → full-time)" },
      ],
    },
  },
  {
    slug: "hackathon-agents",
    title: "Grand prize — AI agents",
    kind: "Competition",
    year: "2025",
    summary:
      "Built an AI agent system under hackathon time pressure and took the grand prize.",
    outcome: "₹51,000 grand prize.",
    stack: ["AI agents", "Rapid prototyping"],
    role: "Builder",
    href: "https://devfolio.co/@Yogeshwar_CM",
    featured: true,
    study: {
      intro:
        "A grand prize (₹51,000) for an AI agent build. Hackathons are not production, and I do not pretend otherwise — but they are an unusually honest test of whether you can scope something and finish it.",
      pullQuote:
        "Every team that lost had a better idea than they had a demo.",
      /* Two theses were sitting under one heading that named neither of them.
         Split, so the contents list says what is actually in the page and a
         skimmer gets the argument from the headings alone. This is structure,
         not added depth — the study is still the shortest of the four, and
         the missing sections are ones only Yogeshwar can write. */
      sections: [
        {
          heading: "Scope is the whole skill",
          body: [
            "Every team that lost had a better idea than they had a demo. The constraint forces you to pick the one path through the product that has to work and defend it against your own feature ideas.",
          ],
        },
        {
          heading: "Agents demo well and break quietly",
          body: [
            "The version that wins on stage and the version that survives a week of real users are different pieces of software, and knowing that gap exists is most of what I took away from it.",
          ],
        },
      ],
      decisions: [
        {
          choice: "One path through the product, defended",
          over: "the larger idea we actually had",
          why: "A deadline does not negotiate. The only version that counts is the one that runs on stage, so every feature after the first complete path was a liability.",
        },
      ],
      facts: [
        { label: "Result", value: "Grand prize — ₹51,000" },
        { label: "Category", value: "AI agents" },
        { label: "Profile", value: "devfolio.co/@Yogeshwar_CM" },
      ],
    },
  },
  {
    slug: "mastervance",
    title: "Mastervance",
    kind: "Product",
    year: "2024",
    summary:
      "Course platform with authentication, payments, certificate verification, and media storage — built as a full-stack intern.",
    outcome:
      "Shipped the full paid-course path: sign up, buy, learn, get a certificate that can be verified by a third party.",
    stack: ["React", "Firebase Auth", "Razorpay", "AWS S3"],
    role: "Full-stack intern (Jan – Mar 2024)",
    featured: true,
    study: {
      intro:
        "My first internship where the software took money. Mastervance is a course platform — you sign up, you buy a course, you learn, and at the end you get a certificate someone else can verify. I built that path front to back over three months.",
      pullQuote:
        "A payment provider tells the browser it succeeded. The browser is a bystander — the server confirms, and the client just displays the outcome.",
      sections: [
        {
          heading: "The path that had to work",
          body: [
            "A course platform is four features wearing a trench coat: an identity system, a catalogue, a payment, and a credential. Each one is boring alone. The interesting part is that they form a chain, and a break anywhere in it looks identical to the user — they paid and nothing happened.",
            "So the design goal was never elegance. It was that every step could be re-entered. Refresh mid-checkout, close the tab after paying, come back a week later for the certificate — none of those should need a human to fix the account.",
          ],
        },
        {
          heading: "What each piece did",
          body: [
            "Firebase handled auth, which meant I did not have to invent session handling on a three-month timeline — a good trade when the risky part of the product is elsewhere. React carried the front end and the course delivery flow.",
            "Razorpay took the payments. AWS S3 stored course media and the generated certificates, which let verification be a plain URL lookup instead of a lookup against something that could drift out of sync with the file.",
            "Certificate verification was the part I most enjoyed getting right. A certificate is worthless if the only proof is the PDF itself, so the verifiable artefact has to be the record, not the file the learner is holding.",
          ],
        },
        {
          heading: "What it taught me",
          body: [
            "Money moving through code you wrote changes your testing habits faster than any lecture. Before this, a bug was something that made a screen look wrong. After it, a bug was something that could take ₹2,000 from someone and leave them with no course and no receipt.",
            "The specific lesson was about trusting a callback. A payment provider tells you it succeeded, and the temptation is to unlock the course right there in the browser. The correct answer is that the client is a bystander — the server confirms with the provider, and the client just displays the outcome.",
          ],
        },
        {
          heading: "What I'd do differently",
          body: [
            "Model the enrolment as a state machine on day one instead of as a boolean that gets flipped. Half the edge cases I hit — paid-but-not-enrolled, enrolled-but-no-certificate — were states that already existed in reality and just had no name in my schema.",
            "Log the payment lifecycle properly from the start. When something did go wrong, my ability to explain it depended entirely on whether I happened to have logged that step.",
          ],
        },
      ],
      decisions: [
        {
          choice: "Server-confirmed payments",
          over: "unlocking the course on the client callback",
          why: "The browser is the one participant in a payment that an attacker fully controls, and the one most likely to be closed mid-flow.",
        },
        {
          choice: "Firebase Auth",
          over: "hand-rolled session handling",
          why: "Three-month timeline, and the risky part of the product was the payment-to-certificate chain. Identity was the wrong place to spend the time.",
        },
        {
          choice: "The record as the verifiable artefact",
          over: "the certificate PDF itself",
          why: "A certificate whose only proof is the file it is printed on proves nothing. Verification has to resolve to something the holder cannot edit.",
        },
      ],
      facts: [
        { label: "Type", value: "Course platform" },
        { label: "Role", value: "Full-stack intern" },
        { label: "Period", value: "Jan – Mar 2024" },
        { label: "Auth", value: "Firebase" },
        { label: "Payments", value: "Razorpay" },
        { label: "Media & certs", value: "AWS S3" },
      ],
    },
  },
];

export type OssProject = {
  name: string;
  note?: string;
  repo: string;
};

/** Recent repos only — deliberately not dressed up as a decade of maintainership. */
export const oss: OssProject[] = [
  { name: "keygate", repo: "https://github.com/Yogeshwar-CM/keygate" },
  {
    name: "soft-ui-kit",
    note: "Aether",
    repo: "https://github.com/Yogeshwar-CM/soft-ui-kit",
  },
  { name: "context-tax", repo: "https://github.com/Yogeshwar-CM/context-tax" },
  { name: "repo-harness", repo: "https://github.com/Yogeshwar-CM/repo-harness" },
];

export const featured = projects.filter((p) => p.featured);
export const studies = projects.filter((p) => p.study);
