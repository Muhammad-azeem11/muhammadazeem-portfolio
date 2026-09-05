import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ── Button Variants ──────────────────────────────────────────────────────────

const buttonVariants = cva(
  // Base styles — applied to all variants
  [
    "inline-flex items-center justify-center gap-2",
    "font-semibold tracking-wide",
    "transition-all duration-250",
    "cursor-pointer select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        /** Primary CTA — Navy background, white text */
        primary: [
          "bg-navy-900 text-white btn-shimmer",
          "hover:bg-navy-800 active:bg-navy-950",
          "focus-visible:ring-navy-900",
          "shadow-md hover:shadow-lg hover:-translate-y-px",
        ],
        /** Secondary CTA — Accent blue */
        accent: [
          "bg-accent-500 text-white btn-shimmer",
          "hover:bg-accent-600 active:bg-accent-600",
          "focus-visible:ring-accent-500",
          "shadow-accent hover:shadow-accent hover:-translate-y-px",
        ],
        /** Outlined — navy border */
        outline: [
          "border-2 border-navy-900 text-navy-900 bg-transparent",
          "hover:bg-navy-900 hover:text-white",
          "focus-visible:ring-navy-900",
        ],
        /** Ghost — no border, subtle hover */
        ghost: [
          "text-navy-900 bg-transparent",
          "hover:bg-neutral-100",
          "focus-visible:ring-navy-900",
        ],
        /** Inverse — white on navy bg sections */
        inverse: [
          "bg-white text-navy-900",
          "hover:bg-neutral-50 active:bg-neutral-100",
          "focus-visible:ring-white",
          "shadow-md hover:shadow-lg hover:-translate-y-px",
        ],
        /** Outline inverse — for dark backgrounds */
        "outline-inverse": [
          "border-2 border-white text-white bg-transparent",
          "hover:bg-white hover:text-navy-900",
          "focus-visible:ring-white",
        ],
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-lg",
        md: "h-11 px-6 text-sm rounded-xl",
        lg: "h-13 px-8 text-base rounded-xl",
        xl: "h-15 px-10 text-lg rounded-2xl",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// ── Button Props ─────────────────────────────────────────────────────────────

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    /** Render as child element (e.g. Next.js Link). Uses Radix Slot. */
    asChild?: boolean;
    /** Show loading spinner and disable interaction */
    isLoading?: boolean;
    /** Icon to render before label */
    leftIcon?: React.ReactNode;
    /** Icon to render after label */
    rightIcon?: React.ReactNode;
  };

// ── Button Component ─────────────────────────────────────────────────────────

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled ?? isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {asChild ? (
          children
        ) : isLoading ? (
          <>
            <LoadingSpinner />
            <span>{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
            {children}
            {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

// ── Loading Spinner ──────────────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export { Button, buttonVariants };
