"use client";

import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { Chip } from "@/components/ui/chip";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eyebrow } from "@/components/ui/typography";
import { FEATURED_MOTORCYCLES } from "@/constants/motorcycles";
import { calculateEmi } from "@/lib/emi";
import { formatPrice } from "@/utils/format";

type EmiFormValues = {
  bikeId: string;
  price: number;
  downPayment: number;
  tenureMonths: string;
  annualRate: number;
};

const TENURE_OPTIONS = ["12", "24", "36", "48", "60"];
const DOWN_PAYMENT_PRESETS = [10, 20, 30, 50];

export function EmiCalculator({ initialBikeId }: { initialBikeId?: string }) {
  const initialBike =
    FEATURED_MOTORCYCLES.find((bike) => bike.id === initialBikeId) ??
    FEATURED_MOTORCYCLES[0];

  const { control, watch, setValue } = useForm<EmiFormValues>({
    defaultValues: {
      bikeId: initialBike.id,
      price: initialBike.price,
      downPayment: Math.round(initialBike.price * 0.2),
      tenureMonths: "36",
      annualRate: 14,
    },
  });

  const values = watch();

  const result = useMemo(
    () =>
      calculateEmi({
        price: values.price || 0,
        downPayment: values.downPayment || 0,
        tenureMonths: Number(values.tenureMonths) || 0,
        annualRatePercent: values.annualRate || 0,
      }),
    [values.price, values.downPayment, values.tenureMonths, values.annualRate],
  );

  const downPaymentPercent = values.price
    ? Math.round((values.downPayment / values.price) * 100)
    : 0;

  const principalPercent = result.totalPayment
    ? (result.loanAmount / result.totalPayment) * 100
    : 100;

  function handleBikeChange(bikeId: string) {
    const bike = FEATURED_MOTORCYCLES.find((b) => b.id === bikeId);
    setValue("bikeId", bikeId);
    if (bike) {
      setValue("price", bike.price);
      setValue("downPayment", Math.round(bike.price * 0.2));
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <Eyebrow>EMI Calculator</Eyebrow>
        <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Plan your financing.
        </h1>
        <p className="text-muted-foreground mt-2">
          Estimate your monthly installment in real time — adjust the down
          payment, tenure, or rate to see it update instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="emi-bike">Select a bike</Label>
            <Select value={values.bikeId} onValueChange={handleBikeChange}>
              <SelectTrigger id="emi-bike" className="w-full">
                <SelectValue placeholder="Choose a bike" />
              </SelectTrigger>
              <SelectContent>
                {FEATURED_MOTORCYCLES.map((bike) => (
                  <SelectItem key={bike.id} value={bike.id}>
                    {bike.brand} {bike.name} — {formatPrice(bike.price)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="emi-price">Bike price</Label>
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <Input
                  id="emi-price"
                  type="number"
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="emi-down">Down payment</Label>
              <span className="text-muted-foreground text-sm">
                {downPaymentPercent}% of price
              </span>
            </div>
            <Controller
              control={control}
              name="downPayment"
              render={({ field }) => (
                <Input
                  id="emi-down"
                  type="number"
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                />
              )}
            />
            <div className="mt-1 flex flex-wrap gap-2">
              {DOWN_PAYMENT_PRESETS.map((percent) => (
                <Chip
                  key={percent}
                  selected={downPaymentPercent === percent}
                  onClick={() =>
                    setValue(
                      "downPayment",
                      Math.round((values.price || 0) * (percent / 100)),
                    )
                  }
                >
                  {percent}%
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="emi-tenure">Tenure</Label>
              <Controller
                control={control}
                name="tenureMonths"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="emi-tenure" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TENURE_OPTIONS.map((months) => (
                        <SelectItem key={months} value={months}>
                          {months} months
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="emi-rate">Interest rate (annual %)</Label>
              <Controller
                control={control}
                name="annualRate"
                render={({ field }) => (
                  <Input
                    id="emi-rate"
                    type="number"
                    min={0}
                    max={100}
                    step={0.1}
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.valueAsNumber || 0)
                    }
                  />
                )}
              />
            </div>
          </div>
        </div>

        <GlassCard className="border-border bg-card/60 h-fit p-6 sm:p-8">
          <Eyebrow>Estimated monthly payment</Eyebrow>
          <p className="font-heading mt-3 text-4xl font-bold sm:text-5xl">
            {formatPrice(Math.round(result.monthlyPayment))}
            <span className="text-muted-foreground text-lg font-medium">
              {" "}
              /mo
            </span>
          </p>

          <div className="mt-6 flex h-3 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary h-full transition-all duration-500"
              style={{ width: `${principalPercent.toFixed(2)}%` }}
            />
            <div
              className="bg-accent h-full transition-all duration-500"
              style={{ width: `${(100 - principalPercent).toFixed(2)}%` }}
            />
          </div>
          <div className="text-muted-foreground mt-2 flex justify-between text-xs">
            <span className="flex items-center gap-1.5">
              <span className="bg-primary size-2 rounded-full" /> Principal
            </span>
            <span className="flex items-center gap-1.5">
              <span className="bg-accent size-2 rounded-full" /> Interest
            </span>
          </div>

          <dl className="mt-6 flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Loan amount</dt>
              <dd className="font-semibold">
                {formatPrice(Math.round(result.loanAmount))}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Total interest</dt>
              <dd className="font-semibold">
                {formatPrice(Math.round(result.totalInterest))}
              </dd>
            </div>
            <div className="border-border flex justify-between border-t pt-3">
              <dt className="font-medium">Total payment</dt>
              <dd className="font-heading font-bold">
                {formatPrice(Math.round(result.totalPayment))}
              </dd>
            </div>
          </dl>
        </GlassCard>
      </div>
    </div>
  );
}
