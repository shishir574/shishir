import { Compass, MapPinned } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { WorldGrid } from "@/components/diagrams/WorldGrid";
import { EmptyState } from "@/components/status/DataState";
import { travel } from "@/data";

export function TravelSection() {
  return (
    <Section
      id="travel"
      index="12"
      kicker="PERSONAL FILE / FIELD NOTES"
      title="Places, only when they are recorded."
      description="The travel map is built from owned records: coordinates, dates and photographs. It is empty until those records are added, and it never invents a visit to make the map look busier."
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
              title="NO VERIFIED TRAVEL RECORDS"
              message={travel.note}
            />
          )}

          <div className="panel travel-note">
            <div className="panel__head">
              <span className="mono-label">MAP PROTOCOL</span>
              <MapPinned size={15} aria-hidden="true" />
            </div>
            <ul className="protocol-list protocol-list--compact">
              <li>
                <span>
                  <Compass size={13} aria-hidden="true" />
                </span>
                <p>Leaflet map with a public tile provider whose terms permit the usage.</p>
              </li>
              <li>
                <span>02</span>
                <p>Markers come from dated location records, connected to galleries.</p>
              </li>
              <li>
                <span>03</span>
                <p>No tile key, mapping backend or tracking pixel is required.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
