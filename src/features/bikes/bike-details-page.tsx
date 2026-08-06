"use client";

import { ArrowLeft, Calendar, Heart, Scale } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FEATURED_MOTORCYCLES } from "@/constants/motorcycles";
import { EmiCalculator } from "@/features/emi/emi-calculator";
import { BikeGallery } from "@/features/bikes/bike-gallery";
import { ColorSelector } from "@/features/bikes/color-selector";
import { FeaturesList } from "@/features/bikes/features-list";
import { RelatedBikes } from "@/features/bikes/related-bikes";
import { SpecGrid } from "@/features/bikes/spec-grid";
import { TestRideModal } from "@/features/home/test-ride-modal";
import { toggleCompare, useIsCompared } from "@/lib/compare-store";
import { getRelatedBikes } from "@/lib/related-bikes";
import { cn } from "@/lib/utils";
import { toggleWishlist, useIsWishlisted } from "@/lib/wishlist-store";
import type { Motorcycle } from "@/types";
import { formatPrice } from "@/utils/format";

export function BikeDetailsPage({ bike }: { bike: Motorcycle }) {
  const [selectedColor, setSelectedColor] = useState(
    bike.colors[0]?.name ?? "",
  );
  const [testRideOpen, setTestRideOpen] = useState(false);
  const isWishlisted = useIsWishlisted(bike.id);
  const isCompared = useIsCompared(bike.id);
  const related = getRelatedBikes(bike, FEATURED_MOTORCYCLES);

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
    <div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/collection"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Collection
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <BikeGallery
            images={[bike.image, ...bike.gallery]}
            alt={`${bike.brand} ${bike.name}`}
          />

          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2">
                <Badge>{bike.category}</Badge>
                {bike.stock === 0 ? (
                  <Badge variant="destructive">Out of Stock</Badge>
                ) : bike.stock <= 5 ? (
                  <Badge variant="secondary">Low Stock</Badge>
                ) : null}
              </div>
              <p className="text-muted-foreground mt-3 text-sm font-medium tracking-wide uppercase">
                {bike.brand}
              </p>
              <h1 className="font-heading mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                {bike.name}
              </h1>
              <p className="font-heading mt-3 text-3xl font-bold">
                {formatPrice(bike.price)}
              </p>
            </div>

            {bike.colors.length > 0 && (
              <ColorSelector
                colors={bike.colors}
                selected={selectedColor}
                onSelect={setSelectedColor}
              />
            )}

            <SpecGrid bike={bike} />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={() => setTestRideOpen(true)}
                disabled={bike.stock === 0}
              >
                <Calendar className="size-4" />
                Book Test Ride
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={handleCompareToggle}
              >
                <Scale className={cn("size-4", isCompared && "text-primary")} />
                {isCompared ? "Added to Compare" : "Compare"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={handleWishlistToggle}
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

            {bike.stock === 0 && (
              <p className="text-muted-foreground text-sm">
                This bike is currently out of stock — join the waitlist by
                booking a test ride and we&apos;ll notify you when it&apos;s
                back.
              </p>
            )}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold">Features</h2>
          <div className="mt-6">
            <FeaturesList features={bike.features} />
          </div>
        </div>
      </div>

      <div className="border-border border-t">
        <EmiCalculator initialBikeId={bike.id} />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <RelatedBikes bikes={related} />
      </div>

      <TestRideModal
        open={testRideOpen}
        onOpenChange={setTestRideOpen}
        initialBikeId={bike.id}
      />
    </div>
  );
}
