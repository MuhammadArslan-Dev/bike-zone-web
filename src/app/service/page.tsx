import type { Metadata } from "next";

import { ServiceCenter } from "@/features/service/service-center";

export const metadata: Metadata = {
  title: "Service Center",
  description:
    "Book a service appointment, choose a maintenance package, or check your warranty coverage.",
};

export default function Service() {
  return <ServiceCenter />;
}
