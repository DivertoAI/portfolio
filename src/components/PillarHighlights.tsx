import { profile } from "@/data/profile";

export function PillarHighlights() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {profile.pillars.map((pillar) => (
        <div
          key={pillar.title}
          className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-inner dark:border-slate-800 dark:from-slate-950 dark:to-slate-900"
        >
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            {pillar.title}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {pillar.points.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
