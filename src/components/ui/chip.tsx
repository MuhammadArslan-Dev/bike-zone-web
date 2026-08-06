"use client";

import { X } from "lucide-react";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

type ChipProps = React.ComponentProps<"button"> & {
  selected?: boolean;
  onRemove?: () => void;
  asChild?: boolean;
};

function Chip({
  className,
  selected = false,
  onRemove,
  asChild = false,
  children,
  ...props
}: ChipProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      type={asChild ? undefined : "button"}
      data-slot="chip"
      aria-pressed={selected}
      className={cn(
        "focus-visible:ring-ring/50 inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-3",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:bg-muted",
        className,
      )}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {children}
          {onRemove && (
            <span
              role="button"
              tabIndex={-1}
              aria-label="Remove"
              onClick={(event) => {
                event.stopPropagation();
                onRemove();
              }}
              className={cn(
                "-mr-1 inline-flex size-4 items-center justify-center rounded-full transition-colors",
                selected
                  ? "hover:bg-primary-foreground/20"
                  : "hover:bg-foreground/10",
              )}
            >
              <X className="size-3" />
            </span>
          )}
        </>
      )}
    </Comp>
  );
}

export { Chip };
