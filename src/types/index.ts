export type NavLink = {
  label: string;
  href: string;
};

export type Motorcycle = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  /** Fuel economy, in km per liter. */
  mileage: number;
  /** Engine displacement, in cc. */
  cc: number;
  topSpeed: number;
  power: number;
  weight: number;
  featured?: boolean;
  /** Units currently available at all branches combined. */
  stock: number;
  /** 0-100 demand score used to rank "Top Bikes" — not a real sales figure. */
  popularity: number;
  /** Additional gallery photos beyond `image` — representative category photography, not literal multi-angle shots of one physical unit. */
  gallery: string[];
  colors: { name: string; hex: string }[];
  features: string[];
};

export type Brand = {
  name: string;
  slug: string;
  image: string;
};

export type Branch = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
};

export type Lender = {
  id: string;
  name: string;
  aprFrom: number;
  maxTenureMonths: number;
  minDownPaymentPercent: number;
  description: string;
};

export type AccessoryCategory =
  "Helmets" | "Jackets" | "Gloves" | "Luggage" | "Parts";

export type Accessory = {
  id: string;
  name: string;
  category: AccessoryCategory;
  price: number;
  image: string;
  description: string;
};

export type ServiceType = {
  id: string;
  label: string;
};

export type MaintenancePackage = {
  id: string;
  name: string;
  price: number;
  intervalKm: number;
  includes: string[];
  featured?: boolean;
};

export type WarrantyCoverage = {
  id: string;
  title: string;
  description: string;
};

export type WarrantyFaq = {
  id: string;
  question: string;
  answer: string;
};

export type BlogCategory =
  "Riding Tips" | "Maintenance" | "Buying Guides" | "Gear & Reviews" | "News";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Paragraphs of body copy, rendered in order — no markdown/HTML parsing involved. */
  content: string[];
  category: BlogCategory;
  coverImage: string;
  author: { name: string; avatar: string };
  publishedDate: string;
  readTimeMinutes: number;
  tags: string[];
};
