"use client";

import { useEffect, useMemo, useState } from "react";
import { journeySteps } from "@/data/journey";

export function JourneyOverlay() {
  const [activeStepId, setActiveStepId] = useState<string>(journeySteps[0]?.id ?? "");

  useEffect(() => {
    const sections = journeySteps
      .map((step) => document.getElementById(step.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = visible[0].target.getAttribute("id");
          if (id) {
            setActiveStepId(id);
          }
        }
      },
      {
        threshold: 0.35,
        rootMargin: "-15% 0px -40% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    function handleHighlight(event: Event) {
      const detail = (event as CustomEvent<{ stepId: string }>).detail;
      if (detail?.stepId) {
        setActiveStepId(detail.stepId);
      }
    }

    window.addEventListener("journey-highlight", handleHighlight);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
      window.removeEventListener("journey-highlight", handleHighlight);
    };
  }, []);

  const activeStep = useMemo(
    () => journeySteps.find((step) => step.id === activeStepId) ?? journeySteps[0],
    [activeStepId],
  );

  if (!activeStep) return null;

  return (
    <div className="fixed bottom-4 right-4 z-30 w-[260px] rounded-2xl border border-white/20 bg-slate-950/80 p-4 text-white shadow-2xl backdrop-blur">
      <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-sky-300">
        {activeStep.step}
      </p>
      <p className="mt-1 text-lg font-semibold">{activeStep.title}</p>
      <p className="text-sm text-slate-400">{activeStep.subtitle}</p>
      <p className="mt-2 text-xs text-slate-500">Guiding you through this area</p>
    </div>
  );
}
