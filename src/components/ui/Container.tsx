import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ── Container ────────────────────────────────────────────────────────────────

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Max-width variant. Default "default" = 1280px */
  size?: "sm" | "default" | "lg" | "full";
  /** Use <section> tag instead of <div> */
  as?: "div" | "section" | "article" | "main" | "aside";
};

/**
 * Consistent horizontal padding and max-width centering.
 * Use on every page section for layout consistency.
 */
function Container({
  className,
  size = "default",
  as: Tag = "div",
  children,
  ...props
}: ContainerProps) {
  const maxWidths = {
    sm: "max-w-3xl",
    default: "max-w-screen-xl",
    lg: "max-w-screen-2xl",
    full: "max-w-none",
  };

  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12 xl:px-16",
        maxWidths[size],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /** Add extra top padding. Useful for page hero sections. */
  hero?: boolean;
  /** Background variant */
  background?: "white" | "surface" | "navy" | "navy-gradient" | "transparent";
};

/**
 * Page section wrapper with consistent vertical spacing.
 */
function Section({
  className,
  hero = false,
  background = "white",
  children,
  ...props
}: SectionProps) {
  const backgrounds = {
    white: "bg-white",
    surface: "bg-neutral-50",
    navy: "bg-navy-900",
    "navy-gradient": "bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800",
    transparent: "bg-transparent",
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "py-20 lg:py-30",
        hero && "pt-32 lg:pt-40",
        backgrounds[background],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

// ── Grid ─────────────────────────────────────────────────────────────────────

const gridVariants = cva("grid gap-6 lg:gap-8", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      "2-1": "grid-cols-1 lg:grid-cols-[2fr_1fr]",
      "1-2": "grid-cols-1 lg:grid-cols-[1fr_2fr]",
    },
  },
  defaultVariants: {
    cols: 3,
  },
});

type GridProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof gridVariants>;

function Grid({ className, cols, children, ...props }: GridProps) {
  return (
    <div className={cn(gridVariants({ cols }), className)} {...props}>
      {children}
    </div>
  );
}

// ── Divider ──────────────────────────────────────────────────────────────────

function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-neutral-200", className)} />;
}

export { Container, Section, Grid, Divider };
