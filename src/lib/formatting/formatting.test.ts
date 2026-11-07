import { describe, expect, it } from "vitest";
import { formatDate, formatDurationMs, formatMonthYear, formatRelative, formatUtcClock } from "@/lib/formatting/date";
import { formatCompactNumber, formatPercentage, formatNumber } from "@/lib/formatting/number";

describe("date formatting", () => {
  it("formats ISO dates in UTC", () => {
    expect(formatDate("2026-11-07T23:30:00Z")).toBe("07 NOV 2026");
    expect(formatMonthYear("2025-04-15T00:00:00Z")).toBe("APR 2025");
  });

  it("returns a dash for missing or invalid values", () => {
    expect(formatDate(null)).toBe("—");
    expect(formatDate("not-a-date")).toBe("—");
  });

  it("formats relative time from an explicit reference", () => {
    const now = Date.parse("2026-11-07T15:00:00Z");
    expect(formatRelative("2026-11-07T14:59:50Z", now)).toBe("just now");
    expect(formatRelative("2026-11-07T12:00:00Z", now)).toBe("3h ago");
    expect(formatRelative("2026-10-30T15:00:00Z", now)).toBe("8d ago");
    expect(formatRelative(undefined, now)).toBe("—");
  });

  it("formats a UTC wall clock", () => {
    expect(formatUtcClock(new Date("2026-11-07T09:05:07Z"))).toBe("09:05:07 UTC");
  });

  it("formats playback durations", () => {
    expect(formatDurationMs(0)).toBe("0:00");
    expect(formatDurationMs(65_000)).toBe("1:05");
  });
});

describe("number formatting", () => {
  it("formats counts and compact values", () => {
    expect(formatNumber(1234)).toBe("1,234");
    expect(formatCompactNumber(12_500)).toBe("12.5K");
    expect(formatPercentage(40)).toBe("40%");
    expect(formatPercentage(33.333, 1)).toBe("33.3%");
  });
});
