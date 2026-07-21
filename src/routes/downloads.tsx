import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import {
  DEPT_CALENDAR, NEWSLETTERS, TECH_MAGAZINES,
  INTERNSHIPS, INDUSTRIAL_VISITS, MOUS,
} from "@/lib/department-data";
import { ExternalLink, FileText, Calendar, BookOpen, Building, Briefcase, Factory, Handshake } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads & Resources — Department of CSE, GIST" },
      {
        name: "description",
        content:
          "Download department calendars, newsletters (Techies Chronicle), tech magazines (Tech Spark), internship reports, MOUs, GDSC report and industrial visit reports — CSE Dept, GIST.",
      },
    ],
  }),
  component: DownloadsPage,
});

const SECTIONS = [
  { id: "calendar", label: "Dept. Calendar", icon: Calendar },
  { id: "newsletter", label: "Newsletter", icon: BookOpen },
  { id: "magazine", label: "Tech Magazine", icon: BookOpen },
  { id: "mou", label: "MOUs", icon: Handshake },
  { id: "internship", label: "Internships", icon: Briefcase },
  { id: "industrial", label: "Industrial Visits", icon: Factory },
  { id: "gdsc", label: "GDSC Report", icon: Building },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

function PdfRow({ label, url, sublabel }: { label: string; url: string; sublabel?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 18px",
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        textDecoration: "none",
        transition: "var(--transition)",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--gist-orange)";
        (e.currentTarget as HTMLElement).style.background = "var(--gist-orange-10)";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.background = "var(--surface)";
      }}
    >
      <FileText size={16} color="var(--gist-orange)" style={{ flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--navy-deep)" }}>{label}</div>
        {sublabel && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{sublabel}</div>}
      </div>
      <ExternalLink size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
    </a>
  );
}

function SectionCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div
        style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "18px 22px",
          background: "var(--navy-deep)", color: "#fff",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
        }}
      >
        <Icon size={18} />
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#fff" }}>{title}</h3>
      </div>
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {children}
      </div>
    </div>
  );
}

function DownloadsPage() {
  const [active, setActive] = useState<SectionId>("calendar");

  return (
    <PageShell
      eyebrow="Resources"
      title="Downloads & Resources"
      description="Department calendars, newsletters, tech magazines, MOUs, internship reports, industrial visits and GDSC report — all sourced from the official GIST CSE website."
      crumbs={[{ label: "Downloads" }]}
    >
      <div className="container-page" style={{ paddingTop: 40, paddingBottom: 72 }}>
        {/* Section tabs */}
        <div className="tabs-list" style={{ marginBottom: 36 }}>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              id={`dl-tab-${s.id}`}
              className={`tab-trigger${active === s.id ? " active" : ""}`}
              onClick={() => setActive(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {active === "calendar" && (
          <SectionCard title="Department Academic Calendar" icon={Calendar}>
            {DEPT_CALENDAR.map((c) => (
              <PdfRow key={c.ay} label={c.ay} url={c.pdfUrl} sublabel="Department Activity Calendar" />
            ))}
          </SectionCard>
        )}

        {active === "newsletter" && (
          <SectionCard title="Techies Chronicle — Newsletter" icon={BookOpen}>
            {NEWSLETTERS.map((n) => (
              <PdfRow key={n.pdfUrl} label={`${n.year} — ${n.vol}`} url={n.pdfUrl} sublabel="CSE Dept Newsletter" />
            ))}
          </SectionCard>
        )}

        {active === "magazine" && (
          <SectionCard title="Tech Spark — Technical Magazine" icon={BookOpen}>
            {TECH_MAGAZINES.map((m) => (
              <PdfRow key={m.pdfUrl} label={`${m.year} — ${m.issue}`} url={m.pdfUrl} sublabel="CSE Technical Magazine" />
            ))}
          </SectionCard>
        )}

        {active === "mou" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <a
                href="https://gist.edu.in/gist/wp-content/uploads/2024/08/MOU.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 20px", borderRadius: 999,
                  background: "var(--gist-orange)", color: "#fff",
                  fontSize: 13, fontWeight: 600, textDecoration: "none", marginBottom: 16,
                }}
              >
                <FileText size={14} /> View All MOUs (PDF)
              </a>
            </div>
            <div style={{ overflowX: "auto", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Company</th>
                    <th>Areas of Collaboration</th>
                    <th>Date Validity</th>
                    <th>PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {MOUS.map((m) => (
                    <tr key={m.sno}>
                      <td>{m.sno}.</td>
                      <td style={{ fontWeight: 600, color: "var(--navy-deep)" }}>{m.company}</td>
                      <td style={{ maxWidth: 300 }}>{m.areas}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{m.validity}</td>
                      <td>
                        <a href={m.pdfUrl} target="_blank" rel="noopener noreferrer" className="pdf-link">
                          View <ExternalLink size={12} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {active === "internship" && (
          <SectionCard title="Internship Reports" icon={Briefcase}>
            {INTERNSHIPS.map((c) => (
              <PdfRow key={c.ay} label={`Internships — ${c.ay}`} url={c.pdfUrl} sublabel="Student Internship Report" />
            ))}
          </SectionCard>
        )}

        {active === "industrial" && (
          <SectionCard title="Industrial Visit Reports" icon={Factory}>
            {INDUSTRIAL_VISITS.map((c) => (
              <PdfRow key={c.ay} label={`Industrial Visits — ${c.ay}`} url={c.pdfUrl} sublabel="Industrial Visit Report" />
            ))}
          </SectionCard>
        )}

        {active === "gdsc" && (
          <SectionCard title="GDSC Report" icon={Building}>
            <PdfRow
              label="GDSC Report — NBA"
              url="https://gist.edu.in/gist/wp-content/uploads/2024/08/GDSC-Report-NBA.pdf"
              sublabel="Google Developer Student Clubs Report"
            />
          </SectionCard>
        )}

        {/* Additional links */}
        <div
          style={{
            marginTop: 48, padding: "24px",
            background: "var(--surface-2)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "var(--navy-deep)", marginBottom: 14 }}>
            Additional Resources
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { label: "Student Paper & Poster Presentations", url: "https://gist.edu.in/gist/student-paper-and-poster-presentations-cse/" },
              { label: "Student Co-curricular Activities", url: "https://gist.edu.in/gist/student-other-co-curricular-activities-cse/" },
              { label: "Student Publications in Int'l Journals", url: "https://gist.edu.in/gist/student-publications-in-international-journals-cse/" },
            ].map(({ label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 16px", borderRadius: 999,
                  background: "var(--surface)", border: "1px solid var(--border)",
                  color: "var(--navy-deep)", fontSize: 13, fontWeight: 500, textDecoration: "none",
                  transition: "var(--transition)",
                }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gist-orange)"; (e.currentTarget as HTMLElement).style.color = "var(--gist-orange)"; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--navy-deep)"; }}
              >
                <ExternalLink size={12} /> {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}