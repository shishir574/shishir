const NODES = [
  { id: "ai", label: "AI / ML", x: 120, y: 90 },
  { id: "sys", label: "SYSTEMS", x: 440, y: 90 },
  { id: "gpu", label: "GPU", x: 110, y: 330 },
  { id: "product", label: "PRODUCT", x: 450, y: 330 },
];

export function SkillMap() {
  return (
    <figure className="diagram skill-map">
      <svg
        viewBox="0 0 560 420"
        className="diagram__svg"
        role="img"
        aria-labelledby="skill-map-title skill-map-desc"
      >
        <title id="skill-map-title">Engineering skill relationship map</title>
        <desc id="skill-map-desc">
          A conceptual map connecting four engineering domains — AI and machine learning,
          systems, GPU computing and product — through a central archive node. It shows
          relationships between domains, not proficiency scores.
        </desc>

        <g className="skill-map__connections">
          {NODES.map((node) => (
            <line key={node.id} x1="280" y1="210" x2={node.x} y2={node.y} />
          ))}
          <line x1="120" y1="90" x2="440" y2="90" />
          <line x1="110" y1="330" x2="450" y2="330" />
          <line x1="120" y1="90" x2="110" y2="330" />
          <line x1="440" y1="90" x2="450" y2="330" />
        </g>

        <g className="skill-map__center">
          <circle cx="280" cy="210" r="52" />
          <circle cx="280" cy="210" r="38" />
          <text x="280" y="206" className="skill-map__center-label">
            SG
          </text>
          <text x="280" y="222" className="skill-map__center-sub">
            ARCHIVE
          </text>
        </g>

        {NODES.map((node) => (
          <g key={node.id} className="skill-map__node">
            <circle cx={node.x} cy={node.y} r="34" />
            <circle cx={node.x} cy={node.y} r="4" className="skill-map__dot" />
            <text x={node.x} y={node.y + 54} className="skill-map__label">
              {node.label}
            </text>
          </g>
        ))}

        <text x="18" y="18" className="diagram__label">
          RELATIONSHIP MAP / DOMAIN LEVEL
        </text>
        <text x="18" y="404" className="diagram__label">
          NOT A PROFICIENCY SCORE
        </text>
      </svg>
    </figure>
  );
}
