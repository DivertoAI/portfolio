import { profile } from "@/data/profile";

export function ExperienceTimeline() {
  return (
    <ol className="space-y-10">
      {profile.experiences.map((experience, index) => (
        <li key={`${experience.company}-${experience.role}`} className="relative pl-10">
          <span className="absolute left-2 top-2 h-4 w-4 rounded-full border-2 border-white bg-sky-500 shadow ring-4 ring-sky-100 dark:border-slate-900 dark:ring-sky-900" />
          {index !== profile.experiences.length - 1 && (
            <span className="absolute left-3 top-6 h-full w-px bg-slate-200 dark:bg-slate-800" aria-hidden />
          )}
          <div className="rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {experience.period}
                </p>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {experience.role}
                </h3>
                <p className="text-sm text-slate-500">
                  {experience.company} · {experience.location}
                </p>
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {experience.impact}
              </p>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {experience.highlights.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
