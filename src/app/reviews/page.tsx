import type { Metadata } from "next";

import { ReviewsPage } from "@/features/reviews/reviews-page";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read verified customer reviews and testimonials from BikeZone riders, or share your own experience.",
};

export default function Reviews() {
  return <ReviewsPage />;
}
