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
          <li>
            <a href={`mailto:${identity.contact.email}`} className="contact-link">
              <span className="contact-link__index">01</span>
              <span className="contact-link__body">
                <span className="contact-link__label">Email</span>
                <span className="contact-link__meta">Direct contact</span>
              </span>
              <span className="contact-link__url">{identity.contact.email}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href={`tel:+${identity.contact.phone.replace(/[^0-9]/g, "")}`}
              className="contact-link"
            >
              <span className="contact-link__index">02</span>
              <span className="contact-link__body">
                <span className="contact-link__label">Phone</span>
                <span className="contact-link__meta">
                  {identity.contact.city}, {identity.contact.country}
                </span>
              </span>
              <span className="contact-link__url">{identity.contact.phone}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </li>
          {identity.externalLinks.map((link, index) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="contact-link"
              >
                <span className="contact-link__index">
                  {String(index + 3).padStart(2, "0")}
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
          <p className="mono-label">CONTACT</p>
          <dl className="meta-list">
            <div>
              <dt>EMAIL</dt>
              <dd>
                <a href={`mailto:${identity.contact.email}`}>{identity.contact.email}</a>
              </dd>
            </div>
            <div>
              <dt>PHONE</dt>
              <dd>
                <a href={`tel:+${identity.contact.phone.replace(/[^0-9]/g, "")}`}>
                  {identity.contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt>BASE</dt>
              <dd>
                {identity.contact.city}, {identity.contact.country}
              </dd>
            </div>
          </dl>
          <p className="mono-label" style={{ marginTop: "1rem" }}>
            ARCHIVE IDENTIFIERS
          </p>
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
