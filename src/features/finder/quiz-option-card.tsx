"use client";

import type { ComponentType } from "react";

import { cn } from "@/lib/utils";

type QuizOptionCardProps = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  description?: string;
  selected?: boolean;
  onClick: () => void;
};

export function QuizOptionCard({
  icon: Icon,
  label,
  description,
  selected,
  onClick,
}: QuizOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "hover-lift flex flex-col items-start gap-3 rounded-xl border p-5 text-left transition-colors",
        selected
          ? "border-primary bg-primary/10 ring-primary ring-2"
          : "border-border bg-card hover:border-primary/40",
      )}
    >
      <span
        className={cn(
          "flex size-11 items-center justify-center rounded-full transition-colors",
          selected
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
        )}
      >
        <Icon className="size-5" />
      </span>
      <div>
        <p className="font-heading font-semibold">{label}</p>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
    </button>
  );
}
