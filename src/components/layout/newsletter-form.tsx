"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  function onSubmit(values: NewsletterValues) {
    toast.success("Subscribed!", {
      description: `We'll send updates and launch news to ${values.email}.`,
    });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1.5">
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          aria-label="Email address"
          {...register("email")}
        />
        <Button type="submit" size="icon" aria-label="Subscribe">
          <ArrowRight className="size-4" />
        </Button>
      </div>
      {errors.email && (
        <p className="text-destructive text-xs">{errors.email.message}</p>
      )}
    </form>
  );
}
