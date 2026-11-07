import { fetchJson } from "@/lib/api/cache";
import type { ApiResponse } from "@/lib/api/types";

export const GITHUB_USERNAME = "shishir574";
export const TVARA_ORGANISATION = "TryTvara";
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
  return fetchJson(`${GITHUB_API}/orgs/${TVARA_ORGANISATION}`, {
    signal,
    ttlMs: GITHUB_TTL.profile,
    headers: GITHUB_HEADERS,
  });
}

export function fetchOrganisationRepositories(
  signal?: AbortSignal,
): Promise<ApiResponse<unknown>> {
  return fetchJson(
    `${GITHUB_API}/orgs/${TVARA_ORGANISATION}/repos?sort=updated&per_page=100`,
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
    `${GITHUB_API}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/commits?per_page=20`,
    {
      signal,
      ttlMs: GITHUB_TTL.commits,
      headers: GITHUB_HEADERS,
    },
  );
}
