export const BRAND_OPTIONS = [
  "Ducati",
  "BMW Motorrad",
  "Kawasaki",
  "Yamaha",
  "Honda",
  "Harley-Davidson",
  "Triumph",
] as const;

export const CATEGORY_OPTIONS = [
  "Superbike",
  "Cruiser",
  "Adventure",
  "Naked",
  "Café Racer",
  "Touring",
] as const;

export const PRICE_OPTIONS = [
  "Under $10,000",
  "$10,000 – $20,000",
  "$20,000 – $30,000",
  "$30,000+",
] as const;

export const HERO_STATS = [
  { value: 500, suffix: "+", label: "Bikes Delivered" },
  { value: 18, suffix: "+", label: "Years of Excellence" },
  { value: 42, suffix: "+", label: "Premium Brands" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
] as const;
