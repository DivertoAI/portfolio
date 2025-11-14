import { profile } from "@/data/profile";

export function Testimonials() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {profile.testimonials.map((testimonial) => (
        <div
          key={testimonial.author}
          className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-inner dark:border-slate-800 dark:bg-slate-900/70"
        >
          <p className="text-sm text-slate-600 dark:text-slate-300">“{testimonial.quote}”</p>
          <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">{testimonial.author}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{testimonial.title}</p>
        </div>
      ))}
    </div>
  );
}
