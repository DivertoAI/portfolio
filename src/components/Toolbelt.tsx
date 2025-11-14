import { profile } from "@/data/profile";

export function Toolbelt() {
  const groups = Object.entries(profile.toolbelt);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {groups.map(([group, items]) => (
        <div
          key={group}
          className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow dark:border-slate-700 dark:bg-slate-900/70"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{group}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200/60 bg-white px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
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
