"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const priceAlertSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type PriceAlertValues = z.infer<typeof priceAlertSchema>;

export function PriceAlertModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PriceAlertValues>({ resolver: zodResolver(priceAlertSchema) });

  function onSubmit(values: PriceAlertValues) {
    toast.success("Price alerts on!", {
      description: `We'll email ${values.email} whenever a bike's price drops.`,
    });
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Get price drop alerts</DialogTitle>
          <DialogDescription>
            We&apos;ll send a one-time email whenever any bike in our lineup
            drops in price.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="price-alert-email">Email address</Label>
            <Input
              id="price-alert-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Enable Alerts
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
