"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LENDERS } from "@/constants/lenders";
import { FEATURED_MOTORCYCLES } from "@/constants/motorcycles";

const INCOME_RANGES = [
  "Under $2,000/mo",
  "$2,000–$4,000/mo",
  "$4,000–$6,000/mo",
  "Over $6,000/mo",
];

const applicationSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z.string().min(7, "Enter a valid phone number"),
  bikeId: z.string().min(1, "Choose a bike"),
  lenderId: z.string().min(1, "Choose a lender"),
  income: z.string().min(1, "Choose your income range"),
});

type ApplicationValues = z.infer<typeof applicationSchema>;

export function FinanceApplicationModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationValues>({ resolver: zodResolver(applicationSchema) });

  function onSubmit(values: ApplicationValues) {
    const lender = LENDERS.find((item) => item.id === values.lenderId);
    toast.success("Application received!", {
      description: lender
        ? `A ${lender.name} advisor will call ${values.name} within 1 business day.`
        : `A financing advisor will call ${values.name} within 1 business day.`,
    });
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Apply for pre-qualification</DialogTitle>
          <DialogDescription>
            No impact to your credit score — a soft check only, to estimate your
            rate.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="finance-name">Full name</Label>
            <Input
              id="finance-name"
              placeholder="Jordan Smith"
              autoComplete="name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="finance-phone">Phone number</Label>
            <Input
              id="finance-phone"
              type="tel"
              placeholder="(512) 555-0100"
              autoComplete="tel"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-destructive text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="finance-bike">Bike</Label>
            <Controller
              control={control}
              name="bikeId"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="finance-bike" className="w-full">
                    <SelectValue placeholder="Choose a bike" />
                  </SelectTrigger>
                  <SelectContent>
                    {FEATURED_MOTORCYCLES.map((bike) => (
                      <SelectItem key={bike.id} value={bike.id}>
                        {bike.brand} {bike.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.bikeId && (
              <p className="text-destructive text-sm">
                {errors.bikeId.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="finance-lender">Preferred lender</Label>
            <Controller
              control={control}
              name="lenderId"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="finance-lender" className="w-full">
                    <SelectValue placeholder="Choose a lender" />
                  </SelectTrigger>
                  <SelectContent>
                    {LENDERS.map((lender) => (
                      <SelectItem key={lender.id} value={lender.id}>
                        {lender.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.lenderId && (
              <p className="text-destructive text-sm">
                {errors.lenderId.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="finance-income">Monthly income</Label>
            <Controller
              control={control}
              name="income"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="finance-income" className="w-full">
                    <SelectValue placeholder="Choose a range" />
                  </SelectTrigger>
                  <SelectContent>
                    {INCOME_RANGES.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.income && (
              <p className="text-destructive text-sm">
                {errors.income.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Submit Application
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
