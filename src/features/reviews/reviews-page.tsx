"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Eyebrow } from "@/components/ui/typography";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { FadeIn } from "@/components/motion/fade-in";
import { TESTIMONIALS } from "@/constants/reviews";
import { RatingSummary } from "@/features/reviews/rating-summary";
import { TestimonialCard } from "@/features/reviews/testimonial-card";
import { WriteReviewModal } from "@/features/reviews/write-review-modal";
import { getRatingSummary } from "@/lib/reviews";

const RATING_FILTERS = [5, 4, 3, 2, 1] as const;

export function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState<number | "all">("all");
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);

  const summary = getRatingSummary(TESTIMONIALS);
  const filtered =
    activeFilter === "all"
      ? TESTIMONIALS
      : TESTIMONIALS.filter((review) => review.rating === activeFilter);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn inView={false}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Real Riders, Real Stories</Eyebrow>
            <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Customer reviews.
            </h1>
            <p className="text-muted-foreground mt-2">
              Every review is from a verified BikeZone customer — good and bad,
              we publish it all.
            </p>
          </div>
          <Button
            onClick={() => setWriteReviewOpen(true)}
            className="self-start"
          >
            Write a Review
          </Button>
        </div>
      </FadeIn>

      <div className="mt-10">
        <RatingSummary summary={summary} />
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        <Chip
          selected={activeFilter === "all"}
          onClick={() => setActiveFilter("all")}
        >
          All Reviews
        </Chip>
        {RATING_FILTERS.map((star) => (
          <Chip
            key={star}
            selected={activeFilter === star}
            onClick={() => setActiveFilter(star)}
          >
            {star} Star{star > 1 ? "s" : ""}
          </Chip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground mt-16 text-center">
          No reviews at this rating yet.
        </p>
      ) : (
        <ScrollReveal
          key={activeFilter}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((review) => (
            <TestimonialCard key={review.id} review={review} />
          ))}
        </ScrollReveal>
      )}

      <WriteReviewModal
        open={writeReviewOpen}
        onOpenChange={setWriteReviewOpen}
      />
    </div>
  );
}
