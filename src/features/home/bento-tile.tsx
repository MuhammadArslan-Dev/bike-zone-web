import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

export function BentoTile({
  label,
  title,
  icon: Icon,
  children,
  className,
}: {
  label: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <GlassCard className={cn("flex h-full flex-col gap-4 p-5", className)}>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="text-primary size-4" />}
        <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          {label}
        </p>
      </div>
      <h3 className="font-heading -mt-2 text-xl font-bold tracking-tight">
        {title}
      </h3>
      <div className="flex flex-1 flex-col">{children}</div>
    </GlassCard>
  );
}
