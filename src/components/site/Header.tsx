import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Sparkles, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/faculty", label: "Faculty" },
  { to: "/programs", label: "Programs" },
  { to: "/labs", label: "Labs" },
  { to: "/research", label: "Research" },
  { to: "/placements", label: "Placements" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/downloads", label: "Downloads" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="bg-navy-deep text-white/90 text-xs">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 py-1.5">
          <span className="truncate">Geethanjali Institute of Science & Technology · Autonomous · NAAC ‘A’</span>
          <a href="https://gist.edu.in" className="hidden sm:inline hover:text-gold transition-colors">gist.edu.in →</a>
        </div>
      </div>
      <div className="container-page flex items-center justify-between gap-4 py-4">
        <Link to="/" className="flex items-center gap-3 group min-w-0">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-gold font-serif text-lg font-bold shadow-sm">
            CSE
          </div>
          <div className="min-w-0 leading-tight">
            <div className="font-serif text-[15px] font-semibold text-foreground truncate">
              Computer Science & Engineering
            </div>
            <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground truncate">
              Department · GIST
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm">
          {NAV.slice(0, 8).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors"
              activeProps={{ className: "text-navy font-semibold bg-secondary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/chat"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-navy-deep transition-colors"
          >
            <Sparkles className="h-4 w-4 text-gold" /> Ask AI
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-md border border-border"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-border transition-[max-height]",
          open ? "max-h-[80vh]" : "max-h-0"
        )}
      >
        <nav className="container-page grid grid-cols-2 gap-1 py-4 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 hover:bg-secondary"
              activeProps={{ className: "text-navy font-semibold bg-secondary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/chat"
            onClick={() => setOpen(false)}
            className="col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-navy px-3 py-2.5 text-white"
          >
            <Sparkles className="h-4 w-4 text-gold" /> Ask the CSE AI Assistant
          </Link>
        </nav>
      </div>
    </header>
  );
}

export { Search };