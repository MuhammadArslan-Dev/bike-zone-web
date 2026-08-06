import type { Motorcycle } from "@/types";

const RELATED_COUNT = 3;

export function getRelatedBikes(
  bike: Motorcycle,
  allBikes: Motorcycle[],
): Motorcycle[] {
  const others = allBikes.filter((item) => item.id !== bike.id);

  const scored = others.map((candidate) => {
    const sameCategory = candidate.category === bike.category ? 2 : 0;
    const sameBrand = candidate.brand === bike.brand ? 1 : 0;
    const priceDiff = Math.abs(candidate.price - bike.price);
    const priceCloseness = priceDiff < bike.price * 0.3 ? 1 : 0;
    return {
      candidate,
      score: sameCategory + sameBrand + priceCloseness,
      priceDiff,
    };
  });

  return scored
    .sort((a, b) => b.score - a.score || a.priceDiff - b.priceDiff)
    .slice(0, RELATED_COUNT)
    .map((item) => item.candidate);
}
