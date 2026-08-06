"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { BRANCHES } from "@/constants/branches";
import { FEATURED_MOTORCYCLES } from "@/constants/motorcycles";
import { SERVICE_TYPES } from "@/constants/service";

const bookingSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z.string().min(7, "Enter a valid phone number"),
  bikeId: z.string().min(1, "Choose a bike"),
  serviceTypeId: z.string().min(1, "Choose a service type"),
  branchId: z.string().min(1, "Choose a branch"),
  preferredDate: z.string().min(1, "Choose a preferred date"),
});

type BookingValues = z.infer<typeof bookingSchema>;

export function ServiceBookingForm({
  presetServiceTypeId,
}: {
  presetServiceTypeId?: string;
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: presetServiceTypeId
      ? { serviceTypeId: presetServiceTypeId }
      : undefined,
  });

  function onSubmit(values: BookingValues) {
    const serviceType = SERVICE_TYPES.find(
      (item) => item.id === values.serviceTypeId,
    );
    const branch = BRANCHES.find((item) => item.id === values.branchId);
    toast.success("Service booked!", {
      description:
        serviceType && branch
          ? `${serviceType.label} confirmed for ${values.name} at ${branch.name} on ${values.preferredDate}.`
          : `We'll confirm your appointment with ${values.name} shortly.`,
    });
    reset();
  }

  return (
    <GlassCard className="mx-auto max-w-xl p-6 sm:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="service-name">Full name</Label>
            <Input
              id="service-name"
              placeholder="Jordan Smith"
              autoComplete="name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="service-phone">Phone number</Label>
            <Input
              id="service-phone"
              type="tel"
              placeholder="(512) 555-0100"
              autoComplete="tel"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-destructive text-sm">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="service-bike">Bike</Label>
          <Controller
            control={control}
            name="bikeId"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="service-bike" className="w-full">
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
            <p className="text-destructive text-sm">{errors.bikeId.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="service-type">Service type</Label>
            <Controller
              control={control}
              name="serviceTypeId"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="service-type" className="w-full">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_TYPES.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.serviceTypeId && (
              <p className="text-destructive text-sm">
                {errors.serviceTypeId.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="service-branch">Branch</Label>
            <Controller
              control={control}
              name="branchId"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="service-branch" className="w-full">
                    <SelectValue placeholder="Choose a branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {BRANCHES.map((branch) => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.branchId && (
              <p className="text-destructive text-sm">
                {errors.branchId.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="service-date">Preferred date</Label>
          <Input id="service-date" type="date" {...register("preferredDate")} />
          {errors.preferredDate && (
            <p className="text-destructive text-sm">
              {errors.preferredDate.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Book Service
        </Button>
      </form>
    </GlassCard>
  );
}
