import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import {
  INTEGRATED_MEDIA_DATABASE,
  OFFICIAL_GIST_LINKS,
  getMediaThumbnailUrl,
  getMediaEmbedUrl,
} from "@/lib/media-fetcher";
import type { MediaContentItem } from "@/lib/types/media-content";
import {
  ExternalLink,
  X,
  GraduationCap,
  Youtube,
  Instagram,
  Globe,
  PlusCircle,
  Play,
  Film,
  Sparkles,
  Smartphone,
  Tv,
} from "lucide-react";
import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery & Activity Hub — CSE Department, GIST" },
      {
        name: "description",
        content:
          "Official activity hub for videos, reels, hackathons, coding contests, technical workshops, and laboratory sessions at CSE Department, GIST.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [activeItem, setActiveItem] = useState<MediaContentItem | null>(null);
  const [playingItemId, setPlayingItemId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const filteredMedia = INTEGRATED_MEDIA_DATABASE;

  const handleOpenLink = (url: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <PageShell
      eyebrow="Activity Hub & Gallery"
      title="CSE Department Gallery & Media Hub"
      description="Watch official department videos, lab reels, and event highlights right here."
      crumbs={[{ label: "Gallery & Media Hub" }]}
    >
      <div className="container-page" style={{ paddingTop: 40, paddingBottom: 88 }}>
        {/* ─── OFFICIAL PLATFORMS BADGE BAR ─── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 36,
            padding: "20px 24px",
            background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)",
            borderRadius: "var(--radius-lg)",
            color: "#FFFFFF",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <GraduationCap size={26} style={{ color: "var(--gold-soft)" }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 16 }}>Official GIST Outlets</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>
                Direct access to official Instagram, YouTube, and GIST website channels
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href={OFFICIAL_GIST_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{
                fontSize: 12,
                padding: "8px 16px",
                color: "#FFFFFF",
                borderColor: "rgba(255,255,255,0.25)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                textDecoration: "none",
              }}
            >
              <Instagram size={14} style={{ color: "#E4405F" }} /> Instagram
              @gist_nellore_official_insta ↗
            </a>
            <a
              href={OFFICIAL_GIST_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{
                fontSize: 12,
                padding: "8px 16px",
                color: "#FFFFFF",
                borderColor: "rgba(255,255,255,0.25)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                textDecoration: "none",
              }}
            >
              <Youtube size={14} style={{ color: "#FF0000" }} /> YouTube Channel ↗
            </a>
            <a
              href={OFFICIAL_GIST_LINKS.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                fontSize: 12,
                padding: "8px 18px",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                textDecoration: "none",
              }}
            >
              <Globe size={14} /> GIST Main Website ↗
            </a>
          </div>
        </motion.div>

        {/* ─── MEDIA GRID WITH INLINE PLAYING & THUMBNAILS ─── */}
        {filteredMedia.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <Sparkles size={18} style={{ color: "var(--gist-orange)" }} />
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--navy-deep)" }}>
                Featured Department Media & Videos
              </h3>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 28,
              }}
            >
              {filteredMedia.map((item, i) => {
                const isPlaying = playingItemId === item.id;
                const embedUrl = getMediaEmbedUrl(item, true);
                const thumbnailUrl = getMediaThumbnailUrl(item);
                const isVertical = item.aspectRatio === "vertical";

                return (
                  <motion.div
                    key={item.id}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.6), ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      borderRadius: "var(--radius-xl)",
                      overflow: "hidden",
                      border: "1px solid var(--border)",
                      background: "var(--surface)",
                      boxShadow: "var(--shadow-sm)",
                      transition: "var(--transition)",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                    }}
                  >
                    {/* Media Header / Player Section */}
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: isVertical ? "9/14" : "16/9",
                        maxHeight: isVertical ? 480 : "none",
                        background: "#000000",
                        overflow: "hidden",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      {isPlaying && embedUrl ? (
                        <iframe
                          src={embedUrl}
                          title={item.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            border: 0,
                          }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div
                          onClick={() => setPlayingItemId(item.id)}
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            overflow: "hidden",
                          }}
                        >
                          {/* Thumbnail Image */}
                          <img
                            src={thumbnailUrl}
                            alt={item.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: isVertical ? "contain" : "cover",
                              background: "#0F172A",
                              transition: "transform 0.3s ease",
                            }}
                            onMouseOver={(e) => {
                              (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                            }}
                            onMouseOut={(e) => {
                              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                            }}
                          />

                          {/* Gradient Overlay */}
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background:
                                "linear-gradient(to top, rgba(11,25,44,0.85) 0%, rgba(11,25,44,0.2) 60%, rgba(11,25,44,0.4) 100%)",
                            }}
                          />

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
                              zIndex: 2,
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
                                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                              }}
                            >
                              {isVertical ? <Smartphone size={12} /> : <Tv size={12} />}
                              {isVertical ? "Mobile Reel" : item.type}
                            </span>

                            <span
                              style={{
                                fontSize: 11,
                                color: "#FFFFFF",
                                background: "rgba(0,0,0,0.6)",
                                backdropFilter: "blur(4px)",
                                padding: "3px 8px",
                                borderRadius: 4,
                              }}
                            >
                              {item.date || "2026"}
                            </span>
                          </div>

                          {/* Big Centered Play Button */}
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              display: "grid",
                              placeItems: "center",
                              zIndex: 3,
                            }}
                          >
                            <div
                              style={{
                                width: 64,
                                height: 64,
                                borderRadius: "50%",
                                background: "#FF0000",
                                color: "#FFFFFF",
                                display: "grid",
                                placeItems: "center",
                                boxShadow: "0 8px 24px rgba(255, 0, 0, 0.45)",
                                transition: "transform 0.2s ease, background 0.2s ease",
                              }}
                              onMouseOver={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = "scale(1.12)";
                                (e.currentTarget as HTMLElement).style.background = "#D90429";
                              }}
                              onMouseOut={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                                (e.currentTarget as HTMLElement).style.background = "#FF0000";
                              }}
                            >
                              <Play size={28} style={{ marginLeft: 3, fill: "#FFFFFF" }} />
                            </div>
                          </div>

                          {/* Bottom Title Bar on Thumbnail */}
                          <div
                            style={{
                              position: "absolute",
                              bottom: 12,
                              left: 12,
                              right: 12,
                              zIndex: 2,
                              color: "#FFFFFF",
                            }}
                          >
                            <div
                              style={{
                                fontSize: 16,
                                fontWeight: 800,
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                textShadow: "0 2px 4px rgba(0,0,0,0.6)",
                              }}
                            >
                              {item.title}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Content & Action Bar */}
                    <div
                      style={{ padding: 18, display: "flex", flexDirection: "column", flexGrow: 1 }}
                    >
                      {item.description && (
                        <p
                          style={{
                            fontSize: 13,
                            color: "var(--text-muted)",
                            lineHeight: 1.5,
                            marginBottom: 16,
                          }}
                        >
                          {item.description}
                        </p>
                      )}

                      <div
                        style={{
                          marginTop: "auto",
                          display: "flex",
                          gap: 8,
                          paddingTop: 12,
                          borderTop: "1px solid var(--border)",
                        }}
                      >
                        <button
                          onClick={() => {
                            if (isPlaying) {
                              setPlayingItemId(null);
                            } else {
                              setPlayingItemId(item.id);
                            }
                          }}
                          className="btn btn-secondary"
                          style={{
                            fontSize: 12,
                            padding: "8px 14px",
                            flex: 1,
                            justifyContent: "center",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            cursor: "pointer",
                          }}
                        >
                          <Play size={13} style={{ fill: "currentColor" }} />
                          {isPlaying ? "Pause / Stop" : "Play Video Here"}
                        </button>

                        <button
                          onClick={() => setActiveItem(item)}
                          className="btn btn-ghost"
                          style={{
                            fontSize: 12,
                            padding: "8px 14px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            cursor: "pointer",
                          }}
                        >
                          <Film size={13} /> Expand
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── READY STATE — IF NO MEDIA ITEMS ─── */}
        {filteredMedia.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "72px 32px",
              background: "var(--surface)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
              maxWidth: 720,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "var(--gist-orange-subtle)",
                color: "var(--gist-orange)",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 20px",
              }}
            >
              <PlusCircle size={32} />
            </div>
            <h3
              style={{ fontSize: 22, fontWeight: 800, color: "var(--navy-deep)", marginBottom: 10 }}
            >
              Gallery Cleared & Ready for Your Section Items
            </h3>
            <p
              style={{
                fontSize: 15,
                color: "var(--text-muted)",
                lineHeight: 1.6,
                maxWidth: 540,
                marginInline: "auto",
              }}
            >
              The activity tabs and search filters have been removed. Official GIST outlets are
              active above. Provide your gallery details section wise whenever you are ready.
            </p>
          </div>
        )}

        {/* ─── LIGHTBOX MODAL WITH DIRECT INLINE PLAYER ─── */}
        <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(11, 25, 44, 0.92)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: activeItem.aspectRatio === "vertical" ? 420 : 780,
                background: "var(--surface)",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                border: "1px solid var(--border)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveItem(null)}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(11, 25, 44, 0.85)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  zIndex: 20,
                }}
              >
                <X size={18} />
              </button>

              {/* Lightbox Embedded Player */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: activeItem.aspectRatio === "vertical" ? "9 / 16" : "16 / 9",
                  maxHeight: activeItem.aspectRatio === "vertical" ? 560 : "none",
                  background: "#000000",
                }}
              >
                {getMediaEmbedUrl(activeItem, true) ? (
                  <iframe
                    src={getMediaEmbedUrl(activeItem, true)!}
                    title={activeItem.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      border: 0,
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={getMediaThumbnailUrl(activeItem)}
                    alt={activeItem.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
              </div>

              {/* Lightbox Info Section */}
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
                  <span
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
                    {activeItem.category}
                  </span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: "auto" }}>
                    {activeItem.date || "2026"}
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "var(--navy-deep)",
                    marginBottom: 8,
                  }}
                >
                  {activeItem.title}
                </h2>

                {activeItem.description && (
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--text-muted)",
                      lineHeight: 1.6,
                      marginBottom: 16,
                    }}
                  >
                    {activeItem.description}
                  </p>
                )}

                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={(e) =>
                      handleOpenLink(activeItem.src || OFFICIAL_GIST_LINKS.website, e)
                    }
                    className="btn btn-ghost"
                    style={{
                      fontSize: 12,
                      padding: "8px 16px",
                      width: "100%",
                      justifyContent: "center",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    Open on YouTube ↗ <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </PageShell>
  );
}
