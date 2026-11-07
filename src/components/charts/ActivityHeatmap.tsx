import { buildHeatmapWeeks } from "@/lib/heatmap";
import type { LeetCodeActivity } from "@/types/content";

export function ActivityHeatmap({ activity }: { activity: LeetCodeActivity[] }) {
  const weeks = buildHeatmapWeeks(activity);
  const recordedDays = activity.filter((entry) => entry.count > 0).length;

  return (
    <figure className="heatmap-figure">
      <div className="heatmap" aria-hidden="true">
        {weeks.map((week) => (
          <div key={week[0]?.date ?? "week"} className="heatmap__week">
            {week.map((day) => (
              <span
                key={day.date}
                className={
                  day.count === null
                    ? "heatmap__cell heatmap__cell--nodata"
                    : `heatmap__cell heatmap__cell--l${String(Math.min(day.count, 4))}`
                }
                title={`${day.date}: ${day.count === null ? "no record" : `${String(day.count)} solved`}`}
              />
            ))}
          </div>
        ))}
      </div>
      <figcaption className="heatmap__caption">
        {String(recordedDays)} recorded active days / last 26 weeks. Empty cells mean no stored
        record, not an inferred zero.
      </figcaption>
    </figure>
  );
}
