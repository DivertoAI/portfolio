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
    step: "PAIN AUDIT",
    title: "What keeps you up at night",
    subtitle: "Exposing the weak spots before they sink releases",
    description:
      "Name the fears: parity gaps, store rejections, brittle AI experiments, and delivery you cannot defend to execs.",
    prompt:
      "Explain the hiring-leader pain audit Saswata Saha runs: identify parity gaps, store/compliance risk, AI theater without ROI, and missing delivery discipline.",
  },
  {
    id: "architecture-systems",
    step: "COUNTERMEASURES",
    title: "Architecture that closes the gaps",
    subtitle: "Defensive patterns + AI copilots you can trust",
    description:
      "See the architecture pillars, guardrails, and AI-driven delivery systems built to shut down those fears.",
    prompt:
      "Detail Saswata Saha's countermeasures: enterprise mobile architecture, AI-augmented delivery, and the concrete CI/CD + state management capabilities he uses to make teams predictable.",
  },
  {
    id: "delivery-impact",
    step: "RECEIPTS",
    title: "Proof it already works",
    subtitle: "Enterprise launches, metrics, and recovery stories",
    description:
      "Walk through the timeline, KPIs, and live products that demonstrate the countermeasures in action.",
    prompt:
      "Summarize Saswata Saha's delivery receipts referencing Zuchiz, Chakra Cabs, Toya Club, and Labgex with concrete metrics, recovery moves, and production reliability.",
  },
  {
    id: "engage-and-grow",
    step: "ENGAGE",
    title: "How to move fast together",
    subtitle: "Readiness, certifications, and booking",
    description:
      "Confirm credentials, community signals, and the fastest route to lock in time.",
    prompt:
      "Outline Saswata Saha's readiness: education, certifications, community proof, and direct booking paths for hiring partners.",
  },
];
