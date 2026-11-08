import { useEffect, useState } from "react";

/**
 * Tracks which archive section owns the reading position. The observer band
 * sits near the upper third of the viewport so long sections behave naturally.
 */
export function useActiveSection(sectionIds: string[], fallback = "home"): string {
  const [active, setActive] = useState(fallback);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);

        const first = visible[0];
        if (first?.target.id) {
          setActive(first.target.id);
        }
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: 0 },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return active;
}
