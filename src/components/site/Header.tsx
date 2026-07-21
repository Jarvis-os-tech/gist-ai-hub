import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { DEPARTMENT } from "@/lib/department-data";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Faculty", to: "/faculty" },
  { label: "Laboratories", to: "/labs" },
  { label: "Programs", to: "/programs" },
  { label: "Events", to: "/events" },
  { label: "Downloads", to: "/downloads" },
  { label: "Research", to: "/research" },
  { label: "Placements", to: "/placements" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { location } = useRouterState();
  const pathname = location.pathname;

  return (
    <header>
      {/* ─── Institutional Branding ─── */}
      <div className="inst-header">
        <div className="inst-inner">
          <a
            href="https://gist.edu.in/gist/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ flexShrink: 0, lineHeight: 0 }}
          >
            <img
              src={DEPARTMENT.logoUrl}
              alt="GIST Logo"
              className="inst-logo"
              onError={(e) => {
                // Fallback if CDN unreachable
                e.currentTarget.style.display = "none";
              }}
            />
          </a>
          <div className="inst-text">
            <div className="inst-title">{DEPARTMENT.institute.toUpperCase()}</div>
            <div className="inst-subrow">
              <span className="inst-auto">
                {DEPARTMENT.accreditation}
                <span className="inst-approval">{DEPARTMENT.affiliation}</span>
              </span>
              <span className="code-box">{DEPARTMENT.eapcetCode}</span>
              <span className="code-box">{DEPARTMENT.appgecetCode}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Orange Navigation Bar ─── */}
      <nav className="site-nav" role="navigation" aria-label="Main navigation">
        <div className="site-nav-inner">
          {/* Desktop links */}
          <div className="site-nav-links" style={{ overflowX: "auto", scrollbarWidth: "none" }}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link${pathname === item.to ? " active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CSE Department label (right) */}
          <div
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              flexShrink: 0,
              paddingLeft: 16,
            }}
          >
            CSE Dept.
          </div>

          {/* Mobile toggle */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{ marginLeft: "auto" }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            style={{
              background: "rgba(15,37,71,0.97)",
              backdropFilter: "blur(12px)",
              borderTop: "1px solid rgba(255,255,255,0.12)",
              paddingBottom: 16,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 24px",
                  color: pathname === item.to ? "var(--gold-soft)" : "rgba(255,255,255,0.85)",
                  fontWeight: pathname === item.to ? 600 : 400,
                  fontSize: 15,
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
