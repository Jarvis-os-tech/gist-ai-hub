"use client";

import { motion, useScroll, useSpring } from "motion/react";

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
}

/**
 * A scroll-driven progress bar that fills across the top of its parent.
 * Uses `useScroll` for tracking and `useSpring` for smooth physics-based interpolation.
 */
export function ScrollProgress({
  className = "",
  color = "var(--gist-orange)",
  height = 3,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`scroll-progress-bar ${className}`}
      style={{
        scaleX,
        transformOrigin: "0%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height,
        background: `linear-gradient(90deg, ${color}, var(--gold-soft))`,
        zIndex: 9999,
        willChange: "transform",
      }}
    />
  );
}
