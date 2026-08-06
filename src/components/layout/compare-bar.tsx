"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  MAX_COMPARE,
  removeFromCompare,
  useCompareIds,
} from "@/lib/compare-store";

export function CompareBar() {
  const compareIds = useCompareIds();
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {compareIds.length > 0 && pathname !== "/compare" && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card ring-foreground/10 shadow-elevation-4 fixed inset-x-4 bottom-24 z-40 mx-auto flex max-w-xl items-center justify-between gap-4 rounded-full px-5 py-3 ring-1 sm:inset-x-auto sm:bottom-5 sm:left-1/2 sm:-translate-x-1/2"
        >
          <p className="text-sm font-medium">
            {compareIds.length} of {MAX_COMPARE} bikes selected
          </p>
          <div className="flex items-center gap-2">
            <Button size="sm" asChild>
              <Link href="/compare">Compare Now</Link>
            </Button>
            <button
              type="button"
              aria-label="Clear comparison"
              onClick={() => compareIds.forEach((id) => removeFromCompare(id))}
              className="text-muted-foreground hover:text-foreground flex size-8 items-center justify-center rounded-full transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
