import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Brand } from "@/types";

export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/collection?brand=${brand.slug}`}
      className="hover-lift group relative flex aspect-[4/5] items-end overflow-hidden rounded-xl"
    >
      <Image
        src={brand.image}
        alt={`${brand.name} motorcycles`}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-colors group-hover:from-black/95" />
      <div className="relative flex w-full items-center justify-between p-4 sm:p-5">
        <span className="font-heading text-lg font-bold text-white sm:text-xl">
          {brand.name}
        </span>
        <span className="flex size-8 -translate-x-2 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
