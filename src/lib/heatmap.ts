import type { LeetCodeActivity } from "@/types/content";

export interface DayCell {
  date: string;
  count: number | null;
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Builds a calendar grid from genuine dated records. Days with no record are
 * marked as "no data" rather than being silently reported as zero.
 */
export function buildHeatmapWeeks(
  activity: LeetCodeActivity[],
  weeks = 26,
  today = new Date(),
): DayCell[][] {
  const counts = new Map(activity.map((entry) => [entry.date, entry.count]));
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const dayOfWeek = (end.getUTCDay() + 6) % 7;
  const endOfCurrentWeek = new Date(end);
  endOfCurrentWeek.setUTCDate(end.getUTCDate() + (6 - dayOfWeek));

  const start = new Date(endOfCurrentWeek);
  start.setUTCDate(endOfCurrentWeek.getUTCDate() - (weeks * 7 - 1));

  const columns: DayCell[][] = [];
  for (let week = 0; week < weeks; week += 1) {
    const column: DayCell[] = [];
    for (let day = 0; day < 7; day += 1) {
      const cellDate = new Date(start);
      cellDate.setUTCDate(start.getUTCDate() + week * 7 + day);
      if (cellDate > end) {
        continue;
      }
      const iso = toIsoDate(cellDate);
      column.push({ date: iso, count: counts.get(iso) ?? null });
    }
    columns.push(column);
  }
  return columns;
}
