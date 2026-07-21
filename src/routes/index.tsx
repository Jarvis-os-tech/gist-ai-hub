import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, GraduationCap, Users, FlaskConical, Award, BookOpen, ChevronRight, Download, Calendar, Image, Mail } from "lucide-react";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { openAIChatWidget } from "@/components/site/AIChatWidget";
import { DEPARTMENT, QUICK_LINKS, PROGRAMMES, FACULTY, GALLERY_IMAGES } from "@/lib/department-data";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "GIST CSE Department" },
      {
        name: "description",
        content:
          "Official portal of the Department of Computer Science & Engineering at Geethanjali Institute of Science & Technology, Nellore — Established 2008, 49 faculty, 8 modern labs including NVIDIA AI Lab.",
      },
    ],
  }),
  component: HomePage,
}));

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const duration = 1400;
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
            setVal(Math.floor(ease * to));
            if (p < 1) requestAnimationFrame(step);
            else setVal(to);
          };
          requestAnimationFrame(step);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen, GraduationCap, Users, FlaskConical, Download, Award, Calendar, Image, Mail,
};

function HomePage() {
  const topFaculty = FACULTY.slice(0, 8);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <SiteHeader />

      {/* ─── HERO ─── */}
      <section className="hero">
        <img
          src={DEPARTMENT.bannerUrl}
          alt="GIST CSE Department"
          className="hero-bg"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="hero-overlay" />
        <div className="container-page hero-content animate-fade-up">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            Est. {DEPARTMENT.established} · {DEPARTMENT.accreditation.split("|")[0].trim()} ·{" "}
            {DEPARTMENT.accreditation.split("|")[1].trim()}
          </div>
          <h1 className="hero-title">
            Department of Computer Science
            <br />& Engineering, <span>GIST</span>
          </h1>
          <p className="hero-desc">
            {DEPARTMENT.about[0]}
          </p>
          <div className="hero-actions animate-fade-up">
            <Link to="/about" className="btn btn-secondary">
              Explore Department <ArrowRight size={15} />
            </Link>
            <Link to="/faculty" className="btn btn-ghost">
              Meet 49 Faculty
            </Link>
            <button onClick={openAIChatWidget} className="btn btn-primary">
              <Sparkles size={15} /> Ask AI Assistant
            </button>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="stats-bar">
        <div
          className="container-page"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          {[
            { label: "Faculty Members", value: DEPARTMENT.stats.faculty, icon: Users },
            { label: "UG Intake", value: DEPARTMENT.stats.studentIntakeUG, icon: GraduationCap },
            { label: "Laboratories", value: DEPARTMENT.stats.laboratories, icon: FlaskConical },
            { label: "Years of Excellence", value: DEPARTMENT.stats.yearsOfExcellence, icon: Award },
          ].map((s) => (
            <div key={s.label} className="stat-item" style={{ borderRight: "1px solid var(--border)" }}>
              <div className="stat-icon">
                <s.icon size={22} />
              </div>
              <div>
                <div className="stat-value">
                  <Counter to={s.value} />+
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── QUICK ACCESS ─── */}
      <section className="section">
        <div className="container-page">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
            <div>
              <div className="eyebrow">Quick Access</div>
              <h2 className="section-title">Everything about the department,<br />in one click.</h2>
            </div>
            <button onClick={openAIChatWidget} style={{ fontSize: 14, color: "var(--gist-orange)", display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 600, background: "none", border: "none" }}>
              <Sparkles size={14} /> Ask the AI Assistant
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            }}
          >
            {QUICK_LINKS.map((q) => {
              const Icon = ICON_MAP[q.icon] || BookOpen;
              return (
                <Link
                  key={q.to}
                  to={q.to}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="card"
                    style={{ height: "100%", cursor: "pointer" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--gist-orange-subtle)", display: "grid", placeItems: "center", color: "var(--gist-orange)" }}>
                        <Icon size={18} />
                      </div>
                      <ChevronRight size={16} color="var(--text-muted)" />
                    </div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, color: "var(--navy-deep)", marginBottom: 6 }}>{q.title}</h3>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.55 }}>{q.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── HOD MESSAGE + PROGRAMMES ─── */}
      <section className="section section-alt">
        <div className="container-page" style={{ display: "grid", gap: 48, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {/* HOD */}
          <div>
            <div className="eyebrow">From the HOD</div>
            <h2 className="section-title">A department that molds tomorrow's technocrats.</h2>
            <p style={{ marginTop: 16, color: "var(--text-muted)", lineHeight: 1.75, fontSize: 15 }}>
              {DEPARTMENT.about[1]}
            </p>
            <p style={{ marginTop: 12, color: "var(--text-muted)", lineHeight: 1.75, fontSize: 15 }}>
              {DEPARTMENT.about[2]}
            </p>
            <div className="hod-card" style={{ marginTop: 24 }}>
              <div className="hod-avatar">
                {DEPARTMENT.hod.name.split(" ").filter(w => !["Dr.", "Mr.", "Ms."].includes(w)).map(w => w[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>{DEPARTMENT.hod.name}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{DEPARTMENT.hod.designation}</div>
                <a
                  href={`mailto:${DEPARTMENT.hod.email}`}
                  style={{ fontSize: 13, color: "var(--gold-soft)", marginTop: 4, display: "block", textDecoration: "none" }}
                >
                  {DEPARTMENT.hod.email}
                </a>
              </div>
            </div>
          </div>

          {/* Programmes */}
          <div>
            <div className="eyebrow">Programmes</div>
            <h2 className="section-title">Undergraduate & Postgraduate offerings.</h2>
            <ul style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              {PROGRAMMES.map((p) => (
                <li
                  key={p.title}
                  className="card"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, listStyle: "none" }}
                >
                  <div>
                    <div className="badge badge-orange" style={{ marginBottom: 8 }}>{p.level}</div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, color: "var(--navy-deep)", fontWeight: 600 }}>{p.title}</div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{p.duration}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 700, color: "var(--navy-deep)" }}>{p.intake}</div>
                    <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>Intake</div>
                  </div>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 16 }}>
              <Link to="/programs" style={{ color: "var(--gist-orange)", fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
                View Course Structure & Syllabus <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VISION & MISSION ─── */}
      <section className="section">
        <div className="container-page">
          <div style={{ display: "grid", gap: 48, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <div>
              <div className="eyebrow">Vision</div>
              <h2 className="section-title">Our North Star</h2>
              <div
                style={{
                  marginTop: 20,
                  padding: "24px",
                  background: "var(--navy-deep)",
                  borderRadius: "var(--radius-xl)",
                  color: "#fff",
                  fontStyle: "italic",
                  fontSize: 15,
                  lineHeight: 1.75,
                  borderLeft: "4px solid var(--gist-orange)",
                }}
              >
                "{DEPARTMENT.vision}"
              </div>
            </div>
            <div>
              <div className="eyebrow">Mission</div>
              <h2 className="section-title">What We Stand For</h2>
              <ul style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12, listStyle: "none" }}>
                {DEPARTMENT.mission.map((m, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: "14px 16px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-md)",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        width: 26, height: 26, borderRadius: "50%",
                        background: "var(--gist-orange)",
                        color: "#fff",
                        display: "grid", placeItems: "center",
                        fontSize: 12, fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.6 }}>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FACULTY PREVIEW ─── */}
      <section className="section section-alt">
        <div className="container-page">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
            <div>
              <div className="eyebrow">Faculty</div>
              <h2 className="section-title">Experienced educators & researchers.</h2>
            </div>
            <Link to="/faculty" style={{ fontSize: 14, color: "var(--gist-orange)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
              All {DEPARTMENT.stats.faculty} members <ArrowRight size={14} />
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            }}
          >
            {topFaculty.map((f) => {
              const initials = f.name
                .replace(/^(Dr\.|Mr\.|Ms\.)\s*/, "")
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("");
              return (
                <div key={f.slug} className="card">
                  <div className="avatar">{initials}</div>
                  <div style={{ marginTop: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, color: "var(--navy-deep)", lineHeight: 1.3 }}>{f.name}</div>
                  <div className="badge badge-orange" style={{ marginTop: 8 }}>{f.designation}</div>
                  <div style={{ marginTop: 6, fontSize: 12, color: "var(--text-muted)" }}>{f.qualification}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── GALLERY PREVIEW ─── */}
      <section className="section">
        <div className="container-page">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
            <div>
              <div className="eyebrow">Gallery</div>
              <h2 className="section-title">Life at CSE, GIST</h2>
            </div>
            <Link to="/gallery" style={{ color: "var(--gist-orange)", fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
              View Gallery <ArrowRight size={14} />
            </Link>
          </div>

          <div className="gallery-grid">
            {GALLERY_IMAGES.slice(0, 3).map((img, i) => (
              <div key={i} className="gallery-item">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="gallery-img"
                />
                <div style={{ padding: "12px 16px", fontSize: 13, color: "var(--text-muted)", fontStyle: "italic" }}>
                  {img.alt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI CTA ─── */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="container-page">
          <div
            style={{
              background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 60%, #1A4A90 100%)",
              borderRadius: "var(--radius-xl)",
              padding: "clamp(32px, 5vw, 64px) clamp(24px, 5vw, 64px)",
              color: "#fff",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "relative", maxWidth: 600 }}>
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(255,255,255,0.1)", borderRadius: 999,
                  padding: "5px 14px", fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-soft)",
                  marginBottom: 16,
                }}
              >
                <Sparkles size={12} /> AI Assistant
              </div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
                Ask anything about the CSE department.
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, marginBottom: 28 }}>
                "Who is the HOD?" · "Show me the syllabus" · "What labs do you have?" · "What research areas?" — the AI assistant answers instantly using official department information.
              </p>
              <button
                onClick={openAIChatWidget}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 32px", borderRadius: 999,
                  background: "var(--gist-orange)", color: "#fff",
                  fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer",
                  transition: "var(--transition)",
                }}
              >
                Open AI Assistant <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
