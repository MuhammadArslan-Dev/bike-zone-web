"use client";

import { Plus } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export type Hotspot = {
  id: string;
  top: string;
  left: string;
  label: string;
  value: string;
};

export function ShowroomHotspot({ top, left, label, value }: Hotspot) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ top, left }}
    >
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={`${label}: ${value}`}
            className="bg-primary text-primary-foreground shadow-elevation-2 relative flex size-8 items-center justify-center rounded-full transition-transform hover:scale-110"
          >
            <span className="bg-primary/60 absolute inset-0 animate-ping rounded-full" />
            <Plus className="relative size-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-44">
          <PopoverDescription className="text-xs tracking-wide uppercase">
            {label}
          </PopoverDescription>
          <PopoverTitle className="font-heading text-lg">{value}</PopoverTitle>
        </PopoverContent>
      </Popover>
    </div>
  );
}
