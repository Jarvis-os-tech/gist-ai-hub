import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import {
  INTEGRATED_MEDIA_DATABASE,
  OFFICIAL_GIST_LINKS,
  DEPARTMENT_GALLERY_PHOTOS,
  FEATURED_VIDEO_ITEMS,
  getMediaThumbnailUrl,
  getMediaEmbedUrl,
} from "@/lib/media-fetcher";
import type { MediaContentItem, MediaCategory } from "@/lib/types/media-content";
import {
  ExternalLink,
  X,
  GraduationCap,
  Youtube,
  Instagram,
  Play,
  Sparkles,
  Smartphone,
  Tv,
  ChevronLeft,
  ChevronRight,
  Camera,
  Layers,
  Video,
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Photo Gallery & Video Stream — CSE Department, GIST" },
      {
        name: "description",
        content:
          "Official photo gallery, lab reels, technical workshops, hackathons, and video activities from the Department of Computer Science and Engineering at GIST.",
      },
    ],
  }),
  component: GalleryPage,
});

type SectionTab = "photos" | "videos" | "all";

interface CategoryFilterOption {
  key: MediaCategory;
  label: string;
}

const CATEGORY_FILTERS: CategoryFilterOption[] = [
  { key: "all", label: "All Categories" },
  { key: "workshops", label: "Workshops & Training" },
  { key: "labs", label: "Labs & Experiments" },
  { key: "celebrations", label: "Festivities & Cultural" },
  { key: "events", label: "Seminars & Guest Lectures" },
  { key: "hackathons", label: "Hackathons & Coding" },
  { key: "achievements", label: "Achievements & Awards" },
  { key: "visits", label: "Industrial Visits" },
];

const FALLBACK_IMAGE = "/gist-banner.jpg";

