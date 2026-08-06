"use client";

import {
  ArrowRight,
  Calculator,
  Calendar,
  Eye,
  Fuel,
  Gauge,
  Heart,
  Scale,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TestRideModal } from "@/features/home/test-ride-modal";
import { toggleCompare, useIsCompared } from "@/lib/compare-store";
import { cn } from "@/lib/utils";
import { toggleWishlist, useIsWishlisted } from "@/lib/wishlist-store";
import type { Motorcycle } from "@/types";
import { formatPrice } from "@/utils/format";

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted rounded-lg p-3">
      <p className="text-muted-foreground text-xs tracking-wide uppercase">
        {label}
      </p>
      <p className="font-heading font-semibold">{value}</p>
    </div>
  );
}

export function BikeCard({
  bike,
  priority = false,
}: {
  bike: Motorcycle;
  priority?: boolean;
}) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [testRideOpen, setTestRideOpen] = useState(false);
  const isWishlisted = useIsWishlisted(bike.id);
  const isCompared = useIsCompared(bike.id);

  function handleWishlistToggle() {
    const added = toggleWishlist(bike.id);
    toast.success(added ? "Added to wishlist" : "Removed from wishlist", {
      description: `${bike.brand} ${bike.name}`,
    });
  }

  function handleCompareToggle() {
    const result = toggleCompare(bike.id);
    if (result === "limit-reached") {
      toast.warning("You can compare up to 3 bikes at a time");
      return;
    }
    toast.success(
      result === "added" ? "Added to comparison" : "Removed from comparison",
      { description: `${bike.brand} ${bike.name}` },
    );
  }

  return (
    <>
      <div className="group bg-card shadow-elevation-1 ring-foreground/10 hover:shadow-elevation-3 flex h-full flex-col overflow-hidden rounded-xl ring-1 transition-shadow">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Link
            href={`/collection/${bike.slug}`}
            aria-label={`View ${bike.brand} ${bike.name} details`}
            className="absolute inset-0"
          >
            <Image
              src={bike.image}
              alt={`${bike.brand} ${bike.name}`}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </Link>

          <Badge className="pointer-events-none absolute top-3 left-3">
            {bike.category}
          </Badge>

          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              type="button"
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              aria-pressed={isWishlisted}
              onClick={handleWishlistToggle}
              className={cn(
                "flex size-9 items-center justify-center rounded-full backdrop-blur-md transition-colors",
                isWishlisted
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/20 text-white hover:bg-white/30",
              )}
            >
              <Heart className={cn("size-4", isWishlisted && "fill-current")} />
            </button>
            <button
              type="button"
              aria-label={
                isCompared ? "Remove from comparison" : "Add to comparison"
              }
              aria-pressed={isCompared}
              onClick={handleCompareToggle}
              className={cn(
                "flex size-9 items-center justify-center rounded-full backdrop-blur-md transition-colors",
                isCompared
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/20 text-white hover:bg-white/30",
              )}
            >
              <Scale className="size-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setQuickViewOpen(true)}
            className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-black/60 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0"
          >
            <Eye className="size-4" /> Quick View
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
          <div>
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              {bike.brand}
            </p>
            <h3 className="font-heading text-lg font-bold">
              <Link
                href={`/collection/${bike.slug}`}
                className="hover:text-primary transition-colors"
              >
                {bike.name}
              </Link>
            </h3>
          </div>

          <div className="text-muted-foreground flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <Fuel className="size-4" /> {bike.mileage} km/l
            </span>
            <span className="flex items-center gap-1.5">
              <Gauge className="size-4" /> {bike.cc}cc
            </span>
          </div>

          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="font-heading text-xl font-bold">
              {formatPrice(bike.price)}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setQuickViewOpen(true)}
            >
              Quick View
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {bike.brand} {bike.name}
            </DialogTitle>
            <DialogDescription>{bike.category}</DialogDescription>
          </DialogHeader>

          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={bike.image}
              alt={`${bike.brand} ${bike.name}`}
              fill
              sizes="(min-width: 640px) 32rem, 90vw"
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <SpecItem label="Price" value={formatPrice(bike.price)} />
            <SpecItem label="Mileage" value={`${bike.mileage} km/l`} />
            <SpecItem label="Engine" value={`${bike.cc}cc`} />
            <SpecItem label="Top Speed" value={`${bike.topSpeed} km/h`} />
          </div>

          <div className="flex flex-col gap-2">
            <Button
              className="w-full gap-2"
              onClick={() => {
                setQuickViewOpen(false);
                setTestRideOpen(true);
              }}
            >
              <Calendar className="size-4" />
              Book Test Ride
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" asChild className="gap-2">
                <Link href={`/emi-calculator?bike=${bike.id}`}>
                  <Calculator className="size-4" />
                  Calculate EMI
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={handleWishlistToggle}
                className="gap-2"
              >
                <Heart
                  className={cn(
                    "size-4",
                    isWishlisted && "text-primary fill-current",
                  )}
                />
                Wishlist
              </Button>
            </div>
            <Button variant="ghost" asChild className="w-full gap-2">
              <Link href={`/collection/${bike.slug}`}>
                View Full Details <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <TestRideModal
        open={testRideOpen}
        onOpenChange={setTestRideOpen}
        initialBikeId={bike.id}
      />
    </>
  );
}
