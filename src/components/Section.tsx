import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  title: string;
  eyebrow?: string;
  step?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function Section({
  id,
  title,
  eyebrow,
  step,
  description,
  action,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className="space-y-6 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/85 via-slate-900/85 to-slate-900/70 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur"
    >
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {step && (
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
              {step}
            </p>
          )}
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl font-semibold text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-base text-slate-300">
              {description}
            </p>
          )}
        </div>
        {action}
      </header>
      <div className="text-slate-200">{children}</div>
    </section>
  );
}
