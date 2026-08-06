"use client";

import { Box } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FEATURED_MOTORCYCLES } from "@/constants/motorcycles";
import { BentoTile } from "@/features/home/bento-tile";
import { ShowroomViewer } from "@/features/home/showroom-viewer";

const SHOWROOM_IMAGE =
  "https://images.unsplash.com/photo-1570306296747-f7bb428e4fe0?q=80&w=1600&auto=format&fit=crop";

export function VirtualShowroom() {
  const [open, setOpen] = useState(false);
  const bike =
    FEATURED_MOTORCYCLES.find((item) => item.id === "kawasaki-ninja300") ??
    FEATURED_MOTORCYCLES[0];

  return (
    <>
      <BentoTile label="360 Preview" title="Virtual Showroom" icon={Box}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative aspect-video w-full overflow-hidden rounded-lg"
        >
          <Image
            src={SHOWROOM_IMAGE}
            alt={`${bike.brand} ${bike.name}`}
            fill
            sizes="(min-width: 1024px) 20vw, 90vw"
            className="object-cover"
          />
        </button>

        <p className="text-muted-foreground mt-3 text-sm">
          Drag to tilt the {bike.brand} {bike.name} and tap the markers to
          explore its specs.
        </p>

        <Button onClick={() => setOpen(true)} className="mt-4 w-full">
          Enter Showroom
        </Button>
      </BentoTile>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogTitle className="sr-only">
            Virtual showroom — {bike.brand} {bike.name}
          </DialogTitle>
          <ShowroomViewer bike={bike} image={SHOWROOM_IMAGE} />
        </DialogContent>
      </Dialog>
    </>
  );
}
