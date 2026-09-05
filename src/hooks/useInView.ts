"use client";

// src/hooks/useInView.ts
// Intersection Observer hook for scroll-reveal animations.

import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  /** Intersection threshold (0–1). Default: 0.1 */
  threshold?: number;
  /** Root margin. Default: "0px 0px -60px 0px" (triggers slightly before element enters) */
  rootMargin?: string;
  /** Only trigger once. Default: true */
  once?: boolean;
};

/**
 * Returns a ref and a boolean indicating if the element is in the viewport.
 * Used to trigger Framer Motion scroll-reveal animations.
 *
 * @example
 * const { ref, inView } = useInView();
 * return <div ref={ref}>{inView ? "visible" : "hidden"}</div>
 */
export function useInView<T extends Element = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = "0px 0px -60px 0px",
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
