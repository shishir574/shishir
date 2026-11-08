/** Normalised GitHub view models. Raw REST payloads stop at the client layer. */

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  htmlUrl: string;
  company: string | null;
  location: string | null;
  blog: string | null;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  createdAt: string;
  updatedAt: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stargazers: number;
  forks: number;
  openIssues: number;
  createdAt: string;
  updatedAt: string;
  pushedAt: string | null;
  topics: string[];
  license: string | null;
  fork: boolean;
  archived: boolean;
  defaultBranch: string;
}

export interface GitHubOrganisation {
  login: string;
  name: string | null;
  description: string | null;
  avatarUrl: string;
  htmlUrl: string;
  publicRepos: number;
  location: string | null;
  blog: string | null;
}

export interface GitHubCommit {
  sha: string;
  shortSha: string;
  message: string;
  htmlUrl: string;
  date: string;
  authorName: string | null;
  authorLogin: string | null;
  avatarUrl: string | null;
  repository: string;
}

export interface LanguageSlice {
  name: string;
  bytes: number;
  percentage: number;
  color: string;
}

export interface GitHubActivityDay {
  date: string;
  count: number;
}

export interface GitHubArchive {
  profile: GitHubProfile | null;
  repositories: GitHubRepository[];
  organisation: GitHubOrganisation | null;
  organisationRepositories: GitHubRepository[];
  languages: LanguageSlice[];
  languageRepositoryCount: number;
  commits: GitHubCommit[];
  organisationActivity: GitHubActivityDay[];
  organisationCommitTotal: number;
  organisationCommitRepositoryCount: number;
  warnings: string[];
  source: string;
  lastUpdated: number | null;
}
