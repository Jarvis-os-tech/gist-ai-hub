import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { DEPARTMENT } from "@/lib/department-data";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-navy-deep text-white/85">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2 max-w-md">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-gold font-serif font-bold">CSE</div>
            <div>
              <div className="font-serif text-lg">Computer Science & Engineering</div>
              <div className="text-xs uppercase tracking-widest text-white/60">GIST · Nellore</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-white/70">
            Preparing students for a wide range of IT careers — molding tomorrow’s technocrats with high caliber and commitment. Established {DEPARTMENT.established}.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-gold">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {([
              { to: "/about", label: "About" },
              { to: "/faculty", label: "Faculty" },
              { to: "/programs", label: "Programs" },
              { to: "/labs", label: "Labs" },
              { to: "/research", label: "Research" },
              { to: "/placements", label: "Placements" },
            ] as const).map((k) => (
              <li key={k.to}>
                <Link to={k.to} className="text-white/75 hover:text-gold transition-colors">{k.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-gold">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gold" /><span>{DEPARTMENT.contact.address}</span></li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-gold" /><a href={`tel:${DEPARTMENT.contact.phone}`}>{DEPARTMENT.contact.phone}</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0 text-gold" /><a href={`mailto:${DEPARTMENT.contact.email}`}>{DEPARTMENT.contact.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 py-4 text-xs text-white/55">
          <span>© {new Date().getFullYear()} Department of CSE, Geethanjali Institute of Science & Technology.</span>
          <span>Content sourced from the official GIST website.</span>
        </div>
      </div>
    </footer>
  );
}