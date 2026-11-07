import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { identity, identifiers } from "@/data";

const LINK_META: Record<string, string> = {
  GitHub: "Code, repositories and public activity",
  LinkedIn: "Professional profile",
  LeetCode: "Problem-solving record",
  "Tvara GitHub": "Company repositories",
};

export function ContactSection() {
  return (
    <Section
      id="contact"
      index="13"
      kicker="EXTERNAL PROFILES"
      title="The public endpoints."
      description="No contact form, no visitor accounts and no tracking. These are the public profiles that belong to this archive; nothing is invented where an account does not exist."
    >
      <div className="contact-layout">
        <ul className="contact-links">
          {identity.externalLinks.map((link, index) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="contact-link"
              >
                <span className="contact-link__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="contact-link__body">
                  <span className="contact-link__label">{link.label}</span>
                  <span className="contact-link__meta">
                    {LINK_META[link.label] ?? "Public profile"}
                  </span>
                </span>
                <span className="contact-link__url">{new URL(link.url).hostname}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <aside className="contact-aside panel">
          <p className="mono-label">ARCHIVE IDENTIFIERS</p>
          <dl className="meta-list">
            <div>
              <dt>GITHUB</dt>
              <dd>{identifiers.github}</dd>
            </div>
            <div>
              <dt>ORGANISATION</dt>
              <dd>{identifiers.githubOrganisation}</dd>
            </div>
            <div>
              <dt>LEETCODE</dt>
              <dd>{identifiers.leetcode}</dd>
            </div>
            <div>
              <dt>PLAYSTATION</dt>
              <dd>{identifiers.playstation}</dd>
            </div>
            <div>
              <dt>REPOSITORY</dt>
              <dd>{identifiers.repository}</dd>
            </div>
          </dl>
          <p className="contact-aside__note">
            Built as a static client-side archive. Hosted on GitHub Pages. Public APIs are called
            directly by the visitor&apos;s browser.
          </p>
        </aside>
      </div>
    </Section>
  );
}
