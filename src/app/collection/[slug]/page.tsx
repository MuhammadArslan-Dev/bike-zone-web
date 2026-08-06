import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FEATURED_MOTORCYCLES } from "@/constants/motorcycles";
import { BikeDetailsPage } from "@/features/bikes/bike-details-page";
import { formatPrice } from "@/utils/format";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return FEATURED_MOTORCYCLES.map((bike) => ({ slug: bike.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bike = FEATURED_MOTORCYCLES.find((item) => item.slug === slug);

  if (!bike) {
    return { title: "Bike Not Found" };
  }

  const title = `${bike.brand} ${bike.name}`;
  const description = `${title} — ${bike.category} starting from ${formatPrice(bike.price)}. ${bike.cc}cc, ${bike.power}hp, ${bike.mileage}km/l mileage.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: bike.image, width: 1200, height: 900 }],
    },
  };
}

export default async function BikeDetail({ params }: Props) {
  const { slug } = await params;
  const bike = FEATURED_MOTORCYCLES.find((item) => item.slug === slug);

  if (!bike) {
    notFound();
  }

  return <BikeDetailsPage bike={bike} />;
}
