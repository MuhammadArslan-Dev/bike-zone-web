import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Eyebrow } from "@/components/ui/typography";
import { BRANDS } from "@/constants/brands";
import { BrandCard } from "@/features/home/brand-card";

export function BrandShowcase() {
  return (
    <section className="max-w-8xl py-section-sm lg:py-section mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <Eyebrow>Shop by brand</Eyebrow>
        <h2 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Trusted names, every category.
        </h2>
      </div>

      <ScrollReveal className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {BRANDS.map((brand) => (
          <BrandCard key={brand.slug} brand={brand} />
        ))}
      </ScrollReveal>
    </section>
  );
}
