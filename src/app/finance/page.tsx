import type { Metadata } from "next";

import { FinancePage } from "@/features/finance/finance-page";

export const metadata: Metadata = {
  title: "Financing & Loans",
  description:
    "Compare financing partners, estimate your monthly payment, and get pre-qualified for a bike loan in minutes.",
};

export default function Finance() {
  return <FinancePage />;
}
