import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { DEPARTMENT, FACULTY } from "@/lib/department-data";
import { ExternalLink, Mail } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty — Department of CSE, GIST" },
      {
        name: "description",
        content:
          "Meet all 49 faculty members of the Department of Computer Science & Engineering at GIST — professors, associate and assistant professors with their qualifications and profiles.",
      },
    ],
  }),
  component: FacultyPage,
});

const ROLES = ["All", "Professor & HoD", "Professor", "Associate Professor", "Assistant Professor"] as const;

function FacultyPage() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState<(typeof ROLES)[number]>("All");

  const list = useMemo(() => {
    return FACULTY.filter((f) => {
      const roleOk = role === "All" || f.designation === role;
      const qOk =
        q.trim() === "" ||
        (f.name + f.qualification + f.designation).toLowerCase().includes(q.toLowerCase());
      return roleOk && qOk;
    });
  }, [q, role]);

  return (
    <PageShell
      eyebrow="People"
      title="Faculty of Computer Science & Engineering"
      description={`${DEPARTMENT.stats.faculty} qualified and experienced educators and researchers driving excellence across UG and PG programs at GIST.`}
      crumbs={[{ label: "Faculty" }]}
    >
      <div className="container-page" style={{ paddingTop: 40, paddingBottom: 72 }}>
        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ROLES.map((r) => (
              <button
                key={r}
                id={`filter-${r.replace(/\s/g, "-").toLowerCase()}`}
                onClick={() => setRole(r)}
                className={`filter-btn${role === r ? " active" : ""}`}
              >
                {r}
              </button>
            ))}
          </div>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: 14 }}>🔍</span>
            <input
              id="faculty-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or qualification…"
              className="search-input"
            />
          </div>
        </div>

        {/* Count */}
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
          Showing <strong style={{ color: "var(--navy-deep)" }}>{list.length}</strong> of {FACULTY.length} faculty members
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {list.map((f) => {
            const initials = f.name
              .replace(/^(Dr\.|Mr\.|Ms\.)\s*/, "")
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("");
            return (
              <article key={f.slug} className="card">
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div className="avatar">{initials}</div>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "var(--navy-deep)", lineHeight: 1.3 }}>{f.name}</h3>
                    <div className="badge badge-orange" style={{ marginTop: 6 }}>{f.designation}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 5 }}>{f.qualification}</div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 16, paddingTop: 14,
                    borderTop: "1px solid var(--border)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    fontSize: 12,
                  }}
                >
                  <span style={{ color: "var(--text-muted)" }}>S.No. {f.sno}</span>
                  {f.profileUrl ? (
                    <a
                      href={f.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--gist-orange)", display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 600, textDecoration: "none" }}
                    >
                      Profile <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span style={{ color: "var(--text-subtle)" }}>—</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {list.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-muted)" }}>
            No faculty members match your search.
          </div>
        )}

        {/* HOD Contact */}
        <div
          className="card"
          style={{
            marginTop: 48,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            background: "var(--surface-2)",
          }}
        >
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "var(--navy-deep)" }}>Reach the department</div>
            <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4 }}>
              Write to the HoD for academic, research, or partnership queries.
            </div>
          </div>
          <a
            href={`mailto:${DEPARTMENT.contact.email}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "11px 24px", borderRadius: 999,
              background: "var(--gist-orange)", color: "#fff",
              fontSize: 14, fontWeight: 600, textDecoration: "none",
            }}
          >
            <Mail size={15} /> {DEPARTMENT.contact.email}
          </a>
        </div>
      </div>
    </PageShell>
  );
}