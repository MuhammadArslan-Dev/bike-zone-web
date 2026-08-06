"use client";

import { ArrowRight, LocateFixed, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BRANCHES } from "@/constants/branches";
import { BentoTile } from "@/features/home/bento-tile";
import { useNearestBranch } from "@/hooks/use-nearest-branch";

const DealerLocatorMap = dynamic(
  () => import("@/features/home/dealer-locator-map"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-muted flex size-full items-center justify-center rounded-lg text-sm">
        Loading map…
      </div>
    ),
  },
);

export function DealerLocator() {
  const { nearestId, status, findNearest } = useNearestBranch();

  return (
    <BentoTile label="Find a Branch" title="Dealer Locator" icon={MapPin}>
      <div className="ring-foreground/10 -mx-1 mb-4 h-40 overflow-hidden rounded-lg ring-1">
        <DealerLocatorMap branches={BRANCHES} nearestId={nearestId} />
      </div>

      {status === "denied" && (
        <p className="text-destructive mb-2 text-xs">
          Couldn&apos;t access your location — showing all branches instead.
        </p>
      )}

      <div className="mt-auto flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={findNearest}
          disabled={status === "locating"}
          className="w-full gap-2"
        >
          <LocateFixed className="size-4" />
          {status === "locating" ? "Locating…" : "Find Nearest"}
        </Button>
        <Button variant="ghost" asChild className="w-full gap-2">
          <Link href="/locations">
            View All Locations <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </BentoTile>
  );
}
