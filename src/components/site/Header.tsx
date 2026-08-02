import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DEPARTMENT } from "@/lib/department-data";
import { openAIChatWidget } from "./AIChatWidget";
import { ScrollProgress } from "@/components/animations/ScrollProgress";

interface NavItem {
  label: string;
  to: string;
  subItems?: { label: string; to: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "About",
    to: "/about",
    subItems: [
      { label: "About Overview", to: "/about" },
      { label: "Research", to: "/research" },
      { label: "Downloads", to: "/downloads" },
    ],
  },
  { label: "Faculty", to: "/faculty" },
  { label: "Placements", to: "/placements" },
  { label: "Gallery", to: "/gallery" },
  { label: "Events", to: "/events" },
  { label: "Programs", to: "/programs" },
  { label: "Laboratories", to: "/labs" },
  { label: "Contact", to: "/contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
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
      {/* ─── Scroll Progress Bar ─── */}
      <ScrollProgress />

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
            {NAV_ITEMS.map((item) => {
              if (item.subItems) {
                const isSubActive = item.subItems.some((sub) => pathname === sub.to);
                return (
                  <div
                    key={item.to}
                    style={{ position: "relative", display: "inline-block" }}
                    onMouseEnter={() => setAboutDropdownOpen(true)}
                    onMouseLeave={() => setAboutDropdownOpen(false)}
                  >
                    <Link
                      to={item.to}
                      className={`nav-link${isSubActive || pathname === item.to ? " active" : ""}`}
                      style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
                    >
                      {item.label}
                      <ChevronDown size={12} />
                    </Link>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {aboutDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            minWidth: 170,
                            background: "var(--navy-deep)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: 12,
                            padding: "6px 0",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                            zIndex: 100,
                          }}
                        >
                          {item.subItems.map((sub) => (
                            <Link
                              key={sub.to}
                              to={sub.to}
                              style={{
                                display: "block",
                                padding: "8px 16px",
                                fontSize: 13,
                                fontWeight: pathname === sub.to ? 700 : 500,
                                color: pathname === sub.to ? "var(--gold-soft)" : "rgba(255,255,255,0.85)",
                                textDecoration: "none",
                                transition: "background 0.2s ease",
                              }}
                              onMouseOver={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                              }}
                              onMouseOut={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "transparent";
                              }}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`nav-link${pathname === item.to ? " active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
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

                    {/* Render sub items for mobile */}
                    {item.subItems && (
                      <div style={{ paddingLeft: 36, display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
                        {item.subItems.slice(1).map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            onClick={() => setMenuOpen(false)}
                            style={{
                              fontSize: 13,
                              color: pathname === sub.to ? "var(--gold-soft)" : "rgba(255,255,255,0.7)",
                              textDecoration: "none",
                              padding: "4px 0",
                            }}
                          >
                            ↳ {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
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

