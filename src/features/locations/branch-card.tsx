import { Clock, Navigation, Phone } from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import type { Branch } from "@/types";

export function BranchCard({
  branch,
  isNearest,
}: {
  branch: Branch;
  isNearest: boolean;
}) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`;

  return (
    <GlassCard className={cn("gap-3 p-6", isNearest && "ring-primary ring-2")}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading text-lg font-bold">{branch.name}</h3>
        {isNearest && (
          <span className="bg-primary text-primary-foreground shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold">
            Nearest
          </span>
        )}
      </div>

      <div className="text-muted-foreground flex flex-col gap-2 text-sm">
        <span className="flex items-center gap-2">
          <Phone className="size-4 shrink-0" /> {branch.phone}
        </span>
        <span className="flex items-center gap-2">
          <Clock className="size-4 shrink-0" /> {branch.hours}
        </span>
      </div>

      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary mt-2 flex items-center gap-1.5 text-sm font-medium hover:underline"
      >
        <Navigation className="size-4" />
        Get Directions
      </a>
    </GlassCard>
  );
}
