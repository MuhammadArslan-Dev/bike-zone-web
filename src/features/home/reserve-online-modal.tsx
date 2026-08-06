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
import { BRANCHES } from "@/constants/branches";
import { FEATURED_MOTORCYCLES } from "@/constants/motorcycles";

const reserveSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z.string().min(7, "Enter a valid phone number"),
  bikeId: z.string().min(1, "Choose a bike"),
  branchId: z.string().min(1, "Choose a branch"),
});

type ReserveValues = z.infer<typeof reserveSchema>;

export function ReserveOnlineModal({
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
  } = useForm<ReserveValues>({ resolver: zodResolver(reserveSchema) });

  function onSubmit(values: ReserveValues) {
    const bike = FEATURED_MOTORCYCLES.find((item) => item.id === values.bikeId);
    const branch = BRANCHES.find((item) => item.id === values.branchId);
    toast.success("Reservation held!", {
      description:
        bike && branch
          ? `${bike.brand} ${bike.name} is on hold for ${values.name} at ${branch.name} — pay in person to confirm.`
          : `Your bike is on hold for ${values.name} — pay in person to confirm.`,
    });
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Reserve online, pay at showroom</DialogTitle>
          <DialogDescription>
            We&apos;ll hold your bike at the branch you choose — no online
            payment required, you pay in person.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reserve-name">Full name</Label>
            <Input
              id="reserve-name"
              placeholder="Jordan Smith"
              autoComplete="name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reserve-phone">Phone number</Label>
            <Input
              id="reserve-phone"
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
            <Label htmlFor="reserve-bike">Bike</Label>
            <Controller
              control={control}
              name="bikeId"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="reserve-bike" className="w-full">
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
            <Label htmlFor="reserve-branch">Branch</Label>
            <Controller
              control={control}
              name="branchId"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="reserve-branch" className="w-full">
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

          <Button type="submit" className="w-full">
            Reserve Bike
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
