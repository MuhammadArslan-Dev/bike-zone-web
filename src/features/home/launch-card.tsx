"use client";

import { Bell } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { UpcomingLaunch } from "@/constants/launches";
import { NotifyMeModal } from "@/features/home/notify-me-modal";
import { useCountdown } from "@/hooks/use-countdown";
import { formatPrice } from "@/utils/format";

export function LaunchCard({ launch }: { launch: UpcomingLaunch }) {
  const [notifyOpen, setNotifyOpen] = useState(false);
  const countdown = useCountdown(launch.launchDate);

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={launch.image}
            alt={`${launch.brand} ${launch.name} teaser`}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {launch.brand} {launch.name}
          </p>
          <p className="text-muted-foreground text-xs">
            Expected {formatPrice(launch.expectedPrice)}
          </p>
          <p className="text-primary text-xs font-medium tabular-nums">
            {countdown.isComplete
              ? "Available now!"
              : `${countdown.days}d ${String(countdown.hours).padStart(2, "0")}h left`}
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setNotifyOpen(true)}
          className="shrink-0 gap-1.5"
        >
          <Bell className="size-3.5" /> Notify
        </Button>
      </div>

      <NotifyMeModal
        open={notifyOpen}
        onOpenChange={setNotifyOpen}
        launch={launch}
      />
    </>
  );
}
