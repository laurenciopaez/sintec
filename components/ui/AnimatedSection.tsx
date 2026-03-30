"use client";

import React from "react";
import { motion, useInView, Variants } from "framer-motion";

type AnimationVariant =
  | "fadeIn"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleIn"
  | "none";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  as?: React.ElementType;
  id?: string;
}

const animationVariants: Record<AnimationVariant, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  none: {
    hidden: {},
    visible: {},
  },
};

export function AnimatedSection({
  children,
  className = "",
  variant = "slideUp",
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.1,
  as: Component = "div",
  id,
}: AnimatedSectionProps) {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  const MotionComponent = React.useMemo(
    () => motion(Component as React.ElementType),
    [Component]
  );

  return (
    <MotionComponent
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animationVariants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </MotionComponent>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  once?: boolean;
  threshold?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  initialDelay = 0,
  once = true,
  threshold = 0.05,
}: StaggerContainerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}

export default AnimatedSection;
