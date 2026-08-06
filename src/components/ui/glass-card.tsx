import * as React from "react";

import { cn } from "@/lib/utils";

function GlassCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glass-card"
      className={cn(
        "text-card-foreground flex flex-col gap-4 rounded-xl border p-6",
        "border-[color-mix(in_oklch,var(--foreground)_12%,transparent)]",
        "bg-[color-mix(in_oklch,var(--foreground)_6%,transparent)]",
        "shadow-elevation-2 backdrop-blur-xl backdrop-saturate-150",
        className,
      )}
      {...props}
    />
  );
}

export { GlassCard };
