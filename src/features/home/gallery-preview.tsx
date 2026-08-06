"use client";

import { Images } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GALLERY_PHOTOS } from "@/constants/gallery";
import { BentoTile } from "@/features/home/bento-tile";
import { GalleryMasonry } from "@/features/home/gallery-masonry";

const PREVIEW_COUNT = 6;

export function GalleryPreview() {
  const [fullGalleryOpen, setFullGalleryOpen] = useState(false);
  const preview = GALLERY_PHOTOS.slice(0, PREVIEW_COUNT);

  return (
    <>
      <BentoTile
        label="Real Riders, Real Stories"
        title="Delivery Gallery"
        icon={Images}
      >
        <button
          type="button"
          onClick={() => setFullGalleryOpen(true)}
          className="grid grid-cols-3 gap-1.5"
        >
          {preview.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-square overflow-hidden rounded-md"
            >
              <Image
                src={photo.image}
                alt={photo.caption}
                fill
                sizes="120px"
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          ))}
        </button>

        <Button
          variant="outline"
          onClick={() => setFullGalleryOpen(true)}
          className="mt-4 w-full"
        >
          View Gallery
        </Button>
      </BentoTile>

      <Dialog open={fullGalleryOpen} onOpenChange={setFullGalleryOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Customer delivery gallery</DialogTitle>
            <DialogDescription>
              Moments from delivery day, shared by the riders who lived them.
            </DialogDescription>
          </DialogHeader>
          <GalleryMasonry />
        </DialogContent>
      </Dialog>
    </>
  );
}
