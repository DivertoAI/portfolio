import Link from "next/link";
import { profile } from "@/data/profile";

const CONTACT_LINKS = [
  { label: "Email", value: profile.contact.email, href: `mailto:${profile.contact.email}` },
  { label: "Phone", value: profile.contact.phone, href: `tel:${profile.contact.phone.replace(/\s+/g, "")}` },
  { label: "LinkedIn", value: profile.contact.linkedin, href: profile.contact.linkedin },
  { label: "GitHub", value: profile.contact.github, href: profile.contact.github },
  { label: "3D Experience", value: profile.contact.portfolio3d, href: profile.contact.portfolio3d },
].filter(
  (link): link is { label: string; value: string; href: string } =>
    Boolean(link?.value && link?.href),
);

export function ContactPanel() {
  return (
    <div className="space-y-4">
      {CONTACT_LINKS.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200"
        >
          <span>{item.label}</span>
          <span className="truncate text-slate-500">{item.value}</span>
        </Link>
      ))}
    </div>
  );
}
