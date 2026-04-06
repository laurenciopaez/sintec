"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useConstants } from "@/lib/use-translations";
import { STATS } from "@/lib/constants";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

function useCountUp(
  target: number,
  duration: number = 2000,
  active: boolean = false
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    const startTime = performance.now();
    const startValue = 0;

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.round(startValue + (target - startValue) * eased);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [target, duration, active]);

  return count;
}

interface StatCardProps {
  stat: (typeof STATS)[0];
  index: number;
  active: boolean;
}

function StatCard({ stat, index, active }: StatCardProps) {
  const count = useCountUp(stat.value, 2000, active);

  return (
    <motion.div
      className="text-center px-6 py-8 relative"
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Divider for desktop */}
      {index > 0 && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-16 w-px bg-white/10 hidden lg:block" />
      )}

      {/* Number */}
      <div className="flex items-baseline justify-center gap-1 mb-3">
        <span className="text-5xl sm:text-6xl font-bold text-white tabular-nums">
          {stat.prefix}
          {active ? count : 0}
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <div className="text-lg font-semibold text-white mb-2">{stat.label}</div>

      {/* Description */}
      <div className="text-sm text-white/50">{stat.description}</div>
    </motion.div>
  );
}

export function Stats() {
  const { STATS, STATS_SECTION: s } = useConstants();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-24 lg:py-32 bg-[#001514] relative overflow-hidden" id="stats">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#001514] via-[#0A1045] to-[#001514]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#297373]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#297373]/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#297373]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection variant="slideUp" className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#A33400]" />
            <span className="text-[#A33400] text-sm font-medium tracking-widest uppercase">
              {s.tag}
            </span>
            <div className="h-px w-8 bg-[#A33400]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {s.heading}
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            {s.subheading}
          </p>
        </AnimatedSection>

        {/* Stats Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 lg:gap-0 border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm"
        >
          {STATS.map((stat, index) => (
            <div
              key={stat.id}
              className={`${
                index < STATS.length - 1
                  ? "border-b lg:border-b-0 lg:border-r border-white/10"
                  : ""
              }`}
            >
              <StatCard stat={stat} index={index} active={isInView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
