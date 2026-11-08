import { ArrowDown, ArrowRight, Fingerprint } from "lucide-react";
import { identity } from "@/data";
import { SignalRadar } from "@/components/diagrams/SignalRadar";
import { TerminalConsole } from "@/components/terminal/TerminalConsole";
import { TagList } from "@/components/ui/Panel";

export function HomeSection() {
  return (
    <section id="home" className="hero" aria-labelledby="home-title">
      <div className="hero__inner">
        <div className="hero__meta">
          <span className="hero__meta-item">
            <Fingerprint size={13} aria-hidden="true" />
            ARCHIVE / SG-001
          </span>
          <span className="hero__meta-item">OPEN FILE</span>
        </div>

        <div className="hero__body">
          <div className="hero__identity">
            <p className="eyebrow">
              <span className="eyebrow__line" aria-hidden="true" />
              PERSONAL ARCHIVE
            </p>
            <h1 className="hero__title" id="home-title">
              <span className="hero__title-line">SHISHIR</span>
              <span className="hero__title-line hero__title-line--outline">GOVINDA</span>
            </h1>
            <p className="hero__roles">
              {identity.roles.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </p>
            <p className="hero__intro">{identity.intro}</p>

            <div className="hero__focus">
              <span className="mono-label">CURRENT FOCUS</span>
              <TagList items={identity.currentFocus} ariaLabel="Current focus" />
            </div>

            <div className="hero__actions">
              <a href="#github" className="button button--primary">
                LIVE GITHUB RECORD
                <ArrowDown size={15} aria-hidden="true" />
              </a>
              <a href="#tvara" className="button">
                TVARA / FOUNDER FILE
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero__visual">
            <SignalRadar />
          </div>
        </div>

        <div className="hero__console">
          <TerminalConsole />
        </div>
      </div>
    </section>
  );
}
