import { Gamepad2, Trophy } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { EmptyState } from "@/components/status/DataState";
import { playstation } from "@/data";
import { formatDate } from "@/lib/formatting/date";
import { formatNumber } from "@/lib/formatting/number";

const TROPHIES = [
  { key: "platinumCount", label: "PLATINUM", tone: "platinum" },
  { key: "goldCount", label: "GOLD", tone: "gold" },
  { key: "silverCount", label: "SILVER", tone: "silver" },
  { key: "bronzeCount", label: "BRONZE", tone: "bronze" },
] as const;

export function PlayStationSection() {
  return (
    <Section
      id="gaming"
      index="10"
      kicker="PERSONAL FILE / PLAYSTATION"
      title="PlayStation."
      description="Game library and trophy record."
    >
      <div className="playstation-layout">
        <div className="psn-card panel">
          <div className="psn-card__head">
            <div className="psn-card__avatar" aria-hidden="true">
              <Gamepad2 size={26} />
            </div>
            <div>
              <p className="mono-label">PLAYSTATION NETWORK</p>
              <h3 className="psn-card__id">{playstation.onlineId}</h3>
              <p className="psn-card__level">
                TROPHY LEVEL <strong>{formatNumber(playstation.trophyLevel)}</strong>
              </p>
            </div>
          </div>

          <div className="trophy-grid">
            {TROPHIES.map((trophy) => (
              <div key={trophy.key} className={`trophy trophy--${trophy.tone}`}>
                <Trophy size={15} aria-hidden="true" />
                <span className="trophy__value">{formatNumber(playstation[trophy.key])}</span>
                <span className="trophy__label">{trophy.label}</span>
              </div>
            ))}
          </div>

          <div className="psn-card__foot">
            <span>LAST UPDATED {formatDate(playstation.lastUpdated)}</span>
            <span>{formatNumber(playstation.totalTrophies)} TOTAL</span>
          </div>
        </div>

        <div className="psn-library panel">
          <div className="panel__head">
            <span className="mono-label">GAME LIBRARY</span>
            <Gamepad2 size={15} aria-hidden="true" />
          </div>
          {playstation.games.length > 0 ? (
            <ul className="game-grid">
              {playstation.games.map((game) => (
                <li key={game.id} className="game-card">
                  <p className="game-card__title">{game.title}</p>
                  <p className="game-card__meta">
                    {game.platform} / {game.completionPercentage}% COMPLETE
                  </p>
                  {game.platinum ? <span className="game-card__platinum">PLATINUM</span> : null}
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="NO GAME RECORDS"
              message="No game records yet."
            />
          )}
        </div>
      </div>
    </Section>
  );
}
