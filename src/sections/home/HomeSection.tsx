import { ArrowDown, ArrowRight, Fingerprint, Radio } from "lucide-react";
import { sections } from "@/app/routes";
import { identity } from "@/data";
import { SignalRadar } from "@/components/diagrams/SignalRadar";
import { TerminalConsole } from "@/components/terminal/TerminalConsole";
import { StatusDot } from "@/components/ui/StatusDot";
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
          <span className="hero__meta-item hero__meta-item--status">
            <StatusDot tone="live" label="SIGNAL ACTIVE" />
          </span>
        </div>

        <div className="hero__body">
          <div className="hero__identity">
            <p className="eyebrow">
              <span className="eyebrow__line" aria-hidden="true" />
              PERSONAL ARCHIVE / INTERACTIVE RECORD
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

          <aside className="signal-panel" aria-labelledby="signal-panel-title">
            <div className="signal-panel__head">
              <p className="mono-label" id="signal-panel-title">
                CONNECTION MATRIX
              </p>
              <Radio size={15} aria-hidden="true" />
            </div>
            <dl className="signal-panel__list">
              <div>
                <dt>GITHUB</dt>
                <dd>
                  <StatusDot tone="warning" showLabel={false} />
                  ON DEMAND
                </dd>
              </div>
              <div>
                <dt>TVARA</dt>
                <dd>
                  <StatusDot tone="live" showLabel={false} />
                  OPERATING
                </dd>
              </div>
              <div>
                <dt>RESEARCH</dt>
                <dd>
                  <StatusDot tone="idle" showLabel={false} />
                  VERIFYING
                </dd>
              </div>
              <div>
                <dt>SPOTIFY</dt>
                <dd>
                  <StatusDot tone="warning" showLabel={false} />
                  GATED
                </dd>
              </div>
            </dl>
            <p className="signal-panel__note">
              Live sources connect directly from this browser. Nothing is proxied, scraped or
              scheduled. Failed services degrade to an explicit unavailable state.
            </p>
            <div className="signal-panel__foot">
              <span>PUBLIC DATA</span>
              <span>NO TRACKERS</span>
              <span>STATIC</span>
            </div>
          </aside>
        </div>

        <div className="archive-index">
          <div className="archive-index__head">
            <p className="mono-label">ARCHIVE DIRECTORY</p>
            <p className="archive-index__count">
              {String(sections.length - 1).padStart(2, "0")} RECORDS / SELECT A SECTION
            </p>
          </div>
          <ol className="archive-index__list">
            {sections.slice(1).map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="archive-row">
                  <span className="archive-row__index">{section.index}</span>
                  <span className="archive-row__main">
                    <span className="archive-row__title">{section.label}</span>
                    <span className="archive-row__description">{section.description}</span>
                  </span>
                  <span className="archive-row__dimension">{section.dimension}</span>
                  <ArrowRight className="archive-row__arrow" size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
