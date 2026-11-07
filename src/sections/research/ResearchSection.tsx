import { FileSearch, FlaskConical } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { research } from "@/data";
import { StatusDot } from "@/components/ui/StatusDot";
import { TagList } from "@/components/ui/Panel";
import { formatMonthYear } from "@/lib/formatting/date";

export function ResearchSection() {
  return (
    <Section
      id="research"
      index="03"
      kicker="RESEARCHER FILE / PUBLICATIONS"
      title="Research records, held to a verification standard."
      description="Bibliographic metadata is displayed only when it can be checked against a source. Verified records show their provenance; anything else stays explicitly pending rather than reconstructed from memory."
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
                    {record.verification === "verified" ? (
                      <StatusDot tone="live" label="VERIFIED" />
                    ) : (
                      <StatusDot tone="warning" label="VERIFICATION PENDING" />
                    )}
                  </div>
                  <h3 className="research-card__title">{record.title}</h3>
                  {record.authors.length > 0 ? (
                    <p className="research-card__authors">{record.authors.join(", ")}</p>
                  ) : null}
                  <p className="research-card__summary">{record.summary}</p>
                  <p className="research-card__note">{record.recordNote}</p>
                  <TagList items={record.topics} ariaLabel={`${record.shortTitle} topics`} />
                </div>
              </article>
            </li>
          ))}
        </ol>

        <aside className="research-aside">
          <div className="panel">
            <div className="panel__head">
              <span className="mono-label">VERIFICATION PROTOCOL</span>
              <FileSearch size={16} aria-hidden="true" />
            </div>
            <ol className="protocol-list">
              <li>
                <span>01</span>
                <p>Confirm the published document and final title.</p>
              </li>
              <li>
                <span>02</span>
                <p>Record authors, venue, date and page numbers exactly.</p>
              </li>
              <li>
                <span>03</span>
                <p>Extract benchmarks only from the paper or reproduced experiments.</p>
              </li>
              <li>
                <span>04</span>
                <p>Attach an original diagram and, where cleared, the PDF.</p>
              </li>
            </ol>
          </div>

          <div className="research-aside__note">
            <FlaskConical size={18} aria-hidden="true" />
            <p>
              The two IJIRT records above are verified against the owner&apos;s résumé. DOIs,
              PDFs and benchmark figures are still not provided and are not inferred. Crossref
              and OpenAlex will be used once identifiers are available.
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
