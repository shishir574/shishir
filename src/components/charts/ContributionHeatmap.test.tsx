import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContributionHeatmap } from "./ContributionHeatmap";

describe("ContributionHeatmap", () => {
  it("renders a GitHub-style summary and legend", () => {
    render(
      <ContributionHeatmap
        activity={[{ date: "2026-11-07", count: 3 }]}
        total={3}
        repositoryCount={2}
        owner="TryTvara"
      />,
    );
    expect(screen.getByText(/commits in the last 52 weeks/i)).toBeInTheDocument();
    expect(screen.getByText(/Less/i)).toBeInTheDocument();
    expect(screen.getByText(/More/i)).toBeInTheDocument();
  });

  it("renders 52 week columns", () => {
    const { container } = render(
      <ContributionHeatmap activity={[]} total={0} repositoryCount={0} owner="TryTvara" />,
    );
    const weeks = container.querySelectorAll(".contribution-heatmap__week");
    expect(weeks.length).toBe(52);
  });
});
