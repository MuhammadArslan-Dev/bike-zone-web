import type { Metadata } from "next";

import { LocationsPage } from "@/features/locations/locations-page";

export const metadata: Metadata = {
  title: "Dealer Locator",
  description:
    "Find your nearest BikeZone branch, check hours and contact info, and get directions.",
};

export default function Locations() {
  return <LocationsPage />;
}
