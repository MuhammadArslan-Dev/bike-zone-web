import type { Lender } from "@/types";

export const LENDERS: Lender[] = [
  {
    id: "summit-credit-union",
    name: "Summit Credit Union",
    aprFrom: 6.9,
    maxTenureMonths: 60,
    minDownPaymentPercent: 10,
    description:
      "Our longest-standing partner — fastest approvals, lowest rates for riders with an existing account.",
  },
  {
    id: "ridgeline-financial",
    name: "Ridgeline Financial",
    aprFrom: 8.4,
    maxTenureMonths: 48,
    minDownPaymentPercent: 15,
    description:
      "No prior credit history required. Popular with first-time riders and students.",
  },
  {
    id: "trailhead-capital",
    name: "Trailhead Capital",
    aprFrom: 7.5,
    maxTenureMonths: 72,
    minDownPaymentPercent: 5,
    description:
      "Longest tenures available and the lowest minimum down payment on our panel.",
  },
];
