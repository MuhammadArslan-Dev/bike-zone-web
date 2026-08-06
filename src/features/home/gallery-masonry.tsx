"use client";

import Image from "next/image";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  GALLERY_PHOTOS,
  type GalleryAspect,
  type GalleryPhoto,
} from "@/constants/gallery";
import { cn } from "@/lib/utils";

const ASPECT_CLASSES: Record<GalleryAspect, string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  tall: "aspect-[2/3]",
  landscape: "aspect-[4/3]",
};

export function GalleryMasonry() {
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        {GALLERY_PHOTOS.map((photo) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActivePhoto(photo)}
            className={cn(
              "group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl",
              ASPECT_CLASSES[photo.aspect],
            )}
          >
            <Image
              src={photo.image}
              alt={photo.caption}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-sm font-semibold text-white">
                {photo.customerName}
              </p>
              <p className="text-xs text-white/70">{photo.bikeModel}</p>
            </div>
          </button>
        ))}
      </div>

      <Dialog
        open={!!activePhoto}
        onOpenChange={(open) => !open && setActivePhoto(null)}
      >
        <DialogContent className="sm:max-w-2xl">
          {activePhoto && (
            <>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={activePhoto.image}
                  alt={activePhoto.caption}
                  fill
                  sizes="(min-width: 640px) 42rem, 90vw"
                  className="object-cover"
                />
              </div>
              <DialogHeader>
                <DialogTitle>{activePhoto.customerName}</DialogTitle>
                <DialogDescription>{activePhoto.bikeModel}</DialogDescription>
              </DialogHeader>
              <p className="text-sm">{activePhoto.caption}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
