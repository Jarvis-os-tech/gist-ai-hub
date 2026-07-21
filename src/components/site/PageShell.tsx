import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { SiteHeader } from "./Header";
import { SiteFooter } from "./Footer";
import { AIChatWidget } from "./AIChatWidget";

type Crumb = { label: string; to?: string };

export function PageShell({
  title,
  eyebrow,
  description,
  crumbs,
  children,
  hideAskAI,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  crumbs?: Crumb[];
  children: ReactNode;
  hideAskAI?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <section className="border-b border-border/60 bg-surface">
        <div className="container-page py-10 md:py-14">
          {crumbs && (
            <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-navy">Home</Link>
              {crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" />
                  {c.to ? <Link to={c.to} className="hover:text-navy">{c.label}</Link> : <span className="text-foreground">{c.label}</span>}
                </span>
              ))}
            </nav>
          )}
          {eyebrow && <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">{eyebrow}</div>}
          <h1 className="mt-2 font-serif text-3xl md:text-5xl font-semibold text-navy-deep text-balance">{title}</h1>
          {description && (
            <p className="mt-4 max-w-3xl text-base md:text-lg text-muted-foreground text-balance">{description}</p>
          )}
        </div>
      </section>
      <main className="flex-1">{children}</main>
      <SiteFooter />
      {!hideAskAI && <AIChatWidget />}
    </div>
  );
}