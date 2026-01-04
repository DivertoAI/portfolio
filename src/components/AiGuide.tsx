"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { journeySteps } from "@/data/journey";

interface GuideMessage {
  role: "user" | "assistant";
  content: string;
}

const offlineIntro =
  "Hi, I'm your concierge for Saswata. This GitHub Pages build runs offline, so I return curated highlights.";

const statsLine = profile.stats.map((stat) => `${stat.label}: ${stat.value}`).join(" | ");
const pillarHighlights = profile.pillars.map((pillar) => `- ${pillar.title}: ${pillar.points[0]}`);
const experienceHighlights = profile.experiences
  .slice(0, 3)
  .map((experience) => `- ${experience.role} @ ${experience.company}: ${experience.impact}`);
const certificationHighlights = profile.education.certifications.slice(0, 3).map((cert) => `- ${cert}`);

const stepReplies: Record<string, string> = {
  "mission-control": [
    "Pain audit focus:",
    "- Parity gaps between iOS and Android",
    "- Store review and compliance risk",
    "- AI pilots without ROI or governance",
    "- Delivery visibility for execs",
    `Summary: ${profile.summary}`,
    `Core stats: ${statsLine}.`,
  ].join("\n"),
  "architecture-systems": [
    "Architecture pillars:",
    ...pillarHighlights,
    `Toolbelt: ${profile.toolbelt.delivery.slice(0, 6).join(", ")}.`,
  ].join("\n"),
  "delivery-impact": [
    "Recent delivery receipts:",
    ...experienceHighlights,
    `Featured launches: ${profile.featuredProjects.map((project) => project.name).join(", ")}.`,
  ].join("\n"),
  "engage-and-grow": [
    `Education: ${profile.education.degree}, ${profile.education.institution}.`,
    "Certifications:",
    ...certificationHighlights,
    `Contact: ${profile.contact.email}`,
  ].join("\n"),
};

function buildOfflineReply({ prompt, stepId }: { prompt: string; stepId?: string }) {
  const step = stepId ? journeySteps.find((item) => item.id === stepId) : undefined;
  if (step) {
    return [
      `${step.step}: ${step.title}`,
      stepReplies[step.id] ?? step.description,
      `Contact: ${profile.contact.email}`,
    ].join("\n");
  }

  const normalizedPrompt = prompt.trim().toLowerCase();
  if (normalizedPrompt) {
    if (normalizedPrompt.includes("resume") || normalizedPrompt.includes("cv")) {
      return [
        "Resume access:",
        "Use the Resume PDF buttons on the page.",
        `Contact: ${profile.contact.email}`,
      ].join("\n");
    }

    if (normalizedPrompt.includes("email") || normalizedPrompt.includes("contact") || normalizedPrompt.includes("reach")) {
      return [
        "Contact details:",
        `Email: ${profile.contact.email}`,
        `LinkedIn: ${profile.contact.linkedin}`,
        `GitHub: ${profile.contact.github}`,
      ].join("\n");
    }

    if (normalizedPrompt.includes("project") || normalizedPrompt.includes("case")) {
      return [
        "Featured project highlights:",
        ...profile.featuredProjects.map((project) => `- ${project.name}: ${project.description}`),
        `Contact: ${profile.contact.email}`,
      ].join("\n");
    }

    if (normalizedPrompt.includes("experience") || normalizedPrompt.includes("role")) {
      return [
        "Recent leadership roles:",
        ...experienceHighlights,
        `Contact: ${profile.contact.email}`,
      ].join("\n");
    }
  }

  return [
    "Live AI is disabled in this static build.",
    `${profile.name} - ${profile.title} (${profile.location}).`,
    `Summary: ${profile.summary}`,
    `Core stats: ${statsLine}.`,
    "Tip: tap a step badge for a guided highlight.",
    `Contact: ${profile.contact.email} | LinkedIn: ${profile.contact.linkedin}`,
  ].join("\n");
}

export function AiGuide() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<GuideMessage[]>([
    {
      role: "assistant",
      content: `${offlineIntro} Tap a step badge or ask any question.`,
    },
  ]);
  const [activeRequest, setActiveRequest] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, open]);

  function requestInsight({
    prompt,
    label,
    stepId,
  }: {
    prompt: string;
    label?: string;
    stepId?: string;
  }) {
    setOpen(true);
    setActiveRequest(stepId ?? "custom");
    setError(null);

    try {
      const reply = buildOfflineReply({ prompt, stepId });
      setMessages((prev) => [
        ...prev,
        { role: "user", content: label ?? prompt },
        { role: "assistant", content: reply },
      ]);

      if (stepId) {
        window.dispatchEvent(
          new CustomEvent("journey-highlight", {
            detail: { stepId },
          }),
        );
        requestAnimationFrame(() => {
          document
            .getElementById(stepId)
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setActiveRequest(null);
    }
  }

  function handleStep(stepId: string) {
    const step = journeySteps.find((item) => item.id === stepId);
    if (!step) return;
    requestInsight({
      prompt: step.prompt,
      label: `${step.step} · ${step.title}`,
      stepId: step.id,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim() || activeRequest) return;
    requestInsight({ prompt: input.trim() });
    setInput("");
  }

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <div className="pointer-events-auto w-[340px] rounded-3xl border border-white/15 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-4 text-white shadow-[0_25px_80px_rgba(8,15,40,0.75)]">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-2xl border border-white/10 px-3 py-2 text-left"
        >
          <span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-sky-300">AI Concierge</p>
            <p className="text-sm font-semibold text-white">Portfolio Chat</p>
          </span>
          <span className="text-xs text-slate-400">{open ? "−" : "+"}</span>
        </button>
        {open && (
          <>
            {error && <p className="mt-3 text-xs text-rose-300">{error}</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              {journeySteps.map((flow) => (
                <button
                  key={flow.id}
                  onClick={() => handleStep(flow.id)}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-200 hover:border-sky-400"
                >
                  {flow.step}
                </button>
              ))}
            </div>
            <div
              ref={listRef}
              className="mt-3 max-h-64 space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-black/30 p-3"
            >
              {messages.map((message, index) => {
                const isAssistant = message.role === "assistant";
                return (
                  <div key={`${message.role}-${index}`} className={`flex ${isAssistant ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl border px-3 py-2 text-sm shadow ${
                        isAssistant
                          ? "border-sky-500/30 bg-gradient-to-r from-sky-600/30 to-indigo-600/30 text-sky-100"
                          : "border-white/15 bg-white/5 text-slate-200"
                      }`}
                    >
                      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">{message.role}</p>
                      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                );
              })}
              {activeRequest && (
                <div className="flex justify-end">
                  <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-xs text-sky-200">
                    Generating insight…
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask anything about Saswata"
                className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || Boolean(activeRequest)}
                className="rounded-2xl border border-sky-400 bg-sky-500/20 px-4 text-sm font-semibold text-sky-100 disabled:opacity-50"
              >
                Send
              </button>
            </form>
            <p className="mt-3 text-[10px] text-slate-500">
              Offline guide uses curated highlights. Customize flows in{" "}
              <code className="rounded bg-slate-800 px-1 py-0.5">src/data/journey.ts</code>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
