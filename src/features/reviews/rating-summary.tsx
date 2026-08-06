import { GlassCard } from "@/components/ui/glass-card";
import { StarRating } from "@/components/ui/star-rating";
import type { RatingSummary as RatingSummaryType } from "@/lib/reviews";

export function RatingSummary({ summary }: { summary: RatingSummaryType }) {
  return (
    <GlassCard className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-[auto_1fr] sm:p-8">
      <div className="flex flex-col items-center justify-center gap-2 sm:items-start">
        <p className="font-heading text-5xl font-bold">
          {summary.average.toFixed(1)}
        </p>
        <StarRating rating={Math.round(summary.average)} size="lg" />
        <p className="text-muted-foreground text-sm">
          Based on {summary.total} reviews
        </p>
      </div>

      <div className="flex flex-col justify-center gap-2">
        {([5, 4, 3, 2, 1] as const).map((star) => {
          const count = summary.distribution[star];
          const percent = summary.total ? (count / summary.total) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground w-10 shrink-0">
                {star} star
              </span>
              <div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
                <div
                  className="bg-accent h-full rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-muted-foreground w-6 shrink-0 text-right">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
