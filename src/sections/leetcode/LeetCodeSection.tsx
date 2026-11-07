import { Activity, CircleCheck, ExternalLink as ExternalLinkIcon } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { ActivityHeatmap } from "@/components/charts/ActivityHeatmap";
import { EmptyState } from "@/components/status/DataState";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { leetcode } from "@/data";
import { formatDate } from "@/lib/formatting/date";
import { clamp, formatNumber } from "@/lib/formatting/number";

const DIFFICULTIES = [
  { key: "easySolved", label: "EASY", tone: "success" },
  { key: "mediumSolved", label: "MEDIUM", tone: "warning" },
  { key: "hardSolved", label: "HARD", tone: "red" },
] as const;

export function LeetCodeSection() {
  const total = leetcode.totalSolved;

  return (
    <Section
      id="leetcode"
      index="09"
      kicker="PERSONAL FILE / PROBLEM SOLVING"
      title="A local problem-solving snapshot."
      description="LeetCode has no supported browser API, so this record is maintained locally. It is a verified snapshot with an explicit date — never a live claim, and never filled with synthetic activity."
    >
      <div className="leetcode-layout">
        <div className="leetcode-stats panel">
          <div className="leetcode-stats__head">
            <div>
              <p className="mono-label">TOTAL SOLVED</p>
              <p className="leetcode-stats__total">{formatNumber(total)}</p>
            </div>
            <div className="leetcode-stats__badge">
              <Activity size={18} aria-hidden="true" />
              <span>SNAPSHOT</span>
            </div>
          </div>

          <div className="difficulty-list">
            {DIFFICULTIES.map((difficulty) => {
              const solved = leetcode[difficulty.key];
              const percentage = total > 0 ? clamp((solved / total) * 100, 0, 100) : 0;
              return (
                <div key={difficulty.key} className="difficulty">
                  <div className="difficulty__label">
                    <span>{difficulty.label}</span>
                    <span>{formatNumber(solved)}</span>
                  </div>
                  <div className="difficulty__track" aria-hidden="true">
                    <span
                      className={`difficulty__fill difficulty__fill--${difficulty.tone}`}
                      style={{ width: `${String(percentage)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="leetcode-stats__foot">
            <span>LAST REVIEWED {formatDate(leetcode.lastUpdated)}</span>
            <ExternalLink href={leetcode.profileUrl} className="text-link">
              <ExternalLinkIcon size={13} aria-hidden="true" />
              {leetcode.username}
            </ExternalLink>
          </div>
        </div>

        <div className="leetcode-activity panel">
          <div className="panel__head">
            <span className="mono-label">ACTIVITY / DATED RECORDS</span>
            <CircleCheck size={15} aria-hidden="true" />
          </div>
          {leetcode.activity.length > 0 ? (
            <ActivityHeatmap activity={leetcode.activity} />
          ) : (
            <EmptyState
              title="NO DATED ACTIVITY"
              message="No dated problem-solving records have been stored. The heatmap is not generated from an estimate."
            />
          )}
          <p className="leetcode-activity__note">
            Counts are imported from the owner&apos;s own record. The page does not call
            undocumented LeetCode endpoints or route requests through a proxy.
          </p>
        </div>
      </div>
    </Section>
  );
}
