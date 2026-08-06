"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eyebrow } from "@/components/ui/typography";
import { MaintenancePackages } from "@/features/service/maintenance-packages";
import { ServiceBookingForm } from "@/features/service/service-booking-form";
import { WarrantySection } from "@/features/service/warranty-section";

export function ServiceCenter() {
  const [activeTab, setActiveTab] = useState("booking");
  const [presetServiceTypeId, setPresetServiceTypeId] = useState<string>();

  function handleBookPackage(packageId: string) {
    setPresetServiceTypeId(
      packageId === "essential" ? "routine-maintenance" : "diagnostics",
    );
    setActiveTab("booking");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <Eyebrow>Keep It Running</Eyebrow>
        <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Service center.
        </h1>
        <p className="text-muted-foreground mt-2">
          Book a service, pick a maintenance package, or check your warranty
          coverage — all in one place.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-10">
        <TabsList className="h-auto w-full gap-1 p-1 sm:w-fit">
          <TabsTrigger value="booking" className="px-4 py-2">
            Book Service
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="px-4 py-2">
            Maintenance
          </TabsTrigger>
          <TabsTrigger value="warranty" className="px-4 py-2">
            Warranty
          </TabsTrigger>
        </TabsList>

        <TabsContent value="booking" className="mt-8">
          <ServiceBookingForm presetServiceTypeId={presetServiceTypeId} />
        </TabsContent>

        <TabsContent value="maintenance" className="mt-8">
          <MaintenancePackages onBookPackage={handleBookPackage} />
        </TabsContent>

        <TabsContent value="warranty" className="mt-8">
          <WarrantySection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
