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
import type { UpcomingLaunch } from "@/constants/launches";

const notifySchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type NotifyValues = z.infer<typeof notifySchema>;

export function NotifyMeModal({
  open,
  onOpenChange,
  launch,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  launch: UpcomingLaunch;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NotifyValues>({ resolver: zodResolver(notifySchema) });

  function onSubmit(values: NotifyValues) {
    toast.success("You're on the list!", {
      description: `We'll email ${values.email} the moment the ${launch.brand} ${launch.name} launches.`,
    });
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            Get notified — {launch.brand} {launch.name}
          </DialogTitle>
          <DialogDescription>
            We&apos;ll send a one-time email as soon as it&apos;s available.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="notify-email">Email address</Label>
            <Input
              id="notify-email"
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
            Notify Me
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
