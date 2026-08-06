import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { MAINTENANCE_PACKAGES } from "@/constants/service";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/format";

export function MaintenancePackages({
  onBookPackage,
}: {
  onBookPackage: (packageId: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {MAINTENANCE_PACKAGES.map((pkg) => (
        <GlassCard
          key={pkg.id}
          className={cn(
            "relative flex flex-col gap-4 p-6",
            pkg.featured && "ring-primary ring-2",
          )}
        >
          {pkg.featured && (
            <Badge className="absolute top-4 right-4">Most Popular</Badge>
          )}

          <div>
            <h3 className="font-heading text-xl font-bold">{pkg.name}</h3>
            <p className="text-muted-foreground mt-1 text-xs tracking-wide uppercase">
              Every {pkg.intervalKm.toLocaleString()} km
            </p>
          </div>

          <p className="font-heading text-3xl font-bold">
            {formatPrice(pkg.price)}
          </p>

          <ul className="flex flex-1 flex-col gap-2 text-sm">
            {pkg.includes.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="text-primary mt-0.5 size-4 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Button
            variant={pkg.featured ? "default" : "outline"}
            onClick={() => onBookPackage(pkg.id)}
          >
            Book This Package
          </Button>
        </GlassCard>
      ))}
    </div>
  );
}
