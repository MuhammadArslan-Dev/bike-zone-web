"use client";

import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StarRating } from "@/components/ui/star-rating";
import { Eyebrow } from "@/components/ui/typography";
import { VIDEO_REVIEWS, type VideoReview } from "@/constants/gallery";

export function VideoReviews() {
  const [activeReview, setActiveReview] = useState<VideoReview | null>(null);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <Eyebrow>Video Reviews</Eyebrow>
          <h3 className="font-heading mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Hear it from our riders.
          </h3>
        </div>
        <Button variant="outline" asChild className="gap-2 self-start">
          <Link href="/reviews">
            View All Reviews <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {VIDEO_REVIEWS.map((review) => (
          <button
            key={review.id}
            type="button"
            onClick={() => setActiveReview(review)}
            className="hover-lift group relative flex flex-col overflow-hidden rounded-xl text-left"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={review.image}
                alt={review.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                  <Play className="size-6 fill-white text-white" />
                </span>
              </span>

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
                <StarRating rating={review.rating} />
                <p className="font-heading font-semibold text-white">
                  {review.name}
                </p>
                <p className="text-xs text-white/60">{review.location}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Dialog
        open={!!activeReview}
        onOpenChange={(open) => !open && setActiveReview(null)}
      >
        <DialogContent className="sm:max-w-lg">
          {activeReview && (
            <div className="flex flex-col gap-4">
              <DialogHeader className="flex-row items-center gap-4 space-y-0 text-left">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={activeReview.image}
                    alt={activeReview.name}
                    fill
                    sizes="4rem"
                    className="object-cover"
                  />
                </div>
                <div>
                  <DialogTitle>{activeReview.name}</DialogTitle>
                  <DialogDescription>{activeReview.location}</DialogDescription>
                  <StarRating rating={activeReview.rating} />
                </div>
              </DialogHeader>
              <p className="text-muted-foreground text-lg leading-relaxed italic">
                &ldquo;{activeReview.quote}&rdquo;
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
