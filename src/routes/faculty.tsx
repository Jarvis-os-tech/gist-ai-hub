import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { DEPARTMENT, FACULTY, type FacultyMember } from "@/lib/department-data";
import {
  Search,
  BookOpen,
  Mail,
  Award,
  GraduationCap,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  UserCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { FacultyAvatar } from "@/components/ui/FacultyAvatar";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty — Department of CSE, GIST" },
      {
        name: "description",
        content:
          "Meet all 49 faculty members of the Department of Computer Science & Engineering at GIST — professors, associate and assistant professors with their qualifications and imported profiles.",
      },
    ],
  }),
  component: FacultyPage,
});

const ROLES = [
  "All",
  "Professor & HoD",
  "Professor",
  "Associate Professor",
  "Assistant Professor",
] as const;

export function FacultyPage() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState<(typeof ROLES)[number]>("All");
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
  const reduce = useReducedMotion();

  // Keyboard navigation & ESC key handler for profile modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedFaculty(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter and sort faculty members strictly High-to-Low rank: HoD -> Professor -> Assoc Prof -> Asst Prof
  const list = useMemo(() => {
    return FACULTY.filter((f) => {
      const roleOk = role === "All" || f.designation === role;
      const qOk =
        q.trim() === "" ||
        (f.name + f.qualification + f.designation + f.specialization.join(" "))
          .toLowerCase()
          .includes(q.toLowerCase());
      return roleOk && qOk;
    }).sort((a, b) => {
      if (a.rankOrder !== b.rankOrder) {
        return a.rankOrder - b.rankOrder;
      }
      return b.experienceYears - a.experienceYears;
    });
  }, [q, role]);

  // Index of currently selected faculty for modal prev/next navigation
  const currentIndex = useMemo(() => {
    if (!selectedFaculty) return -1;
    return list.findIndex((f) => f.slug === selectedFaculty.slug);
  }, [selectedFaculty, list]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedFaculty(list[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < list.length - 1) {
      setSelectedFaculty(list[currentIndex + 1]);
    }
  };

  return (
    <PageShell
      eyebrow="People & Research"
      title="Faculty of Computer Science & Engineering"
      description={`${DEPARTMENT.stats.faculty} qualified and experienced educators driving academic excellence, research innovations, and industry readiness at GIST.`}
      crumbs={[{ label: "Faculty" }]}
    >
      <div className="container-page" style={{ paddingTop: 40, paddingBottom: 72 }}>
        {/* Filter & Search Bar */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 28,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ROLES.map((r) => (
              <button
                key={r}
                id={`filter-${r.replace(/[\s&]/g, "-").toLowerCase()}`}
                onClick={() => setRole(r)}
                className={`filter-btn${role === r ? " active" : ""}`}
              >
                {r}
              </button>
            ))}
          </div>

          <div style={{ position: "relative", minWidth: 260 }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }}
            >
              <Search size={16} />
            </span>
            <input
              id="faculty-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search faculty name, specialization..."
              className="search-input"
              style={{ paddingLeft: 40 }}
            />
          </div>
        </motion.div>

        {/* Roster Order & Counter Notice */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 13,
            color: "var(--text-muted)",
            marginBottom: 24,
          }}
        >
          <div>
            Showing <strong style={{ color: "var(--navy-deep)" }}>{list.length}</strong> of{" "}
            {FACULTY.length} faculty members (Ordered <strong>High to Low Rank</strong>)
          </div>
          <div style={{ fontSize: 12, display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "var(--gist-orange)",
                }}
              />
              HoD & Professors
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#2563eb",
                }}
              />
              Associate Professors
            </span>
          </div>
        </div>

        {/* Faculty Grid */}
        <div
          style={{
            display: "grid",
            gap: 20,
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {list.map((f, i) => {
            const initials = f.name
              .replace(/^(Dr\.|Mr\.|Ms\.)\s*/, "")
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("");

            const isHod = f.rankOrder === 1;
            const isProf = f.rankOrder === 2;
            const isAssoc = f.rankOrder === 3;

            const badgeBg = isHod
              ? "linear-gradient(135deg, #d97706, #b45309)"
              : isProf
                ? "linear-gradient(135deg, #1e3a8a, #3b82f6)"
                : isAssoc
                  ? "linear-gradient(135deg, #0284c7, #0d9488)"
                  : "var(--surface-2)";

            const badgeColor = isHod || isProf || isAssoc ? "#ffffff" : "var(--navy-deep)";

            return (
              <motion.article
                key={f.slug}
                className="card"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.8), ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  border: isHod ? "2px solid var(--gist-orange)" : "1px solid var(--border)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {isHod && (
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "var(--gist-orange)",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 12,
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                    }}
                  >
                    Head of Dept
                  </div>
                )}

                <div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <FacultyAvatar src={f.photoUrl} name={f.name} size={56} />

                    <div style={{ minWidth: 0, flex: 1 }}>
                      <h3
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: 16,
                          fontWeight: 700,
                          color: "var(--navy-deep)",
                          lineHeight: 1.3,
                          marginBottom: 6,
                        }}
                      >
                        {f.name}
                      </h3>
                      <div
                        style={{
                          display: "inline-block",
                          padding: "3px 10px",
                          borderRadius: 999,
                          background: badgeBg,
                          color: badgeColor,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        {f.designation}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--text-muted)",
                          marginTop: 6,
                          fontWeight: 500,
                        }}
                      >
                        {f.qualification} • {f.experienceYears}+ Yrs Exp
                      </div>
                    </div>
                  </div>

                  {/* Specialization Tags */}
                  <div
                    style={{
                      marginTop: 14,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                    }}
                  >
                    {f.specialization.slice(0, 2).map((spec, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: 11,
                          padding: "3px 8px",
                          borderRadius: 4,
                          background: "var(--surface-2)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action -> Load Profile Here */}
                <div
                  style={{
                    marginTop: 18,
                    paddingTop: 14,
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: 12,
                  }}
                >
                  <span style={{ color: "var(--text-muted)", fontSize: 11 }}>S.No. {f.sno}</span>
                  <button
                    onClick={() => setSelectedFaculty(f)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--gist-orange)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontSize: 13,
                      padding: "4px 8px",
                      borderRadius: 6,
                      transition: "background 0.2s ease",
                    }}
                    className="view-profile-btn"
                  >
                    View Profile <UserCheck size={14} />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {list.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-muted)" }}>
            No faculty members match your search criteria.
          </div>
        )}

        {/* HOD Contact Banner */}
        <motion.div
          className="card"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 48,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            background: "linear-gradient(135deg, var(--surface-1), var(--surface-2))",
            border: "1px solid var(--border)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: "var(--navy-deep)",
              }}
            >
              Contact the Head of Department
            </div>
            <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4 }}>
              For academic inquiries, research collaborations, or admissions guidance.
            </div>
          </div>
          <a
            href={`mailto:${DEPARTMENT.contact.email}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 24px",
              borderRadius: 999,
              background: "var(--gist-orange)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <Mail size={15} /> {DEPARTMENT.contact.email}
          </a>
        </motion.div>
      </div>

      {/* IN-APP FACULTY PROFILE MODAL ("Load Here Only") */}
      <AnimatePresence>
      {selectedFaculty && (
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(11, 25, 44, 0.85)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            overflowY: "auto",
          }}
          onClick={() => setSelectedFaculty(null)}
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "100%",
              maxWidth: 720,
              maxHeight: "90vh",
              backgroundColor: "#ffffff",
              borderRadius: 20,
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.5)",
              border: "1px solid #cbd5e1",
              overflowY: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "#0b192c",
                borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                zIndex: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    color: "var(--gist-orange)",
                  }}
                >
                  Faculty Profile
                </span>
                <span style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.7)" }}>
                  ({currentIndex + 1} of {list.length})
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  onClick={handlePrev}
                  disabled={currentIndex <= 0}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 8,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    cursor: currentIndex <= 0 ? "not-allowed" : "pointer",
                    opacity: currentIndex <= 0 ? 0.3 : 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                  title="Previous Faculty"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= list.length - 1}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 8,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    cursor: currentIndex >= list.length - 1 ? "not-allowed" : "pointer",
                    opacity: currentIndex >= list.length - 1 ? 0.3 : 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                  title="Next Faculty"
                >
                  <ChevronRight size={18} />
                </button>
                <button
                  onClick={() => setSelectedFaculty(null)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 8,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    background: "var(--gist-orange)",
                    color: "#ffffff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  title="Close Profile (Esc)"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Profile Body */}
            <div>
              {/* Profile Card Hero Banner */}
              <div
                style={{
                  background: "linear-gradient(135deg, #0b192c 0%, #1e3e62 100%)",
                  padding: "28px 32px",
                  color: "#ffffff",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 24,
                }}
              >
                <FacultyAvatar src={selectedFaculty.photoUrl} name={selectedFaculty.name} size={100} />

                <div style={{ flex: 1, minWidth: 240 }}>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: 999,
                      background: "var(--gist-orange)",
                      color: "#ffffff",
                      fontSize: 12,
                      fontWeight: 700,
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {selectedFaculty.designation}
                  </div>

                  <h2
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 24,
                      fontWeight: 800,
                      color: "#ffffff",
                      lineHeight: 1.25,
                      margin: 0,
                    }}
                  >
                    {selectedFaculty.name}
                  </h2>

                  <div style={{ fontSize: 14, color: "rgba(255, 255, 255, 0.8)", marginTop: 4 }}>
                    {selectedFaculty.qualification} • Department of CSE, GIST
                  </div>

                  <div
                    style={{
                      marginTop: 12,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 16,
                      fontSize: 13,
                    }}
                  >
                    <a
                      href={`mailto:${selectedFaculty.email}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        color: "var(--gold-soft)",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      <Mail size={14} /> {selectedFaculty.email}
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ padding: "28px 32px 36px" }}>
                {/* Stat Highlights Bar */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: 14,
                    marginBottom: 28,
                  }}
                >
                  <div
                    style={{
                      padding: "14px 18px",
                      borderRadius: 12,
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        textTransform: "uppercase",
                        color: "#64748b",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                      }}
                    >
                      Experience
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "#0b192c", marginTop: 4 }}>
                      {selectedFaculty.experienceYears}+ Years
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "14px 18px",
                      borderRadius: 12,
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        textTransform: "uppercase",
                        color: "#64748b",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                      }}
                    >
                      Publications
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "#0b192c", marginTop: 4 }}>
                      {selectedFaculty.publicationsCount || 0}+ Papers
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "14px 18px",
                      borderRadius: 12,
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        textTransform: "uppercase",
                        color: "#64748b",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                      }}
                    >
                      Patents
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "#0b192c", marginTop: 4 }}>
                      {selectedFaculty.patentsCount || 0} Published
                    </div>
                  </div>
                </div>

                {/* Bio & Summary */}
                {selectedFaculty.bio && (
                  <div style={{ marginBottom: 28 }}>
                    <h4
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#0b192c",
                        marginBottom: 8,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Briefcase size={18} color="var(--gist-orange)" /> Professional Overview
                    </h4>
                    <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.7, margin: 0 }}>
                      {selectedFaculty.bio}
                    </p>
                  </div>
                )}

                {/* Educational Details */}
                <div style={{ marginBottom: 28 }}>
                  <h4
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#0b192c",
                      marginBottom: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <GraduationCap size={18} color="var(--gist-orange)" /> Educational Qualifications
                  </h4>
                  <div style={{ display: "grid", gap: 10 }}>
                    {selectedFaculty.education.map((edu, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "12px 16px",
                          borderRadius: 10,
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: 14,
                        }}
                      >
                        <div>
                          <strong style={{ color: "#0b192c" }}>{edu.degree}</strong> —{" "}
                          <span style={{ color: "#475569" }}>{edu.institution}</span>
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "var(--gist-orange)",
                            background: "rgba(228, 92, 4, 0.1)",
                            padding: "3px 10px",
                            borderRadius: 6,
                          }}
                        >
                          {edu.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specialization Tags */}
                <div style={{ marginBottom: 28 }}>
                  <h4
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#0b192c",
                      marginBottom: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <BookOpen size={18} color="var(--gist-orange)" /> Specialization & Research Areas
                  </h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {selectedFaculty.specialization.map((spec, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: 13,
                          padding: "6px 14px",
                          borderRadius: 20,
                          background: "#0b192c",
                          color: "#ffffff",
                          fontWeight: 600,
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Research Profiles & IDs */}
                {selectedFaculty.researchDetails && (
                  <div style={{ marginBottom: 24 }}>
                    <h4
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#0b192c",
                        marginBottom: 12,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Award size={18} color="var(--gist-orange)" /> Research & Citation Profiles
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, fontSize: 13 }}>
                      {selectedFaculty.researchDetails.vidwan && (
                        <div style={{ padding: "10px 14px", borderRadius: 8, background: "#f1f5f9", border: "1px solid #cbd5e1", color: "#0f172a" }}>
                          <span style={{ color: "#64748b", fontWeight: 500 }}>Vidwan ID:</span>{" "}
                          <strong style={{ color: "#0f172a" }}>{selectedFaculty.researchDetails.vidwan}</strong>
                        </div>
                      )}
                      {selectedFaculty.researchDetails.orcid && (
                        <div style={{ padding: "10px 14px", borderRadius: 8, background: "#f1f5f9", border: "1px solid #cbd5e1", color: "#0f172a" }}>
                          <span style={{ color: "#64748b", fontWeight: 500 }}>ORCID:</span>{" "}
                          <strong style={{ color: "#0f172a" }}>{selectedFaculty.researchDetails.orcid}</strong>
                        </div>
                      )}
                      {selectedFaculty.researchDetails.scopus && (
                        <div style={{ padding: "10px 14px", borderRadius: 8, background: "#f1f5f9", border: "1px solid #cbd5e1", color: "#0f172a" }}>
                          <span style={{ color: "#64748b", fontWeight: 500 }}>Scopus ID:</span>{" "}
                          <strong style={{ color: "#0f172a" }}>{selectedFaculty.researchDetails.scopus}</strong>
                        </div>
                      )}
                      {selectedFaculty.researchDetails.googleScholar && (
                        <div style={{ padding: "10px 14px", borderRadius: 8, background: "#f1f5f9", border: "1px solid #cbd5e1", color: "#0f172a" }}>
                          <span style={{ color: "#64748b", fontWeight: 500 }}>Google Scholar:</span>{" "}
                          <strong style={{ color: "#0f172a" }}>{selectedFaculty.researchDetails.googleScholar}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* External Original Link optional reference */}
                {selectedFaculty.profileUrl && (
                  <div style={{ textAlign: "right", marginTop: 24, paddingTop: 16, borderTop: "1px solid #e2e8f0" }}>
                    <a
                      href={selectedFaculty.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 13,
                        color: "var(--gist-orange)",
                        fontWeight: 600,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      Official Profile Link (gist.edu.in) <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </PageShell>
  );
}
