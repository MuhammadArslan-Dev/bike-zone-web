import { Inter, Unbounded } from "next/font/google";

export const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const fontHeading = Unbounded({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});
