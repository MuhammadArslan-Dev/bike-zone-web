import type { Metadata } from "next";

import { AccessoriesStore } from "@/features/accessories/accessories-store";

export const metadata: Metadata = {
  title: "Accessories Store",
  description:
    "Shop helmets, jackets, gloves, luggage, and parts for your motorcycle.",
};

export default function Accessories() {
  return <AccessoriesStore />;
}
