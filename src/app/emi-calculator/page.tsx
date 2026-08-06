import type { Metadata } from "next";

import { EmiCalculator } from "@/features/emi/emi-calculator";

export const metadata: Metadata = {
  title: "EMI Calculator",
  description:
    "Estimate your monthly installment for any bike in our collection in real time.",
};

export default async function EmiCalculatorPage({
  searchParams,
}: {
  searchParams: Promise<{ bike?: string }>;
}) {
  const params = await searchParams;
  return <EmiCalculator initialBikeId={params.bike} />;
}
