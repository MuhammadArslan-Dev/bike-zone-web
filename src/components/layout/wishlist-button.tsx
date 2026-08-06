"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useWishlistIds } from "@/lib/wishlist-store";

export function WishlistButton() {
  const wishlistIds = useWishlistIds();

  return (
    <Button variant="ghost" size="icon" asChild className="relative">
      <Link
        href="/wishlist"
        aria-label={`Wishlist (${wishlistIds.length} items)`}
      >
        <Heart className="size-4" />
        {wishlistIds.length > 0 && (
          <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full text-[10px] font-semibold">
            {wishlistIds.length}
          </span>
        )}
      </Link>
    </Button>
  );
}
