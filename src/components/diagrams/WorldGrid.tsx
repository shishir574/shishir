export function WorldGrid() {
  return (
    <figure className="diagram world-grid">
      <svg
        viewBox="0 0 760 420"
        className="diagram__svg"
        role="img"
        aria-labelledby="world-title world-desc"
      >
        <title id="world-title">Travel map awaiting verified locations</title>
        <desc id="world-desc">
          An abstract coordinate grid representing the travel map. No country or city markers
          are shown because no verified travel records have been added.
        </desc>

        <defs>
          <pattern id="world-dots" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.1" fill="var(--border-strong)" />
          </pattern>
        </defs>

        <rect width="760" height="420" fill="url(#world-dots)" opacity="0.5" />

        <g className="world-grid__lines">
          <rect x="40" y="40" width="680" height="330" />
          {[110, 180, 250, 320].map((y) => (
            <line key={y} x1="40" y1={y} x2="720" y2={y} />
          ))}
          {[150, 260, 370, 480, 590, 700].map((x) => (
            <line key={x} x1={x} y1="40" x2={x} y2="370" />
          ))}
          <ellipse cx="380" cy="205" rx="330" ry="150" />
          <ellipse cx="380" cy="205" rx="220" ry="100" />
        </g>

        <g className="world-grid__crosshair" aria-hidden="true">
          <line x1="380" y1="150" x2="380" y2="260" />
          <line x1="320" y1="205" x2="440" y2="205" />
          <circle cx="380" cy="205" r="6" />
        </g>

        <text x="40" y="30" className="diagram__label">
          TRAVEL GRID / NO VERIFIED MARKERS
        </text>
        <text x="720" y="30" className="diagram__label diagram__label--end">
          00 LOCATIONS
        </text>
        <text x="380" y="400" className="world-grid__caption-text">
          DATA PENDING / MAP DOES NOT INVENT VISITS
        </text>
      </svg>
      <figcaption className="diagram__caption">
        Leaflet will render the interactive map once verified location records exist.
      </figcaption>
    </figure>
  );
}
