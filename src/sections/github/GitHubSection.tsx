import { useMemo } from "react";
import {
  Building2,
  CalendarDays,
  ExternalLink as ExternalLinkIcon,
  GitCommitHorizontal,
  MapPin,
  RefreshCw,
  Star,
  Users,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { LanguageBars } from "@/components/charts/LanguageBars";
import { EmptyState, ErrorState, LoadingState } from "@/components/status/DataState";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { StatusDot } from "@/components/ui/StatusDot";
import { TagList } from "@/components/ui/Panel";
import { useNearViewport } from "@/hooks/useNearViewport";
import { useGitHubArchive } from "@/integrations/github/useGitHubArchive";
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

  const statusTone = archive.error
    ? "offline"
    : archive.loading
      ? "warning"
      : data
        ? "live"
        : "idle";

  const statusLabel = archive.error
    ? "DEGRADED"
    : archive.loading
      ? "CONNECTING"
      : data
        ? data.warnings.length > 0
          ? "PARTIAL"
          : "LIVE / PUBLIC"
        : "ON DEMAND";

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
      description="Fetched directly from the GitHub REST API by this browser, without authentication or a proxy. The personal account and the Tvara organisation are kept separate because organisation activity may include other contributors."
    >
      <div ref={ref} className="github">
        <div className="source-bar">
          <StatusDot tone={statusTone} label={statusLabel} />
          <span className="source-bar__item">
            SOURCE <strong>{data?.source ?? "api.github.com"}</strong>
          </span>
          <span className="source-bar__item">
            CACHED <strong>{lastUpdated}</strong>
          </span>
          <span className="source-bar__item source-bar__item--optional">
            AUTH <strong>NONE</strong>
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
                    <span className="mono-label">TVARA / ORGANISATION</span>
                    <Building2 size={15} aria-hidden="true" />
                  </div>
                  {data?.organisation ? (
                    <div className="org">
                      <img
                        src={data.organisation.avatarUrl}
                        alt={`${data.organisation.name ?? data.organisation.login} organisation avatar`}
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
                          {data.organisation.description ?? "No public description."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="empty-inline">Organisation record unavailable.</p>
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
                    <p className="empty-inline">No public organisation repositories returned.</p>
                  )}
                  <p className="org__note">
                    Organisation commits may include work by multiple people and are not
                    presented as personal activity.
                  </p>
                </div>
              </aside>
            </div>

            <div className="commit-block">
              <div className="block-head">
                <p className="mono-label">RECENT COMMITS / FEATURED REPOSITORIES</p>
                <p className="block-head__note">MAX 2 REPOSITORIES / PUBLIC METADATA</p>
              </div>
              {data && data.commits.length > 0 ? (
                <ul className="commit-list">
                  {data.commits.map((commit) => (
                    <li key={`${commit.repository}-${commit.sha}`} className="commit">
                      <GitCommitHorizontal size={15} aria-hidden="true" />
                      <div className="commit__body">
                        <a
                          href={commit.htmlUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="commit__message"
                        >
                          {commit.message}
                        </a>
                        <p className="commit__meta">
                          <span>{commit.repository}</span>
                          <span>{commit.shortSha}</span>
                          {commit.authorLogin ? <span>@{commit.authorLogin}</span> : null}
                          <span>{formatRelative(commit.date)}</span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState
                  title="NO COMMIT METADATA"
                  message="Commit activity could not be read for the selected repositories."
                />
              )}
            </div>
          </>
        )}
      </div>
    </Section>
  );
}
