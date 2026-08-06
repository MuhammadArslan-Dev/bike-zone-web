import type { Testimonial } from "@/constants/reviews";

export type RatingSummary = {
  average: number;
  total: number;
  /** Count of reviews per star rating, indexed 1-5. */
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
};

export function getRatingSummary(reviews: Testimonial[]): RatingSummary {
  const distribution: RatingSummary["distribution"] = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  for (const review of reviews) {
    const rating = review.rating as 1 | 2 | 3 | 4 | 5;
    if (rating in distribution) distribution[rating] += 1;
  }

  const total = reviews.length;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);

  return {
    average: total ? sum / total : 0,
    total,
    distribution,
  };
}
