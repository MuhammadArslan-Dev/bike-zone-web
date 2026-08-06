import { BadgeCheck } from "lucide-react";
import Image from "next/image";

import { GlassCard } from "@/components/ui/glass-card";
import { StarRating } from "@/components/ui/star-rating";
import type { Testimonial } from "@/constants/reviews";

export function TestimonialCard({ review }: { review: Testimonial }) {
  return (
    <GlassCard className="flex h-full flex-col gap-4 p-6">
      <div className="flex items-center gap-3">
        <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
          <Image
            src={review.image}
            alt={review.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="font-heading truncate font-semibold">{review.name}</p>
            {review.verified && (
              <BadgeCheck className="text-primary size-4 shrink-0" />
            )}
          </div>
          <p className="text-muted-foreground text-xs">{review.location}</p>
        </div>
      </div>

      <StarRating rating={review.rating} size="md" />

      <p className="text-muted-foreground flex-1 text-sm leading-relaxed italic">
        &ldquo;{review.quote}&rdquo;
      </p>

      <p className="text-muted-foreground border-border border-t pt-3 text-xs">
        {review.bikeModel} ·{" "}
        {new Date(review.date).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </p>
    </GlassCard>
  );
}
