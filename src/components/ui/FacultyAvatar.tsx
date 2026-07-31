"use client";

import { useState } from "react";

interface FacultyAvatarProps {
  src?: string;
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FacultyAvatar({
  src,
  name,
  size = 56,
  className = "",
  style = {},
}: FacultyAvatarProps) {
  const [imgError, setImgError] = useState(false);

  const initials = name
    .replace(/^(Dr\.|Mr\.|Ms\.)\s*/, "")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  const showImage = src && !imgError && src !== "/gist-logo.jpg";

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        backgroundColor: "var(--navy-deep)",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: Math.max(12, Math.floor(size * 0.36)),
        border: "2px solid var(--gist-orange)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        position: "relative",
        ...style,
      }}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          onError={() => setImgError(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
