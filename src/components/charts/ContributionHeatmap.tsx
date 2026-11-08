import { useMemo } from "react";
import { buildHeatmapWeeks } from "@/lib/heatmap";
import { contributionLevel } from "@/integrations/github/githubTransformers";
import type { GitHubActivityDay } from "@/types/github";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

function formatTooltip(date: string, count: number): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  const weekday = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    timeZone: "UTC",
  }).format(parsed);
  const label = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
  if (count === 0) return `No commits on ${weekday}, ${label}`;
  return `${String(count)} commit${count === 1 ? "" : "s"} on ${weekday}, ${label}`;
}

export function ContributionHeatmap({
  activity,
  total,
  repositoryCount,
  owner,
}: {
  activity: GitHubActivityDay[];
  total: number;
  repositoryCount: number;
  owner: string;
}) {
  const { weeks, totalInWindow, activeDays, monthLabels, counts } = useMemo(() => {
    const grid = buildHeatmapWeeks(
      activity.map((day) => ({ date: day.date, count: day.count })),
      52,
      new Date(),
    );

    const counts = new Map(activity.map((day) => [day.date, day.count]));
    let totalInWindow = 0;
    let activeDays = 0;
    for (const week of grid) {
      for (const day of week) {
        const count = counts.get(day.date) ?? 0;
        totalInWindow += count;
        if (count > 0) activeDays += 1;
      }
    }

    const monthLabels: string[] = grid.map((week, index) => {
      const first = week[0];
      if (!first) return "";
      const month = Number(first.date.slice(5, 7)) - 1;
      const previous = index > 0 ? grid[index - 1]?.[0] : undefined;
      const previousMonth = previous ? Number(previous.date.slice(5, 7)) - 1 : -1;
      if (month === previousMonth) return "";
      return MONTHS[month] ?? "";
    });

    return { weeks: grid, totalInWindow, activeDays, monthLabels, counts };
  }, [activity]);

  return (
    <figure className="contribution-heatmap-figure">
      <p className="contribution-summary" aria-live="polite">
        <strong>{totalInWindow}</strong> commits in the last 52 weeks ·{" "}
        <strong>{activeDays}</strong> active days · {repositoryCount}{" "}
        {repositoryCount === 1 ? "repository" : "repositories"} · @{owner}
      </p>
      <div
        className="contribution-heatmap"
        role="img"
        aria-label={`${totalInWindow} commits in the last 52 weeks for ${owner}, across ${activeDays} active days`}
      >
        <div className="contribution-heatmap__months" aria-hidden="true">
          <span className="contribution-heatmap__weekday-spacer" />
          {monthLabels.map((label, index) => (
            <span key={index} className="contribution-heatmap__month">
              {label}
            </span>
          ))}
        </div>
        <div className="contribution-heatmap__grid">
          <div className="contribution-heatmap__weekdays" aria-hidden="true">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>
          <div className="contribution-heatmap__weeks">
            {weeks.map((week, weekIndex) => (
              <div key={week[0]?.date ?? `week-${String(weekIndex)}`} className="contribution-heatmap__week">
                {week.map((day) => {
                  const count = counts.get(day.date) ?? 0;
                  const level = contributionLevel(count);
                  return (
                    <span
                      key={day.date}
                      className={`contribution-cell contribution-cell--l${String(level)}`}
                      title={formatTooltip(day.date, count)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="contribution-legend" aria-hidden="true">
        <span>Less</span>
        <span className="contribution-cell contribution-cell--l0" />
        <span className="contribution-cell contribution-cell--l1" />
        <span className="contribution-cell contribution-cell--l2" />
        <span className="contribution-cell contribution-cell--l3" />
        <span className="contribution-cell contribution-cell--l4" />
        <span>More</span>
      </div>
      <figcaption className="contribution-heatmap__caption">
        {total > 0
          ? `Commit history from the ${String(repositoryCount)} most recently pushed public repositories (up to 100 commits each). Pull requests and issues are not counted.`
          : "No commit activity recorded in the last 52 weeks for the selected repositories."}
      </figcaption>
    </figure>
  );
}
