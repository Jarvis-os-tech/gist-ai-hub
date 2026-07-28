import { useState } from "react";
import { MessageSquareQuote, Star, ExternalLink, Play, Quote } from "lucide-react";
import { OFFICIAL_GIST_LINKS } from "@/lib/media-fetcher";

interface TestimonialItem {
  id: string;
  name: string;
  batch: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatarText: string;
  videoUrl?: string;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test-1",
    name: "K. Pravallika",
    batch: "B.Tech CSE (Class of 2024)",
    role: "Software Development Engineer",
    company: "Tata Consultancy Services (TCS)",
    quote:
      "The Department of CSE at GIST provided an extraordinary learning environment with hands-on lab training in Python, Web Technologies, and Data Structures. The faculty mentors guided us throughout campus placement drives.",
    rating: 5,
    avatarText: "KP",
    videoUrl: OFFICIAL_GIST_LINKS.youtube,
  },
  {
    id: "test-2",
    name: "P. Akhilesh",
    batch: "B.Tech CSE (Class of 2023)",
    role: "Cloud Systems Engineer",
    company: "Infosys Technologies",
    quote:
      "The AWS Academy certification program and NVIDIA AI Lab hands-on sessions at GIST gave me a competitive edge during technical interview rounds. GIST's placement cell made my dream career a reality.",
    rating: 5,
    avatarText: "PA",
    videoUrl: OFFICIAL_GIST_LINKS.youtube,
  },
  {
    id: "test-3",
    name: "V. Sai Teja",
    batch: "B.Tech CSE (Class of 2024)",
    role: "Full Stack Engineer",
    company: "Cognizant Technology Solutions",
    quote:
      "Participating in VOICE Association hackathons and National Level Tech Fests built my problem-solving confidence. I am deeply thankful to the Head of Department and faculty for their continuous support.",
    rating: 5,
    avatarText: "ST",
    videoUrl: OFFICIAL_GIST_LINKS.youtube,
  },
  {
    id: "test-4",
    name: "M. Haritha",
    batch: "B.Tech CSE (Class of 2022)",
    role: "Data Analyst",
    company: "Virtusa Consulting",
    quote:
      "The rigorous academic curriculum paired with soft skills training and mock technical interviews prepared us thoroughly for global IT industry standards.",
    rating: 5,
    avatarText: "MH",
    videoUrl: OFFICIAL_GIST_LINKS.youtube,
  },
];

export function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="section" style={{ background: "var(--bg)", position: "relative" }}>
      <div className="container-page">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
          <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <MessageSquareQuote size={14} style={{ color: "var(--gist-orange)" }} /> Student &
            Alumni Voices
          </div>
          <h2 className="section-title">Testimonials & Success Stories</h2>
          <p style={{ fontSize: 15, color: "var(--text-muted)", marginTop: 10 }}>
            Hear from GIST CSE graduates working in top global technology companies and pursuing
            higher education worldwide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
            marginBottom: 40,
          }}
        >
          {TESTIMONIALS_DATA.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveIdx(idx)}
              style={{
                borderRadius: "var(--radius-xl)",
                padding: 24,
                background: "var(--surface)",
                border:
                  idx === activeIdx ? "2px solid var(--gist-orange)" : "1px solid var(--border)",
                boxShadow: idx === activeIdx ? "var(--shadow-lg)" : "var(--shadow-sm)",
                transition: "var(--transition)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                position: "relative",
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
              {/* Quote Icon watermark */}
              <Quote
                size={32}
                style={{
                  position: "absolute",
                  top: 18,
                  right: 18,
                  opacity: 0.12,
                  color: "var(--navy-deep)",
                }}
              />

              {/* Rating Stars */}
              <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={14} style={{ fill: "var(--gold)", color: "var(--gold)" }} />
                ))}
              </div>

              {/* Quote Text */}
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-body)",
                  lineHeight: 1.6,
                  marginBottom: 20,
                  fontStyle: "italic",
                }}
              >
                "{item.quote}"
              </p>

              {/* User Avatar & Info */}
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  borderTop: "1px solid var(--border)",
                  paddingTop: 16,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "var(--navy-deep)",
                    color: "var(--gold-soft)",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                    fontSize: 15,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    flexShrink: 0,
                  }}
                >
                  {item.avatarText}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--navy-deep)" }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--gist-orange)", fontWeight: 600 }}>
                    {item.role} @ {item.company}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{item.batch}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonials Channel CTA Banner */}
        <div
          style={{
            padding: "24px 28px",
            background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)",
            borderRadius: "var(--radius-xl)",
            color: "#FFFFFF",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "#FF0000",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <Play size={20} style={{ fill: "#FFFFFF", color: "#FFFFFF", marginLeft: 2 }} />
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#FFFFFF" }}>
                Watch Video Testimonials on Official YouTube Channel
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>
                Subscribe to @geethanjaliinstituteofscie2569 for campus tours, alumni talks, and
                event recordings.
              </div>
            </div>
          </div>
          <a
            href={OFFICIAL_GIST_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              padding: "10px 20px",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            Watch Video Testimonials ↗ <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
