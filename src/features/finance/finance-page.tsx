"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/typography";
import { LENDERS } from "@/constants/lenders";
import { EmiCalculator } from "@/features/emi/emi-calculator";
import { FinanceApplicationModal } from "@/features/finance/finance-application-modal";
import { LenderCard } from "@/features/finance/lender-card";

export function FinancePage() {
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Eyebrow>Financing</Eyebrow>
          <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Own it your way.
          </h1>
          <p className="text-muted-foreground mt-2">
            Compare financing partners, estimate your monthly payment, and get
            pre-qualified in minutes — no impact to your credit score.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold">
                Financing partners
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                We work with a panel of lenders so you can find the best rate.
              </p>
            </div>
            <Button onClick={() => setApplyOpen(true)} className="self-start">
              Apply for Pre-Qualification
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {LENDERS.map((lender) => (
              <LenderCard key={lender.id} lender={lender} />
            ))}
          </div>
        </div>
      </div>

      <div className="border-border border-t">
        <EmiCalculator />
      </div>

      <FinanceApplicationModal open={applyOpen} onOpenChange={setApplyOpen} />
    </div>
  );
}
