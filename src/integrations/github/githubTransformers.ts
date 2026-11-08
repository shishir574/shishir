import { ApiError } from "@/lib/api/types";
import {
  asArray,
  asRecord,
  optionalBoolean,
  optionalNumber,
  optionalString,
  optionalStringArray,
  requiredNumber,
  requiredString,
} from "@/lib/validation/guards";
import type {
  GitHubActivityDay,
  GitHubCommit,
  GitHubOrganisation,
  GitHubProfile,
  GitHubRepository,
  LanguageSlice,
} from "@/types/github";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#D62828",
  JavaScript: "#D1A65A",
  Python: "#74A88A",
  Java: "#C46565",
  "C++": "#9B7B7B",
  C: "#8A8A8A",
  "C#": "#B45454",
  Rust: "#A04A4A",
  Go: "#6F9E9E",
  HTML: "#A05252",
  CSS: "#7A7A7A",
  Shell: "#929292",
  "Jupyter Notebook": "#C98B5E",
  CUDA: "#76A88A",
  Ruby: "#8E5B5B",
  PHP: "#7878A0",
  Swift: "#C07A5A",
  Kotlin: "#8A6FA0",
  Dart: "#5A8FA0",
  Vue: "#5F9E7A",
  Svelte: "#C25B3A",
  SCSS: "#9A5B7A",
  Dockerfile: "#6F8FA0",
  Makefile: "#A08A5A",
};

const FALLBACK_COLORS = [
  "#D62828",
  "#929292",
  "#74A88A",
  "#D1A65A",
  "#741B1B",
  "#B0B0B0",
  "#5F8A7A",
  "#A05252",
];

export function parseGitHubProfile(raw: unknown): GitHubProfile {
  const record = asRecord(raw, "GitHub profile");
  return {
    login: requiredString(record, "login", "GitHub profile"),
    name: optionalString(record, "name"),
    avatarUrl: requiredString(record, "avatar_url", "GitHub profile"),
    bio: optionalString(record, "bio"),
    htmlUrl: requiredString(record, "html_url", "GitHub profile"),
    company: optionalString(record, "company"),
    location: optionalString(record, "location"),
    blog: optionalString(record, "blog"),
    publicRepos: optionalNumber(record, "public_repos"),
    publicGists: optionalNumber(record, "public_gists"),
    followers: optionalNumber(record, "followers"),
    following: optionalNumber(record, "following"),
    createdAt: requiredString(record, "created_at", "GitHub profile"),
    updatedAt: requiredString(record, "updated_at", "GitHub profile"),
  };
}

function parseLicense(record: Record<string, unknown>): string | null {
  const license = record.license;
  if (license === null || license === undefined) return null;
  if (typeof license !== "object") return null;
  const licenceRecord = license as Record<string, unknown>;
  return optionalString(licenceRecord, "spdx_id") ?? optionalString(licenceRecord, "name");
}

export function parseGitHubRepository(raw: unknown): GitHubRepository {
  const record = asRecord(raw, "GitHub repository");
  return {
    id: requiredNumber(record, "id", "GitHub repository"),
    name: requiredString(record, "name", "GitHub repository"),
    fullName: requiredString(record, "full_name", "GitHub repository"),
    description: optionalString(record, "description"),
    htmlUrl: requiredString(record, "html_url", "GitHub repository"),
    homepage: optionalString(record, "homepage"),
    language: optionalString(record, "language"),
    stargazers: optionalNumber(record, "stargazers_count"),
    forks: optionalNumber(record, "forks_count"),
    openIssues: optionalNumber(record, "open_issues_count"),
    createdAt: requiredString(record, "created_at", "GitHub repository"),
    updatedAt: requiredString(record, "updated_at", "GitHub repository"),
    pushedAt: optionalString(record, "pushed_at"),
    topics: optionalStringArray(record, "topics"),
    license: parseLicense(record),
    fork: optionalBoolean(record, "fork"),
    archived: optionalBoolean(record, "archived"),
    defaultBranch: optionalString(record, "default_branch") ?? "main",
  };
}

export function parseGitHubRepositories(raw: unknown): GitHubRepository[] {
  return asArray(raw, "GitHub repositories").map(parseGitHubRepository);
}

export function parseGitHubOrganisation(raw: unknown): GitHubOrganisation {
  const record = asRecord(raw, "GitHub organisation");
  return {
    login: requiredString(record, "login", "GitHub organisation"),
    name: optionalString(record, "name"),
    description: optionalString(record, "description"),
    avatarUrl: requiredString(record, "avatar_url", "GitHub organisation"),
    htmlUrl: requiredString(record, "html_url", "GitHub organisation"),
    publicRepos: optionalNumber(record, "public_repos"),
    location: optionalString(record, "location"),
    blog: optionalString(record, "blog"),
  };
}

