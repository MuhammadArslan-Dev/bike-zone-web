"use client";

import { Star } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered ?? value;

  return (
    <div
      className="flex items-center gap-1"
      onMouseLeave={() => setHovered(null)}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={starValue}
            type="button"
            aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
            aria-pressed={value === starValue}
            onMouseEnter={() => setHovered(starValue)}
            onClick={() => onChange(starValue)}
            className="p-0.5"
          >
            <Star
              className={cn(
                "size-6 transition-colors",
                starValue <= display
                  ? "fill-accent text-accent"
                  : "text-muted-foreground",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
