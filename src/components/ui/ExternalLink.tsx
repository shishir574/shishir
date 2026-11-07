import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function ExternalLink({
  href,
  children,
  className = "text-link",
  showIcon = true,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
  ariaLabel?: string;
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={ariaLabel}
    >
      <span>{children}</span>
      {showIcon ? <ArrowUpRight size={14} aria-hidden="true" /> : null}
    </a>
  );
}
