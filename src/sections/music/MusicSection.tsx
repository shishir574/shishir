import { Headphones, LockKeyhole, Music2 } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { StatusDot } from "@/components/ui/StatusDot";

const WAVE_BARS = [12, 26, 18, 36, 22, 44, 30, 16, 38, 24, 12, 32, 46, 20, 28, 14, 34, 24, 40, 18];

export function MusicSection() {
  return (
    <Section
      id="music"
      index="11"
      kicker="PERSONAL FILE / SPOTIFY"
      title="Music stays gated until authorisation is real."
      description="Spotify personal data cannot be shown to anonymous visitors. The integration is isolated and disabled in this build rather than displaying a borrowed or fabricated listening identity."
    >
      <div className="music-layout">
        <div className="music-panel panel">
          <div className="music-panel__head">
            <div className="music-panel__icon">
              <Music2 size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="mono-label">NOW PLAYING / OWNER SESSION</p>
              <p className="music-panel__state">NO AUTHORISED SESSION</p>
            </div>
            <StatusDot tone="warning" label="GATED" />
          </div>

          <div className="waveform" aria-hidden="true">
            {WAVE_BARS.map((height, index) => (
              <span key={index} style={{ height: `${String(height)}px` }} />
            ))}
          </div>

          <p className="music-panel__message">
            Public visitors see this gate, not the owner&apos;s account. When the integration is
            enabled, current playback and top artists will appear only after an explicit
            Authorization Code + PKCE session, with tokens held in session storage and a visible
            disconnect action.
          </p>

          <div className="music-panel__scopes">
            <span className="mono-label">MINIMUM SCOPES</span>
            <ul>
              <li>user-read-currently-playing</li>
              <li>user-top-read</li>
            </ul>
          </div>
        </div>

        <aside className="music-aside">
          <div className="panel">
            <div className="panel__head">
              <span className="mono-label">WHY IT IS DISABLED</span>
              <LockKeyhole size={15} aria-hidden="true" />
            </div>
            <ul className="reason-list">
              <li>
                <span>01</span>
                <p>Spotify restricts personal-data access to explicitly authorised accounts.</p>
              </li>
              <li>
                <span>02</span>
                <p>No client secret can exist in a static production bundle.</p>
              </li>
              <li>
                <span>03</span>
                <p>Developer access requirements must be re-verified before enabling production.</p>
              </li>
              <li>
                <span>04</span>
                <p>Genre aggregation must be derived from returned artist genres, never invented.</p>
              </li>
            </ul>
          </div>

          <div className="music-aside__note">
            <Headphones size={18} aria-hidden="true" />
            <p>
              This section is structurally isolated. Enabling or disabling it cannot affect the
              GitHub, research or professional records.
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
