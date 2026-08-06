export const siteConfig = {
  name: "BikeZone",
  title: "BikeZone — Premium Motorcycle Dealership",
  description:
    "Discover an exclusive collection of premium and luxury motorcycles. Handpicked machines, expert craftsmanship, and an unrivalled ownership experience at BikeZone.",
  url: "https://bikezone.com",
  ogImage: "/images/og-cover.jpg",
  keywords: [
    "motorcycle dealership",
    "premium motorcycles",
    "luxury bikes",
    "superbikes",
    "motorcycle showroom",
  ],
  links: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    // Placeholder number — replace with the dealership's real WhatsApp Business line.
    whatsapp: "https://wa.me/15551234567",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/collection" },
  { label: "Bike Finder", href: "/finder" },
  { label: "Finance", href: "/finance" },
  { label: "Accessories", href: "/accessories" },
  { label: "Service", href: "/service" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Footer-only support links, deliberately decoupled from `navLinks` — the
 * top nav is already at capacity (see navbar.tsx's `xl` breakpoint gotcha),
 * so newer support-style pages surface here instead of growing the header.
 */
export const supportLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Locations", href: "/locations" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
] as const;
