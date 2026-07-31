import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { SiteHeader } from "./Header";
import { SiteFooter } from "./Footer";

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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
      }}
    >
      <SiteHeader />

      {/* Page hero banner — enhanced */}
      <section className="page-hero">
        {/* Ambient mesh */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(228, 92, 4, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 50%, rgba(212, 175, 55, 0.06) 0%, transparent 50%)
            `,
            pointerEvents: "none",
          }}
        />

        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          {crumbs && (
            <nav aria-label="Breadcrumb" className="breadcrumb" style={{ marginBottom: 16 }}>
              <Link to="/" style={{ color: "rgba(255,255,255,0.65)" }}>
                Home
              </Link>
              {crumbs.map((c, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <ChevronRight size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
                  {c.to ? (
                    <a href={c.to} style={{ color: "rgba(255,255,255,0.65)" }}>
                      {c.label}
                    </a>
                  ) : (
                    <span style={{ color: "#fff", fontWeight: 600 }}>{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          {eyebrow && <div className="page-hero-eyebrow">{eyebrow}</div>}
          <h1 className="page-hero-title">{title}</h1>
          {description && <p className="page-hero-desc">{description}</p>}
        </div>
      </section>

      <main style={{ flex: 1 }}>{children}</main>
      <SiteFooter />
    </div>
  );
}
