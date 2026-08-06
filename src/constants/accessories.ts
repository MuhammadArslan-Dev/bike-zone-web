import type { Accessory } from "@/types";

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

export const ACCESSORIES: Accessory[] = [
  {
    id: "apex-full-face-helmet",
    name: "Apex Full-Face Helmet",
    category: "Helmets",
    price: 220,
    image: IMG("photo-1753804035008-8165eda5a517"),
    description:
      "DOT-certified full-face helmet with a scratch-resistant visor and removable, washable liner.",
  },
  {
    id: "summit-touring-helmet",
    name: "Summit Touring Helmet",
    category: "Helmets",
    price: 265,
    image: IMG("photo-1565975793223-a4d941f93879"),
    description:
      "Aerodynamic touring shell with reinforced ventilation for long-distance rides.",
  },
  {
    id: "carbon-rider-jacket",
    name: "Carbon Rider Jacket",
    category: "Jackets",
    price: 340,
    image: IMG("photo-1585153579494-65895afdba6f"),
    description:
      "Abrasion-resistant textile jacket with CE-rated armor at the shoulders and elbows.",
  },
  {
    id: "urban-street-jacket",
    name: "Urban Street Jacket",
    category: "Jackets",
    price: 285,
    image: IMG("photo-1625635284498-f5744e059a71"),
    description:
      "Lightweight all-season jacket built for city commuting with a removable thermal liner.",
  },
  {
    id: "grip-pro-gloves",
    name: "Grip Pro Leather Gloves",
    category: "Gloves",
    price: 85,
    image: IMG("photo-1674522684930-dba49752909e"),
    description:
      "Full-grain leather gloves with knuckle protection and touchscreen-compatible fingertips.",
  },
  {
    id: "trail-guard-gloves",
    name: "Trail Guard Riding Gloves",
    category: "Gloves",
    price: 68,
    image: IMG("photo-1545284662-c3dda8bd045d"),
    description:
      "Breathable, reinforced-palm gloves designed for all-day comfort in any weather.",
  },
  {
    id: "expedition-saddlebag",
    name: "Expedition Saddlebag Set",
    category: "Luggage",
    price: 190,
    image: IMG("photo-1723121248439-88ffcb5d94c5"),
    description:
      "Water-resistant saddlebag pair with quick-release mounts, 36L combined capacity.",
  },
  {
    id: "heritage-leather-pannier",
    name: "Heritage Leather Pannier",
    category: "Luggage",
    price: 245,
    image: IMG("photo-1615074639137-c895a6a6789b"),
    description:
      "Genuine leather side pannier with brass hardware — a classic look for cruisers and tourers.",
  },
  {
    id: "ironhead-slip-on-exhaust",
    name: "Ironhead Slip-On Exhaust",
    category: "Parts",
    price: 410,
    image: IMG("photo-1752774941461-b4b6e9d70c79"),
    description:
      "Chrome slip-on exhaust with a deeper tone and a noticeable weight reduction over stock.",
  },
  {
    id: "precision-drive-chain-kit",
    name: "Precision Drive Chain Kit",
    category: "Parts",
    price: 130,
    image: IMG("photo-1672626923169-dae917c72864"),
    description:
      "O-ring sealed chain and sprocket kit, direct fit for most 125–300cc naked and sport bikes.",
  },
];

export const ACCESSORY_CATEGORIES: Accessory["category"][] = [
  "Helmets",
  "Jackets",
  "Gloves",
  "Luggage",
  "Parts",
];
