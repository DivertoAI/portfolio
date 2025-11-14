import Link from "next/link";
import { profile } from "@/data/profile";

export function FeaturedProjects() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {profile.featuredProjects.map((project) => (
        <div
          key={project.name}
          className="group flex flex-col rounded-3xl border border-slate-200 bg-gradient-to-b from-white/90 to-slate-50 p-6 shadow-lg transition hover:-translate-y-1 dark:border-slate-800 dark:from-slate-950 dark:to-slate-900"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">Featured launch</p>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{project.name}</h3>
            </div>
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 transition group-hover:border-slate-900 group-hover:text-slate-900 dark:border-slate-700 dark:text-slate-300"
              >
                View
              </Link>
            )}
          </div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-300">
            {project.metrics.map((metric) => (
              <li key={metric} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden />
                <span>{metric}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((stack) => (
              <span
                key={stack}
                className="rounded-full border border-slate-200/60 bg-white/60 px-3 py-1 text-xs font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200"
              >
                {stack}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
