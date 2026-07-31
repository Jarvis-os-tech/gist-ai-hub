import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  Users,
  FlaskConical,
  Award,
  BookOpen,
  ChevronRight,
  Download,
  Calendar,
  Image,
  Mail,
  ExternalLink,
} from "lucide-react";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { openAIChatWidget } from "@/components/site/AIChatWidget";
import { GistSpotlight } from "@/components/site/GistSpotlight";
import { Testimonials } from "@/components/site/Testimonials";
import {
  DEPARTMENT,
  QUICK_LINKS,
  PROGRAMMES,
  FACULTY,
} from "@/lib/department-data";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { GlassCard, GradientOrb, ParticleField } from "@/components/animations/GlassCard";
import { FacultyAvatar } from "@/components/ui/FacultyAvatar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GIST CSE Department — Computer Science & Engineering" },
      {
        name: "description",
        content:
          "Official portal of the Department of Computer Science & Engineering at Geethanjali Institute of Science & Technology, Nellore — Established 2008, 49 faculty, 8 modern labs including NVIDIA AI Lab.",
      },
    ],
  }),
  component: HomePage,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setVal(to);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const duration = 1600;
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
  }, [to, reduce]);

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

/** Splits text into words and animates each word with a staggered rise-and-fade */
function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className} style={{ display: "inline" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={reduce ? false : { opacity: 0, y: 30, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            delay: 0.2 + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function HomePage() {
  const topFaculty = FACULTY.slice(0, 6);
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Parallax for hero image
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroScrollProgress, [0, 1], ["0%", "30%"]);
  const heroImageScale = useTransform(heroScrollProgress, [0, 1], [1, 1.15]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      {/* Ambient particle background */}
      {!reduce && <ParticleField quantity={15} />}

      <SiteHeader />

      {/* ─── CINEMATIC HERO WITH PARALLAX ─── */}
      <section className="hero" ref={heroRef} style={{ overflow: "hidden" }}>
        {/* Parallax background image */}
        <motion.img
          src={DEPARTMENT.bannerUrl}
          alt="GIST CSE Department"
          className="hero-bg"
          style={{
            y: reduce ? 0 : heroImageY,
            scale: reduce ? 1 : heroImageScale,
          }}
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = "none";
          }}
        />
        <div className="hero-overlay" />
        <div className="hero-mesh" />

        {/* Floating gradient orbs */}
        {!reduce && (
          <>
            <GradientOrb color="rgba(228, 92, 4, 0.12)" size={500} className="hero-orb" style={{ top: "-10%", right: "-5%" }} />
            <GradientOrb color="rgba(212, 175, 55, 0.08)" size={400} className="hero-orb" style={{ bottom: "-15%", left: "-5%" }} delay={-7} />
            <GradientOrb color="rgba(30, 62, 98, 0.1)" size={350} className="hero-orb" style={{ top: "40%", left: "60%" }} delay={-14} />
          </>
        )}

        <div className="container-page" style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <div className="hero-content">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="hero-badge">
                <div className="hero-badge-dot" />
                Est. {DEPARTMENT.established} — NAAC A+ Grade — NBA Accredited
              </div>
            </motion.div>

            {/* Word-by-word staggered headline reveal */}
            <h1 className="hero-title">
              <WordReveal text="Department of Computer Science" />
              <br />
              <WordReveal text="& Engineering," />
              {" "}
              <motion.span
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "inline-block" }}
              >
                <span>GIST</span>
              </motion.span>
            </h1>

            <motion.p
              className="hero-desc"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {DEPARTMENT.about[0]}
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              {[
                { to: "/about", label: "Explore Department", icon: <ArrowRight size={15} />, cls: "btn btn-secondary" },
                { to: "/faculty", label: "Meet 49 Faculty", cls: "btn btn-ghost" },
              ].map((btn, i) => (
                <motion.div
                  key={btn.to}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 + i * 0.12 }}
                  whileHover={reduce ? {} : { y: -3 }}
                >
                  <Link to={btn.to} className={btn.cls}>
                    {btn.label} {btn.icon}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.74 }}
                whileHover={reduce ? {} : { y: -3 }}
              >
                <button onClick={openAIChatWidget} className="btn btn-primary">
                  <Sparkles size={15} /> Ask AI Assistant
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── ENHANCED STATS BAR ─── */}
      <RevealOnScroll>
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
              { label: "Annual Intake", value: DEPARTMENT.stats.studentIntakeUG, icon: GraduationCap },
              { label: "Laboratories", value: DEPARTMENT.stats.laboratories, icon: FlaskConical },
              { label: "Years of Excellence", value: DEPARTMENT.stats.yearsOfExcellence, icon: Award },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="stat-item"
                style={{ borderRight: "1px solid var(--border)" }}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="stat-icon">
                  <s.icon size={22} />
                </div>
                <div>
                  <div className="stat-value">
                    <Counter to={s.value} />+
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      {/* ─── QUICK ACCESS — BENTO GRID ─── */}
      <RevealOnScroll>
        <section className="section">
          <div className="container-page">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
                marginBottom: 40,
              }}
            >
              <div>
                <div className="eyebrow">Quick Access</div>
                <h2 className="section-title">
                  Everything about the department,
                  <br />
                  in one click.
                </h2>
              </div>
              <button
                onClick={openAIChatWidget}
                style={{
                  fontSize: 14,
                  color: "var(--gist-orange)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontWeight: 600,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
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
              {QUICK_LINKS.map((q, i) => {
                const Icon = ICON_MAP[q.icon] || BookOpen;
                return (
                  <motion.div
                    key={q.to}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <Link to={q.to} style={{ textDecoration: "none" }}>
                      <div className="card card-glow" style={{ height: "100%", cursor: "pointer" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 12,
                          }}
                        >
                          <div
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 10,
                              background: "var(--gist-orange-subtle)",
                              display: "grid",
                              placeItems: "center",
                              color: "var(--gist-orange)",
                              transition: "all 0.3s ease",
                            }}
                          >
                            <Icon size={18} />
                          </div>
                          <ChevronRight size={16} color="var(--text-muted)" />
                        </div>
                        <h3
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: 17,
                            color: "var(--navy-deep)",
                            marginBottom: 6,
                          }}
                        >
                          {q.title}
                        </h3>
                        <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.55 }}>
                          {q.desc}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ─── HOD MESSAGE + PROGRAMMES ─── */}
      <RevealOnScroll>
        <section className="section section-alt">
          <div
            className="container-page"
            style={{
              display: "grid",
              gap: 48,
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            {/* HOD */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="eyebrow">From the HOD</div>
              <h2 className="section-title">A department that molds tomorrow's technocrats.</h2>
              <p
                style={{ marginTop: 16, color: "var(--text-muted)", lineHeight: 1.75, fontSize: 15 }}
              >
                {DEPARTMENT.about[1]}
              </p>
              <p
                style={{ marginTop: 12, color: "var(--text-muted)", lineHeight: 1.75, fontSize: 15 }}
              >
                {DEPARTMENT.about[2]}
              </p>
              <div className="hod-card" style={{ marginTop: 24 }}>
                <FacultyAvatar src={DEPARTMENT.hod.photoUrl} name={DEPARTMENT.hod.name} size={64} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>
                    {DEPARTMENT.hod.name}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>
                    {DEPARTMENT.hod.designation}
                  </div>
                  <a
                    href={`mailto:${DEPARTMENT.hod.email}`}
                    style={{
                      fontSize: 13,
                      color: "var(--gold-soft)",
                      marginTop: 4,
                      display: "block",
                      textDecoration: "none",
                    }}
                  >
                    {DEPARTMENT.hod.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Programmes */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="eyebrow">Programmes</div>
              <h2 className="section-title">Undergraduate Academic Offerings.</h2>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                {PROGRAMMES.map((p, i) => (
                  <motion.div
                    key={p.title}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div
                      className="card card-glow"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 16,
                        cursor: "default",
                      }}
                    >
                      <div>
                        <div className="badge badge-orange" style={{ marginBottom: 8 }}>
                          {p.level}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: 17,
                            color: "var(--navy-deep)",
                            fontWeight: 600,
                          }}
                        >
                          {p.title}
                        </div>
                        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
                          {p.duration}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: 32,
                            fontWeight: 700,
                            color: "var(--gist-orange)",
                          }}
                        >
                          {p.intake}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "var(--text-muted)",
                          }}
                        >
                          Intake
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div style={{ marginTop: 16 }}>
                <Link
                  to="/programs"
                  style={{
                    color: "var(--gist-orange)",
                    fontSize: 14,
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    textDecoration: "none",
                  }}
                >
                  View Course Structure & Syllabus <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ─── VISION & MISSION ─── */}
      <RevealOnScroll>
        <section className="section">
          <div className="container-page">
            <div
              style={{
                display: "grid",
                gap: 48,
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              }}
            >
              <div>
                <div className="eyebrow">Vision</div>
                <h2 className="section-title">Our North Star</h2>
                <div
                  style={{
                    marginTop: 20,
                    padding: "28px 32px",
                    background: "var(--navy-deep)",
                    borderRadius: "var(--radius-xl)",
                    color: "#fff",
                    fontStyle: "italic",
                    fontSize: 16,
                    lineHeight: 1.75,
                    borderLeft: "4px solid var(--gist-orange)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-50%",
                      right: "-30%",
                      width: "200%",
                      height: "200%",
                      background: "radial-gradient(circle, rgba(228, 92, 4, 0.06) 0%, transparent 60%)",
                      pointerEvents: "none",
                    }}
                  />
                  <span style={{ position: "relative", zIndex: 1 }}>
                    "{DEPARTMENT.vision}"
                  </span>
                </div>
              </div>
              <div>
                <div className="eyebrow">Mission</div>
                <h2 className="section-title">What We Stand For</h2>
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    listStyle: "none",
                  }}
                >
                  {DEPARTMENT.mission.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={reduce ? false : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: 14,
                          padding: "16px 18px",
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-md)",
                          alignItems: "flex-start",
                          transition: "all 0.3s ease",
                        }}
                        onMouseOver={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--gist-orange)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                        }}
                        onMouseOut={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                      >
                        <span
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "var(--gist-orange)",
                            color: "#fff",
                            display: "grid",
                            placeItems: "center",
                            fontSize: 13,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {i + 1}
                        </span>
                        <span style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.65 }}>
                          {m}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ─── FACULTY PREVIEW — SPLIT LAYOUT ─── */}
      <RevealOnScroll>
        <section className="section section-alt">
          <div className="container-page">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
                marginBottom: 36,
              }}
            >
              <div>
                <div className="eyebrow">Faculty</div>
                <h2 className="section-title">Experienced educators & researchers.</h2>
              </div>
              <Link
                to="/faculty"
                style={{
                  fontSize: 14,
                  color: "var(--gist-orange)",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  textDecoration: "none",
                }}
              >
                All {DEPARTMENT.stats.faculty} members <ArrowRight size={14} />
              </Link>
            </div>

            {/* Faculty Grid Cards */}
            <div
              style={{
                display: "grid",
                gap: 20,
                gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
              }}
            >
              {topFaculty.map((f, i) => (
                <motion.div
                  key={f.slug}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <div className="card card-glow" style={{ cursor: "default" }}>
                    <FacultyAvatar src={f.photoUrl} name={f.name} size={56} />
                    <div
                      style={{
                        marginTop: 14,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 16,
                        fontWeight: 700,
                        color: "var(--navy-deep)",
                        lineHeight: 1.3,
                      }}
                    >
                      {f.name}
                    </div>
                    <div className="badge badge-orange" style={{ marginTop: 8 }}>
                      {f.designation}
                    </div>
                    <div style={{ marginTop: 6, fontSize: 12, color: "var(--text-muted)" }}>
                      {f.qualification}
                    </div>
                    {f.profileUrl && (
                      <div style={{ marginTop: 12 }}>
                        <a
                          href={f.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: 12,
                            color: "var(--gist-orange)",
                            fontWeight: 600,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          View Profile <ExternalLink size={11} />
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View all CTA */}
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <Link to="/faculty" className="btn btn-outline">
                View All {DEPARTMENT.stats.faculty} Faculty Members <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ─── ALUMNI & STUDENT TESTIMONIALS ─── */}
      <Testimonials />

      {/* ─── AI CTA — GLASS CARD ─── */}
      <RevealOnScroll>
        <section style={{ padding: "0 0 80px" }}>
          <div className="container-page">
            <GlassCard
              glow
              hoverEffect="lift"
              className="!p-0 !bg-transparent !backdrop-blur-none !border-none !shadow-none"
            >
              <div
                style={{
                  background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 60%, #1A4A90 100%)",
                  borderRadius: "var(--radius-xl)",
                  padding: "clamp(32px, 5vw, 64px) clamp(24px, 5vw, 64px)",
                  color: "#fff",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(11, 25, 44, 0.3)",
                }}
              >
                {!reduce && (
                  <GradientOrb color="rgba(228, 92, 4, 0.1)" size={400} className="hero-orb" style={{ top: "-30%", right: "-10%" }} />
                )}
                <div style={{ position: "relative", maxWidth: 600 }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: 999,
                      padding: "5px 14px",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--gold-soft)",
                      marginBottom: 16,
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    <Sparkles size={12} /> AI Assistant
                  </div>
                  <h2
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
                      fontWeight: 800,
                      color: "#fff",
                      lineHeight: 1.15,
                      marginBottom: 16,
                    }}
                  >
                    Ask anything about the CSE department.
                  </h2>
                  <p
                    style={{
                      fontSize: 15,
                      color: "rgba(255,255,255,0.78)",
                      lineHeight: 1.7,
                      marginBottom: 28,
                    }}
                  >
                    "Who is the HOD?" — "Show me the syllabus" — "What labs do you have?" — "What
                    research areas?" — the AI assistant answers instantly using official department
                    information.
                  </p>
                  <button
                    onClick={openAIChatWidget}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "14px 32px",
                      borderRadius: 999,
                      background: "var(--gist-orange)",
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 8px 24px rgba(228, 92, 4, 0.4)",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(228, 92, 4, 0.5)";
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(228, 92, 4, 0.4)";
                    }}
                  >
                    Open AI Assistant <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </RevealOnScroll>

      <SiteFooter />
    </div>
  );
}
