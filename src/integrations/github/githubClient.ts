import { fetchJson } from "@/lib/api/cache";
import type { ApiResponse } from "@/lib/api/types";

export const GITHUB_USERNAME = "shishir574";
/** TryTvara is a normal GitHub user account (type: User), not an organisation. */
export const TVARA_ACCOUNT = "TryTvara";
/** Public GitHub organisation for Tvara (linked, not fetched for commits). */
export const TVARA_ORG = "tvara-ai";
export const GITHUB_API = "https://api.github.com";

const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

export const GITHUB_TTL = {
  profile: 10 * 60_000,
  repositories: 5 * 60_000,
  languages: 30 * 60_000,
  commits: 3 * 60_000,
} as const;

export function fetchProfile(
  signal?: AbortSignal,
): Promise<ApiResponse<unknown>> {
  return fetchJson(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
    signal,
    ttlMs: GITHUB_TTL.profile,
    headers: GITHUB_HEADERS,
  });
}

export function fetchRepositories(
  signal?: AbortSignal,
): Promise<ApiResponse<unknown>> {
  return fetchJson(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?type=owner&sort=updated&per_page=100`,
    {
      signal,
      ttlMs: GITHUB_TTL.repositories,
      headers: GITHUB_HEADERS,
    },
  );
}

export function fetchOrganisation(
  signal?: AbortSignal,
): Promise<ApiResponse<unknown>> {
  // TryTvara is a user account, so use /users/... (not /orgs/... which 404s).
  return fetchJson(`${GITHUB_API}/users/${TVARA_ACCOUNT}`, {
    signal,
    ttlMs: GITHUB_TTL.profile,
    headers: GITHUB_HEADERS,
  });
}

export function fetchOrganisationRepositories(
  signal?: AbortSignal,
): Promise<ApiResponse<unknown>> {
  return fetchJson(
    `${GITHUB_API}/users/${TVARA_ACCOUNT}/repos?type=owner&sort=updated&per_page=100`,
    {
      signal,
      ttlMs: GITHUB_TTL.repositories,
      headers: GITHUB_HEADERS,
    },
  );
}

export function fetchLanguages(
  owner: string,
  repository: string,
  signal?: AbortSignal,
): Promise<ApiResponse<unknown>> {
  return fetchJson(
    `${GITHUB_API}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/languages`,
    {
      signal,
      ttlMs: GITHUB_TTL.languages,
      headers: GITHUB_HEADERS,
    },
  );
}

export function fetchCommits(
  owner: string,
  repository: string,
  signal?: AbortSignal,
): Promise<ApiResponse<unknown>> {
  return fetchJson(
    `${GITHUB_API}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/commits?per_page=100`,
    {
      signal,
      ttlMs: GITHUB_TTL.commits,
      headers: GITHUB_HEADERS,
    },
  );
}
