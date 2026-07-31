import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DEPARTMENT } from "@/lib/department-data";
import { openAIChatWidget } from "./AIChatWidget";

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
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();
  const pathname = location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                (e.currentTarget as HTMLElement).style.display = "none";
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

      {/* ─── Enhanced Navigation Bar ─── */}
      <nav
        className={`site-nav${scrolled ? " scrolled" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
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

          {/* Right section */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, paddingLeft: 16 }}>
            <button
              onClick={openAIChatWidget}
              className="btn btn-ghost"
              style={{
                fontSize: 12,
                padding: "8px 16px",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                whiteSpace: "nowrap",
              }}
            >
              <Sparkles size={13} /> AI Assistant
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "rgba(255,255,255,0.12)",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu with staggered animations */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "rgba(11, 25, 44, 0.98)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "12px 0 16px" }}>
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: "block",
                        padding: "12px 24px",
                        color: pathname === item.to ? "var(--gold-soft)" : "rgba(255,255,255,0.85)",
                        fontWeight: pathname === item.to ? 700 : 500,
                        fontSize: 15,
                        borderLeft: pathname === item.to ? "3px solid var(--gold-soft)" : "3px solid transparent",
                        background: pathname === item.to ? "rgba(244, 196, 48, 0.06)" : "transparent",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
