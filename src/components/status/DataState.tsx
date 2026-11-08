import type { ReactNode } from "react";

export function LoadingState({ label = "Loading record", rows = 4 }: { label?: string; rows?: number }) {
  return (
    <div className="data-state data-state--loading" role="status" aria-live="polite">
      <p className="mono-label">{label}…</p>
      <div className="skeleton" aria-hidden="true">
        {Array.from({ length: rows }, (_, index) => (
          <span key={index} className="skeleton__line" style={{ width: `${88 - index * 9}%` }} />
        ))}
      </div>
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
  children,
}: {
  message: string;
  onRetry?: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="data-state data-state--error" role="alert">
      <p className="data-state__title">RECORD UNAVAILABLE</p>
      <p className="data-state__message">{message}</p>
      {children}
      {onRetry ? (
        <button type="button" className="button button--small" onClick={onRetry}>
          Retry request
        </button>
      ) : null}
    </div>
  );
}

export function EmptyState({
  title = "No verified records",
  message,
  children,
}: {
  title?: string;
  message: string;
  children?: ReactNode;
}) {
  return (
    <div className="data-state data-state--empty">
      <p className="data-state__title">{title}</p>
      <p className="data-state__message">{message}</p>
      {children}
    </div>
  );
}
