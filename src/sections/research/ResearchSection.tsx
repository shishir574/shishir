import { Section } from "@/components/layout/Section";
import { research } from "@/data";
import { TagList } from "@/components/ui/Panel";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { formatMonthYear } from "@/lib/formatting/date";

export function ResearchSection() {
  return (
    <Section
      id="research"
      index="03"
      kicker="RESEARCHER FILE / PUBLICATIONS"
      title="Research records."
      description="Publications and research records, newest first."
    >
      <div className="research-layout">
        <ol className="research-list">
          {research.records.map((record, index) => (
            <li key={record.id}>
              <article className="research-card">
                <div className="research-card__rail" aria-hidden="true">
                  <span className="research-card__node" />
                  {index < research.records.length - 1 ? (
                    <span className="research-card__line" />
                  ) : null}
                </div>
                <div className="research-card__body">
                  <div className="research-card__top">
                    <span className="research-card__year">
                      {formatMonthYear(record.publicationDate)}
                    </span>
                    <span className="research-card__venue">{record.venue}</span>
                  </div>
                  <h3 className="research-card__title">{record.title}</h3>
                  {record.authors.length > 0 ? (
                    <p className="research-card__authors">{record.authors.join(", ")}</p>
                  ) : null}
                  <p className="research-card__summary">{record.summary}</p>
                  {record.recordNote ? (
                    <p className="research-card__note">{record.recordNote}</p>
                  ) : null}
                  {record.paperUrl ? (
                    <p style={{ marginTop: "0.7rem" }}>
                      <ExternalLink href={record.paperUrl}>Read the paper (PDF)</ExternalLink>
                    </p>
                  ) : null}
                  <TagList items={record.topics} ariaLabel={`${record.shortTitle} topics`} />
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
