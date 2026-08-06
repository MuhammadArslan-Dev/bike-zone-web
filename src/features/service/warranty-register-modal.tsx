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
import { FEATURED_MOTORCYCLES } from "@/constants/motorcycles";

const registerSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  bikeId: z.string().min(1, "Choose a bike"),
  purchaseDate: z.string().min(1, "Choose your purchase date"),
});

type RegisterValues = z.infer<typeof registerSchema>;

export function WarrantyRegisterModal({
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
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  function onSubmit(values: RegisterValues) {
    const bike = FEATURED_MOTORCYCLES.find((item) => item.id === values.bikeId);
    toast.success("Warranty registered!", {
      description: bike
        ? `${bike.brand} ${bike.name} is now registered under ${values.name}'s warranty coverage.`
        : `Your bike is now registered under ${values.name}'s warranty coverage.`,
    });
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Register your bike</DialogTitle>
          <DialogDescription>
            Activate your warranty coverage — takes less than a minute.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="warranty-name">Full name</Label>
            <Input
              id="warranty-name"
              placeholder="Jordan Smith"
              autoComplete="name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="warranty-bike">Bike</Label>
            <Controller
              control={control}
              name="bikeId"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="warranty-bike" className="w-full">
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
            <Label htmlFor="warranty-date">Purchase date</Label>
            <Input
              id="warranty-date"
              type="date"
              {...register("purchaseDate")}
            />
            {errors.purchaseDate && (
              <p className="text-destructive text-sm">
                {errors.purchaseDate.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Register Bike
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
