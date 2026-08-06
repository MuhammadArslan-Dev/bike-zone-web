import type { Motorcycle } from "@/types";

const LOW_STOCK_MAX = 5;

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) return "out-of-stock";
  if (stock <= LOW_STOCK_MAX) return "low-stock";
  return "in-stock";
}

export type StockSummary = {
  inStock: number;
  lowStock: number;
  outOfStock: number;
};

export function getStockSummary(bikes: Motorcycle[]): StockSummary {
  return bikes.reduce<StockSummary>(
    (summary, bike) => {
      const status = getStockStatus(bike.stock);
      if (status === "in-stock") summary.inStock += 1;
      else if (status === "low-stock") summary.lowStock += 1;
      else summary.outOfStock += 1;
      return summary;
    },
    { inStock: 0, lowStock: 0, outOfStock: 0 },
  );
}
