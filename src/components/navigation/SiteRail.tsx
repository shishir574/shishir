import { sections } from "@/app/routes";
import { identifiers, identity, linkedin } from "@/data";
import { useUtcClock } from "@/hooks/useUtcClock";
import { formatDate } from "@/lib/formatting/date";

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function SiteRail({ active }: { active: string }) {
  const clock = useUtcClock();

  return (
    <aside className="rail" aria-label="Archive index">
      <a className="brand" href="#home" aria-label="Shishir Govinda — archive index">
        <span className="brand__mark" aria-hidden="true">
          SG
        </span>
        <span className="brand__text">
          <span className="brand__name">SHISHIR</span>
          <span className="brand__sub">PERSONAL ARCHIVE</span>
        </span>
      </a>

      <div className="rail__section-label">
        <span>SECTION INDEX</span>
        <span className="rail__section-count">{String(sections.length).padStart(2, "0")}</span>
      </div>

      <nav className="rail__nav">
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <a
                className={`nav-link${active === section.id ? " is-active" : ""}`}
                href={`#${section.id}`}
                aria-current={active === section.id ? "true" : undefined}
              >
                <span className="nav-link__index">{section.index}</span>
                <span className="nav-link__label">{section.label}</span>
                <span className="nav-link__dimension">{section.dimension}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="rail__footer">
        <dl className="rail__meta">
          <div>
            <dt>UTC</dt>
            <dd>{clock}</dd>
          </div>
          <div>
            <dt>LAST UPDATED</dt>
            <dd>{formatDate(linkedin.lastUpdated)}</dd>
          </div>
          <div>
            <dt>EMAIL</dt>
            <dd>
              <a className="rail__contact-link" href={`mailto:${identity.contact.email}`}>
                {identity.contact.email}
              </a>
            </dd>
          </div>
          <div>
            <dt>PHONE</dt>
            <dd>
              <a
                className="rail__contact-link"
                href={`tel:+${identity.contact.phone.replace(/[^0-9]/g, "")}`}
              >
                {identity.contact.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt>BASE</dt>
            <dd>
              {identity.contact.city} / {identity.contact.country}
            </dd>
          </div>
        </dl>
        <a
          className="rail__github"
          href={`https://github.com/${identifiers.github}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <GithubIcon size={15} />
          <span>github.com/{identifiers.github}</span>
        </a>
      </div>
    </aside>
  );
}
