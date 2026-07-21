import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { GALLERY_IMAGES } from "@/lib/department-data";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Department of CSE, GIST" },
      {
        name: "description",
        content:
          "Photo gallery of the CSE Department at GIST — lab activities, events, workshops, and campus life.",
      },
    ],
  }),
  component: GalleryPage,
});

// Additional gallery images from original website events sections
const EXTRA_IMAGES = [
  { src: "https://gist.edu.in/gist/wp-content/uploads/2026/02/SRI07514-1024x683.jpg", alt: "CSE Department — GIST Campus" },
  { src: "https://gist.edu.in/gist/wp-content/uploads/2020/02/E5-225x300.jpeg", alt: "CSE Lab Activity" },
  { src: "https://gist.edu.in/gist/wp-content/uploads/2020/02/D3-225x300.jpeg", alt: "CSE Student Event" },
  { src: "https://gist.edu.in/gist/wp-content/uploads/2020/02/E3-225x300.jpeg", alt: "CSE Students Workshop" },
  { src: "https://gist.edu.in/gist/wp-content/uploads/2020/02/E2-225x300.jpeg", alt: "CSE Activity" },
  { src: "https://gist.edu.in/gist/wp-content/uploads/2020/02/E1-225x300.jpeg", alt: "CSE Workshop" },
];

function GalleryPage() {
  const [broken, setBroken] = useState<Set<string>>(new Set());

  const images = EXTRA_IMAGES.filter((img) => !broken.has(img.src));

  return (
    <PageShell
      eyebrow="Gallery"
      title="Life at CSE, GIST"
      description="Photos from lab activities, technical events, workshops, and campus life in the Department of Computer Science & Engineering."
      crumbs={[{ label: "Gallery" }]}
    >
      <div className="container-page" style={{ paddingTop: 40, paddingBottom: 72 }}>
        {/* Main Gallery Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
            marginBottom: 48,
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
                transition: "var(--transition)",
                cursor: "pointer",
                background: "var(--surface-2)",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
                onError={() => setBroken((b) => new Set([...b, img.src]))}
              />
              <div
                style={{
                  padding: "12px 16px",
                  fontSize: 13, color: "var(--text-muted)",
                  fontStyle: "italic",
                }}
              >
                {img.alt}
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div
            style={{
              textAlign: "center", padding: "60px 0",
              color: "var(--text-muted)", fontSize: 15,
            }}
          >
            <p>Gallery images are hosted on the official GIST website.</p>
            <a
              href="https://gist.edu.in/gist/gallery-college/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16,
                padding: "12px 24px", borderRadius: 999,
                background: "var(--gist-orange)", color: "#fff",
                fontSize: 14, fontWeight: 600, textDecoration: "none",
              }}
            >
              View Gallery on GIST Website <ExternalLink size={14} />
            </a>
          </div>
        )}

        {/* Official gallery link */}
        <div
          style={{
            padding: "28px", background: "var(--surface-2)",
            border: "1px solid var(--border)", borderRadius: "var(--radius-xl)",
            display: "flex", flexWrap: "wrap", alignItems: "center",
            justifyContent: "space-between", gap: 20,
          }}
        >
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "var(--navy-deep)", fontWeight: 700 }}>
              View the Full College Gallery
            </div>
            <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 6 }}>
              Access the complete photo gallery including campus, events, and department activities on the official GIST website.
            </div>
          </div>
          <a
            href="https://gist.edu.in/gist/gallery-college/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 24px", borderRadius: 999,
              background: "var(--gist-orange)", color: "#fff",
              fontSize: 14, fontWeight: 600, textDecoration: "none",
              flexShrink: 0,
            }}
          >
            Open Official Gallery <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </PageShell>
  );
}