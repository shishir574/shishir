import { BriefcaseBusiness } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { EmptyState } from "@/components/status/DataState";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { StatusDot } from "@/components/ui/StatusDot";
import { linkedin } from "@/data";
import { formatDate } from "@/lib/formatting/date";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
    </svg>
  );
}

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      index="08"
      kicker="PROFESSIONAL FILE / LOCALLY MAINTAINED"
      title="Professional history, without the scrape."
      description="Experience entries are maintained in the repository and published only after confirmation. LinkedIn is linked as a profile, never scraped or treated as an API."
    >
      <div className="experience-layout">
        <div className="experience-main">
          {linkedin.experience.length > 0 ? (
            <ol className="timeline">
              {linkedin.experience.map((entry) => (
                <li key={entry.id} className="timeline__item">
                  <span className="timeline__marker" aria-hidden="true" />
                  <div className="timeline__body">
                    <p className="timeline__dates">
                      {entry.startDate} — {entry.endDate ?? "PRESENT"}
                    </p>
                    <h3 className="timeline__title">{entry.position}</h3>
                    <p className="timeline__org">{entry.organization}</p>
                    <p className="timeline__description">{entry.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <EmptyState
              title="NO VERIFIED EXPERIENCE ENTRIES"
              message="Professional entries are empty in the local record. The founder operating record is available now in the Tvara file."
            >
              <a href="#tvara" className="text-link">
                OPEN TVARA RECORD <span aria-hidden="true">→</span>
              </a>
            </EmptyState>
          )}
        </div>

        <aside className="experience-aside panel">
          <div className="panel__head">
            <span className="mono-label">LINKEDIN / SOURCE POLICY</span>
            <LinkedInIcon size={16} />
          </div>
          <p className="experience-aside__headline">{linkedin.headline}</p>
          <p className="experience-aside__about">{linkedin.about}</p>
          <dl className="meta-list">
            <div>
              <dt>LAST REVIEWED</dt>
              <dd>
                <StatusDot tone="warning" showLabel={false} />
                {formatDate(linkedin.lastUpdated)}
              </dd>
            </div>
            <div>
              <dt>ENTRIES</dt>
              <dd>{String(linkedin.experience.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>METHOD</dt>
              <dd>MANUAL / CONFIRMED</dd>
            </div>
          </dl>
          <ExternalLink href={linkedin.profileUrl} className="button button--small">
            <BriefcaseBusiness size={14} aria-hidden="true" />
            PUBLIC PROFILE
          </ExternalLink>
          <p className="experience-aside__note">{linkedin.verificationNote}</p>
        </aside>
      </div>
    </Section>
  );
}
