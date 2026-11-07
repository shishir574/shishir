import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Fires once when the element is about to enter the viewport. Used to defer
 * live API work until the relevant section is approached.
 */
export function useNearViewport<T extends HTMLElement>(
  rootMargin = "320px",
): { ref: RefObject<T | null>; inView: boolean } {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState<boolean>(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [inView, rootMargin]);

  return { ref, inView };
}
