import { describe, expect, it } from "vitest";
import {
  aggregateCommitsByDay,
  aggregateLanguages,
  contributionLevel,
  languageColor,
  mergeCommits,
  parseGitHubCommit,
  parseGitHubProfile,
  parseGitHubRepositories,
  parseLanguageMap,
  selectCommitTargets,
  selectLanguageTargets,
  selectRepositories,
} from "./githubTransformers";
import type { GitHubRepository } from "@/types/github";

const profilePayload = {
  login: "shishir574",
  name: "Shishir Govinda",
  avatar_url: "https://avatars.githubusercontent.com/u/1",
  bio: "Engineer",
  html_url: "https://github.com/shishir574",
  company: null,
  location: "Earth",
  blog: "",
  public_repos: 12,
  public_gists: 2,
  followers: 10,
  following: 4,
  created_at: "2020-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

function repository(overrides: Partial<GitHubRepository> & { id: number }): GitHubRepository {
  return {
    name: `repo-${String(overrides.id)}`,
    fullName: `shishir574/repo-${String(overrides.id)}`,
    description: null,
    htmlUrl: `https://github.com/shishir574/repo-${String(overrides.id)}`,
    homepage: null,
    language: "TypeScript",
    stargazers: 0,
    forks: 0,
    openIssues: 0,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    pushedAt: "2026-01-01T00:00:00Z",
    topics: [],
    license: null,
    fork: false,
    archived: false,
    defaultBranch: "main",
    ...overrides,
  };
}

describe("parseGitHubProfile", () => {
  it("normalises optional fields and keeps public statistics", () => {
    const profile = parseGitHubProfile(profilePayload);
    expect(profile.login).toBe("shishir574");
    expect(profile.blog).toBeNull();
    expect(profile.company).toBeNull();
    expect(profile.publicRepos).toBe(12);
  });

  it("rejects a payload without a login", () => {
    expect(() => parseGitHubProfile({ avatar_url: "x" })).toThrow();
  });
});

describe("repositories", () => {
  it("excludes forks and archived repositories by default", () => {
    const raw = [
      {
        id: 1,
        name: "active",
        full_name: "a/active",
        html_url: "https://github.com/a/active",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z",
        pushed_at: "2026-02-01T00:00:00Z",
      },
      {
        id: 2,
        name: "fork",
        full_name: "a/fork",
        html_url: "https://github.com/a/fork",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z",
        fork: true,
      },
      {
        id: 3,
        name: "archived",
        full_name: "a/archived",
        html_url: "https://github.com/a/archived",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z",
        archived: true,
      },
    ];

    const parsed = parseGitHubRepositories(raw);
    const selected = selectRepositories(parsed, 10);
    expect(selected.map((entry) => entry.name)).toEqual(["active"]);
  });

  it("sorts by last push and respects the limit", () => {
    const repositories = [
      repository({ id: 1, pushedAt: "2026-01-01T00:00:00Z" }),
      repository({ id: 2, pushedAt: "2026-03-01T00:00:00Z" }),
      repository({ id: 3, pushedAt: "2026-02-01T00:00:00Z" }),
    ];
    expect(selectRepositories(repositories, 2).map((entry) => entry.id)).toEqual([2, 3]);
  });

  it("selects only repositories with a detected language for byte lookups", () => {
    const repositories = [
      repository({ id: 1, language: null }),
      repository({ id: 2, language: "TypeScript" }),
      repository({ id: 3, language: "Rust" }),
    ];
    expect(selectLanguageTargets(repositories, 2).map((entry) => entry.id)).toEqual([2, 3]);
    expect(selectCommitTargets(repositories, 1).map((entry) => entry.id)).toEqual([1]);
  });
});

describe("language aggregation", () => {
  it("computes byte-weighted percentages, not repository counts", () => {
    const slices = aggregateLanguages([
      { repository: "one", languages: { TypeScript: 300, JavaScript: 100 } },
      { repository: "two", languages: { TypeScript: 100, Python: 500 } },
    ]);

    expect(slices.map((slice) => slice.name)).toEqual(["Python", "TypeScript", "JavaScript"]);
    expect(slices.find((slice) => slice.name === "Python")?.percentage).toBe(50);
    expect(slices.find((slice) => slice.name === "TypeScript")?.percentage).toBe(40);
    expect(slices.reduce((sum, slice) => sum + slice.percentage, 0)).toBe(100);
  });

  it("returns an empty series for zero-byte input", () => {
    expect(aggregateLanguages([{ repository: "empty", languages: { C: 0 } }])).toEqual([]);
  });

  it("assigns deterministic colours", () => {
    expect(languageColor("TypeScript")).toBe("#D62828");
    expect(languageColor("UnknownLanguage")).toBe(languageColor("UnknownLanguage"));
  });

  it("drops non-numeric language values during parsing", () => {
    expect(parseLanguageMap({ TypeScript: 100, Broken: "100", Zero: 0 })).toEqual({
      TypeScript: 100,
    });
  });
});

describe("commits", () => {
  const payload = {
    sha: "abcdef1234567890",
    html_url: "https://github.com/shishir574/repo/commit/abcdef1234567890",
    commit: {
      message: "feat: add archive\n\nLonger body",
      author: { name: "Shishir", date: "2026-10-01T12:00:00Z" },
    },
    author: { login: "shishir574", avatar_url: "https://example.com/avatar.png" },
  };

  it("keeps the first line and short SHA", () => {
    const commit = parseGitHubCommit(payload, "repo");
    expect(commit.message).toBe("feat: add archive");
    expect(commit.shortSha).toBe("abcdef1");
    expect(commit.authorLogin).toBe("shishir574");
    expect(commit.repository).toBe("repo");
  });

  it("merges and sorts commit groups", () => {
    const older = parseGitHubCommit(
      {
        ...payload,
        sha: "older000",
        commit: { ...payload.commit, author: { ...payload.commit.author, date: "2026-01-01T00:00:00Z" } },
      },
      "one",
    );
    const newer = parseGitHubCommit(payload, "two");
    expect(mergeCommits([older, newer]).map((entry) => entry.repository)).toEqual(["two", "one"]);
  });

  it("aggregates commits by UTC day, sorted ascending", () => {
    const first = parseGitHubCommit(
      {
        ...payload,
        sha: "aaa0000",
        commit: { ...payload.commit, author: { ...payload.commit.author, date: "2026-10-01T08:00:00Z" } },
      },
      "one",
    );
    const second = parseGitHubCommit(
      {
        ...payload,
        sha: "bbb0000",
        commit: { ...payload.commit, author: { ...payload.commit.author, date: "2026-10-01T22:00:00Z" } },
      },
      "one",
    );
    const third = parseGitHubCommit(
      {
        ...payload,
        sha: "ccc0000",
        commit: { ...payload.commit, author: { ...payload.commit.author, date: "2026-09-30T23:30:00Z" } },
      },
      "two",
    );
    expect(aggregateCommitsByDay([second, first, third])).toEqual([
      { date: "2026-09-30", count: 1 },
      { date: "2026-10-01", count: 2 },
    ]);
  });

  it("returns no activity for an empty commit list", () => {
    expect(aggregateCommitsByDay([])).toEqual([]);
  });

  it("maps counts to green contribution levels", () => {
    expect(contributionLevel(0)).toBe(0);
    expect(contributionLevel(1)).toBe(1);
    expect(contributionLevel(2)).toBe(1);
    expect(contributionLevel(3)).toBe(2);
    expect(contributionLevel(5)).toBe(2);
    expect(contributionLevel(6)).toBe(3);
    expect(contributionLevel(9)).toBe(3);
    expect(contributionLevel(10)).toBe(4);
    expect(contributionLevel(50)).toBe(4);
  });
});
