"use client";

import { ShieldCheck } from "lucide-react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { WARRANTY_COVERAGE, WARRANTY_FAQS } from "@/constants/service";
import { WarrantyRegisterModal } from "@/features/service/warranty-register-modal";

export function WarrantySection() {
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold">
            What&apos;s covered
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Every new bike from BikeZone includes the following coverage.
          </p>
        </div>
        <Button onClick={() => setRegisterOpen(true)} className="self-start">
          Register Your Bike
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {WARRANTY_COVERAGE.map((item) => (
          <GlassCard key={item.id} className="flex flex-row gap-4 p-5">
            <ShieldCheck className="text-primary mt-0.5 size-6 shrink-0" />
            <div>
              <h3 className="font-heading font-bold">{item.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div>
        <h2 className="font-heading text-xl font-bold">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="mt-4">
          {WARRANTY_FAQS.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <WarrantyRegisterModal
        open={registerOpen}
        onOpenChange={setRegisterOpen}
      />
    </div>
  );
}
