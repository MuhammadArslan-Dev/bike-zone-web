"use client";

import { Scale, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/typography";
import { FEATURED_MOTORCYCLES } from "@/constants/motorcycles";
import { removeFromCompare, useCompareIds } from "@/lib/compare-store";
import type { Motorcycle } from "@/types";
import { formatPrice } from "@/utils/format";

const SPEC_ROWS: {
  label: string;
  getValue: (bike: Motorcycle) => string;
}[] = [
  { label: "Price", getValue: (b) => formatPrice(b.price) },
  { label: "Category", getValue: (b) => b.category },
  { label: "Mileage", getValue: (b) => `${b.mileage} km/l` },
  { label: "Engine", getValue: (b) => `${b.cc}cc` },
  { label: "Top Speed", getValue: (b) => `${b.topSpeed} km/h` },
  { label: "Power", getValue: (b) => `${b.power} hp` },
  { label: "Weight", getValue: (b) => `${b.weight} kg` },
];

export function CompareTable() {
  const compareIds = useCompareIds();
  const bikes = compareIds
    .map((id) => FEATURED_MOTORCYCLES.find((bike) => bike.id === id))
    .filter((bike): bike is Motorcycle => Boolean(bike));

  if (bikes.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-32 text-center">
        <span className="bg-muted flex size-16 items-center justify-center rounded-full">
          <Scale className="text-muted-foreground size-7" />
        </span>
        <h1 className="font-heading text-2xl font-bold">
          No bikes to compare yet
        </h1>
        <p className="text-muted-foreground">
          Tap the compare icon on any bike card to add it here — you can compare
          up to 3 at once.
        </p>
        <Button asChild>
          <Link href="/">Browse Bikes</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow>Compare</Eyebrow>
          <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Side-by-side comparison.
          </h1>
        </div>
        <Button
          variant="outline"
          className="gap-2 self-start sm:self-auto"
          onClick={() => bikes.forEach((bike) => removeFromCompare(bike.id))}
        >
          <Trash2 className="size-4" /> Clear all
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bikes.map((bike, index) => (
          <div
            key={bike.id}
            className="bg-card ring-foreground/10 flex flex-col overflow-hidden rounded-xl ring-1"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={bike.image}
                alt={`${bike.brand} ${bike.name}`}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <button
                type="button"
                aria-label="Remove from comparison"
                onClick={() => removeFromCompare(bike.id)}
                className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-5">
              <div>
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  {bike.brand}
                </p>
                <h2 className="font-heading text-xl font-bold">{bike.name}</h2>
              </div>

              <dl className="divide-border divide-y text-sm">
                {SPEC_ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between py-2.5"
                  >
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="font-semibold">{row.getValue(bike)}</dd>
                  </div>
                ))}
              </dl>

              <Button asChild className="mt-auto">
                <Link href="/contact">Book Test Ride</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
