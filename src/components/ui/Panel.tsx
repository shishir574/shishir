import type { ReactNode } from "react";

export function TagList({
  items,
  ariaLabel,
}: {
  items: string[];
  ariaLabel?: string;
}) {
  if (items.length === 0) return null;
  return (
    <ul className="tag-list" aria-label={ariaLabel}>
      {items.map((item) => (
        <li key={item} className="tag">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Panel({
  children,
  className = "",
  as: Element = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "aside";
}) {
  return <Element className={`panel ${className}`.trim()}>{children}</Element>;
}
