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
import type { Accessory } from "@/types";

const enquirySchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z.string().min(7, "Enter a valid phone number"),
  quantity: z.number().int().min(1, "Enter at least 1"),
});

type EnquiryValues = z.infer<typeof enquirySchema>;

export function AccessoryEnquiryModal({
  accessory,
  onOpenChange,
}: {
  accessory: Accessory | null;
  onOpenChange: (open: boolean) => void;
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { quantity: 1 },
  });

  function onSubmit(values: EnquiryValues) {
    if (!accessory) return;
    toast.success("Enquiry sent!", {
      description: `We'll contact ${values.name} about ${values.quantity}x ${accessory.name}.`,
    });
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={!!accessory} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Enquire about {accessory?.name}</DialogTitle>
          <DialogDescription>
            We&apos;ll check stock and get back to you with availability and
            pickup options.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="enquiry-name">Full name</Label>
            <Input
              id="enquiry-name"
              placeholder="Jordan Smith"
              autoComplete="name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="enquiry-phone">Phone number</Label>
            <Input
              id="enquiry-phone"
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
            <Label htmlFor="enquiry-quantity">Quantity</Label>
            <Controller
              control={control}
              name="quantity"
              render={({ field }) => (
                <Input
                  id="enquiry-quantity"
                  type="number"
                  min={1}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber || 1)}
                />
              )}
            />
            {errors.quantity && (
              <p className="text-destructive text-sm">
                {errors.quantity.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Send Enquiry
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
