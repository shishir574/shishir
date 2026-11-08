import { useMemo } from "react";
import {
  Building2,
  CalendarDays,
  ExternalLink as ExternalLinkIcon,
  MapPin,
  RefreshCw,
  Star,
  Users,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { LanguageBars } from "@/components/charts/LanguageBars";
import { ContributionHeatmap } from "@/components/charts/ContributionHeatmap";
import { EmptyState, ErrorState, LoadingState } from "@/components/status/DataState";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { TagList } from "@/components/ui/Panel";
import { useNearViewport } from "@/hooks/useNearViewport";
import { useGitHubArchive } from "@/integrations/github/useGitHubArchive";
import { identifiers } from "@/data";
import { formatDate, formatRelative } from "@/lib/formatting/date";
import { formatNumber } from "@/lib/formatting/number";
import { languageColor } from "@/integrations/github/githubTransformers";
import type { GitHubRepository } from "@/types/github";

function RepositoryCard({ repository }: { repository: GitHubRepository }) {
  return (
    <article className="repo-card">
      <div className="repo-card__head">
        <a
          href={repository.htmlUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="repo-card__name"
        >
          {repository.name}
          <ExternalLinkIcon size={13} aria-hidden="true" />
        </a>
        <span className="repo-card__updated" title={repository.pushedAt ?? repository.updatedAt}>
          {formatRelative(repository.pushedAt ?? repository.updatedAt)}
        </span>
      </div>
      <p className="repo-card__description">
        {repository.description ?? "No description provided."}
      </p>
      <div className="repo-card__meta">
        {repository.language ? (
          <span className="repo-card__language">
            <span
              className="repo-card__dot"
              style={{ background: languageColor(repository.language) }}
              aria-hidden="true"
            />
            {repository.language}
          </span>
        ) : null}
        <span>
          <Star size={12} aria-hidden="true" /> {formatNumber(repository.stargazers)}
        </span>
        <span>{formatNumber(repository.forks)} forks</span>
      </div>
      {repository.topics.length > 0 ? (
        <TagList items={repository.topics.slice(0, 4)} ariaLabel={`${repository.name} topics`} />
      ) : null}
    </article>
  );
}

export function GitHubSection() {
  const { ref, inView } = useNearViewport<HTMLDivElement>();
  const archive = useGitHubArchive(inView);
  const data = archive.data;

  const lastUpdated = useMemo(
    () => (archive.lastUpdated ? formatRelative(archive.lastUpdated) : "—"),
    [archive.lastUpdated],
  );

  return (
    <Section
      id="github"
      index="06"
      kicker="BUILDER FILE / LIVE PUBLIC DATA"
      title="The public code record."
      description="Public repositories from the personal account and the Tvara GitHub account, sorted by last push, newest first."
    >
      <div ref={ref} className="github">
        <div className="source-bar">
          <span className="source-bar__item">
            SOURCE <strong>{data?.source ?? "api.github.com"}</strong>
          </span>
          <span className="source-bar__item">
            CACHED <strong>{lastUpdated}</strong>
          </span>
          <button
            type="button"
            className="button button--small source-bar__refresh"
            onClick={archive.reload}
            disabled={archive.loading || !inView}
          >
            <RefreshCw size={13} aria-hidden="true" />
            {archive.loading ? "SYNCING" : "REFRESH"}
          </button>
        </div>

        {!inView ? (
          <LoadingState label="Section staged; live request waits until it is approached" />
        ) : archive.loading && !data ? (
          <LoadingState label="Connecting to GitHub" rows={6} />
        ) : archive.error && !data ? (
          <ErrorState message={archive.error} onRetry={archive.reload}>
            <p className="data-state__hint">
              The rest of the archive remains available. GitHub requests are unauthenticated
              and may be rate-limited per visitor IP.
            </p>
          </ErrorState>
        ) : archive.isEmpty ? (
          <EmptyState
            title="NO PUBLIC RECORDS RETURNED"
            message="GitHub responded successfully but returned no public profile or repositories."
          />
        ) : (
          <>
            {archive.error ? (
              <div className="warning-panel" role="status">
                <span className="mono-label">STALE DATA</span>
                <p>{archive.error}</p>
              </div>
            ) : null}

            {data && data.warnings.length > 0 ? (
              <div className="warning-panel" role="status">
                <span className="mono-label">PARTIAL RESPONSE</span>
                <ul>
                  {data.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {data?.profile ? (
              <div className="profile panel">
                <div className="profile__identity">
                  <img
                    className="profile__avatar"
                    src={data.profile.avatarUrl}
                    alt={`${data.profile.name ?? data.profile.login} GitHub avatar`}
                    width={92}
                    height={92}
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <p className="mono-label">GITHUB / PERSONAL</p>
                    <h3 className="profile__name">
                      {data.profile.name ?? data.profile.login}
                    </h3>
                    <a
                      className="profile__handle"
                      href={data.profile.htmlUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      @{data.profile.login}
                    </a>
                    {data.profile.bio ? (
                      <p className="profile__bio">{data.profile.bio}</p>
                    ) : null}
                  </div>
                  <ExternalLink href={data.profile.htmlUrl} className="profile__link">
                    OPEN PROFILE
                  </ExternalLink>
                </div>

                <dl className="profile__stats">
                  <div>
                    <dt>PUBLIC REPOS</dt>
                    <dd>{formatNumber(data.profile.publicRepos)}</dd>
                  </div>
                  <div>
                    <dt>FOLLOWERS</dt>
                    <dd>{formatNumber(data.profile.followers)}</dd>
                  </div>
                  <div>
                    <dt>FOLLOWING</dt>
                    <dd>{formatNumber(data.profile.following)}</dd>
                  </div>
                  <div>
                    <dt>PUBLIC GISTS</dt>
                    <dd>{formatNumber(data.profile.publicGists)}</dd>
                  </div>
                </dl>

                <ul className="profile__meta">
                  {data.profile.company ? (
                    <li>
                      <Building2 size={13} aria-hidden="true" />
                      {data.profile.company}
                    </li>
                  ) : null}
                  {data.profile.location ? (
                    <li>
                      <MapPin size={13} aria-hidden="true" />
                      {data.profile.location}
                    </li>
                  ) : null}
                  <li>
                    <CalendarDays size={13} aria-hidden="true" />
                    Joined {formatDate(data.profile.createdAt)}
                  </li>
                </ul>
              </div>
            ) : null}

            <div className="github-grid">
              <div className="github-grid__main">
                <div className="block-head">
                  <p className="mono-label">PUBLIC REPOSITORIES</p>
                  <p className="block-head__note">SORTED BY LAST PUSH / FORKS EXCLUDED</p>
                </div>
                {data && data.repositories.length > 0 ? (
                  <div className="repo-grid">
                    {data.repositories.map((repository) => (
                      <RepositoryCard key={repository.id} repository={repository} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="NO ORIGINAL PUBLIC REPOSITORIES"
                    message="No non-fork, non-archived public repositories were returned."
                  />
                )}
              </div>

              <aside className="github-grid__side">
                <div className="panel language-panel">
                  <div className="panel__head">
                    <span className="mono-label">LANGUAGE BYTES</span>
                    <Users size={15} aria-hidden="true" />
                  </div>
                  <LanguageBars
                    slices={data?.languages ?? []}
                    repositoryCount={data?.languageRepositoryCount ?? 0}
                  />
                </div>

                <div className="panel">
                  <div className="panel__head">
                    <span className="mono-label">TVARA / GITHUB ACCOUNT</span>
                    <Building2 size={15} aria-hidden="true" />
                  </div>
                  {data?.organisation ? (
                    <div className="org">
                      <img
                        src={data.organisation.avatarUrl}
                        alt={`${data.organisation.name ?? data.organisation.login} GitHub avatar`}
                        width={44}
                        height={44}
                        loading="lazy"
                        decoding="async"
                      />
                      <div>
                        <p className="org__name">
                          {data.organisation.name ?? data.organisation.login}
                        </p>
                        <p className="org__description">
                          {data.organisation.description ?? data.organisation.blog ?? "No public description."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="empty-inline">GitHub account record unavailable.</p>
                  )}
                  {data?.organisationRepositories.length ? (
                    <ul className="org__repos">
                      {data.organisationRepositories.map((repository) => (
                        <li key={repository.id}>
                          <a
                            href={repository.htmlUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {repository.name}
                          </a>
                          <span>{formatRelative(repository.pushedAt ?? repository.updatedAt)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-inline">
                      No public repositories returned for @{identifiers.githubOrganisation}. Its
                      contribution count on GitHub comes from private repositories.
                    </p>
                  )}
                  <div className="org__links">
                    <ExternalLink href={`https://github.com/${identifiers.githubOrganisation}`}>
                      @{identifiers.githubOrganisation}
                    </ExternalLink>
                    <ExternalLink href={`https://github.com/${identifiers.tvaraOrg}`}>
                      @{identifiers.tvaraOrg} org
                    </ExternalLink>
                  </div>
                </div>
              </aside>
            </div>

            <div className="contribution-block panel">
              <div className="panel__head">
                <span className="mono-label">TVARA / CONTRIBUTION HISTORY</span>
                <span className="block-head__note">52 WEEKS · COMMITS · GITHUB CALENDAR</span>
              </div>
              {data?.organisation ? (
                <ContributionHeatmap
                  activity={data.organisationActivity ?? []}
                  total={data.organisationCommitTotal ?? 0}
                  repositoryCount={data.organisationCommitRepositoryCount ?? 0}
                  owner={data.organisation.login}
                />
              ) : (
                <EmptyState
                  title="NO COMMIT ACTIVITY RECORDED"
                  message="No public commit activity was returned for the Tvara GitHub account."
                />
              )}
              <div className="contribution-foot">
                <ExternalLink href={data?.organisation?.htmlUrl ?? `https://github.com/${identifiers.githubOrganisation}`}>
                  github.com/{data?.organisation?.login ?? identifiers.githubOrganisation} — view activity
                </ExternalLink>
                <ExternalLink href={`https://github.com/${identifiers.tvaraOrg}`}>
                  github.com/{identifiers.tvaraOrg} (org) — view
                </ExternalLink>
              </div>
              {data?.organisation && data.organisationActivity.length === 0 ? (
                <p className="contribution-note">
                  @{data.organisation.login} has no public repositories. Its
                  contributions on GitHub are from private repositories and
                  cannot be fetched via the unauthenticated REST API — the calendar
                  above shows public commit history only. Open the GitHub profile
                  to view the full graph.
                </p>
              ) : null}
            </div>
          </>
        )}
      </div>
    </Section>
  );
}
