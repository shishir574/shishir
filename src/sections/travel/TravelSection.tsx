import { Section } from "@/components/layout/Section";
import { WorldGrid } from "@/components/diagrams/WorldGrid";
import { EmptyState } from "@/components/status/DataState";
import { travel } from "@/data";

export function TravelSection() {
  return (
    <Section
      id="travel"
      index="12"
      kicker="PERSONAL FILE / TRAVEL"
      title="Travel."
      description="Places visited."
    >
      <div className="travel-layout">
        <div className="travel-map">
          <WorldGrid />
        </div>
        <div className="travel-side">
          {travel.locations.length > 0 ? (
            <ul className="travel-list">
              {travel.locations.map((location) => (
                <li key={location.id}>
                  <span className="travel-list__city">{location.city}</span>
                  <span className="travel-list__country">{location.country}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="NO TRAVEL RECORDS"
              message="No places recorded yet."
            />
          )}
        </div>
      </div>
    </Section>
  );
}
