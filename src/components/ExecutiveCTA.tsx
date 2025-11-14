import Link from "next/link";
import { profile } from "@/data/profile";

export function ExecutiveCTA() {
  const cta = profile.callToAction;
  return (
    <div className="rounded-3xl border border-slate-100 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-300">Availability</p>
      <h3 className="mt-2 text-3xl font-semibold">{cta.headline}</h3>
      <p className="mt-2 text-sm text-slate-300">{cta.subheadline}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">{cta.availability}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-200">
        {cta.bulletPoints.map((point) => (
          <li key={point} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-3">
        {cta.actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-sky-400"
            target={action.href.startsWith("http") ? "_blank" : undefined}
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
