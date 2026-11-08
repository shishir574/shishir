import { Music2 } from "lucide-react";
import { Section } from "@/components/layout/Section";

const WAVE_BARS = [12, 26, 18, 36, 22, 44, 30, 16, 38, 24, 12, 32, 46, 20, 28, 14, 34, 24, 40, 18];

export function MusicSection() {
  return (
    <Section
      id="music"
      index="11"
      kicker="PERSONAL FILE / MUSIC"
      title="Music."
      description="Listening, when an authorised session is connected."
    >
      <div className="music-layout">
        <div className="music-panel panel">
          <div className="music-panel__head">
            <div className="music-panel__icon">
              <Music2 size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="mono-label">NOW PLAYING</p>
              <p className="music-panel__state">NOT CONNECTED</p>
            </div>
          </div>

          <div className="waveform" aria-hidden="true">
            {WAVE_BARS.map((height, index) => (
              <span key={index} style={{ height: `${String(height)}px` }} />
            ))}
          </div>

          <p className="music-panel__message">
            Music appears here after an explicit Spotify authorisation. No account data is
            shown to anonymous visitors.
          </p>
        </div>
      </div>
    </Section>
  );
}
