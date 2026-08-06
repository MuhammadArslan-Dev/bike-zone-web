import type { Metadata } from "next";

import { FaqPage } from "@/features/faq/faq-page";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about buying, financing, servicing, and owning a bike from BikeZone.",
};

export default function Faq() {
  return <FaqPage />;
}
