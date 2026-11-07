import { Award, GraduationCap, ScrollText } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { EmptyState } from "@/components/status/DataState";
import { StatusDot } from "@/components/ui/StatusDot";
import { education, linkedin } from "@/data";
import { formatMonthYear } from "@/lib/formatting/date";

export function EducationSection() {
  return (
    <Section
      id="education"
      index="07"
      kicker="ACADEMIC RECORD"
      title="Academic record, verified from the résumé."
      description="Degree, dates, GPA and coursework are recorded from the owner's résumé. Subject marks are not itemised there and are not inferred."
    >
      <div className="education-layout">
        <div className="education-records">
          {education.records.map((record) => (
            <article key={record.id} className="education-card panel">
              <div className="education-card__head">
                <div className="education-card__icon">
                  <GraduationCap size={22} aria-hidden="true" />
                </div>
                <div>
                  <p className="mono-label">DEGREE RECORD</p>
                  <h3 className="education-card__degree">{record.degree}</h3>
                  <p className="education-card__institution">{record.institution}</p>
                </div>
                {record.verification === "verified" ? (
                  <StatusDot tone="live" label="VERIFIED RECORD" />
                ) : (
                  <StatusDot tone="warning" label="PENDING VERIFICATION" />
                )}
              </div>

              <dl className="meta-list meta-list--grid">
                <div>
                  <dt>DEPARTMENT</dt>
                  <dd>{record.department}</dd>
                </div>
                <div>
                  <dt>AFFILIATION</dt>
                  <dd>{record.affiliation}</dd>
                </div>
                <div>
                  <dt>DURATION</dt>
                  <dd>
                    {record.startDate} — {record.endDate ?? "PRESENT"}
                  </dd>
                </div>
                <div>
                  <dt>GPA</dt>
                  <dd>{record.gpa ?? "—"}</dd>
                </div>
              </dl>

              <ul className="education-card__notes">
                {record.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </article>
          ))}

          {education.records.length === 0 ? (
            <EmptyState
              title="NO ACADEMIC RECORDS"
              message="Education records have not been added yet."
            />
          ) : null}
        </div>

        <aside className="education-aside">
          <div className="panel">
            <div className="panel__head">
              <span className="mono-label">COURSEWORK</span>
              <ScrollText size={16} aria-hidden="true" />
            </div>
            {education.courses.length > 0 ? (
              <ul className="course-list">
                {education.courses.map((course) => (
                  <li key={course.id}>{course.name}</li>
                ))}
              </ul>
            ) : (
              <p className="empty-inline">
                No verified course records. Subject marks will not be approximated or generated
                to fill a chart.
              </p>
            )}
          </div>

          <div className="panel">
            <div className="panel__head">
              <span className="mono-label">CERTIFICATIONS</span>
              <Award size={16} aria-hidden="true" />
            </div>
            {linkedin.certifications.length > 0 ? (
              <ul className="course-list">
                {linkedin.certifications.map((certification) => (
                  <li key={certification.id}>
                    <span className="certification__title">{certification.title}</span>
                    <span className="certification__meta">
                      {certification.organization ?? "—"} ·{" "}
                      {formatMonthYear(certification.startDate)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-inline">No certification records.</p>
            )}
          </div>

          <div className="panel">
            <div className="panel__head">
              <span className="mono-label">SUBJECT PERFORMANCE</span>
            </div>
            <div className="chart-placeholder" role="img" aria-label="Subject performance chart pending verified marks">
              <span className="chart-placeholder__line" />
              <span className="chart-placeholder__line" />
              <span className="chart-placeholder__line" />
              <span className="chart-placeholder__line" />
              <p>AWAITING VERIFIED COURSEWORK</p>
            </div>
          </div>

          {education.achievements.length > 0 ? (
            <div className="panel">
              <p className="mono-label">ACHIEVEMENTS</p>
              <ul>
                {education.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
    </Section>
  );
}
