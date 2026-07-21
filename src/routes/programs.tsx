import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { SYLLABI, PROGRAMMES } from "@/lib/department-data";
import { ExternalLink, FileText } from "lucide-react";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs & Course Structure — Department of CSE, GIST" },
      {
        name: "description",
        content:
          "B.Tech (RG23, RG22) and M.Tech (PRG25) course structure and syllabus for the Department of Computer Science & Engineering at GIST, Nellore.",
      },
    ],
  }),
  component: ProgramsPage,
});

function PdLink({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "16px 20px",
        background: "var(--surface)", border: "1px solid var(--border)",
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
          width: 40, height: 40, borderRadius: "var(--radius-sm)",
          background: "var(--gist-orange-10)", display: "grid", placeItems: "center",
          color: "var(--gist-orange)", flexShrink: 0,
        }}
      >
        <FileText size={18} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--navy-deep)" }}>{label}</div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Click to view PDF</div>
      </div>
      <ExternalLink size={15} color="var(--gist-orange)" />
    </a>
  );
}

function ProgramsPage() {
  return (
    <PageShell
      eyebrow="Academics"
      title="Course Structure & Syllabus"
      description="Download the complete course structure and syllabus for B.Tech (CSE) and M.Tech (CSE) programmes offered by the Department of Computer Science & Engineering at GIST."
      crumbs={[{ label: "Programs" }]}
    >
      <div className="container-page" style={{ paddingTop: 40, paddingBottom: 72 }}>

        {/* Programme Cards */}
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginBottom: 56 }}>
          {PROGRAMMES.map((p) => (
            <div
              key={p.title}
              style={{
                background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)",
                borderRadius: "var(--radius-xl)",
                padding: "28px",
                color: "#fff",
              }}
            >
              <div className="badge badge-orange" style={{ marginBottom: 14, background: "rgba(228,92,4,0.2)", color: "var(--gold-soft)" }}>
                {p.level}
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#fff", lineHeight: 1.3 }}>{p.title}</h2>
              <div style={{ marginTop: 16, display: "flex", gap: 24 }}>
                <div>
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)" }}>Duration</div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginTop: 2 }}>{p.duration}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)" }}>Intake</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "var(--gold-soft)" }}>{p.intake}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* B.Tech Syllabus */}
        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              display: "flex", alignItems: "center", gap: 14,
              marginBottom: 24, paddingBottom: 16,
              borderBottom: "2px solid var(--gist-orange)",
            }}
          >
            <div
              style={{
                width: 44, height: 44, borderRadius: "var(--radius-md)",
                background: "var(--gist-orange)", display: "grid", placeItems: "center", color: "#fff",
              }}
            >
              <FileText size={20} />
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "var(--navy-deep)", fontWeight: 700 }}>
                B.Tech — CSE Syllabus
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Bachelor of Technology in Computer Science & Engineering</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SYLLABI.btech.map((s) => (
              <PdLink key={s.label} label={s.label} url={s.pdfUrl} />
            ))}
          </div>
        </div>

        {/* M.Tech Syllabus */}
        <div>
          <div
            style={{
              display: "flex", alignItems: "center", gap: 14,
              marginBottom: 24, paddingBottom: 16,
              borderBottom: "2px solid var(--navy-deep)",
            }}
          >
            <div
              style={{
                width: 44, height: 44, borderRadius: "var(--radius-md)",
                background: "var(--navy-deep)", display: "grid", placeItems: "center", color: "#fff",
              }}
            >
              <FileText size={20} />
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "var(--navy-deep)", fontWeight: 700 }}>
                M.Tech — CSE Syllabus
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Master of Technology in Computer Science & Engineering</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SYLLABI.mtech.map((s) => (
              <PdLink key={s.label} label={s.label} url={s.pdfUrl} />
            ))}
          </div>
        </div>

        {/* Note */}
        <div
          style={{
            marginTop: 48, padding: "20px 24px",
            background: "var(--gist-orange-10)", border: "1px solid var(--gist-orange)",
            borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--gist-orange)",
          }}
        >
          <div style={{ fontWeight: 600, color: "var(--gist-orange)", marginBottom: 6, fontSize: 14 }}>Note</div>
          <div style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.7 }}>
            The department is affiliated to Jawaharlal Nehru Technological University, Anantapuramu (JNTUA) and approved by AICTE, New Delhi.
            For academic regulations and course details, please refer to the official{" "}
            <a href="https://gist.edu.in/gist/computer-science-and-engineering/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gist-orange)", fontWeight: 600 }}>
              GIST CSE website ↗
            </a>.
          </div>
        </div>
      </div>
    </PageShell>
  );
}