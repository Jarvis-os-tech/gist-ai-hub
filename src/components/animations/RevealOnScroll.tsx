"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  once?: boolean;
}

const directionVariants = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: -60 },
  right: { x: 60 },
};

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.7,
  once = true,
}: RevealOnScrollProps) {
  const reduce = useReducedMotion();
  const variant = directionVariants[direction];

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, ...variant }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration: reduce ? 0 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
  once = true,
}: StaggerContainerProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, amount: 0.1 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
  baseDelay?: number;
  staggerDelay?: number;
}

export function StaggerItem({
  children,
  className = "",
  index = 0,
  baseDelay = 0,
  staggerDelay = 0.08,
}: StaggerItemProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: reduce ? 0 : 0.6,
        delay: baseDelay + index * staggerDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
