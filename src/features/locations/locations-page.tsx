"use client";

import { LocateFixed } from "lucide-react";
import dynamic from "next/dynamic";

import { FadeIn } from "@/components/motion/fade-in";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/typography";
import { BRANCHES } from "@/constants/branches";
import { BranchCard } from "@/features/locations/branch-card";
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

export function LocationsPage() {
  const { nearestId, status, findNearest } = useNearestBranch();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn inView={false}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Find a Branch</Eyebrow>
            <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Dealer locator.
            </h1>
            <p className="text-muted-foreground mt-2">
              {BRANCHES.length} branches, one map — find the closest one and get
              directions in a click.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={findNearest}
            disabled={status === "locating"}
            className="gap-2 self-start"
          >
            <LocateFixed className="size-4" />
            {status === "locating" ? "Locating…" : "Find Nearest"}
          </Button>
        </div>
      </FadeIn>

      {status === "denied" && (
        <p className="text-destructive mt-4 text-sm">
          Couldn&apos;t access your location — showing all branches instead.
        </p>
      )}

      <div className="ring-foreground/10 mt-8 h-[420px] overflow-hidden rounded-xl ring-1 sm:h-[500px]">
        <DealerLocatorMap branches={BRANCHES} nearestId={nearestId} />
      </div>

      <ScrollReveal className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BRANCHES.map((branch) => (
          <BranchCard
            key={branch.id}
            branch={branch}
            isNearest={branch.id === nearestId}
          />
        ))}
      </ScrollReveal>
    </div>
  );
}
