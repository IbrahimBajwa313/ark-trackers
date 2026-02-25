"use client";

import { useRef, useState, useEffect } from "react";

/**
 * Lightweight Intersection Observer hook. Use for scroll-triggered visibility.
 * Returns ref to attach to element and inView boolean when element is visible.
 */
export function useInView(options?: { threshold?: number; rootMargin?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px" } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}
