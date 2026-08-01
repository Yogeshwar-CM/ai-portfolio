export type SkillGroup = {
  title: string;
  note: string;
  items: string[];
};

/** Ordered deliberately: agentic/LLM first, because that is the job. */
export const skills: SkillGroup[] = [
  {
    title: "Agentic & LLM",
    note: "Where I spend most of my time.",
    items: [
      "Agent orchestration",
      "Tool / function calling",
      "Prompt & context engineering",
      "RAG and retrieval",
      "Evals & tracing",
      "Streaming responses",
      "Groq",
      "Claude & OpenAI APIs",
      "Speech (Deepgram)",
      "Web context (Tavily)",
    ],
  },
  {
    title: "Full-stack",
    note: "How the agent work reaches a user.",
    items: [
      "TypeScript",
      "React",
      "Next.js (App Router)",
      "Node.js",
      "Python",
      "Tailwind CSS",
      "REST APIs",
      "Postgres / Supabase",
      "Firebase",
    ],
  },
  {
    title: "Platform & tooling",
    note: "Enough to ship it and keep it up.",
    items: ["Vercel", "AWS S3", "Git & GitHub", "Razorpay", "CI basics"],
  },
];
