import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-6",
      lg: "size-9",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SpinnerProps = React.ComponentProps<"svg"> &
  VariantProps<typeof spinnerVariants> & {
    label?: string;
  };

function Spinner({ className, size, label, ...props }: SpinnerProps) {
  return (
    <span
      role="status"
      className="inline-flex items-center gap-2"
      aria-live="polite"
    >
      <Loader2
        className={cn(spinnerVariants({ size }), className)}
        aria-hidden="true"
        {...props}
      />
      {label ? (
        <span className="text-muted-foreground text-sm">{label}</span>
      ) : (
        <span className="sr-only">Loading…</span>
      )}
    </span>
  );
}

export { Spinner };
