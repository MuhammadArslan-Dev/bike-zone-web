"use client";

import { Disc3, Gauge, Play, Power, Square, Volume2 } from "lucide-react";
import type { ComponentType } from "react";

import { BentoTile } from "@/features/home/bento-tile";
import { SoundVisualizer } from "@/features/home/sound-visualizer";
import { useEngineSound, type EngineState } from "@/hooks/use-engine-sound";

const CONTROLS: {
  state: NonNullable<EngineState>;
  label: string;
  icon: ComponentType<{ className?: string }>;
}[] = [
  { state: "start", label: "Engine Start", icon: Power },
  { state: "idle", label: "Idle Sound", icon: Disc3 },
  { state: "rev", label: "Revving", icon: Gauge },
  { state: "acceleration", label: "Acceleration", icon: Play },
  { state: "stop", label: "Stop", icon: Square },
];

export function BikeSoundPreview() {
  const {
    activeState,
    analyserRef,
    playStart,
    playIdle,
    playRev,
    playAcceleration,
    stopEngine,
  } = useEngineSound();

  const handlers: Record<NonNullable<EngineState>, () => void> = {
    start: playStart,
    idle: playIdle,
    rev: playRev,
    acceleration: playAcceleration,
    stop: stopEngine,
  };

  return (
    <BentoTile
      label="Feel the Machine"
      title="Bike Sound Preview"
      icon={Volume2}
    >
      <SoundVisualizer analyserRef={analyserRef} className="h-14" />

      <div className="mt-4 flex flex-1 flex-col justify-center gap-1.5">
        {CONTROLS.map(({ state, label, icon: Icon }) => (
          <button
            key={state}
            type="button"
            onClick={() => handlers[state]()}
            className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm transition-colors ${
              activeState === state
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </button>
        ))}
      </div>

      <p className="text-muted-foreground mt-3 text-center text-xs">
        Best experienced with sound on.
      </p>
    </BentoTile>
  );
}
