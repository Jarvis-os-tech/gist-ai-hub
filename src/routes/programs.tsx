import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { SYLLABI, PROGRAMMES } from "@/lib/department-data";
import { ExternalLink, FileText } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs & Course Structure — Department of CSE, GIST" },
      {
        name: "description",
        content:
          "B.Tech (RG23, RG22) course structure and syllabus for the Department of Computer Science & Engineering at GIST, Nellore.",
      },
    ],
  }),
  component: ProgramsPage,
});

function PdLink({ label, url, index, reduce }: { label: string; url: string; index: number; reduce: boolean | null }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "16px 20px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        color: "var(--text-body)",
        textDecoration: "none",
        transition: "var(--transition)",
        boxShadow: "var(--shadow-sm)",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--gist-orange)";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "var(--radius-sm)",
          background: "var(--gist-orange-10)",
          display: "grid",
          placeItems: "center",
          color: "var(--gist-orange)",
          flexShrink: 0,
        }}
      >
        <FileText size={18} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--navy-deep)" }}>{label}</div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
          Click to view PDF
        </div>
      </div>
      <ExternalLink size={15} color="var(--gist-orange)" />
    </motion.a>
  );
}

function ProgramsPage() {
  const reduce = useReducedMotion();

  return (
    <PageShell
      eyebrow="Academics"
      title="Course Structure & Syllabus"
      description="Download the complete course structure and syllabus for B.Tech (CSE) programme offered by the Department of Computer Science & Engineering at GIST."
      crumbs={[{ label: "Programs" }]}
    >
      <div className="container-page" style={{ paddingTop: 40, paddingBottom: 72 }}>
        {/* Programme Cards — staggered */}
        <div
          style={{
            display: "grid",
            gap: 20,
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            marginBottom: 56,
          }}
        >
          {PROGRAMMES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)",
                borderRadius: "var(--radius-xl)",
                padding: "28px",
                color: "#fff",
              }}
            >
              <div
                className="badge badge-orange"
                style={{
                  marginBottom: 14,
                  background: "rgba(228,92,4,0.2)",
                  color: "var(--gold-soft)",
                }}
              >
                {p.level}
              </div>
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#fff",
                  lineHeight: 1.3,
                }}
              >
                {p.title}
              </h2>
              <div style={{ marginTop: 16, display: "flex", gap: 24 }}>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    Duration
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginTop: 2 }}>{p.duration}</div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    Intake
                  </div>
                  <div
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 28,
                      color: "var(--gold-soft)",
                    }}
                  >
                    {p.intake}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* B.Tech Syllabus */}
        <div style={{ marginBottom: 48 }}>
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 24,
              paddingBottom: 16,
              borderBottom: "2px solid var(--gist-orange)",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "var(--radius-md)",
                background: "var(--gist-orange)",
                display: "grid",
                placeItems: "center",
                color: "#fff",
              }}
            >
              <FileText size={20} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "var(--navy-deep)",
                }}
              >
                B.Tech — CSE Syllabus
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                Bachelor of Technology in Computer Science & Engineering
              </div>
            </div>
          </motion.div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SYLLABI.btech.map((s, i) => (
              <PdLink key={s.label} label={s.label} url={s.pdfUrl} index={i} reduce={reduce} />
            ))}
          </div>
        </div>

        {/* Note */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 48,
            padding: "20px 24px",
            background: "var(--gist-orange-10)",
            border: "1px solid var(--gist-orange)",
            borderRadius: "var(--radius-md)",
            borderLeft: "4px solid var(--gist-orange)",
          }}
        >
          <div
            style={{ fontWeight: 600, color: "var(--gist-orange)", marginBottom: 6, fontSize: 14 }}
          >
            Note
          </div>
          <div style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.7 }}>
            The department is affiliated to Jawaharlal Nehru Technological University, Anantapuramu
            (JNTUA) and approved by AICTE, New Delhi. For academic regulations and course details,
            please refer to the official{" "}
            <a
              href="https://gist.edu.in/gist/computer-science-and-engineering/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--gist-orange)", fontWeight: 600 }}
            >
              GIST CSE website ↗
            </a>
            .
          </div>
        </motion.div>
      </div>
    </PageShell>
  );
}
