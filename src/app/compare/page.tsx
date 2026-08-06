import type { Metadata } from "next";

import { CompareTable } from "@/features/compare/compare-table";

export const metadata: Metadata = {
  title: "Compare Bikes",
  description:
    "Compare specifications side-by-side for the motorcycles you're considering.",
};

export default function ComparePage() {
  return <CompareTable />;
}
