import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { DEPARTMENT } from "@/lib/department-data";
import { useState } from "react";

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

  return (
    <PageShell
      eyebrow="Department"
      title="About the CSE Department"
      description="Established in 2008, the Department of Computer Science & Engineering at GIST has grown into a premier academic hub with 49 faculty, 420 UG seats and cutting-edge research."
      crumbs={[{ label: "About" }]}
    >
      <div className="container-page" style={{ paddingTop: 40, paddingBottom: 72 }}>
        {/* Tab Nav */}
        <div className="tabs-list">
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
        </div>

        {/* Tab Content */}
        {tab === "Overview" && (
          <div style={{ display: "grid", gap: 48, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "var(--navy-deep)", marginBottom: 20 }}>
                Department Overview
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {DEPARTMENT.about.map((para, i) => (
                  <p key={i} style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.75 }}>{para}</p>
                ))}
              </div>

              {/* Memberships */}
              <div style={{ marginTop: 32 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "var(--navy-deep)", marginBottom: 14 }}>
                  Institution Memberships & Chapters
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {DEPARTMENT.memberships.map((m) => (
                    <span key={m} className="badge badge-navy" style={{ padding: "6px 16px", fontSize: 13 }}>{m}</span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {/* HOD Card */}
              <div
                style={{
                  background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)",
                  borderRadius: "var(--radius-xl)",
                  padding: 28,
                  color: "#fff",
                  marginBottom: 24,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--gold-soft)", marginBottom: 16 }}>
                  Head of Department
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div className="hod-avatar">
                    {DEPARTMENT.hod.name.split(" ").filter(w => !["Dr.", "Mr.", "Ms."].includes(w)).map(w => w[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>{DEPARTMENT.hod.name}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{DEPARTMENT.hod.designation}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{DEPARTMENT.hod.qualification}</div>
                    <a href={`mailto:${DEPARTMENT.hod.email}`} style={{ fontSize: 13, color: "var(--gold-soft)", marginTop: 6, display: "block" }}>
                      {DEPARTMENT.hod.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { label: "Established", value: DEPARTMENT.established },
                  { label: "UG Intake", value: `${DEPARTMENT.stats.studentIntakeUG} seats` },
                  { label: "PG Intake", value: `${DEPARTMENT.stats.studentIntakePG} seats` },
                  { label: "Faculty", value: `${DEPARTMENT.stats.faculty} members` },
                  { label: "Laboratories", value: `${DEPARTMENT.stats.laboratories} labs` },
                  { label: "Affiliation", value: "JNTUA" },
                ].map(({ label, value }) => (
                  <div key={label} className="card" style={{ padding: 16 }}>
                    <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 4 }}>{label}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "var(--navy-deep)" }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "Vision & Mission" && (
          <div style={{ display: "grid", gap: 40, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--gist-orange)", marginBottom: 14 }}>Vision</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "var(--navy-deep)", marginBottom: 20 }}>Our North Star</h2>
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
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--gist-orange)", marginBottom: 14 }}>Mission</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "var(--navy-deep)", marginBottom: 20 }}>What We Stand For</h2>
              <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {DEPARTMENT.mission.map((m, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex", gap: 14, padding: "16px 18px",
                      background: "var(--surface)", border: "1px solid var(--border)",
                      borderRadius: "var(--radius-md)", alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: "var(--gist-orange)", color: "#fff",
                        display: "grid", placeItems: "center",
                        fontSize: 13, fontWeight: 700, flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.65 }}>{m}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {tab === "PEOs" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "var(--navy-deep)" }}>Programme Educational Objectives</h2>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8 }}>
                PEOs describe the expected accomplishments of graduates within a few years after graduation.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {DEPARTMENT.peos.map((peo) => (
                <div
                  key={peo.id}
                  style={{
                    display: "flex", gap: 20, padding: "22px 24px",
                    background: "var(--surface)", border: "1px solid var(--border)",
                    borderRadius: "var(--radius-lg)", alignItems: "flex-start",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <span
                    style={{
                      minWidth: 72, padding: "6px 10px",
                      background: "var(--gist-orange)", color: "#fff",
                      borderRadius: "var(--radius-sm)",
                      fontSize: 12, fontWeight: 700, textAlign: "center",
                      flexShrink: 0,
                    }}
                  >
                    {peo.id}
                  </span>
                  <span style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.7 }}>{peo.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "POs" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "var(--navy-deep)" }}>Programme Outcomes</h2>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8 }}>
                POs describe the knowledge, skills and behaviour that students acquire by the end of the program.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {DEPARTMENT.pos.map((po) => (
                <div
                  key={po.id}
                  style={{
                    display: "flex", gap: 20, padding: "18px 22px",
                    background: "var(--surface)", border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)", alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      minWidth: 52, padding: "4px 10px",
                      background: "var(--navy-deep)", color: "#fff",
                      borderRadius: "var(--radius-sm)",
                      fontSize: 11, fontWeight: 700, textAlign: "center",
                      flexShrink: 0,
                    }}
                  >
                    {po.id}
                  </span>
                  <span style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.65 }}>{po.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "PSOs" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "var(--navy-deep)" }}>Programme Specific Outcomes</h2>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8 }}>
                PSOs represent the unique competencies that graduates of this specific program will possess.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {DEPARTMENT.psos.map((pso) => (
                <div
                  key={pso.id}
                  style={{
                    display: "flex", gap: 20, padding: "22px 24px",
                    background: "var(--surface)", border: "1px solid var(--border)",
                    borderRadius: "var(--radius-lg)", alignItems: "flex-start",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <span
                    style={{
                      minWidth: 72, padding: "6px 10px",
                      background: "var(--gold)", color: "#fff",
                      borderRadius: "var(--radius-sm)",
                      fontSize: 12, fontWeight: 700, textAlign: "center",
                      flexShrink: 0,
                    }}
                  >
                    {pso.id}
                  </span>
                  <span style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.7 }}>{pso.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}