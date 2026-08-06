"use client";

import { useEffect, useState } from "react";

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
};

const INITIAL: CountdownParts = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isComplete: false,
};

function getParts(target: Date): CountdownParts {
  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isComplete: false,
  };
}

/**
 * Hydration-safe countdown: always starts from a zeroed state (matching the
 * server-rendered markup) and only computes real values after mount, so the
 * client's first paint never mismatches the server's.
 */
export function useCountdown(targetDate: string) {
  const [parts, setParts] = useState<CountdownParts>(INITIAL);

  useEffect(() => {
    const target = new Date(targetDate);
    queueMicrotask(() => setParts(getParts(target)));

    const interval = setInterval(() => {
      setParts(getParts(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return parts;
}
