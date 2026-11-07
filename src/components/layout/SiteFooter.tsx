import { ArrowUp } from "lucide-react";
import { ACCENT_MODES, type AccentMode } from "@/hooks/useAccentMode";
import { identifiers, identity } from "@/data";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { StatusDot } from "@/components/ui/StatusDot";

export function SiteFooter({
  accent,
  onAccentChange,
}: {
  accent: AccentMode;
  onAccentChange: (mode: AccentMode) => void;
}) {
  return (
    <footer className="footer" id="footer">
      <div className="footer__inner">
        <div className="footer__identity">
          <span className="brand__mark" aria-hidden="true">
            SG
          </span>
          <div>
            <p className="footer__name">{identity.name}</p>
            <p className="footer__note">
              Static archive. Public data only. No analytics, cookies or visitor accounts.
            </p>
          </div>
        </div>

        <div className="footer__links" aria-label="External profiles">
          {identity.externalLinks.map((link) => (
            <ExternalLink key={link.url} href={link.url} className="footer__link">
              {link.label}
            </ExternalLink>
          ))}
        </div>

        <div className="footer__controls">
          <fieldset className="accent-control">
            <legend className="mono-label">SIGNAL SPECTRUM</legend>
            <div className="accent-control__options">
              {ACCENT_MODES.map((mode) => (
                <label key={mode.id} className="accent-control__option">
                  <input
                    type="radio"
                    name="accent"
                    value={mode.id}
                    checked={accent === mode.id}
                    onChange={() => {
                      onAccentChange(mode.id);
                    }}
                  />
                  <span>{mode.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <p className="footer__meta">
            <StatusDot tone="idle" label="ARCHIVE ONLINE" />
            <span>v0.1.0</span>
            <span>{identifiers.repository}</span>
          </p>
        </div>

        <a href="#home" className="footer__top">
          <ArrowUp size={14} aria-hidden="true" />
          RETURN TO TOP
        </a>
      </div>
    </footer>
  );
}
