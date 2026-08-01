export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  current?: boolean;
  points: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    company: "Pickyourtrail",
    title: "AI Engineer",
    period: "2025 — present",
    location: "Chennai, India",
    current: true,
    points: [
      "Work on production agentic systems — agents that call real tools against real systems, with the reliability work that implies.",
      "Full-time after roughly a year interning on the same problem space.",
      "Day to day: tool design, orchestration, traces and evals, and the guardrails that keep an agent from confidently doing the wrong thing.",
    ],
    stack: ["LLM orchestration", "Tool use", "Evals & tracing", "TypeScript", "Python"],
  },
  {
    company: "Mastervance",
    title: "Full-stack Intern",
    period: "Jan — Mar 2024",
    location: "Remote",
    points: [
      "Built the course platform front to back: authentication, course delivery, payments, and certificate verification.",
      "Firebase for auth, Razorpay for payments, AWS S3 for media and certificate storage.",
      "First time owning a paid flow end to end — money moving through code you wrote sharpens your testing habits quickly.",
    ],
    stack: ["React", "Firebase", "Razorpay", "AWS S3"],
  },
];

export const education = {
  school: "Hindustan Institute of Technology and Science, Chennai",
  degree: "B.Tech, Computer Science and Engineering (AI & ML)",
  detail: "Roll 22143008",
};
