import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Eyebrow } from "@/components/ui/typography";
import { FEATURED_MOTORCYCLES } from "@/constants/motorcycles";
import { BikeCard } from "@/features/home/bike-card";

export function FeaturedBikes() {
  return (
    <section className="max-w-8xl py-section-sm lg:py-section mx-auto px-4 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Featured Inventory</Eyebrow>
            <h2 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready for the road, right now.
            </h2>
          </div>
          <Button
            variant="outline"
            asChild
            className="gap-2 self-start sm:self-auto"
          >
            <Link href="/collection">
              View All Bikes <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <Carousel opts={{ align: "start", loop: false }}>
          <CarouselContent>
            {FEATURED_MOTORCYCLES.map((bike) => (
              <CarouselItem
                key={bike.id}
                className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <BikeCard bike={bike} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 hidden sm:-left-6 sm:flex" />
          <CarouselNext className="-right-4 hidden sm:-right-6 sm:flex" />
        </Carousel>
      </FadeIn>
    </section>
  );
}
