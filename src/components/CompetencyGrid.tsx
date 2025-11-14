import { profile } from "@/data/profile";

export function CompetencyGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {profile.competencies.map((competency) => (
        <div
          key={competency.category}
          className="rounded-3xl border border-slate-100 bg-white/70 p-6 shadow dark:border-slate-800 dark:bg-slate-900/70"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {competency.category}
          </h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {competency.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200/70 bg-slate-50 px-3 py-1 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
