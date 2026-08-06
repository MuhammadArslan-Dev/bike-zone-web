import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-primary text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export function Display({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "font-heading text-5xl leading-[1.05] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl",
        className,
      )}
      {...props}
    />
  );
}

export function Lead({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-muted-foreground text-lg leading-relaxed sm:text-xl",
        className,
      )}
      {...props}
    />
  );
}

export function Muted({ className, ...props }: ComponentProps<"p">) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props} />
  );
}

export function Caption({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-muted-foreground text-xs tracking-wide uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function GradientText({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn("text-gradient-primary font-heading font-bold", className)}
      {...props}
    />
  );
}
