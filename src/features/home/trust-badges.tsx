import {
  BadgeCheck,
  HandCoins,
  RefreshCw,
  ShieldCheck,
  Users,
} from "lucide-react";

const BADGES = [
  {
    icon: ShieldCheck,
    label: "100% Genuine",
    description: "Original Products",
  },
  {
    icon: HandCoins,
    label: "Best Price",
    description: "Guaranteed",
  },
  {
    icon: RefreshCw,
    label: "Easy Exchange",
    description: "Policy",
  },
  {
    icon: Users,
    label: "Trusted by Thousands",
    description: "Riders nationwide",
  },
  {
    icon: BadgeCheck,
    label: "Premium After Sales",
    description: "Support",
  },
];

export function TrustBadges() {
  return (
    <section className="max-w-8xl py-section-sm mx-auto px-4 sm:px-6 lg:px-8">
      <div className="ring-foreground/10 grid grid-cols-2 gap-6 rounded-xl py-6 ring-1 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {BADGES.map((badge) => (
          <div
            key={badge.label}
            className="flex flex-col items-center gap-2 px-2 text-center"
          >
            <badge.icon className="text-primary size-6" />
            <div>
              <p className="text-sm font-semibold">{badge.label}</p>
              <p className="text-muted-foreground text-xs">
                {badge.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
