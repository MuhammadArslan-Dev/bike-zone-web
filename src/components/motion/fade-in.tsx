"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSETS: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
};

type FadeInProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  /** Set false for above-the-fold content that should animate in on mount
   * instead of waiting to scroll into view (e.g. hero sections). */
  inView?: boolean;
};

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  inView = true,
}: FadeInProps) {
  const offset = OFFSETS[direction];
  const target = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      {...(inView
        ? { whileInView: target, viewport: { once, margin: "-80px" } }
        : { animate: target })}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
