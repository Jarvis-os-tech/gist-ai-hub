import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { DEPARTMENT } from "@/lib/department-data";
import { CheckCircle2, Target, Trophy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { GlassCard, GradientOrb } from "@/components/animations/GlassCard";
import { FacultyAvatar } from "@/components/ui/FacultyAvatar";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Department of CSE, GIST" },
      {
        name: "description",
        content:
          "Learn about the Department of Computer Science & Engineering at Geethanjali Institute of Science & Technology — history, vision, mission, PEOs, POs and PSOs.",
      },
    ],
  }),
  component: AboutPage,
});

const TABS = ["Overview", "Vision & Mission", "PEOs", "POs", "PSOs"] as const;
type Tab = (typeof TABS)[number];

function AboutPage() {
  const [tab, setTab] = useState<Tab>("Overview");
  const reduce = useReducedMotion();

  return (
    <PageShell
      eyebrow="Department"
      title="About the CSE Department"
      description="Established in 2008, the Department of Computer Science & Engineering at GIST has grown into a premier academic hub with 49 faculty, 420 UG seats and cutting-edge research."
      crumbs={[{ label: "About" }]}
    >
      <div className="container-page" style={{ paddingTop: 40, paddingBottom: 72 }}>
        {/* Tab Nav */}
        <motion.div
          className="tabs-list"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {TABS.map((t) => (
            <button
              key={t}
              id={`about-tab-${t.replace(/\s/g, "-").toLowerCase()}`}
              className={`tab-trigger${tab === t ? " active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </motion.div>

        {/* Tab Content with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === "Overview" && (
              <div
                style={{
                  display: "grid",
                  gap: 48,
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                }}
              >
                <div>
                  <motion.h2
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 26,
                      color: "var(--navy-deep)",
                      marginBottom: 20,
                    }}
                  >
                    Department Overview
                  </motion.h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {DEPARTMENT.about.map((para, i) => (
                      <motion.p
                        key={i}
                        initial={reduce ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.75 }}
                      >
                        {para}
                      </motion.p>
                    ))}
                  </div>

                  {/* Memberships */}
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginTop: 32 }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: 18,
                        color: "var(--navy-deep)",
                        marginBottom: 14,
                      }}
                    >
                      Institution Memberships & Chapters
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                      {DEPARTMENT.memberships.map((m, i) => (
                        <motion.span
                          key={m}
                          className="badge badge-navy"
                          style={{ padding: "6px 16px", fontSize: 13 }}
                          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {m}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <div>
                  {/* HOD Card with GradientOrb */}
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: "relative", marginBottom: 24 }}
                  >
                    {!reduce && (
                      <GradientOrb
                        color="rgba(228, 92, 4, 0.08)"
                        size={300}
                        style={{ top: "-20%", right: "-10%", position: "absolute" }}
                      />
                    )}
                    <div
                      style={{
                        background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)",
                        borderRadius: "var(--radius-xl)",
                        padding: 28,
                        color: "#fff",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          color: "var(--gold-soft)",
                          marginBottom: 16,
                        }}
                      >
                        Head of Department
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <FacultyAvatar src={DEPARTMENT.hod.photoUrl} name={DEPARTMENT.hod.name} size={64} />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 18 }}>{DEPARTMENT.hod.name}</div>
                          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>
                            {DEPARTMENT.hod.designation}
                          </div>
                          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
                            {DEPARTMENT.hod.qualification}
                          </div>
                          <a
                            href={`mailto:${DEPARTMENT.hod.email}`}
                            style={{
                              fontSize: 13,
                              color: "var(--gold-soft)",
                              marginTop: 6,
                              display: "block",
                            }}
                          >
                            {DEPARTMENT.hod.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Quick Stats — staggered */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[
                      { label: "Established", value: DEPARTMENT.established },
                      { label: "UG Intake", value: `${DEPARTMENT.stats.studentIntakeUG} seats` },
                      { label: "PG Intake", value: `${DEPARTMENT.stats.studentIntakePG} seats` },
                      { label: "Faculty", value: `${DEPARTMENT.stats.faculty} members` },
                      { label: "Laboratories", value: `${DEPARTMENT.stats.laboratories} labs` },
                      { label: "Affiliation", value: "JNTUA" },
                    ].map(({ label, value }, i) => (
                      <motion.div
                        key={label}
                        className="card"
                        style={{ padding: 16 }}
                        initial={reduce ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div
                          style={{
                            fontSize: 11,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "var(--text-muted)",
                            marginBottom: 4,
                          }}
                        >
                          {label}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 700,
                            fontSize: 20,
                            color: "var(--navy-deep)",
                          }}
                        >
                          {value}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "Vision & Mission" && (
              <div
                style={{
                  display: "grid",
                  gap: 40,
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                }}
              >
                <motion.div
                  initial={reduce ? false : { opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--gist-orange)",
                      marginBottom: 14,
                    }}
                  >
                    Vision
                  </div>
                  <h2
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 24,
                      color: "var(--navy-deep)",
                      marginBottom: 20,
                    }}
                  >
                    Our North Star
                  </h2>
                  <div
                    style={{
                      padding: 28,
                      background: "var(--navy-deep)",
                      borderRadius: "var(--radius-xl)",
                      borderLeft: "4px solid var(--gist-orange)",
                      color: "#fff",
                      fontStyle: "italic",
                      fontSize: 16,
                      lineHeight: 1.8,
                    }}
                  >
                    "{DEPARTMENT.vision}"
                  </div>
                </motion.div>
                <div>
                  <motion.div
                    initial={reduce ? false : { opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "var(--gist-orange)",
                        marginBottom: 14,
                      }}
                    >
                      Mission
                    </div>
                    <h2
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: 24,
                        color: "var(--navy-deep)",
                        marginBottom: 20,
                      }}
                    >
                      What We Stand For
                    </h2>
                  </motion.div>
                  <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                    {DEPARTMENT.mission.map((m, i) => (
                      <motion.li
                        key={i}
                        initial={reduce ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          display: "flex",
                          gap: 14,
                          padding: "16px 18px",
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-md)",
                          alignItems: "flex-start",
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
                        <span style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.65 }}>
                          {m}
                        </span>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {tab === "PEOs" && (
              <div>
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ marginBottom: 28 }}
                >
                  <h2
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 24,
                      color: "var(--navy-deep)",
                    }}
                  >
                    Programme Educational Objectives
                  </h2>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8 }}>
                    PEOs describe the expected accomplishments of graduates within a few years after
                    graduation.
                  </p>
                </motion.div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {DEPARTMENT.peos.map((peo, i) => (
                    <motion.div
                      key={peo.id}
                      initial={reduce ? false : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        display: "flex",
                        gap: 20,
                        padding: "22px 24px",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-lg)",
                        alignItems: "flex-start",
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      <span
                        style={{
                          minWidth: 72,
                          padding: "6px 10px",
                          background: "var(--gist-orange)",
                          color: "#fff",
                          borderRadius: "var(--radius-sm)",
                          fontSize: 12,
                          fontWeight: 700,
                          textAlign: "center",
                          flexShrink: 0,
                        }}
                      >
                        {peo.id}
                      </span>
                      <span style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.7 }}>
                        {peo.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {tab === "POs" && (
              <div>
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ marginBottom: 28 }}
                >
                  <h2
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 24,
                      color: "var(--navy-deep)",
                    }}
                  >
                    Programme Outcomes
                  </h2>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8 }}>
                    POs describe the knowledge, skills and behaviour that students acquire by the end of
                    the program.
                  </p>
                </motion.div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {DEPARTMENT.pos.map((po, i) => (
                    <motion.div
                      key={po.id}
                      initial={reduce ? false : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        display: "flex",
                        gap: 20,
                        padding: "18px 22px",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          minWidth: 52,
                          padding: "4px 10px",
                          background: "var(--navy-deep)",
                          color: "#fff",
                          borderRadius: "var(--radius-sm)",
                          fontSize: 11,
                          fontWeight: 700,
                          textAlign: "center",
                          flexShrink: 0,
                        }}
                      >
                        {po.id}
                      </span>
                      <span style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.65 }}>
                        {po.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {tab === "PSOs" && (
              <div>
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ marginBottom: 28 }}
                >
                  <h2
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 24,
                      color: "var(--navy-deep)",
                    }}
                  >
                    Programme Specific Outcomes
                  </h2>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8 }}>
                    PSOs represent the unique competencies that graduates of this specific program will
                    possess.
                  </p>
                </motion.div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {DEPARTMENT.psos.map((pso, i) => (
                    <motion.div
                      key={pso.id}
                      initial={reduce ? false : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        display: "flex",
                        gap: 20,
                        padding: "22px 24px",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-lg)",
                        alignItems: "flex-start",
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      <span
                        style={{
                          minWidth: 72,
                          padding: "6px 10px",
                          background: "var(--gold)",
                          color: "#fff",
                          borderRadius: "var(--radius-sm)",
                          fontSize: 12,
                          fontWeight: 700,
                          textAlign: "center",
                          flexShrink: 0,
                        }}
                      >
                        {pso.id}
                      </span>
                      <span style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.7 }}>
                        {pso.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageShell>
  );
}
