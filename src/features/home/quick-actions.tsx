"use client";

import {
  BellRing,
  Calculator,
  CalendarClock,
  Scale,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { GlassCard } from "@/components/ui/glass-card";
import { useCompareIds } from "@/lib/compare-store";
import { cn } from "@/lib/utils";

import { PriceAlertModal } from "./price-alert-modal";
import { ReserveOnlineModal } from "./reserve-online-modal";
import { TestRideModal } from "./test-ride-modal";

type Tile = {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
  badge?: number;
};

function ActionTile({ tile }: { tile: Tile }) {
  const Icon = tile.icon;
  const content = (
    <>
      <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground relative flex size-11 shrink-0 items-center justify-center rounded-full transition-colors">
        <Icon className="size-5" />
        {!!tile.badge && (
          <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full text-xs font-semibold">
            {tile.badge}
          </span>
        )}
      </div>
      <div>
        <p className="font-heading font-semibold">{tile.label}</p>
        <p className="text-muted-foreground text-sm">{tile.description}</p>
      </div>
    </>
  );

  const className = cn(
    "group ring-foreground/10 hover:ring-primary/40 hover:shadow-elevation-3 flex items-center gap-4 rounded-xl p-4 text-left ring-1 transition-all",
  );

  if (tile.href) {
    return (
      <Link href={tile.href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={tile.onClick} className={className}>
      {content}
    </button>
  );
}

export function QuickActions() {
  const [testRideOpen, setTestRideOpen] = useState(false);
  const [priceAlertOpen, setPriceAlertOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const compareCount = useCompareIds().length;

  const tiles: Tile[] = [
    {
      id: "finder",
      label: "Bike Finder Quiz",
      description: "Find the perfect bike for you",
      icon: Sparkles,
      href: "/finder",
    },
    {
      id: "emi",
      label: "EMI Calculator",
      description: "Calculate your monthly payment",
      icon: Calculator,
      href: "/emi-calculator",
    },
    {
      id: "compare",
      label: "Compare Bikes",
      description: "Compare up to 3 bikes",
      icon: Scale,
      href: "/compare",
      badge: compareCount,
    },
    {
      id: "test-ride",
      label: "Book Test Ride",
      description: "Book your test ride now",
      icon: CalendarClock,
      onClick: () => setTestRideOpen(true),
    },
    {
      id: "price-alerts",
      label: "Price Drop Alerts",
      description: "Get alerts on price drops",
      icon: BellRing,
      onClick: () => setPriceAlertOpen(true),
    },
    {
      id: "book-online",
      label: "Book Online",
      description: "Reserve online, pay at showroom",
      icon: ShoppingBag,
      onClick: () => setReserveOpen(true),
    },
  ];

  return (
    <section
      aria-label="Quick actions"
      className="max-w-8xl py-section-sm mx-auto px-4 sm:px-6 lg:px-8"
    >
      <GlassCard className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3 lg:p-3">
        {tiles.map((tile) => (
          <ActionTile key={tile.id} tile={tile} />
        ))}
      </GlassCard>

      <TestRideModal open={testRideOpen} onOpenChange={setTestRideOpen} />
      <PriceAlertModal open={priceAlertOpen} onOpenChange={setPriceAlertOpen} />
      <ReserveOnlineModal open={reserveOpen} onOpenChange={setReserveOpen} />
    </section>
  );
}
