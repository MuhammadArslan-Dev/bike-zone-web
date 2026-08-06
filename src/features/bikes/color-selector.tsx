"use client";

import { cn } from "@/lib/utils";

export function ColorSelector({
  colors,
  selected,
  onSelect,
}: {
  colors: { name: string; hex: string }[];
  selected: string;
  onSelect: (name: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        Color —{" "}
        <span className="text-foreground font-semibold">{selected}</span>
      </p>
      <div className="flex items-center gap-2.5">
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            aria-label={color.name}
            aria-pressed={selected === color.name}
            onClick={() => onSelect(color.name)}
            className={cn(
              "ring-offset-background size-9 rounded-full ring-2 ring-offset-2 transition-all",
              selected === color.name
                ? "ring-primary scale-110"
                : "hover:ring-foreground/20 ring-transparent",
            )}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </div>
  );
}
