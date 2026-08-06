import { GlassCard } from "@/components/ui/glass-card";
import type { Lender } from "@/types";

export function LenderCard({ lender }: { lender: Lender }) {
  return (
    <GlassCard className="p-6">
      <h3 className="font-heading text-lg font-bold">{lender.name}</h3>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        {lender.description}
      </p>

      <dl className="mt-5 flex flex-col gap-2.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">APR from</dt>
          <dd className="font-semibold">{lender.aprFrom}%</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Max tenure</dt>
          <dd className="font-semibold">{lender.maxTenureMonths} months</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Min down payment</dt>
          <dd className="font-semibold">
            {lender.minDownPaymentPercent}% of price
          </dd>
        </div>
      </dl>
    </GlassCard>
  );
}
