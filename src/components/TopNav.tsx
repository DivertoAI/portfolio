"use client";

import Link from "next/link";
import { journeySteps } from "@/data/journey";

export function TopNav() {
  function handleJourney(stepId: string) {
    window.dispatchEvent(
      new CustomEvent("journey-highlight", {
        detail: { stepId },
      }),
    );
    document.getElementById(stepId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="sticky top-0 z-40 space-y-3 bg-gradient-to-b from-slate-950/95 via-slate-950/75 to-transparent pb-4 pt-4 backdrop-blur">
      <nav className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-4 shadow-xl lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">Saswata Saha</p>
          <p className="text-sm font-semibold text-slate-200">Anti-risk mobile architecture for hiring leaders</p>
        </div>
        <div className="hidden flex-wrap gap-2 lg:flex">
          {journeySteps.map((step) => (
            <button
              key={step.id}
              onClick={() => handleJourney(step.id)}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200 transition hover:border-amber-400 hover:text-white"
            >
              {step.step}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-semibold">
          <Link
            href="mailto:appsmoothies@gmail.com"
            className="rounded-full border border-white/20 px-4 py-2 text-white hover:border-amber-400"
          >
            Email
          </Link>
          <Link
            href="/resume.pdf"
            className="rounded-full border border-amber-300 bg-amber-400/10 px-4 py-2 text-amber-100 hover:border-amber-400"
          >
            Résumé PDF
          </Link>
          <Link
            href="https://thenativegod.github.io/portfolio3d/"
            target="_blank"
            className="rounded-full bg-white px-4 py-2 text-slate-900"
          >
            3D Portfolio
          </Link>
        </div>
      </nav>
      <div className="flex gap-2 overflow-x-auto lg:hidden">
        {journeySteps.map((step) => (
          <button
            key={step.id}
            onClick={() => handleJourney(step.id)}
            className="whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200"
          >
            {step.step}
          </button>
        ))}
      </div>
    </div>
  );
}
