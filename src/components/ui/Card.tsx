import * as React from "react";
import { cn } from "@/lib/utils";

// ── Card ─────────────────────────────────────────────────────────────────────

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Enable hover lift animation */
  hoverable?: boolean;
  /** Card padding variant */
  padding?: "none" | "sm" | "md" | "lg";
  /** Card border style */
  border?: "default" | "subtle" | "none" | "navy";
  /** Background variant */
  background?: "white" | "surface" | "navy";
};

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const borderClasses = {
  default: "border border-neutral-200",
  subtle: "border border-neutral-100",
  none: "border-0",
  navy: "border border-navy-200",
};

const backgroundClasses = {
  white: "bg-white",
  surface: "bg-neutral-50",
  navy: "bg-navy-900",
};

/**
 * Base card component. Compose with CardHeader, CardBody, CardFooter.
 * All service cards, case study cards, and testimonials use this.
 */
function Card({
  className,
  hoverable = false,
  padding = "md",
  border = "default",
  background = "white",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden",
        backgroundClasses[background],
        borderClasses[border],
        paddingClasses[padding],
        hoverable && [
          "cursor-pointer",
          "transition-all duration-300",
          "hover:-translate-y-1 hover:shadow-xl",
          "hover:border-navy-200",
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ── Card Sub-components ───────────────────────────────────────────────────────

function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

function CardBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-6 pt-4 border-t border-neutral-100", className)} {...props}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardBody, CardFooter };
