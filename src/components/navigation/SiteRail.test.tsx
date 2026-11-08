import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteRail } from "./SiteRail";

describe("SiteRail", () => {
  it("marks the active section for assistive technology", () => {
    render(<SiteRail active="github" />);

    const githubLink = screen.getByRole("link", { name: /06.*GitHub/i });
    expect(githubLink).toHaveAttribute("aria-current", "true");
    expect(githubLink).toHaveAttribute("href", "#github");

    const researchLink = screen.getByRole("link", { name: /03.*Research/i });
    expect(researchLink).not.toHaveAttribute("aria-current");
  });

  it("renders the persistent archive metadata", () => {
    render(<SiteRail active="home" />);
    expect(screen.getByText("LAST UPDATED", { exact: true })).toBeInTheDocument();
    expect(screen.queryByText("BUILD", { exact: true })).not.toBeInTheDocument();
    expect(screen.queryByText("SOURCE", { exact: true })).not.toBeInTheDocument();
    expect(screen.getByText(/github\.com\/shishir574/i)).toBeInTheDocument();
  });
});
