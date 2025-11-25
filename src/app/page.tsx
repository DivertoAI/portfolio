import Link from "next/link";
import { profile } from "@/data/profile";
import { StatsPanel } from "@/components/StatsPanel";
import { Section } from "@/components/Section";
import { PillarHighlights } from "@/components/PillarHighlights";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { CompetencyGrid } from "@/components/CompetencyGrid";
import { Achievements } from "@/components/Achievements";
import { ContactPanel } from "@/components/ContactPanel";
import { AiGuide } from "@/components/AiGuide";
import { journeySteps } from "@/data/journey";
import { JourneyOverlay } from "@/components/JourneyOverlay";
import { TopNav } from "@/components/TopNav";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Toolbelt } from "@/components/Toolbelt";
import { CaseStudies } from "@/components/CaseStudies";
import { Testimonials } from "@/components/Testimonials";
import { ExecutiveCTA } from "@/components/ExecutiveCTA";

const stepMap = journeySteps.reduce<Record<string, (typeof journeySteps)[number]>>(
  (acc, step) => {
    acc[step.id] = step;
    return acc;
  },
  {},
);

export default function Home() {
  const missionStep = stepMap["mission-control"];
  const architectureStep = stepMap["architecture-systems"];
  const deliveryStep = stepMap["delivery-impact"];
  const engagementStep = stepMap["engage-and-grow"];

  const fearSignals = [
    {
      label: "Parity gaps",
      detail:
        "iOS and Android diverge, users churn, and execs lose faith. I ship mirrored feature flags and release calendars.",
    },
    {
      label: "Review/compliance risk",
      detail: "Store teams reject builds or legal stalls launches. I run signed pipelines, phased rollouts, and review playbooks.",
    },
    {
      label: "AI theater",
      detail: "Copilot experiments produce noise. I wire multi-agent reviews into CI/CD with traceability and human-in-loop controls.",
    },
    {
      label: "Invisible delivery",
      detail: "Leadership can't see ROI. I publish risk dashboards, crash budgets, and revenue-linked release notes weekly.",
    },
  ];

  const painboard = [
    {
      title: "Ship dates slip and no one owns the burn",
      fear: "Projects overpromise, QA is underfunded, and mobile gets blamed.",
      move: "Stabilize with 2-week readiness gates, phased rollouts, and crash budgets tied to KPIs.",
    },
    {
      title: "Store reviews and compliance block the launch",
      fear: "Rejections, code signing drift, and missing legal copy derail timelines.",
      move: "Automate signing, sandbox UAT, and run pre-flight audits with App Store / Play Console checklists.",
    },
    {
      title: "Parity gaps between iOS and Android bleed credibility",
      fear: "Executives see missing features, users churn, and support volume spikes.",
      move: "Parallel release rails with feature toggles, mirrored telemetry, and golden paths for QA.",
    },
    {
      title: "AI promises with no receipts",
      fear: "Leadership hears 'copilots' but sees zero velocity or safety.",
      move: "Multi-agent workflow (planner->coder->tester->healer) with CI/CD hooks and auditable reviews.",
    },
    {
      title: "No executive visibility",
      fear: "Stakeholders can't defend spend or risk to the board.",
      move: "Weekly ROI/risk briefings, delivery scorecards, and readiness dashboards.",
    },
    {
      title: "Fragmented toolchain and ownership",
      fear: "Vendors, backend, and mobile teams point fingers when incidents hit.",
      move: "Clear RACI, API contracts, and incident playbooks that keep mobile unblocked.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <JourneyOverlay />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(251,191,36,0.18),transparent_30%),linear-gradient(to_bottom,#0b1224,#020617_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl space-y-10 px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <TopNav />
        <section
          id="mission-control"
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/85 via-slate-900/80 to-slate-900/60 px-8 py-10 shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
        >
          <div className="grid gap-10 lg:grid-cols-[1.25fr,0.9fr]">
            <div className="space-y-6">
              {missionStep ? (
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
                  {missionStep.step} | {missionStep.title}
                </p>
              ) : null}
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold text-white sm:text-5xl">I close the gaps hiring managers lose sleep over.</h1>
                <p className="text-lg text-amber-100">Saswata Saha | {profile.title}</p>
                <p className="max-w-2xl text-lg text-slate-200">{profile.summary}</p>
                <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                  <span>{profile.location}</span>
                  <span>|</span>
                  <Link href={`mailto:${profile.contact.email}`} className="text-amber-300 hover:text-amber-200">
                    {profile.contact.email}
                  </Link>
                  <span>|</span>
                  <Link href={profile.contact.linkedin} className="text-amber-300 hover:text-amber-200" target="_blank">
                    LinkedIn
                  </Link>
                  <span>|</span>
                  <Link href={profile.contact.github} className="text-amber-300 hover:text-amber-200" target="_blank">
                    GitHub
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4 text-sm font-semibold">
                  <Link
                    href="mailto:appsmoothies@gmail.com?subject=Risk%20audit%20for%20mobile"
                    className="rounded-full bg-amber-400 px-5 py-2 text-slate-900 shadow transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Book a risk audit
                  </Link>
                  <Link
                    href="/resume.pdf"
                    className="rounded-full border border-white/30 px-5 py-2 text-white transition hover:-translate-y-0.5 hover:border-amber-300"
                  >
                    Download resume
                  </Link>
                  <Link
                    href="#hiring-painboard"
                    className="rounded-full border border-amber-300/80 px-5 py-2 text-amber-100 transition hover:-translate-y-0.5 hover:border-amber-300"
                  >
                    See the painboard
                  </Link>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Fears named</p>
                  <span className="text-xs text-slate-400">Countermoves attached</span>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {fearSignals.map((signal) => (
                    <div key={signal.label} className="rounded-2xl border border-white/10 bg-slate-900/60 p-3">
                      <p className="text-sm font-semibold text-white">{signal.label}</p>
                      <p className="mt-1 text-sm text-slate-300">{signal.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">Control board</p>
                <p className="text-sm text-slate-300">
                  Nine years leading mobile. Releases that survive App Store / Play scrutiny. AI copilots that are traceable.
                </p>
                <StatsPanel />
              </div>
              <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">Loose ends closed</p>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>- Parity-first release rails across iOS, Android, and Flutter.</li>
                  <li>- AI copilots embedded in CI/CD with human-in-loop approvals.</li>
                  <li>- Executive visibility: risk dashboards, ROI scorecards, compliance gates.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <main className="space-y-8">
          <Section
            id="hiring-painboard"
            eyebrow="Painboard"
            title="Hiring manager pain points, named and countered"
            description="If you've been burned by late releases, store rejections, or AI demos that never shipped, here's how I neutralize them."
          >
            <div className="grid gap-4 md:grid-cols-2">
              {painboard.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">Fear</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{item.fear}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Countermove</p>
                  <p className="mt-1 text-sm text-slate-200">{item.move}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section
            id="architecture-systems"
            step={architectureStep?.step}
            title={architectureStep?.title ?? "Architecture & Systems"}
            description={architectureStep?.description ?? ""}
          >
            <div className="space-y-8">
              <PillarHighlights />
              <CompetencyGrid />
            </div>
          </Section>

          <Section
            title="High-stakes launches built to calm execs"
            eyebrow="Featured case work"
            description="Programs where the countermoves shipped: parity builds, ROI dashboards, and AI copilots that didn't backfire."
          >
            <FeaturedProjects />
          </Section>

          <Section
            title="Toolchain & AI operations"
            description="Preferred stack when accountability matters: mobile delivery, backend contracts, and AI ops with guardrails."
          >
            <Toolbelt />
          </Section>

          <Section
            id="delivery-impact"
            step={deliveryStep?.step}
            title={deliveryStep?.title ?? "Delivery Impact"}
            description={deliveryStep?.description ?? ""}
          >
            <div className="space-y-8">
              <ExperienceTimeline />
              <Achievements />
            </div>
          </Section>

          <Section
            title="Case studies built for hiring managers"
            description="Concise narratives that pre-answer 'How do you derisk?' and 'What happens when things break?'"
          >
            <CaseStudies />
          </Section>

          <Section
            title="What founders and product leaders say"
            description="Testimonials from partners who trusted Saswata with their flagship Flutter launches."
          >
            <Testimonials />
          </Section>

          <Section
            id="engage-and-grow"
            step={engagementStep?.step}
            title={engagementStep?.title ?? "Engage & Grow"}
            description={engagementStep?.description ?? ""}
          >
            <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="space-y-4 text-slate-200">
                <div>
                  <p className="text-lg font-semibold text-white">{profile.education.degree}</p>
                  <p className="text-sm text-slate-300">{profile.education.institution}</p>
                  <p className="mt-2 text-sm text-slate-300">{profile.education.notes}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Certifications</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-200">
                    {profile.education.certifications.map((cert) => (
                      <li key={cert} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl border border-white/15 bg-white/5 p-5 text-slate-200 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Community & thought leadership</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {profile.activities.map((activity) => (
                      <li key={activity} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-white/15 bg-white/5 p-5 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Engage now</p>
                  <ContactPanel />
                </div>
              </div>
            </div>
          </Section>

          <Section
            title="Executive availability"
            description="Designed for leadership roles that need defensive architecture, parity shipping, and compliance-proof delivery."
          >
            <ExecutiveCTA />
          </Section>
        </main>
      </div>
      <AiGuide />
    </div>
  );
}
