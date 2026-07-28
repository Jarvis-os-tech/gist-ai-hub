import { useState } from "react";
import { Sparkles, ExternalLink, ChevronLeft, ChevronRight, X, Eye } from "lucide-react";
import { OFFICIAL_GIST_LINKS } from "@/lib/media-fetcher";

interface SpotlightItem {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  tags: string[];
  externalUrl?: string;
}

const SPOTLIGHT_ITEMS: SpotlightItem[] = [
  {
    id: "sp-1",
    title: "Smart India Hackathon (SIH) National Winners Felicitation",
    category: "National Award",
    date: "2025-12-02",
    description:
      "GIST Management and HOD felicitating the student team for securing 1st rank at National SIH for AI healthcare automation.",
    tags: ["SIH2025", "HackathonWinners", "NationalLevel"],
    externalUrl: OFFICIAL_GIST_LINKS.website,
  },
  {
    id: "sp-2",
    title: "Annual Freshers Day & VOICE Cultural Fest Celebrations",
    category: "Cultural Fest",
    date: "2026-01-20",
    description:
      "Grand welcome ceremony for 1st-year B.Tech students organized by VOICE Association featuring guest lectures and cultural performances.",
    tags: ["FreshersDay", "VOICEFest", "GISTEvents"],
    externalUrl: OFFICIAL_GIST_LINKS.instagram,
  },
  {
    id: "sp-3",
    title: "JNTUA Convocation Gold Medals & University Rank Awards",
    category: "Academic Excellence",
    date: "2025-11-10",
    description:
      "GIST CSE toppers receiving Gold Medals and Academic Excellence awards at JNTU Anantapur convocation ceremony.",
    tags: ["GoldMedalists", "JNTUARanks", "CSEToppers"],
    externalUrl: OFFICIAL_GIST_LINKS.website,
  },
  {
    id: "sp-4",
    title: "NVIDIA AI & Deep Learning Workstation Laboratory Launch",
    category: "Infrastructure",
    date: "2026-02-10",
    description:
      "Inauguration of advanced GPU computing laboratory equipped with high-speed workstations for Artificial Intelligence research.",
    tags: ["NVIDIA", "AILab", "DeepLearning"],
    externalUrl: OFFICIAL_GIST_LINKS.website,
  },
  {
    id: "sp-5",
    title: "ISRO SHAR Sriharikota Space Center Technical Industrial Trip",
    category: "Industrial Visit",
    date: "2025-09-25",
    description:
      "CSE students visiting Satish Dhawan Space Centre (SHAR) to inspect rocket launch complexes and supercomputing centers.",
    tags: ["ISRO", "SHARSriharikota", "SpaceTechnology"],
    externalUrl: OFFICIAL_GIST_LINKS.website,
  },
];

export function GistSpotlight() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedSpotlight, setSelectedSpotlight] = useState<SpotlightItem | null>(null);

  const prevSlide = () => {
    setActiveIdx((prev) => (prev === 0 ? SPOTLIGHT_ITEMS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIdx((prev) => (prev === SPOTLIGHT_ITEMS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="section" style={{ background: "var(--surface-alt)", position: "relative" }}>
      <div className="container-page">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 36,
          }}
        >
          <div>
            <div
              className="eyebrow"
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <Sparkles size={14} style={{ color: "var(--gist-orange)" }} /> GIST Spotlight
            </div>
            <h2 className="section-title">Celebrating Excellence & Campus Highlights</h2>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={prevSlide}
              className="btn btn-ghost"
              style={{
                width: 40,
                height: 40,
                padding: 0,
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
              }}
              aria-label="Previous Spotlight"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="btn btn-ghost"
              style={{
                width: 40,
                height: 40,
                padding: 0,
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
              }}
              aria-label="Next Spotlight"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Spotlight Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {SPOTLIGHT_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedSpotlight(item)}
              style={{
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                border:
                  idx === activeIdx ? "2px solid var(--gist-orange)" : "1px solid var(--border)",
                background: "var(--surface)",
                boxShadow: idx === activeIdx ? "var(--shadow-lg)" : "var(--shadow-sm)",
                transition: "var(--transition)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "none";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  idx === activeIdx ? "var(--shadow-lg)" : "var(--shadow-sm)";
              }}
            >
              {/* Graphic Banner */}
              <div
                style={{
                  position: "relative",
                  height: 170,
                  background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)",
                  padding: 18,
                  color: "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: 4,
                      background: "var(--gist-orange)",
                      color: "#FFFFFF",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.category}
                  </span>
                  <span className="font-mono" style={{ fontSize: 12, color: "var(--gold-soft)" }}>
                    {item.date}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    lineHeight: 1.35,
                    color: "#FFFFFF",
                  }}
                >
                  {item.title}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: 18, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                    marginBottom: 14,
                  }}
                >
                  {item.description}
                </p>

                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid var(--border)",
                    paddingTop: 12,
                  }}
                >
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {item.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono"
                        style={{
                          fontSize: 11,
                          padding: "2px 6px",
                          borderRadius: 4,
                          background: "var(--surface-alt)",
                          color: "var(--navy)",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--gist-orange)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    View <Eye size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Dialog for Spotlight Item */}
        {selectedSpotlight && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(11, 25, 44, 0.88)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
            onClick={() => setSelectedSpotlight(null)}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 600,
                background: "var(--surface)",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                border: "1px solid var(--border)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedSpotlight(null)}
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(11, 25, 44, 0.75)",
                  color: "#FFFFFF",
                  border: "none",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              >
                <X size={18} />
              </button>

              <div
                style={{
                  padding: "28px 24px 20px",
                  background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)",
                  color: "#FFFFFF",
                }}
              >
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: 4,
                      background: "var(--gist-orange)",
                      color: "#FFFFFF",
                    }}
                  >
                    {selectedSpotlight.category}
                  </span>
                  <span
                    className="font-mono"
                    style={{ fontSize: 12, color: "var(--gold-soft)", marginLeft: "auto" }}
                  >
                    Date: {selectedSpotlight.date}
                  </span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF" }}>
                  {selectedSpotlight.title}
                </h3>
              </div>

              <div style={{ padding: 24 }}>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-body)",
                    lineHeight: 1.6,
                    marginBottom: 18,
                  }}
                >
                  {selectedSpotlight.description}
                </p>

                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                  {selectedSpotlight.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono"
                      style={{
                        fontSize: 12,
                        padding: "3px 10px",
                        borderRadius: 999,
                        background: "var(--surface-alt)",
                        color: "var(--navy)",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <a
                  href={selectedSpotlight.externalUrl || OFFICIAL_GIST_LINKS.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}
                >
                  Visit Official Source ↗ <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
