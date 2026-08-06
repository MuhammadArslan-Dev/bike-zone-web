"use client";

import { HERO_STATS } from "@/constants/filters";
import { useCountUp } from "@/hooks/use-count-up";

function StatItem({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const count = useCountUp({ end: value, duration: 1800, delay });

  return (
    <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
      <span className="font-heading text-3xl font-bold text-white sm:text-4xl">
        {count}
        {suffix}
      </span>
      <span className="text-xs tracking-wide text-white/60 uppercase sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export function HeroStats() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-10">
      {HERO_STATS.map((stat, index) => (
        <StatItem key={stat.label} {...stat} delay={index * 150} />
      ))}
    </div>
  );
}
