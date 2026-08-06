import { Cog, Fuel, Gauge, Weight, Zap } from "lucide-react";
import type { ComponentType } from "react";

import { GlassCard } from "@/components/ui/glass-card";
import type { Motorcycle } from "@/types";

function SpecTile({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <GlassCard className="flex flex-row items-center gap-3 p-4">
      <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-muted-foreground text-xs tracking-wide uppercase">
          {label}
        </p>
        <p className="font-heading text-lg font-bold">{value}</p>
      </div>
    </GlassCard>
  );
}

export function SpecGrid({ bike }: { bike: Motorcycle }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <SpecTile icon={Cog} label="Engine" value={`${bike.cc}cc`} />
      <SpecTile icon={Zap} label="Power" value={`${bike.power} hp`} />
      <SpecTile
        icon={Gauge}
        label="Top Speed"
        value={`${bike.topSpeed} km/h`}
      />
      <SpecTile icon={Fuel} label="Mileage" value={`${bike.mileage} km/l`} />
      <SpecTile icon={Weight} label="Weight" value={`${bike.weight} kg`} />
    </div>
  );
}
