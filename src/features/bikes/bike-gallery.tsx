"use client";

import { Expand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function BikeGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="group ring-foreground/10 relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-1"
      >
        <Image
          src={images[activeIndex]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="object-cover"
        />
        <span className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
          <Expand className="size-4" />
        </span>
      </button>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View photo ${index + 1}`}
              aria-pressed={activeIndex === index}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg ring-2 transition-colors",
                activeIndex === index
                  ? "ring-primary"
                  : "hover:ring-foreground/20 ring-transparent",
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={images[activeIndex]}
              alt={alt}
              fill
              sizes="(min-width: 640px) 48rem, 90vw"
              className="object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex justify-center gap-2">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View photo ${index + 1}`}
                  className={cn(
                    "size-2 rounded-full transition-colors",
                    activeIndex === index ? "bg-primary" : "bg-muted",
                  )}
                />
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
