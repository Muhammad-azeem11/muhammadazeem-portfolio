"use client";

// src/hooks/useReducedMotion.ts
// Respects the user's OS-level prefers-reduced-motion preference.
// All animation components must check this hook.

import { useEffect, useState } from "react";

/**
 * Returns true if the user has requested reduced motion via their OS settings.
 * Use this to disable or simplify animations for accessibility compliance.
 *
 * @example
 * const reduced = useReducedMotion();
 * const variants = reduced ? simpleVariants : fullVariants;
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return reducedMotion;
}
