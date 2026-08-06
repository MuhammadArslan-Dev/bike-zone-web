import { ArrowRight, PackageCheck } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FEATURED_MOTORCYCLES } from "@/constants/motorcycles";
import { BentoTile } from "@/features/home/bento-tile";
import { getStockSummary } from "@/lib/stock";

const ROWS = [
  { key: "inStock" as const, label: "In Stock", className: "text-emerald-500" },
  { key: "lowStock" as const, label: "Low Stock", className: "text-amber-500" },
  {
    key: "outOfStock" as const,
    label: "Out of Stock",
    className: "text-destructive",
  },
];

export function LiveStock() {
  const summary = getStockSummary(FEATURED_MOTORCYCLES);

  return (
    <BentoTile
      label="Live Availability"
      title="Stock Availability"
      icon={PackageCheck}
    >
      <ul className="flex flex-1 flex-col justify-center gap-3">
        {ROWS.map((row) => (
          <li
            key={row.key}
            className="ring-foreground/10 flex items-center justify-between rounded-lg px-3 py-2 ring-1"
          >
            <span className="text-sm font-medium">{row.label}</span>
            <span className={`font-heading text-lg font-bold ${row.className}`}>
              {summary[row.key]} {summary[row.key] === 1 ? "Bike" : "Bikes"}
            </span>
          </li>
        ))}
      </ul>

      <Button variant="outline" asChild className="mt-4 w-full gap-2">
        <Link href="/collection">
          View Inventory <ArrowRight className="size-4" />
        </Link>
      </Button>
    </BentoTile>
  );
}
