"use client";

import { useState } from "react";

import { BRANCHES } from "@/constants/branches";
import { findNearestBranch } from "@/lib/geo";

export type NearestBranchStatus = "idle" | "locating" | "denied";

export function useNearestBranch() {
  const [nearestId, setNearestId] = useState<string | null>(null);
  const [status, setStatus] = useState<NearestBranchStatus>("idle");

  function findNearest() {
    if (!navigator.geolocation) {
      setStatus("denied");
      return;
    }

    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearest = findNearestBranch(
          { lat: position.coords.latitude, lng: position.coords.longitude },
          BRANCHES,
        );
        setNearestId(nearest.id);
        setStatus("idle");
      },
      () => setStatus("denied"),
      { timeout: 8000 },
    );
  }

  return { nearestId, status, findNearest };
}