function GalleryPage() {
  const [activeTab, setActiveTab] = useState<SectionTab>("all");
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const reduce = useReducedMotion();

  // 28 Department Photos
  const photosList = DEPARTMENT_GALLERY_PHOTOS;

  // 3 Featured Videos & Reels
  const videosList = FEATURED_VIDEO_ITEMS;

  // Active items list based on section tab
  const activeSectionItems =
    activeTab === "photos"
      ? photosList
      : activeTab === "videos"
      ? videosList
      : INTEGRATED_MEDIA_DATABASE;

  // Filter active list by category
  const displayedMedia = activeSectionItems.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  // Current active item for Lightbox slideshow
  const currentItem = lightboxIndex !== null ? displayedMedia[lightboxIndex] : null;

  // Lightbox navigation functions
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const stepLightbox = useCallback(
    (dir: number) => {
      setLightboxIndex((prev) => {
        if (prev === null) return null;
        const total = displayedMedia.length;
        return (prev + dir + total) % total;
      });
    },
    [displayedMedia.length]
  );

  // Keyboard navigation listener for Lightbox modal
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") stepLightbox(1);
      if (e.key === "ArrowLeft") stepLightbox(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, stepLightbox]);

  const handleOpenLink = (url: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <PageShell
      eyebrow="Gallery & Media Hub"
      title="CSE Department Photo Gallery & Video Stream"
      description={`Browse ${photosList.length} official department photographs alongside video highlights and laboratory reels in separate sections.`}
      crumbs={[{ label: "Gallery & Media" }]}
    >
      <div className="container-page" style={{ paddingTop: 32, paddingBottom: 88 }}>
        {/* ─── OFFICIAL PLATFORMS BADGE BAR ─── */}
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
                Official GIST Outlets & Photo Gallery
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>
                Published on official GIST CSE portal, YouTube channel, and Instagram
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href={OFFICIAL_GIST_LINKS.gallery}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                padding: "8px 16px",
                color: "#FFFFFF",
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                borderRadius: "var(--radius-md)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              <Camera size={14} style={{ color: "var(--gold-soft)" }} /> CSE Official Gallery ↗
            </a>
            <a
              href={OFFICIAL_GIST_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                padding: "8px 16px",
                color: "#FFFFFF",
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                borderRadius: "var(--radius-md)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              <Instagram size={14} style={{ color: "#E4405F" }} /> Instagram ↗
            </a>
            <a
              href={OFFICIAL_GIST_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                padding: "8px 16px",
                color: "#FFFFFF",
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                borderRadius: "var(--radius-md)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              <Youtube size={14} style={{ color: "#FF0000" }} /> YouTube ↗
            </a>
          </div>
        </motion.div>

        {/* ─── HIGH-CONTRAST SECTION NAVIGATION TABS ─── */}
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              borderBottom: "2px solid var(--border)",
              paddingBottom: 16,
            }}
          >
            {/* Primary Section Buttons */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("all");
                  setLightboxIndex(null);
                }}
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
                  background: activeTab === "all" ? "var(--navy-deep)" : "var(--surface)",
                  color: activeTab === "all" ? "#FFFFFF" : "var(--navy-deep)",
                  border: activeTab === "all" ? "1px solid var(--navy-deep)" : "1px solid var(--border)",
                  boxShadow: activeTab === "all" ? "var(--shadow-sm)" : "none",
                }}
              >
                <Layers size={16} /> All Media Stream ({INTEGRATED_MEDIA_DATABASE.length})
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("photos");
                  setLightboxIndex(null);
                }}
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
                  background: activeTab === "photos" ? "var(--navy-deep)" : "var(--surface)",
                  color: activeTab === "photos" ? "#FFFFFF" : "var(--navy-deep)",
                  border: activeTab === "photos" ? "1px solid var(--navy-deep)" : "1px solid var(--border)",
                  boxShadow: activeTab === "photos" ? "var(--shadow-sm)" : "none",
                }}
              >
                <Camera size={16} /> Photo Gallery ({photosList.length})
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("videos");
                  setLightboxIndex(null);
                }}
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
                  background: activeTab === "videos" ? "var(--navy-deep)" : "var(--surface)",
                  color: activeTab === "videos" ? "#FFFFFF" : "var(--navy-deep)",
                  border: activeTab === "videos" ? "1px solid var(--navy-deep)" : "1px solid var(--border)",
                  boxShadow: activeTab === "videos" ? "var(--shadow-sm)" : "none",
                }}
              >
                <Video size={16} /> Videos & Reels ({videosList.length})
              </button>
            </div>

            {/* Category Filter Selector */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--navy-deep)" }}>
                Filter Category:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as MediaCategory)}
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
                {CATEGORY_FILTERS.map((cat) => (
                  <option key={cat.key} value={cat.key}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ─── SECTION 1: PHOTO GALLERY (CLEAN COMPACT TILES — NO TEXT, NO WHITE BOXES, MATCHING REFERENCE IMAGE) ─── */}
        {activeTab === "photos" && (
          <div>
            <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
              <Sparkles size={18} style={{ color: "var(--gist-orange)" }} />
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "var(--navy-deep)",
                  fontFamily: "var(--font-display)",
                  margin: 0,
                }}
              >
                Department Photo Wall
              </h2>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "2px 10px",
                  borderRadius: 999,
                  background: "var(--surface-muted)",
                  color: "var(--navy-deep)",
                  marginLeft: 8,
                }}
              >
                {displayedMedia.length} photographs
              </span>
            </div>

            {/* Clean Grid of Rounded Photo Cards (No Text, No White Boxes) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 18,
              }}
            >
              {displayedMedia.map((img, i) => (
                <motion.button
                  key={img.id}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.02, 0.3) }}
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "16/11",
                    padding: 0,
                    margin: 0,
                    border: "1px solid var(--border)",
                    borderRadius: 22,
                    overflow: "hidden",
                    cursor: "pointer",
                    background: "var(--surface-muted)",
                    position: "relative",
                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05)",
                    outline: "none",
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* ─── SECTION 2: VIDEOS & REELS ─── */}
        {activeTab === "videos" && (
          <div>
            <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
              <Sparkles size={18} style={{ color: "var(--gist-orange)" }} />
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "var(--navy-deep)",
                  fontFamily: "var(--font-display)",
                  margin: 0,
                }}
              >
                Department Videos & Mobile Reels
              </h2>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "2px 10px",
                  borderRadius: 999,
                  background: "var(--surface-muted)",
                  color: "var(--navy-deep)",
                  marginLeft: 8,
                }}
              >
                {displayedMedia.length} videos
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 20,
              }}
            >
              {displayedMedia.map((item, i) => {
                const isPlaying = playingVideoId === item.id;
                const embedUrl = getMediaEmbedUrl(item, true);
                const thumbnailUrl = getMediaThumbnailUrl(item);
                const isVertical = item.aspectRatio === "vertical";

                return (
                  <motion.div
                    key={item.id}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    style={{
                      borderRadius: 22,
                      overflow: "hidden",
                      border: "1px solid var(--border)",
                      background: "var(--surface)",
                      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    {/* Taller Video Thumbnail */}
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "16/9",
                        background: "#000",
                        overflow: "hidden",
                      }}
                    >
                      {isPlaying && embedUrl ? (
                        <iframe
                          src={embedUrl}
                          title={item.title}
                          referrerPolicy="no-referrer-when-downgrade"
                          style={{ width: "100%", height: "100%", border: 0 }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div
                          onClick={() => setPlayingVideoId(item.id)}
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={thumbnailUrl}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                            }}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.4s ease",
                            }}
                            onMouseOver={(e) => {
                              (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                            }}
                            onMouseOut={(e) => {
                              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "rgba(0,0,0,0.25)",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              top: 12,
                              left: 12,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                padding: "4px 10px",
                                borderRadius: 999,
                                background: isVertical ? "#FF0000" : "var(--gist-orange)",
                                color: "#FFFFFF",
                                textTransform: "uppercase",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              {isVertical ? <Smartphone size={12} /> : <Tv size={12} />}
                              {isVertical ? "Mobile Reel" : "Video"}
                            </span>
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              display: "grid",
                              placeItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: 56,
                                height: 56,
                                borderRadius: "50%",
                                background: "#FF0000",
                                color: "#FFFFFF",
                                display: "grid",
                                placeItems: "center",
                                boxShadow: "0 8px 24px rgba(255, 0, 0, 0.45)",
                              }}
                            >
                              <Play size={24} style={{ marginLeft: 3, fill: "#FFFFFF" }} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Caption Below */}
                    <div style={{ padding: "12px 16px" }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--navy-deep)" }}>
                        {item.title}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── SECTION 3: ALL MEDIA STREAM (COMBINED) ─── */}
        {activeTab === "all" && (
          <div>
            <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
              <Sparkles size={18} style={{ color: "var(--gist-orange)" }} />
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "var(--navy-deep)",
                  fontFamily: "var(--font-display)",
                  margin: 0,
                }}
              >
                All Department Media
              </h2>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "2px 10px",
                  borderRadius: 999,
                  background: "var(--surface-muted)",
                  color: "var(--navy-deep)",
                  marginLeft: 8,
                }}
              >
                {displayedMedia.length} items
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 18,
              }}
            >
              {displayedMedia.map((item, i) => {
                const isImage = item.type === "image";

                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (isImage) {
                        setLightboxIndex(i);
                      } else {
                        setPlayingVideoId(item.id);
                      }
                    }}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: Math.min(i * 0.02, 0.3) }}
                    style={{
                      display: "block",
                      width: "100%",
                      aspectRatio: "16/11",
                      padding: 0,
                      margin: 0,
                      border: "1px solid var(--border)",
                      borderRadius: 22,
                      overflow: "hidden",
                      cursor: "pointer",
                      background: "var(--surface-muted)",
                      position: "relative",
                      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05)",
                      outline: "none",
                    }}
                  >
                    <img
                      src={getMediaThumbnailUrl(item)}
                      alt={item.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
                      onMouseOver={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                      }}
                      onMouseOut={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                      }}
                    />
                    {!isImage && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "grid",
                          placeItems: "center",
                          background: "rgba(0,0,0,0.3)",
                        }}
                      >
                        <div
                          style={{
                            width: 52,
                            height: 52,
                            borderRadius: "50%",
                            background: "#FF0000",
                            color: "#FFFFFF",
                            display: "grid",
                            placeItems: "center",
                            boxShadow: "0 6px 20px rgba(255, 0, 0, 0.4)",
                          }}
                        >
                          <Play size={22} style={{ marginLeft: 2, fill: "#FFFFFF" }} />
                        </div>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── READY STATE IF NO ITEMS MATCH FILTER ─── */}
        {displayedMedia.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 24px",
              background: "var(--surface)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border)",
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            <Camera size={36} style={{ color: "var(--text-muted)", marginBottom: 12 }} />
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy-deep)" }}>
              No media items found
            </h3>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>
              Try selecting another category or switching to "Photo Gallery".
            </p>
            <button
              onClick={() => {
                setActiveTab("photos");
                setSelectedCategory("all");
              }}
              style={{
                marginTop: 16,
                fontSize: 13,
                fontWeight: 700,
                padding: "8px 18px",
                borderRadius: "var(--radius-md)",
                background: "var(--gist-orange)",
                color: "#FFFFFF",
                border: 0,
                cursor: "pointer",
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ─── FULLSCREEN LIGHTBOX SLIDESHOW & MEDIA VIEWER ─── */}
        <AnimatePresence>
          {currentItem && lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 99999,
                background: "rgba(11, 25, 44, 0.94)",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Gallery Viewer"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                type="button"
                aria-label="Close viewer"
                onClick={closeLightbox}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.15)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255,255,255,0.25)",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  zIndex: 20,
                  transition: "background 0.2s ease",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.3)";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.15)";
                }}
              >
                <X size={22} />
              </button>

              {/* Step Left / Previous */}
              <button
                type="button"
                aria-label="Previous item"
                onClick={(e) => {
                  e.stopPropagation();
                  stepLightbox(-1);
                }}
                style={{
                  position: "absolute",
                  left: 20,
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.15)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255,255,255,0.25)",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  zIndex: 20,
                }}
              >
                <ChevronLeft size={24} />
              </button>

              {/* Lightbox Main Content Container */}
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: currentItem.type === "image" ? 920 : 760,
                  maxHeight: "90vh",
                  background: "var(--surface)",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Media Display Area */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    maxHeight: currentItem.type === "image" ? "65vh" : "55vh",
                    background: "#000000",
                    display: "grid",
                    placeItems: "center",
                    overflow: "hidden",
                  }}
                >
                  {currentItem.type === "image" ? (
                    <img
                      src={currentItem.src}
                      alt={currentItem.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "65vh",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    getMediaEmbedUrl(currentItem, true) && (
                      <iframe
                        src={getMediaEmbedUrl(currentItem, true)!}
                        title={currentItem.title}
                        referrerPolicy="no-referrer-when-downgrade"
                        style={{
                          width: "100%",
                          height: "55vh",
                          aspectRatio: "16/9",
                          border: 0,
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )
                  )}
                </div>

                {/* Details Footer */}
                <div style={{ padding: "16px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: 10 }}>
                    <span style={{ fontSize: 12, color: "var(--navy-deep)", fontWeight: 700 }}>
                      {lightboxIndex + 1} of {displayedMedia.length}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      Date: <strong>{currentItem.date || "GIST CSE"}</strong>
                    </div>
                    <button
                      onClick={(e) => handleOpenLink(currentItem.src || OFFICIAL_GIST_LINKS.gallery, e)}
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "6px 14px",
                        borderRadius: "var(--radius-md)",
                        background: "var(--surface-muted)",
                        color: "var(--navy-deep)",
                        border: "1px solid var(--border)",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      Source Link <ExternalLink size={13} style={{ marginLeft: 4 }} />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Step Right / Next */}
              <button
                type="button"
                aria-label="Next item"
                onClick={(e) => {
                  e.stopPropagation();
                  stepLightbox(1);
                }}
                style={{
                  position: "absolute",
                  right: 20,
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.15)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255,255,255,0.25)",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  zIndex: 20,
                }}
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  );
}
