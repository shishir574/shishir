import { formatCompactNumber, formatPercentage } from "@/lib/formatting/number";
import type { LanguageSlice } from "@/types/github";

export function LanguageBars({
  slices,
  repositoryCount,
}: {
  slices: LanguageSlice[];
  repositoryCount: number;
}) {
  if (slices.length === 0) {
    return (
      <p className="empty-inline">
        Language byte data is unavailable. No distribution has been inferred from repository
        labels.
      </p>
    );
  }

  return (
    <div className="language-bars">
      <div className="language-bars__stack" aria-hidden="true">
        {slices.map((slice) => (
          <span
            key={slice.name}
            style={{ width: `${String(slice.percentage)}%`, background: slice.color }}
          />
        ))}
      </div>

      <ul className="language-bars__legend">
        {slices.map((slice) => (
          <li key={slice.name}>
            <span
              className="language-bars__dot"
              style={{ background: slice.color }}
              aria-hidden="true"
            />
            <span className="language-bars__name">{slice.name}</span>
            <span className="language-bars__value">{formatPercentage(slice.percentage)}</span>
            <span className="language-bars__bytes">{formatCompactNumber(slice.bytes)} B</span>
          </li>
        ))}
      </ul>

      <p className="language-bars__note">
        Calculated from byte counts across {String(repositoryCount)} selected public
        {repositoryCount === 1 ? " repository" : " repositories"}. This measures repository code
        volume, not personal skill or experience.
      </p>
    </div>
  );
}
