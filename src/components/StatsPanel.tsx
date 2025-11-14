import { profile } from "@/data/profile";

export function StatsPanel() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4">
      {profile.stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-100 bg-white/80 p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
        >
          <p className="text-4xl font-black text-slate-900 dark:text-white">
            {stat.value}
          </p>
          <p className="mt-2 text-sm uppercase tracking-wide text-slate-500">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
