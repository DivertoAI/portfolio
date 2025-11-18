"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { journeySteps } from "@/data/journey";

interface GuideMessage {
  role: "user" | "assistant";
  content: string;
}

export function AiGuide() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<GuideMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm your AI concierge for Saswata. Tap a step badge or ask any question and I'll narrate the relevant story.",
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

  async function requestInsight({
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
      const response = await fetch("/api/sonnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, history: messages }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.error || "Unable to reach AI guide");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "user", content: label ?? prompt },
        { role: "assistant", content: data.reply },
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
              Context from {profile.name}. Customize flows in <code className="rounded bg-slate-800 px-1 py-0.5">src/data/journey.ts</code>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
