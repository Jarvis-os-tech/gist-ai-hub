import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ROLL_OF_HONOUR, DEPARTMENT } from "@/lib/department-data";
import { Trophy, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "Roll of Honour & Placements — Department of CSE, GIST" },
      {
        name: "description",
        content:
          "Roll of Honour — batch toppers from 2008–2023, and placement information for the CSE Department at Geethanjali Institute of Science & Technology.",
      },
    ],
  }),
  component: PlacementsPage,
});

function PlacementsPage() {
  return (
    <PageShell
      eyebrow="Achievements"
      title="Roll of Honour"
      description="Recognising the highest-achieving students of the Department of Computer Science & Engineering at GIST — batch toppers from 2008 to 2023."
      crumbs={[{ label: "Placements & Honour" }]}
    >
      <div className="container-page" style={{ paddingTop: 40, paddingBottom: 72 }}>
        {/* Trophy Banner */}
        <div
          style={{
            display: "flex", alignItems: "center", gap: 20,
            padding: "28px 32px",
            background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy-light) 100%)",
            borderRadius: "var(--radius-xl)",
            marginBottom: 48, color: "#fff",
          }}
        >
          <div
            style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "var(--gist-orange)",
              display: "grid", placeItems: "center", flexShrink: 0,
            }}
          >
            <Trophy size={28} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#fff", lineHeight: 1.2 }}>
              Roll of Honour — CSE Department
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", marginTop: 6 }}>
              Recognising academic excellence across {ROLL_OF_HONOUR.length} graduating batches (2008–2023)
            </p>
          </div>
        </div>

        {/* Roll of Honour Table */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ overflowX: "auto", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Batch</th>
                  <th>Roll No.</th>
                  <th>Name</th>
                  <th>Overall % / CGPA</th>
                </tr>
              </thead>
              <tbody>
                {ROLL_OF_HONOUR.map((r) => (
                  <tr key={r.sno}>
                    <td>{r.sno}</td>
                    <td>
                      <span style={{ fontWeight: 600, color: "var(--gist-orange)" }}>{r.batch}</span>
                    </td>
                    <td style={{ fontFamily: "monospace", fontSize: 13 }}>{r.rollNo}</td>
                    <td style={{ fontWeight: 700, color: "var(--navy-deep)" }}>{r.name}</td>
                    <td>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 14px",
                          background: "var(--gist-orange-10)",
                          color: "var(--gist-orange)",
                          borderRadius: 999,
                          fontWeight: 700,
                          fontSize: 14,
                        }}
                      >
                        {r.cgpa}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Placements CTA */}
        <div
          style={{
            display: "grid", gap: 20,
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {[
            {
              title: "Carving Careers",
              desc: "GIST's dedicated placement cell helping students build careers in top IT companies.",
              url: "https://gist.edu.in/gist/carving-careers/",
            },
            {
              title: "Recruiters at GIST",
              desc: "Top companies that have recruited students from GIST — TCS, Wipro, Infosys, and more.",
              url: "https://gist.edu.in/gist/recruiters-at-gist/",
            },
            {
              title: "Placement Record",
              desc: "Year-wise placement statistics and records of the institution.",
              url: "https://gist.edu.in/gist/placement-record/",
            },
            {
              title: "Employability Skills Training",
              desc: "Training programmes to enhance student employability and technical skills.",
              url: "https://gist.edu.in/gist/employability-skills-training/",
            },
          ].map(({ title, desc, url }) => (
            <a
              key={title}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <div
                className="card"
                style={{ height: "100%", cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "var(--navy-deep)" }}>{title}</h3>
                  <ExternalLink size={14} color="var(--gist-orange)" />
                </div>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </PageShell>
  );
}