"use client";

import { useState } from "react";
import { journeySteps } from "@/data/journey";

export function JourneyNavigator() {
  const [activeId, setActiveId] = useState<string>(journeySteps[0]?.id ?? "");

  function handleSelect(stepId: string) {
    setActiveId(stepId);
    const target = document.getElementById(stepId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Guided flow</p>
      {/* <h2 className="mt-2 text-2xl font-semibold text-white">Follow the AI journey</h2>÷ */}
      <p className="mt-1 text-sm text-slate-400">
        Each labeled step syncs with OpenAI prompts and the main canvas. Choose a step to jump directly to the relevant
        section.
      </p>
      <div className="mt-5 space-y-3">
        {journeySteps.map((step) => {
          const isActive = activeId === step.id;
          return (
            <button
              key={step.id}
              onClick={() => handleSelect(step.id)}
              className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                isActive
                  ? "border-sky-400 bg-sky-400/10"
                  : "border-white/10 bg-white/5 hover:border-white/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">
                  {step.step}
                </p>
                <span className="text-xs text-slate-500">Tap + scroll</span>
              </div>
              <p className="mt-2 text-base font-semibold text-white">{step.title}</p>
              <p className="text-sm text-slate-400">{step.subtitle}</p>
              <p className="mt-2 text-sm text-slate-500">{step.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
