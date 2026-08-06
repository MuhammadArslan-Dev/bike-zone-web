import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { BikeCard } from "@/features/home/bike-card";
import type { Motorcycle } from "@/types";

export function RelatedBikes({ bikes }: { bikes: Motorcycle[] }) {
  if (bikes.length === 0) return null;

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold">You might also like</h2>
      <ScrollReveal className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bikes.map((bike) => (
          <BikeCard key={bike.id} bike={bike} />
        ))}
      </ScrollReveal>
    </div>
  );
}
