import type { Branch } from "@/types";

/**
 * Fictional branch network for the Dealer Locator demo. Coordinates sit
 * within a real metro area so the map renders realistically, but names,
 * phone numbers (555 = reserved for fictional use), and hours are
 * illustrative — not a real BikeZone address.
 */
export const BRANCHES: Branch[] = [
  {
    id: "downtown",
    name: "BikeZone Downtown Showroom",
    lat: 30.2672,
    lng: -97.7431,
    phone: "(512) 555-0142",
    hours: "Mon – Sat: 10am – 8pm",
  },
  {
    id: "northgate",
    name: "BikeZone Northgate Branch",
    lat: 30.4022,
    lng: -97.7186,
    phone: "(512) 555-0173",
    hours: "Mon – Sat: 9am – 7pm",
  },
  {
    id: "westside",
    name: "BikeZone Westside Service Center",
    lat: 30.2861,
    lng: -97.8339,
    phone: "(512) 555-0198",
    hours: "Mon – Sun: 9am – 6pm",
  },
  {
    id: "eastgate",
    name: "BikeZone Eastgate Superstore",
    lat: 30.25,
    lng: -97.689,
    phone: "(512) 555-0126",
    hours: "Mon – Sat: 10am – 8pm",
  },
];
