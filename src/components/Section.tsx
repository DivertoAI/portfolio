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
      className="space-y-6 rounded-3xl border border-white/10 bg-white/80 p-8 shadow-[0_10px_50px_rgba(15,23,42,0.08)] backdrop-blur dark:bg-slate-900/80"
    >
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {step && (
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-500">
              {step}
            </p>
          )}
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
              {description}
            </p>
          )}
        </div>
        {action}
      </header>
      <div className="text-slate-700 dark:text-slate-200">{children}</div>
    </section>
  );
}
