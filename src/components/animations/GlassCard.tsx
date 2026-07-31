"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, type ReactNode, type CSSProperties } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hoverEffect?: "lift" | "glow" | "tilt" | "none";
}

export function GlassCard({
  children,
  className = "",
  glow = false,
  hoverEffect = "lift",
}: GlassCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduce || hoverEffect !== "tilt" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
    }
  };

  return (
    <motion.div
      ref={ref as any}
      className={`
        relative
        bg-white/70 dark:bg-white/10
        backdrop-blur-xl
        border border-white/30 dark:border-white/10
        rounded-[var(--radius-xl)]
        p-7
        shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)]
        dark:shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]
        transition-all duration-500 ease-out
        ${glow ? "card-glow" : ""}
        ${
          hoverEffect === "lift"
            ? "hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(228,92,4,0.12),inset_0_1px_0_rgba(255,255,255,0.6)] hover:border-[var(--gist-orange)]/40"
            : ""
        }
        ${hoverEffect === "glow" ? "hover:shadow-[0_0_40px_rgba(228,92,4,0.15)]" : ""}
        ${className}
      `}
      style={{
        transformStyle: hoverEffect === "tilt" ? "preserve-3d" : undefined,
        transition: reduce ? "none" : undefined,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={reduce ? {} : hoverEffect === "lift" ? { y: -6 } : {}}
    >
      {/* Edge highlight */}
      <div
        className="absolute inset-[1px] rounded-[inherit] pointer-events-none"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.15)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </motion.div>
  );
}

interface ParticleFieldProps {
  quantity?: number;
  className?: string;
}

export function ParticleField({ quantity = 20, className = "" }: ParticleFieldProps) {
  const reduce = useReducedMotion();

  if (reduce) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: quantity }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 3 === 0
              ? "rgba(228, 92, 4, 0.3)"
              : i % 3 === 1
              ? "rgba(212, 175, 55, 0.2)"
              : "rgba(255, 255, 255, 0.15)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -200 - 100, 0],
            x: [0, (Math.random() - 0.5) * 100, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 15,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

interface GradientOrbProps {
  className?: string;
  color?: string;
  size?: number;
  delay?: number;
  style?: CSSProperties;
}

export function GradientOrb({
  className = "",
  color = "rgba(228, 92, 4, 0.08)",
  size = 400,
  delay = 0,
  style,
}: GradientOrbProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(60px)",
        ...style,
      }}
      animate={
        reduce
          ? {}
          : {
              x: [0, 30, -20, 20, 0],
              y: [0, -30, 20, -20, 0],
              scale: [1, 1.05, 0.95, 1.02, 1],
            }
      }
      transition={{
        duration: 20,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}