export function parseGitHubCommit(raw: unknown, repository: string): GitHubCommit {
  const record = asRecord(raw, "GitHub commit");
  const sha = requiredString(record, "sha", "GitHub commit");
  const commit = asRecord(record.commit, "GitHub commit.commit");
  const author = asRecord(commit.author, "GitHub commit.commit.author");
  const message = requiredString(commit, "message", "GitHub commit.commit");
  const date = requiredString(author, "date", "GitHub commit.commit.author");

  let authorName = optionalString(author, "name");
  let authorLogin: string | null = null;
  let avatarUrl: string | null = null;

  if (record.author !== null && typeof record.author === "object") {
    const githubAuthor = record.author as Record<string, unknown>;
    authorLogin = optionalString(githubAuthor, "login");
    avatarUrl = optionalString(githubAuthor, "avatar_url");
    authorName = optionalString(githubAuthor, "name") ?? authorName;
  }

  const firstLine = message.split(/\r?\n/, 1)[0]?.trim() ?? message.trim();

  return {
    sha,
    shortSha: sha.slice(0, 7),
    message: firstLine.length > 110 ? `${firstLine.slice(0, 107)}…` : firstLine,
    htmlUrl: requiredString(record, "html_url", "GitHub commit"),
    date,
    authorName,
    authorLogin,
    avatarUrl,
    repository,
  };
}

export function parseGitHubCommits(raw: unknown, repository: string): GitHubCommit[] {
  return asArray(raw, "GitHub commits").map((item) => parseGitHubCommit(item, repository));
}

export function parseLanguageMap(raw: unknown): Record<string, number> {
  const record = asRecord(raw, "GitHub languages");
  const languages: Record<string, number> = {};
  for (const [name, value] of Object.entries(record)) {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
      languages[name] = value;
    }
  }
  return languages;
}

export interface RepositoryLanguageData {
  repository: string;
  languages: Record<string, number>;
}

export function languageColor(name: string): string {
  const known = LANGUAGE_COLORS[name];
  if (known) return known;
  let hash = 0;
  for (let index = 0; index < name.length; index += 1) {
    hash = (hash * 31 + name.charCodeAt(index)) % 997;
  }
  return FALLBACK_COLORS[hash % FALLBACK_COLORS.length] ?? "#929292";
}

export function aggregateLanguages(entries: RepositoryLanguageData[]): LanguageSlice[] {
  const totals = new Map<string, number>();

  for (const entry of entries) {
    for (const [language, bytes] of Object.entries(entry.languages)) {
      if (!Number.isFinite(bytes) || bytes <= 0) continue;
      totals.set(language, (totals.get(language) ?? 0) + bytes);
    }
  }

  const totalBytes = [...totals.values()].reduce((sum, value) => sum + value, 0);
  if (totalBytes === 0) return [];

  return [...totals.entries()]
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Math.round((bytes / totalBytes) * 1000) / 10,
      color: languageColor(name),
    }))
    .sort((left, right) => right.bytes - left.bytes);
}

export function selectRepositories(
  repositories: GitHubRepository[],
  limit: number,
  options: { includeForks?: boolean; includeArchived?: boolean } = {},
): GitHubRepository[] {
  return repositories
    .filter((repository) => options.includeForks === true || !repository.fork)
    .filter((repository) => options.includeArchived === true || !repository.archived)
    .sort((left, right) => {
      const leftDate = left.pushedAt ? Date.parse(left.pushedAt) : 0;
      const rightDate = right.pushedAt ? Date.parse(right.pushedAt) : 0;
      return rightDate - leftDate;
    })
    .slice(0, limit);
}

export function selectLanguageTargets(
  repositories: GitHubRepository[],
  limit = 5,
): GitHubRepository[] {
  return repositories.filter((repository) => repository.language !== null).slice(0, limit);
}

export function selectCommitTargets(
  repositories: GitHubRepository[],
  limit = 2,
): GitHubRepository[] {
  return repositories.filter((repository) => repository.pushedAt !== null).slice(0, limit);
}

export function mergeCommits(commitGroups: GitHubCommit[], limit = 8): GitHubCommit[] {
  return [...commitGroups]
    .sort((left, right) => Date.parse(right.date) - Date.parse(left.date))
    .slice(0, limit);
}

export function aggregateCommitsByDay(commits: GitHubCommit[]): GitHubActivityDay[] {
  const counts = new Map<string, number>();
  for (const commit of commits) {
    const date = commit.date.slice(0, 10);
    if (date.length !== 10) continue;
    const parsed = Date.parse(`${date}T00:00:00Z`);
    if (!Number.isFinite(parsed)) continue;
    counts.set(date, (counts.get(date) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([date, count]) => ({ date, count }));
}

export function contributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

/** Guards against the API returning an error envelope where an object was expected. */
export function assertNotApiError(raw: unknown): void {
  if (
    typeof raw === "object" &&
    raw !== null &&
    "message" in raw &&
    !("login" in raw) &&
    !("id" in raw)
  ) {
    throw new ApiError("http", "GitHub returned an error payload.");
  }
}
