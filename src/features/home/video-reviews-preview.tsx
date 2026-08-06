"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { StarRating } from "@/components/ui/star-rating";
import { VIDEO_REVIEWS } from "@/constants/gallery";
import { BentoTile } from "@/features/home/bento-tile";
import { VideoReviews } from "@/features/home/video-reviews";

const PREVIEW_COUNT = 3;

export function VideoReviewsPreview() {
  const [fullOpen, setFullOpen] = useState(false);
  const preview = VIDEO_REVIEWS.slice(0, PREVIEW_COUNT);

  return (
    <>
      <BentoTile label="Testimonials" title="Video Reviews" icon={Play}>
        <button
          type="button"
          onClick={() => setFullOpen(true)}
          className="flex flex-1 flex-col justify-center gap-3 text-left"
        >
          {preview.map((review) => (
            <div key={review.id} className="flex items-center gap-3">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={review.image}
                  alt={review.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{review.name}</p>
                <StarRating rating={review.rating} />
              </div>
              <Play className="text-muted-foreground size-4 shrink-0" />
            </div>
          ))}
        </button>

        <Button
          variant="outline"
          onClick={() => setFullOpen(true)}
          className="mt-4 w-full"
        >
          View All Videos
        </Button>
      </BentoTile>

      <Dialog open={fullOpen} onOpenChange={setFullOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-4xl">
          <DialogTitle className="sr-only">Video reviews</DialogTitle>
          <VideoReviews />
        </DialogContent>
      </Dialog>
    </>
  );
}
