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

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <JourneyOverlay />
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-to-b from-slate-900 via-slate-900 to-white" aria-hidden />
      <div className="relative mx-auto max-w-6xl space-y-10 px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <TopNav />
        <section
          id="mission-control"
          className="rounded-3xl border border-white/10 bg-slate-950/70 px-8 py-10 shadow-2xl"
        >
          <div className="space-y-6">
            {missionStep ? (
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-400">
                {missionStep.step} · {missionStep.title}
              </p>
            ) : null}
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">{profile.name}</h1>
              <p className="text-xl text-slate-300">{profile.title}</p>
              <p className="max-w-2xl text-lg text-slate-200">{profile.summary}</p>
              <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                <span>{profile.location}</span>
                <span>·</span>
                <Link href={`mailto:${profile.contact.email}`} className="text-sky-300 hover:text-sky-200">
                  {profile.contact.email}
                </Link>
                <span>·</span>
                <Link href={profile.contact.linkedin} className="text-sky-300 hover:text-sky-200" target="_blank">
                  LinkedIn
                </Link>
                <span>·</span>
                <Link href={profile.contact.github} className="text-sky-300 hover:text-sky-200" target="_blank">
                  GitHub
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 text-sm font-semibold">
                <Link href="#delivery-impact" className="rounded-full bg-white px-5 py-2 text-slate-900 shadow hover:-translate-y-0.5">
                  View enterprise impact
                </Link>
                <Link
                  href={profile.contact.portfolio3d}
                  target="_blank"
                  className="rounded-full border border-white/30 px-5 py-2 text-white hover:-translate-y-0.5"
                >
                  Explore 3D portfolio
                </Link>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Mission telemetry</p>
                <StatsPanel />
              </div>
              <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Focus signals</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>- Senior leadership for enterprise Flutter/iOS/Android programs</li>
                  <li>- Multi-agent AI copilots embedded in CI/CD + delivery rituals</li>
                  <li>- Executive-facing risk, ROI, and readiness reporting</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <main className="space-y-8">
          <Section
            title="Signature Flutter launches"
            eyebrow="Featured case work"
            description="High-velocity programs that combined Flutter craft, AI copilots, and measurable ROI for leadership."
          >
            <FeaturedProjects />
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
            title="Toolchain & AI operations"
            description="Preferred stack for $100K+ Flutter mandates, covering delivery, backend, and AI ops."
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
            description="Concise narratives that answer the typical ‘How do you derisk?’ interview blocks."
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
              <div className="space-y-4 text-slate-700 dark:text-slate-200">
                <div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">{profile.education.degree}</p>
                  <p className="text-sm text-slate-500">{profile.education.institution}</p>
                  <p className="mt-2 text-sm">{profile.education.notes}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Certifications</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {profile.education.certifications.map((cert) => (
                      <li key={cert} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl border border-slate-100/50 bg-white/70 p-5 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Community & thought leadership</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {profile.activities.map((activity) => (
                      <li key={activity} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-slate-100/60 bg-white/80 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Engage now</p>
                  <ContactPanel />
                </div>
              </div>
            </div>
          </Section>

          <Section
            title="Executive availability"
            description="Designed for US/EU leadership roles where senior Flutter architecture ownership is critical."
          >
            <ExecutiveCTA />
          </Section>
        </main>
      </div>
      <AiGuide />
    </div>
  );
}
