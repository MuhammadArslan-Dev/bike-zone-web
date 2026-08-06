import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Accessory } from "@/types";
import { formatPrice } from "@/utils/format";

export function AccessoryCard({
  accessory,
  onEnquire,
}: {
  accessory: Accessory;
  onEnquire: () => void;
}) {
  return (
    <div className="group bg-card shadow-elevation-1 ring-foreground/10 hover:shadow-elevation-3 flex h-full flex-col overflow-hidden rounded-xl ring-1 transition-shadow">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={accessory.image}
          alt={accessory.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <Badge className="absolute top-3 left-3">{accessory.category}</Badge>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <h3 className="font-heading text-lg font-bold">{accessory.name}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {accessory.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-heading text-xl font-bold">
            {formatPrice(accessory.price)}
          </span>
          <Button size="sm" variant="outline" onClick={onEnquire}>
            Enquire
          </Button>
        </div>
      </div>
    </div>
  );
}
