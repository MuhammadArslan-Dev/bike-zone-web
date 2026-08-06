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
import { StarRatingInput } from "@/components/ui/star-rating-input";
import { Textarea } from "@/components/ui/textarea";
import { FEATURED_MOTORCYCLES } from "@/constants/motorcycles";

const reviewSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  bikeId: z.string().min(1, "Choose a bike"),
  rating: z.number().min(1, "Choose a star rating"),
  quote: z.string().min(20, "Tell us a bit more (at least 20 characters)"),
});

type ReviewValues = z.infer<typeof reviewSchema>;

export function WriteReviewModal({
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
  } = useForm<ReviewValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0 },
  });

  function onSubmit(values: ReviewValues) {
    toast.success("Thanks for the review!", {
      description: `We'll publish it once our team gives it a quick look, ${values.name}.`,
    });
    reset({ name: "", bikeId: "", rating: 0, quote: "" });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Write a review</DialogTitle>
          <DialogDescription>
            Share your experience — it helps other riders decide with
            confidence.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="review-name">Full name</Label>
            <Input
              id="review-name"
              placeholder="Jordan Smith"
              autoComplete="name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="review-bike">Bike</Label>
            <Controller
              control={control}
              name="bikeId"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="review-bike" className="w-full">
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
            <Label>Your rating</Label>
            <Controller
              control={control}
              name="rating"
              render={({ field }) => (
                <StarRatingInput
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.rating && (
              <p className="text-destructive text-sm">
                {errors.rating.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="review-quote">Your review</Label>
            <Textarea
              id="review-quote"
              placeholder="Tell other riders about your experience..."
              rows={4}
              {...register("quote")}
            />
            {errors.quote && (
              <p className="text-destructive text-sm">{errors.quote.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Submit Review
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
