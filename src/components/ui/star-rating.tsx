import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

const SIZE_CLASSES = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
} as const;

export function StarRating({
  rating,
  size = "sm",
  className,
}: {
  rating: number;
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            SIZE_CLASSES[size],
            index < rating
              ? "fill-accent text-accent"
              : "text-muted-foreground",
          )}
        />
      ))}
    </div>
  );
}
