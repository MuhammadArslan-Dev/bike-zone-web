import type {
  MaintenancePackage,
  ServiceType,
  WarrantyCoverage,
  WarrantyFaq,
} from "@/types";

export const SERVICE_TYPES: ServiceType[] = [
  { id: "routine-maintenance", label: "Routine Maintenance" },
  { id: "oil-change", label: "Oil & Filter Change" },
  { id: "tire-brake", label: "Tire & Brake Service" },
  { id: "diagnostics", label: "Engine Diagnostics" },
  { id: "warranty-repair", label: "Warranty Repair" },
  { id: "other", label: "Other / Not Sure" },
];

export const MAINTENANCE_PACKAGES: MaintenancePackage[] = [
  {
    id: "essential",
    name: "Essential Service",
    price: 45,
    intervalKm: 3000,
    includes: [
      "Engine oil & filter change",
      "Chain lubrication & adjustment",
      "Brake & tire inspection",
      "Multi-point safety check",
    ],
  },
  {
    id: "complete",
    name: "Complete Service",
    price: 95,
    intervalKm: 6000,
    includes: [
      "Everything in Essential Service",
      "Air filter replacement",
      "Spark plug inspection",
      "Coolant & brake fluid top-up",
      "Battery health check",
    ],
    featured: true,
  },
  {
    id: "premium",
    name: "Premium Service",
    price: 165,
    intervalKm: 12000,
    includes: [
      "Everything in Complete Service",
      "Valve clearance check",
      "Full suspension inspection",
      "Wheel alignment & balancing",
      "Complimentary pickup & drop-off",
    ],
  },
];

export const WARRANTY_COVERAGE: WarrantyCoverage[] = [
  {
    id: "powertrain",
    title: "2-Year Powertrain Warranty",
    description:
      "Engine, transmission, and drivetrain components are covered against manufacturing defects for 24 months from delivery date.",
  },
  {
    id: "electrical",
    title: "1-Year Electrical Warranty",
    description:
      "Wiring harness, ECU, lighting, and battery are covered for 12 months, excluding accidental damage.",
  },
  {
    id: "paint-finish",
    title: "1-Year Paint & Finish Warranty",
    description:
      "Bodywork paint and chrome finishes are covered against peeling or fading under normal riding conditions.",
  },
  {
    id: "roadside",
    title: "Roadside Assistance",
    description:
      "Complimentary roadside assistance for the first year — towing, flat-tire support, and battery jump-starts.",
  },
];

export const WARRANTY_FAQS: WarrantyFaq[] = [
  {
    id: "what-voids",
    question: "What voids my warranty?",
    answer:
      "Modifications to the engine or exhaust, use of non-approved parts, racing or off-road use, and skipping scheduled maintenance can void coverage. Normal wear items like tires, brake pads, and chains are never covered.",
  },
  {
    id: "transferable",
    question: "Is the warranty transferable if I sell my bike?",
    answer:
      "Yes — the remaining warranty period transfers to the new owner once you update the registration with our service team, at no extra cost.",
  },
  {
    id: "other-workshops",
    question: "Can I service my bike at a non-BikeZone workshop?",
    answer:
      "Routine maintenance at another qualified workshop won't void your warranty as long as genuine or equivalent parts are used and service records are kept. Warranty repairs themselves must be performed at a BikeZone branch.",
  },
  {
    id: "how-to-claim",
    question: "How do I file a warranty claim?",
    answer:
      'Register your bike below, then book a "Warranty Repair" service appointment. Bring your proof of purchase and service history — our team handles the rest.',
  },
];
