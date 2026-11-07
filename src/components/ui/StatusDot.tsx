export type StatusTone = "live" | "warning" | "offline" | "idle";

const LABELS: Record<StatusTone, string> = {
  live: "Live",
  warning: "Limited",
  offline: "Offline",
  idle: "Standby",
};

export function StatusDot({
  tone,
  label,
  showLabel = true,
}: {
  tone: StatusTone;
  label?: string;
  showLabel?: boolean;
}) {
  const text = label ?? LABELS[tone];
  return (
    <span className={`status status--${tone}`}>
      <span className="status__dot" aria-hidden="true" />
      <span className={showLabel ? "status__label" : "sr-only"}>{text}</span>
    </span>
  );
}
