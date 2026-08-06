"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const BAR_COUNT = 24;

export function SoundVisualizer({
  analyserRef,
  className,
}: {
  analyserRef: React.RefObject<AnalyserNode | null>;
  className?: string;
}) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let rafId: number;

    function tick() {
      const analyser = analyserRef.current;
      if (analyser) {
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        for (let i = 0; i < BAR_COUNT; i++) {
          const index = Math.floor((i / BAR_COUNT) * data.length);
          const level = data[index] / 255;
          const bar = barsRef.current[i];
          if (bar) {
            bar.style.height = `${Math.max(8, level * 100)}%`;
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [analyserRef]);

  return (
    <div
      className={cn("flex h-28 items-end justify-center gap-1.5", className)}
    >
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            barsRef.current[i] = el;
          }}
          className="bg-gradient-primary w-2 rounded-full transition-[height] duration-75"
          style={{ height: "8%" }}
        />
      ))}
    </div>
  );
}
