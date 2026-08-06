"use client";

import { useSyncExternalStore } from "react";

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

export function toggleWishlist(id: string) {
  const wasWishlisted = ids.includes(id);
  ids = wasWishlisted
    ? ids.filter((existing) => existing !== id)
    : [...ids, id];
  emit();
  return !wasWishlisted;
}

export function useWishlistIds() {
  return useSyncExternalStore(
    subscribe,
    () => ids,
    () => EMPTY,
  );
}

export function useIsWishlisted(id: string) {
  return useWishlistIds().includes(id);
}
