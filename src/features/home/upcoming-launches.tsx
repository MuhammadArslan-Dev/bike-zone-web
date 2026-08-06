import { Rocket } from "lucide-react";

import { UPCOMING_LAUNCHES } from "@/constants/launches";
import { BentoTile } from "@/features/home/bento-tile";
import { LaunchCard } from "@/features/home/launch-card";

export function UpcomingLaunches() {
  return (
    <BentoTile label="Coming Soon" title="Upcoming Launches" icon={Rocket}>
      <div className="flex flex-1 flex-col justify-center gap-4">
        {UPCOMING_LAUNCHES.map((launch) => (
          <LaunchCard key={launch.id} launch={launch} />
        ))}
      </div>
    </BentoTile>
  );
}
