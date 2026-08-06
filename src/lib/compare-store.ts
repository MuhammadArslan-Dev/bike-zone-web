"use client";

import { useSyncExternalStore } from "react";

export const MAX_COMPARE = 3;

const EMPTY: string[] = [];
const listeners = new Set<() => void>();
let ids: string[] = EMPTY;

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

type ToggleResult = "added" | "removed" | "limit-reached";

export function toggleCompare(id: string): ToggleResult {
  if (ids.includes(id)) {
    ids = ids.filter((existing) => existing !== id);
    emit();
    return "removed";
  }

  if (ids.length >= MAX_COMPARE) {
    return "limit-reached";
  }

  ids = [...ids, id];
  emit();
  return "added";
}

export function removeFromCompare(id: string) {
  ids = ids.filter((existing) => existing !== id);
  emit();
}

export function useCompareIds() {
  return useSyncExternalStore(
    subscribe,
    () => ids,
    () => EMPTY,
  );
}

export function useIsCompared(id: string) {
  return useCompareIds().includes(id);
}
