const compactFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const integerFormatter = new Intl.NumberFormat("en");

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return integerFormatter.format(value);
}

export function formatCompactNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return compactFormatter.format(value).toUpperCase();
}

export function formatPercentage(value: number, fractionDigits = 1): string {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(fractionDigits).replace(/\.0$/, "")}%`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
