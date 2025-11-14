import { profile } from "@/data/profile";

export function Achievements() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {profile.achievements.map((achievement) => (
        <div
          key={achievement}
          className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-emerald-900 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-100"
        >
          ✓ {achievement}
        </div>
      ))}
    </div>
  );
}
