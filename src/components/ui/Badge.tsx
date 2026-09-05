import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ── Badge ────────────────────────────────────────────────────────────────────

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium rounded-full text-xs tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "bg-neutral-100 text-neutral-700",
        navy: "bg-navy-50 text-navy-700",
        "navy-solid": "bg-navy-900 text-white",
        accent: "bg-accent-50 text-accent-600",
        "accent-solid": "bg-accent-500 text-white",
        success: "bg-green-50 text-green-700",
        warning: "bg-amber-50 text-amber-700",
        error: "bg-red-50 text-red-700",
        outline: "border border-neutral-300 text-neutral-600 bg-transparent",
        "outline-navy": "border border-navy-300 text-navy-700 bg-transparent",
      },
      size: {
        sm: "px-2.5 py-0.5",
        md: "px-3 py-1",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    /** Optional dot indicator before label */
    dot?: boolean;
  };

function Badge({ className, variant, size, dot = false, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-current opacity-75"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
export type { BadgeProps };
