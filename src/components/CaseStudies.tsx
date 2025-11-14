import { profile } from "@/data/profile";

export function CaseStudies() {
  return (
    <div className="space-y-6">
      {profile.caseStudies.map((caseStudy) => (
        <div
          key={caseStudy.client}
          className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow dark:border-slate-700 dark:bg-slate-900/80"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">{caseStudy.client}</p>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{caseStudy.headline}</h3>
            </div>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-slate-500">Challenge</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{caseStudy.challenge}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Approach</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{caseStudy.approach}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Outcome</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{caseStudy.outcome}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
