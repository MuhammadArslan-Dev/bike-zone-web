"use client";

import { useState } from "react";

import { Chip } from "@/components/ui/chip";
import { Eyebrow } from "@/components/ui/typography";
import { ACCESSORIES, ACCESSORY_CATEGORIES } from "@/constants/accessories";
import { AccessoryCard } from "@/features/accessories/accessory-card";
import { AccessoryEnquiryModal } from "@/features/accessories/accessory-enquiry-modal";
import type { Accessory } from "@/types";

export function AccessoriesStore() {
  const [activeCategory, setActiveCategory] = useState<
    Accessory["category"] | "All"
  >("All");
  const [enquiryAccessory, setEnquiryAccessory] = useState<Accessory | null>(
    null,
  );

  const filtered =
    activeCategory === "All"
      ? ACCESSORIES
      : ACCESSORIES.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-8xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <Eyebrow>Gear Up</Eyebrow>
        <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Accessories store.
        </h1>
        <p className="text-muted-foreground mt-2">
          Helmets, jackets, gloves, luggage, and parts — everything you need to
          ride safer and further.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <Chip
          selected={activeCategory === "All"}
          onClick={() => setActiveCategory("All")}
        >
          All
        </Chip>
        {ACCESSORY_CATEGORIES.map((category) => (
          <Chip
            key={category}
            selected={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Chip>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((accessory) => (
          <AccessoryCard
            key={accessory.id}
            accessory={accessory}
            onEnquire={() => setEnquiryAccessory(accessory)}
          />
        ))}
      </div>

      <AccessoryEnquiryModal
        accessory={enquiryAccessory}
        onOpenChange={(open) => !open && setEnquiryAccessory(null)}
      />
    </div>
  );
}
