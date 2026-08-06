"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  ShowroomHotspot,
  type Hotspot,
} from "@/features/home/showroom-hotspot";
import { cn } from "@/lib/utils";
import type { Motorcycle } from "@/types";
import { formatPrice } from "@/utils/format";

function buildHotspots(bike: Motorcycle): Hotspot[] {
  return [
    {
      id: "engine",
      top: "52%",
      left: "45%",
      label: "Engine",
      value: `${bike.cc}cc`,
    },
    {
      id: "power",
      top: "60%",
      left: "35%",
      label: "Power",
      value: `${bike.power} hp`,
    },
    {
      id: "topspeed",
      top: "58%",
      left: "70%",
      label: "Top Speed",
      value: `${bike.topSpeed} km/h`,
    },
    {
      id: "weight",
      top: "58%",
      left: "18%",
      label: "Weight",
      value: `${bike.weight} kg`,
    },
    {
      id: "price",
      top: "28%",
      left: "52%",
      label: "Price",
      value: formatPrice(bike.price),
    },
  ];
}

export function ShowroomViewer({
  bike,
  image,
}: {
  bike: Motorcycle;
  image: string;
}) {
  const rotateY = useMotionValue(0);
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });
  const dragState = useRef({ dragging: false, startX: 0, startRotate: 0 });
  const [isDragging, setIsDragging] = useState(false);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    dragState.current = {
      dragging: true,
      startX: event.clientX,
      startRotate: rotateY.get(),
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current.dragging) return;
    const delta = event.clientX - dragState.current.startX;
    const next = dragState.current.startRotate + delta * 0.3;
    rotateY.set(Math.max(-35, Math.min(35, next)));
  }

  function handlePointerUp() {
    dragState.current.dragging = false;
    setIsDragging(false);
    rotateY.set(0);
  }

  return (
    <div className="relative">
      <div className="bg-radial-glow absolute inset-0 opacity-70" />

      <div
        className={cn(
          "relative mx-auto aspect-square w-full max-w-xl touch-none select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        style={{ perspective: 1200 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <motion.div
          style={{ rotateY: springRotateY }}
          className="relative h-full w-full overflow-hidden rounded-2xl"
        >
          <Image
            src={image}
            alt={`${bike.brand} ${bike.name}`}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
            draggable={false}
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0">
          {buildHotspots(bike).map((hotspot) => (
            <div key={hotspot.id} className="pointer-events-auto">
              <ShowroomHotspot {...hotspot} />
            </div>
          ))}
        </div>

        <Badge
          variant="secondary"
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          Drag to preview · Full 360° coming soon
        </Badge>
      </div>
    </div>
  );
}
