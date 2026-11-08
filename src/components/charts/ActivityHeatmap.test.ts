import { describe, expect, it } from "vitest";
import { buildHeatmapWeeks } from "@/lib/heatmap";

describe("buildHeatmapWeeks", () => {
  const today = new Date("2026-11-07T12:00:00Z");

  it("returns the requested number of weeks without inventing counts", () => {
    const weeks = buildHeatmapWeeks([], 4, today);
    expect(weeks).toHaveLength(4);
    expect(weeks.flat().every((day) => day.count === null)).toBe(true);
    expect(weeks.flat().at(-1)?.date).toBe("2026-11-07");
  });

  it("maps only genuine dated records onto the grid", () => {
    const weeks = buildHeatmapWeeks(
      [
        { date: "2026-11-01", count: 2 },
        { date: "2026-11-05", count: 4 },
      ],
      2,
      today,
    );
    const flat = weeks.flat();
    expect(flat.find((day) => day.date === "2026-11-01")?.count).toBe(2);
    expect(flat.find((day) => day.date === "2026-11-05")?.count).toBe(4);
    expect(flat.find((day) => day.date === "2026-11-03")?.count).toBeNull();
  });
});
