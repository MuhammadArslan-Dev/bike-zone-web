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

const testRideSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z.string().min(7, "Enter a valid phone number"),
  bikeId: z.string().min(1, "Choose a bike"),
  preferredDate: z.string().min(1, "Choose a preferred date"),
});

type TestRideValues = z.infer<typeof testRideSchema>;

export function TestRideModal({
  open,
  onOpenChange,
  initialBikeId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialBikeId?: string;
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestRideValues>({
    resolver: zodResolver(testRideSchema),
    defaultValues: initialBikeId ? { bikeId: initialBikeId } : undefined,
  });

  function onSubmit(values: TestRideValues) {
    const bike = FEATURED_MOTORCYCLES.find((item) => item.id === values.bikeId);
    toast.success("Test ride requested!", {
      description: bike
        ? `We'll call ${values.name} to confirm your ${bike.brand} ${bike.name} test ride on ${values.preferredDate}.`
        : `We'll call ${values.name} to confirm your test ride.`,
    });
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Book a test ride</DialogTitle>
          <DialogDescription>
            Tell us who you are and which bike you&apos;d like to ride —
            we&apos;ll call to confirm a time.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="test-ride-name">Full name</Label>
            <Input
              id="test-ride-name"
              placeholder="Jordan Smith"
              autoComplete="name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="test-ride-phone">Phone number</Label>
            <Input
              id="test-ride-phone"
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
            <Label htmlFor="test-ride-bike">Bike</Label>
            <Controller
              control={control}
              name="bikeId"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="test-ride-bike" className="w-full">
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
            <Label htmlFor="test-ride-date">Preferred date</Label>
            <Input
              id="test-ride-date"
              type="date"
              {...register("preferredDate")}
            />
            {errors.preferredDate && (
              <p className="text-destructive text-sm">
                {errors.preferredDate.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Request Test Ride
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
