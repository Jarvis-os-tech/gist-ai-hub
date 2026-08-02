import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { eventYears, eventsSourceUrl, getEventCategory } from "@/data/events-data";
import { VOICE_COMMITTEE, VOICE_EVENTS } from "@/lib/department-data";
import {
  ExternalLink,
  CalendarRange,
  Search,
  Filter,
  GraduationCap,
  Sparkles,
  BookOpen,
  Users,
  Award,
  ArrowUpRight,
} from "lucide-react";
import { useState, useMemo } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Department Events & Reports — CSE Department, GIST" },
      {
        name: "description",
        content:
          "Official reports for workshops, guest lectures, industrial visits, FDPs, and fests organized by the Department of Computer Science & Engineering at GIST from 2011 to 2026.",
      },
    ],
  }),
  component: EventsPage,
});

type TopTab = "academic-years" | "voice-association";

function EventsPage() {
  const [activeTopTab, setActiveTopTab] = useState<TopTab>("academic-years");
  const [selectedYear, setSelectedYear] = useState<string>(eventYears[0]?.year ?? "2025-26");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const reduce = useReducedMotion();

  // Total count of events across all years
  const totalEventsCount = useMemo(
    () => eventYears.reduce((sum, y) => sum + y.events.length, 0),
    []
  );

  // Active year object
  const currentYearObj = useMemo(
    () => eventYears.find((y) => y.year === selectedYear) ?? eventYears[0],
    [selectedYear]
  );

  // Filtered events based on search query & category filter
  const filteredEvents = useMemo(() => {
    if (!currentYearObj) return [];
    let list = currentYearObj.events;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          (e.description && e.description.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== "all") {
      list = list.filter((e) => getEventCategory(e.title) === selectedCategory);
    }

    return list;
  }, [currentYearObj, searchQuery, selectedCategory]);

  return (
    <PageShell
      eyebrow="Activities & Reports"
      title="CSE Department Events & Academic Reports"
      description={`Explore ${totalEventsCount} official department event reports spanning ${eventYears.length} academic years alongside the VOICE Student Association.`}
      crumbs={[{ label: "Events & Reports" }]}
    >
      <div className="container-page" style={{ paddingTop: 32, paddingBottom: 88 }}>
        {/* ─── OFFICIAL GIST EVENTS PORTAL BANNER ─── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 32,
            padding: "20px 24px",
            background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)",
            borderRadius: "var(--radius-xl)",
            color: "#FFFFFF",
            boxShadow: "var(--shadow-md)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <GraduationCap size={24} style={{ color: "var(--gold-soft)" }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, fontFamily: "var(--font-display)" }}>
                Official GIST CSE Events Repository
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>
                {totalEventsCount} published event reports across {eventYears.length} academic years (2011–2026)
              </div>
            </div>
          </div>
          <a
            href={eventsSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              fontSize: 13,
              padding: "10px 20px",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            <BookOpen size={15} /> Official GIST Events Portal ↗
          </a>
        </motion.div>

        {/* ─── TOP LEVEL NAVIGATION TABS ─── */}
        <div style={{ display: "flex", gap: 12, marginBottom: 28, borderBottom: "2px solid var(--border)", paddingBottom: 16 }}>
          <button
            type="button"
            onClick={() => setActiveTopTab("academic-years")}
            style={{
              fontSize: 14,
              fontWeight: 700,
              padding: "10px 22px",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: "var(--radius-lg)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background: activeTopTab === "academic-years" ? "var(--navy-deep)" : "var(--surface)",
              color: activeTopTab === "academic-years" ? "#FFFFFF" : "var(--navy-deep)",
              border: activeTopTab === "academic-years" ? "1px solid var(--navy-deep)" : "1px solid var(--border)",
              boxShadow: activeTopTab === "academic-years" ? "var(--shadow-sm)" : "none",
            }}
          >
            <CalendarRange size={16} /> Academic Year Reports ({totalEventsCount})
          </button>

          <button
            type="button"
            onClick={() => setActiveTopTab("voice-association")}
            style={{
              fontSize: 14,
              fontWeight: 700,
              padding: "10px 22px",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: "var(--radius-lg)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background: activeTopTab === "voice-association" ? "var(--navy-deep)" : "var(--surface)",
              color: activeTopTab === "voice-association" ? "#FFFFFF" : "var(--navy-deep)",
              border: activeTopTab === "voice-association" ? "1px solid var(--navy-deep)" : "1px solid var(--border)",
              boxShadow: activeTopTab === "voice-association" ? "var(--shadow-sm)" : "none",
            }}
          >
            <Users size={16} /> VOICE Student Association
          </button>
        </div>

        {/* ─── TAB 1: ACADEMIC YEAR REPORTS VIEW ─── */}
        {activeTopTab === "academic-years" && (
          <div>
            {/* Search and Category Filter Bar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: 24,
                background: "var(--surface)",
                padding: "16px 20px",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Realtime Search Input */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flex: "1 1 300px",
                  background: "var(--surface-muted)",
                  padding: "8px 14px",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border)",
                }}
              >
                <Search size={16} style={{ color: "var(--text-muted)" }} />
                <input
                  type="text"
                  placeholder="Search events by title or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: 0,
                    outline: "none",
                    background: "transparent",
                    width: "100%",
                    fontSize: 13,
                    color: "var(--navy-deep)",
                    fontWeight: 500,
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    style={{ border: 0, background: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 12 }}
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Filter Dropdown */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Filter size={15} style={{ color: "var(--navy-deep)" }} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    color: "var(--navy-deep)",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option value="all">All Event Categories</option>
                  <option value="Workshops">Workshops & Training</option>
                  <option value="Guest Lectures">Guest Lectures & Seminars</option>
                  <option value="Industrial Visits">Industrial Visits</option>
                  <option value="FDPs">Faculty Development (FDP)</option>
                  <option value="PTMs">Parent-Teacher Meetings</option>
                  <option value="Fests & Cultural">Fests & Cultural</option>
                  <option value="Conferences">Conferences & Symposiums</option>
                  <option value="Hackathons">Hackathons & Coding</option>
                </select>
              </div>
            </div>

            {/* Horizontal Academic Year Pill Selector */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--navy-deep)", marginBottom: 12 }}>
                Select Academic Year:
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  overflowX: "auto",
                  paddingBottom: 12,
                  paddingTop: 4,
                  scrollbarWidth: "thin",
                }}
              >
                {eventYears.map((y) => {
                  const isSelected = selectedYear === y.year;
                  return (
                    <button
                      key={y.year}
                      type="button"
                      onClick={() => {
                        setSelectedYear(y.year);
                        setSearchQuery("");
                      }}
                      style={{
                        padding: "8px 18px",
                        borderRadius: 999,
                        fontSize: 13,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        background: isSelected ? "var(--gist-orange)" : "var(--surface)",
                        color: isSelected ? "#FFFFFF" : "var(--navy-deep)",
                        border: isSelected ? "1px solid var(--gist-orange)" : "1px solid var(--border)",
                        boxShadow: isSelected ? "0 4px 12px rgba(234, 88, 12, 0.35)" : "0 1px 3px rgba(0,0,0,0.06)",
                      }}
                    >
                      {y.year}
                      <span
                        style={{
                          marginLeft: 6,
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "2px 7px",
                          borderRadius: 999,
                          background: isSelected ? "rgba(255,255,255,0.25)" : "var(--surface-muted)",
                          color: isSelected ? "#FFFFFF" : "var(--navy-deep)",
                        }}
                      >
                        {y.events.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Year Header & Summary */}
            <div style={{ marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h2
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "var(--navy-deep)",
                    fontFamily: "var(--font-display)",
                    margin: 0,
                  }}
                >
                  Academic Year {currentYearObj?.year} Reports
                </h2>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
                  Showing {filteredEvents.length} of {currentYearObj?.events.length} published reports
                </p>
              </div>
            </div>

            {/* Events Responsive Cards Grid */}
            {filteredEvents.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: 24,
                }}
              >
                {filteredEvents.map((event, idx) => {
                  const category = getEventCategory(event.title);

                  return (
                    <motion.a
                      key={event.url + idx}
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={reduce ? false : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.4) }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "var(--radius-xl)",
                        overflow: "hidden",
                        border: "1px solid var(--border)",
                        background: "var(--surface)",
                        boxShadow: "var(--shadow-sm)",
                        textDecoration: "none",
                        color: "inherit",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                      }}
                      onMouseOut={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                      }}
                    >
                      {/* Event Cover Image or Fallback */}
                      <div
                        style={{
                          position: "relative",
                          aspectRatio: "16/10",
                          background: "var(--surface-muted)",
                          overflow: "hidden",
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        {event.image ? (
                          <img
                            src={event.image}
                            alt={event.title}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.5s ease",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: 8,
                              color: "var(--gist-orange)",
                            }}
                          >
                            <CalendarRange size={36} />
                            <span style={{ fontSize: 12, fontWeight: 700 }}>GIST CSE Event Report</span>
                          </div>
                        )}

                        {/* Top Badges */}
                        <div
                          style={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            right: 12,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 800,
                              textTransform: "uppercase",
                              padding: "4px 10px",
                              borderRadius: 4,
                              background: "var(--navy-deep)",
                              color: "#FFFFFF",
                            }}
                          >
                            {category}
                          </span>
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              padding: "3px 8px",
                              borderRadius: 4,
                              background: "rgba(0,0,0,0.6)",
                              color: "#FFFFFF",
                              backdropFilter: "blur(4px)",
                            }}
                          >
                            {selectedYear}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div style={{ padding: 20, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                        <h3
                          style={{
                            fontSize: 16,
                            fontWeight: 800,
                            color: "var(--navy-deep)",
                            lineHeight: 1.4,
                            marginBottom: 10,
                            fontFamily: "var(--font-display)",
                          }}
                        >
                          {event.title}
                        </h3>

                        {event.description && (
                          <p
                            style={{
                              fontSize: 13,
                              color: "var(--text-muted)",
                              lineHeight: 1.6,
                              marginBottom: 16,
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical" as const,
                              overflow: "hidden",
                            }}
                          >
                            {event.description.replace(/^Report on /i, "")}
                          </p>
                        )}

                        <div
                          style={{
                            marginTop: "auto",
                            paddingTop: 12,
                            borderTop: "1px solid var(--border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontSize: 12,
                            fontWeight: 700,
                            color: "var(--gist-orange)",
                          }}
                        >
                          <span>Read Full Official Report</span>
                          <ArrowUpRight size={16} />
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 24px",
                  background: "var(--surface)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--border)",
                  maxWidth: 480,
                  margin: "0 auto",
                }}
              >
                <CalendarRange size={36} style={{ color: "var(--text-muted)", marginBottom: 12 }} />
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy-deep)" }}>
                  No matching events found
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>
                  Try clearing your search query or changing the category filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="btn btn-primary"
                  style={{ marginTop: 16, fontSize: 13 }}
                >
                  Reset Search & Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 2: VOICE STUDENT ASSOCIATION VIEW ─── */}
        {activeTopTab === "voice-association" && (
          <div>
            <div
              style={{
                background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)",
                borderRadius: "var(--radius-xl)",
                padding: "32px 28px",
                color: "#FFFFFF",
                marginBottom: 36,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <Sparkles size={24} style={{ color: "var(--gold-soft)" }} />
                <h2 style={{ fontSize: 24, fontWeight: 800, fontFamily: "var(--font-display)", margin: 0, color: "#FFFFFF" }}>
                  VOICE Student Association
                </h2>
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: 800 }}>
                VOICE (Visionary Organization of Innovators in Computer Engineering) is the official student body of the Department of Computer Science & Engineering at GIST. It provides a platform for students to organize technical symposiums, workshops, coding hackathons, cultural festivals, and community outreach events.
              </p>
            </div>

            {/* Committee Leadership */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <Award size={20} style={{ color: "var(--gist-orange)" }} />
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--navy-deep)", margin: 0 }}>
                  Association Executive Committee
                </h3>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 20,
                }}
              >
                {VOICE_COMMITTEE.map((member, idx) => (
                  <motion.div
                    key={member.role + idx}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    style={{
                      padding: 20,
                      borderRadius: "var(--radius-xl)",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 800, color: "var(--gist-orange)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {member.role}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "var(--navy-deep)", marginTop: 6 }}>
                      {member.name}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
                      {member.designation}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* VOICE Flagship Events */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <BookOpen size={20} style={{ color: "var(--gist-orange)" }} />
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--navy-deep)", margin: 0 }}>
                  VOICE Flagship Activities & Events
                </h3>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: 24,
                }}
              >
                {VOICE_EVENTS.map((ve, idx) => (
                  <motion.div
                    key={ve.event + idx}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    style={{
                      padding: 24,
                      borderRadius: "var(--radius-xl)",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      boxShadow: "var(--shadow-sm)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--gist-orange)", marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                      <span>AY: {ve.ay}</span>
                      <span>{ve.semester}</span>
                    </div>
                    <h4 style={{ fontSize: 18, fontWeight: 800, color: "var(--navy-deep)", marginBottom: 8 }}>
                      {ve.event}
                    </h4>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
                      Conducted on {ve.date} under VOICE Student Association.
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
