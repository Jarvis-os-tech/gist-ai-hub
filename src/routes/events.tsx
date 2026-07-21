import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { VOICE_COMMITTEE, VOICE_EVENTS } from "@/lib/department-data";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & VOICE Association — Department of CSE, GIST" },
      {
        name: "description",
        content:
          "CSE department events, seminars, workshops and VOICE student association — activities, committee, and event calendar.",
      },
    ],
  }),
  component: EventsPage,
});

const TABS = ["CSE Events", "VOICE Association"] as const;

function EventsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("CSE Events");

  return (
    <PageShell
      eyebrow="Activities"
      title="Events & VOICE Association"
      description="Department-level technical and cultural events, student association activities, seminars, workshops and coding contests organised by the CSE Department."
      crumbs={[{ label: "Events" }]}
    >
      <div className="container-page" style={{ paddingTop: 40, paddingBottom: 72 }}>
        <div className="tabs-list">
          {TABS.map((t) => (
            <button
              key={t}
              id={`events-tab-${t.replace(/\s/g, "-").toLowerCase()}`}
              className={`tab-trigger${tab === t ? " active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "CSE Events" && (
          <div>
            <div
              style={{
                display: "flex", gap: 20, flexWrap: "wrap",
                alignItems: "flex-start", marginBottom: 40,
              }}
            >
              <div
                className="card"
                style={{
                  flex: "1 1 320px",
                  background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)",
                  color: "#fff",
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold-soft)", marginBottom: 14 }}>
                  Department Events
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#fff", lineHeight: 1.3, marginBottom: 16 }}>
                  CSE Department Events Portal
                </h2>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 20 }}>
                  View all technical events, seminars, workshops, FDPs and student activities organised by the CSE Department on the official GIST portal.
                </p>
                <a
                  href="https://gist.edu.in/gist/cseevents/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "12px 24px", borderRadius: 999,
                    background: "var(--gist-orange)", color: "#fff",
                    fontSize: 14, fontWeight: 600, textDecoration: "none",
                  }}
                >
                  View All CSE Events <ExternalLink size={14} />
                </a>
              </div>

              <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Student Paper & Poster Presentations", url: "https://gist.edu.in/gist/student-paper-and-poster-presentations-cse/" },
                  { label: "Student Co-curricular Activities", url: "https://gist.edu.in/gist/student-other-co-curricular-activities-cse/" },
                  { label: "Student Publications (Int'l Journals)", url: "https://gist.edu.in/gist/student-publications-in-international-journals-cse/" },
                  { label: "GIST TechFest Events", url: "https://gist.edu.in/gist/cseevents/" },
                  { label: "GDSC Report NBA", url: "https://gist.edu.in/gist/wp-content/uploads/2024/08/GDSC-Report-NBA.pdf" },
                ].map(({ label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      gap: 12, padding: "14px 18px",
                      background: "var(--surface)", border: "1px solid var(--border)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--text-body)", textDecoration: "none",
                      transition: "var(--transition)",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--gist-orange)";
                      (e.currentTarget as HTMLElement).style.color = "var(--gist-orange)";
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-body)";
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{label}</span>
                    <ExternalLink size={14} style={{ flexShrink: 0 }} />
                  </a>
                ))}
              </div>
            </div>

            {/* GIST TechFest 2021 Highlights */}
            <div className="card" style={{ background: "var(--surface-2)" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "var(--navy-deep)", marginBottom: 16 }}>
                GIST TECHFEST/2k21 — Prize Winners Highlights
              </h3>
              <div style={{ overflowX: "auto" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Event</th>
                      <th>Topic</th>
                      <th>Date</th>
                      <th>Award</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Mattam Thanuja", event: "GIST TECHFEST/2k21", topic: "Poster Presentation", date: "26/06/2021", award: "1st (₹800)" },
                      { name: "Gandikota Prem Krishna & Bommana Sandhya", event: "GIST TECHFEST/2k21", topic: "Poster Presentation", date: "26/06/2021", award: "2nd (₹400)" },
                      { name: "Aitha Meera Venkata Sai Sri Teja", event: "GIST TECHFEST/2k21", topic: "Photography", date: "26/06/2021", award: "1st (₹500)" },
                      { name: "Gandikota Premkrishna", event: "GIST TECHFEST/2k21", topic: "Photography", date: "26/06/2021", award: "3rd Consolation" },
                      { name: "P. Rishitha", event: "GIST TECHFEST/2k21", topic: "Voice of Youth", date: "26/06/2021", award: "1st (₹500)" },
                      { name: "Yasaswini Sai Akhila", event: "GIST TECHFEST/2k21", topic: "Project Expo", date: "26/06/2021", award: "1st (₹800)" },
                      { name: "Mekala Mounika", event: "GIST TECHFEST/2k21", topic: "Technical Quiz", date: "26/06/2021", award: "1st (₹800)" },
                      { name: "J.C Riya Reddy", event: "GIST TECHFEST/2k21", topic: "General Quiz", date: "26/06/2021", award: "1st (₹800)" },
                    ].map((row, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 500 }}>{row.name}</td>
                        <td>{row.event}</td>
                        <td>{row.topic}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{row.date}</td>
                        <td><span className="badge badge-orange">{row.award}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === "VOICE Association" && (
          <div>
            {/* About VOICE */}
            <div
              style={{
                padding: 28, marginBottom: 36,
                background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)",
                borderRadius: "var(--radius-xl)", color: "#fff",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold-soft)", marginBottom: 12 }}>
                About VOICE
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#fff", marginBottom: 14 }}>
                VOICE Student Association — CSE Dept.
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.80)", lineHeight: 1.7 }}>
                VOICE is the official student association of the Department of Computer Science & Engineering at GIST. It organises technical events, workshops, coding competitions, and cultural activities to develop students' professional and interpersonal skills.
              </p>
            </div>

            {/* Committee */}
            <div style={{ marginBottom: 40 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "var(--navy-deep)", marginBottom: 20 }}>
                Committee Members
              </h3>
              <div style={{ overflowX: "auto", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VOICE_COMMITTEE.map((m) => (
                      <tr key={m.sno}>
                        <td>{m.sno}</td>
                        <td style={{ fontWeight: 600, color: "var(--navy-deep)" }}>{m.name}</td>
                        <td>{m.designation}</td>
                        <td><span className="badge badge-orange">{m.role}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Events Table */}
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "var(--navy-deep)", marginBottom: 20 }}>
                VOICE Events History
              </h3>
              <div style={{ overflowX: "auto", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Academic Year</th>
                      <th>Event</th>
                      <th>Date</th>
                      <th>Semester</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VOICE_EVENTS.map((e, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600, color: "var(--gist-orange)" }}>{e.ay}</td>
                        <td style={{ fontWeight: 500, color: "var(--navy-deep)" }}>{e.event}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{e.date}</td>
                        <td>{e.semester}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}