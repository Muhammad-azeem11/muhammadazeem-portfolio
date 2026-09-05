"use client";

// src/hooks/useScrollProgress.ts
// Tracks page scroll progress as a value between 0 and 1.
// Useful for progress indicators and parallax calculations.

import { useEffect, useState } from "react";

/**
 * Returns scroll progress as a normalized value from 0 to 1.
 * 0 = top of page, 1 = bottom of page.
 *
 * @example
 * const progress = useScrollProgress();
 * // progress goes from 0 → 1 as user scrolls
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(scrollTop / docHeight, 1));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress(); // initial
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return progress;
}

/**
 * Returns whether the user has scrolled past a certain pixel threshold.
 * Useful for header transparency/sticky behavior.
 *
 * @example
 * const scrolled = useScrolled(80); // true after scrolling 80px
 */
export function useScrolled(threshold = 80): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
}
