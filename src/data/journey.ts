export type JourneyStep = {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  prompt: string;
};

export const journeySteps: JourneyStep[] = [
  {
    id: "mission-control",
    step: "STEP 01",
    title: "Mission Control",
    subtitle: "Executive summary + metrics",
    description:
      "Understand Saswata's mission, core stats, and how to reach him for senior mobile/AI mandates.",
    prompt:
      "Brief a U.S. CTO on Saswata Saha's mission control: highlight his seniority, years of impact, crash-free stats, and how to get in touch immediately.",
  },
  {
    id: "architecture-systems",
    step: "STEP 02",
    title: "Architecture & Systems",
    subtitle: "Value pillars + competency matrix",
    description:
      "Walk through the architecture pillars, AI multi-agent design, and tools that make delivery predictable.",
    prompt:
      "Explain Saswata Saha's architecture playbook: pillars across enterprise mobile, AI-augmented delivery, and the specific state management & CI/CD capabilities he brings.",
  },
  {
    id: "delivery-impact",
    step: "STEP 03",
    title: "Delivery Impact",
    subtitle: "Experience timeline + proof",
    description:
      "Review enterprise programs, KPIs, and production highlights that de-risk exec decisions.",
    prompt:
      "Summarize Saswata Saha's enterprise delivery impact referencing Zuchiz, Chakra Cabs, Toya Club, and Labgex with concrete metrics and achievements.",
  },
  {
    id: "engage-and-grow",
    step: "STEP 04",
    title: "Engage & Grow",
    subtitle: "Education + community + contact",
    description:
      "See how he keeps skills sharp, contributes to community, and where to engage next.",
    prompt:
      "Outline Saswata Saha's education, certifications, community engagement, and the fastest way for a hiring partner to engage him.",
  },
];
