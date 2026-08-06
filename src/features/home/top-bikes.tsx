import { ArrowRight, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FEATURED_MOTORCYCLES } from "@/constants/motorcycles";
import { BentoTile } from "@/features/home/bento-tile";

const TOP_COUNT = 5;

export function TopBikes() {
  const ranked = [...FEATURED_MOTORCYCLES]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, TOP_COUNT);

  return (
    <BentoTile label="Most Popular" title="Top Bikes" icon={Trophy}>
      <ol className="flex flex-1 flex-col gap-2">
        {ranked.map((bike, index) => (
          <li key={bike.id} className="flex items-center gap-3">
            <span
              className={`font-heading flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                index === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </span>
            <div className="relative size-10 shrink-0 overflow-hidden rounded-md">
              <Image
                src={bike.image}
                alt={`${bike.brand} ${bike.name}`}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <span className="truncate text-sm font-medium">
              {bike.brand} {bike.name}
            </span>
          </li>
        ))}
      </ol>

      <Button variant="outline" asChild className="mt-4 w-full gap-2">
        <Link href="/collection">
          View Top Bikes <ArrowRight className="size-4" />
        </Link>
      </Button>
    </BentoTile>
  );
}
