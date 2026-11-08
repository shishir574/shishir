import { useMemo } from "react";
import { useApiResource, type ResourceState } from "@/hooks/useApiResource";
import { toUserMessage, type ApiResponse } from "@/lib/api/types";
import {
  fetchCommits,
  fetchLanguages,
  fetchOrganisation,
  fetchOrganisationRepositories,
  fetchProfile,
  fetchRepositories,
  GITHUB_USERNAME,
  TVARA_ACCOUNT,
} from "./githubClient";
import {
  aggregateCommitsByDay,
  aggregateLanguages,
  parseGitHubCommits,
  parseGitHubOrganisation,
  parseGitHubProfile,
  parseGitHubRepositories,
  parseLanguageMap,
  selectCommitTargets,
  selectLanguageTargets,
  selectRepositories,
  type RepositoryLanguageData,
} from "./githubTransformers";
import type {
  GitHubArchive,
  GitHubCommit,
  GitHubOrganisation,
  GitHubProfile,
  GitHubRepository,
  LanguageSlice,
} from "@/types/github";

function resultValue<T>(
  result: PromiseSettledResult<T>,
): T | null {
  return result.status === "fulfilled" ? result.value : null;
}

async function loadGitHubArchive(signal: AbortSignal): Promise<ApiResponse<GitHubArchive>> {
  const [profileResponse, repositoriesResponse, organisationResponse, orgReposResponse] =
    await Promise.allSettled([
      fetchProfile(signal),
      fetchRepositories(signal),
      fetchOrganisation(signal),
      fetchOrganisationRepositories(signal),
    ]);

  const responses = [
    profileResponse,
    repositoriesResponse,
    organisationResponse,
    orgReposResponse,
  ];

  if (responses.every((response) => response.status === "rejected")) {
    throw new Error("GitHub API unavailable.");
  }

  let profile: GitHubProfile | null = null;
  let repositories: GitHubRepository[] = [];
  let organisation: GitHubOrganisation | null = null;
  let organisationRepositories: GitHubRepository[] = [];
  const warnings: string[] = [];

  const profileRaw = resultValue(profileResponse);
  if (profileRaw) {
    try {
      profile = parseGitHubProfile(profileRaw.data);
    } catch (error) {
      warnings.push(toUserMessage(error, "GitHub profile"));
    }
  } else if (profileResponse.status === "rejected") {
    warnings.push(toUserMessage(profileResponse.reason, "GitHub profile"));
  }

  const repositoriesRaw = resultValue(repositoriesResponse);
  if (repositoriesRaw) {
    try {
      repositories = parseGitHubRepositories(repositoriesRaw.data);
    } catch (error) {
      warnings.push(toUserMessage(error, "GitHub repositories"));
    }
  } else if (repositoriesResponse.status === "rejected") {
    warnings.push(toUserMessage(repositoriesResponse.reason, "GitHub repositories"));
  }

  const organisationRaw = resultValue(organisationResponse);
  if (organisationRaw) {
    try {
      organisation = parseGitHubOrganisation(organisationRaw.data);
    } catch (error) {
      warnings.push(toUserMessage(error, "Tvara organisation"));
    }
  } else if (organisationResponse.status === "rejected") {
    warnings.push(toUserMessage(organisationResponse.reason, "Tvara organisation"));
  }

  const orgReposRaw = resultValue(orgReposResponse);
  if (orgReposRaw) {
    try {
      organisationRepositories = parseGitHubRepositories(orgReposRaw.data);
    } catch (error) {
      warnings.push(toUserMessage(error, "Tvara repositories"));
    }
  } else if (orgReposResponse.status === "rejected") {
    warnings.push(toUserMessage(orgReposResponse.reason, "Tvara repositories"));
  }

  const selectedRepositories = selectRepositories(repositories, 9, {
    includeForks: false,
    includeArchived: false,
  });
  const languageTargets = selectLanguageTargets(selectedRepositories, 5);

  const languageResults = await Promise.allSettled(
    languageTargets.map(async (repository) => ({
      repository: repository.name,
      response: await fetchLanguages(GITHUB_USERNAME, repository.name, signal),
    })),
  );

  const languageEntries: RepositoryLanguageData[] = [];
  let languageRepositoryCount = 0;
  for (const [index, result] of languageResults.entries()) {
    const target = languageTargets[index];
    const label = target ? `${target.name} languages` : "GitHub languages";
    if (result.status === "rejected") {
      warnings.push(toUserMessage(result.reason, label));
      continue;
    }
    try {
      languageEntries.push({
        repository: result.value.repository,
        languages: parseLanguageMap(result.value.response.data),
      });
      languageRepositoryCount += 1;
    } catch (error) {
      warnings.push(toUserMessage(error, label));
    }
  }

  const languages: LanguageSlice[] = aggregateLanguages(languageEntries);

  const selectedOrgRepositories = selectRepositories(organisationRepositories, 6, {
    includeForks: false,
    includeArchived: false,
  });
  const commitTargets = selectCommitTargets(selectedOrgRepositories, 4);

  const commitResults = await Promise.allSettled(
    commitTargets.map(async (repository) => ({
      repository: repository.name,
      response: await fetchCommits(TVARA_ACCOUNT, repository.name, signal),
    })),
  );

  const commits: GitHubCommit[] = [];
  for (const [index, result] of commitResults.entries()) {
    const target = commitTargets[index];
    const label = target ? `${target.name} commits` : "Tvara commits";
    if (result.status === "rejected") {
      warnings.push(toUserMessage(result.reason, label));
      continue;
    }
    try {
      commits.push(
        ...parseGitHubCommits(result.value.response.data, result.value.repository),
      );
    } catch (error) {
      warnings.push(toUserMessage(error, label));
    }
  }

  const organisationActivity = aggregateCommitsByDay(commits);
  const organisationCommitTotal = commits.length;
  const organisationCommitRepositoryCount = commitTargets.length;

  const timestamps = [
    profileRaw?.lastUpdated,
    repositoriesRaw?.lastUpdated,
    organisationRaw?.lastUpdated,
    orgReposRaw?.lastUpdated,
  ].filter((value): value is number => typeof value === "number");

  const stale = [profileRaw, repositoriesRaw, organisationRaw, orgReposRaw].some(
    (response) => response?.stale === true,
  );

  return {
    data: {
      profile,
      repositories: selectedRepositories,
      organisation,
      organisationRepositories: selectedOrgRepositories,
      languages,
      languageRepositoryCount,
      commits,
      organisationActivity,
      organisationCommitTotal,
      organisationCommitRepositoryCount,
      warnings: [...new Set(warnings)],
      source: "GitHub REST API · unauthenticated",
      lastUpdated: timestamps.length > 0 ? Math.min(...timestamps) : null,
    },
    lastUpdated: timestamps.length > 0 ? Math.min(...timestamps) : Date.now(),
    source: "GitHub REST API · unauthenticated",
    stale,
  };
}

export interface GitHubArchiveState extends ResourceState<GitHubArchive> {
  isEmpty: boolean;
}

export function useGitHubArchive(enabled: boolean): GitHubArchiveState {
  const resource = useApiResource<GitHubArchive>({
    key: "github-archive",
    source: "GitHub",
    load: loadGitHubArchive,
    enabled,
  });

  const isEmpty = useMemo(() => {
    if (!resource.data) return false;
    return (
      resource.data.profile === null &&
      resource.data.repositories.length === 0 &&
      resource.data.organisationRepositories.length === 0
    );
  }, [resource.data]);

  return { ...resource, isEmpty };
}
