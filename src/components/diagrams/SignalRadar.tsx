const NODES = [
  { id: "tvara", label: "TVARA", x: 210, y: 94, className: "radar__node--primary" },
  { id: "research", label: "RESEARCH", x: 318, y: 214, className: "" },
  { id: "code", label: "CODE", x: 262, y: 326, className: "" },
  { id: "systems", label: "SYSTEMS", x: 96, y: 298, className: "" },
  { id: "archive", label: "ARCHIVE", x: 108, y: 128, className: "" },
];

export function SignalRadar() {
  return (
    <figure className="radar">
      <svg
        viewBox="0 0 420 420"
        className="radar__svg"
        role="img"
        aria-labelledby="radar-title radar-desc"
      >
        <title id="radar-title">Signal map of Shishir Govinda&apos;s work</title>
        <desc id="radar-desc">
          A radar diagram with five labelled nodes: Tvara, research, code, systems and this
          archive. The visual is decorative and represents the archive&apos;s dimensions
          rather than live data.
        </desc>

        <defs>
          <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--red)" stopOpacity="0.22" />
            <stop offset="70%" stopColor="var(--red)" stopOpacity="0.03" />
            <stop offset="100%" stopColor="var(--red)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="radar-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--red)" stopOpacity="0.34" />
            <stop offset="100%" stopColor="var(--red)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <circle cx="210" cy="210" r="188" fill="url(#radar-glow)" />

        <g className="radar__rings">
          {[46, 86, 126, 166].map((radius) => (
            <circle key={radius} cx="210" cy="210" r={radius} />
          ))}
        </g>

        <g className="radar__axes">
          <line x1="44" y1="210" x2="376" y2="210" />
          <line x1="210" y1="44" x2="210" y2="376" />
        </g>

        <g className="radar__ticks">
          {Array.from({ length: 36 }, (_, index) => {
            const angle = (index * 10 * Math.PI) / 180;
            const inner = index % 3 === 0 ? 176 : 183;
            const x1 = 210 + Math.cos(angle) * inner;
            const y1 = 210 + Math.sin(angle) * inner;
            const x2 = 210 + Math.cos(angle) * 190;
            const y2 = 210 + Math.sin(angle) * 190;
            return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>

        <g className="radar__sweep" aria-hidden="true">
          <path d="M210 210 L210 44 A166 166 0 0 1 354 127 Z" fill="url(#radar-sweep)" />
          <line x1="210" y1="210" x2="210" y2="44" />
        </g>

        {NODES.map((node) => (
          <g key={node.id} className={`radar__node ${node.className}`.trim()}>
            <line x1="210" y1="210" x2={node.x} y2={node.y} className="radar__leader" />
            <circle cx={node.x} cy={node.y} r="5.5" className="radar__dot" />
            <circle cx={node.x} cy={node.y} r="12" className="radar__pulse" />
            <text x={node.x} y={node.y - 14} className="radar__label">
              {node.label}
            </text>
          </g>
        ))}

        <g className="radar__center">
          <rect x="203" y="203" width="14" height="14" />
          <rect x="206" y="206" width="8" height="8" />
        </g>

        <g className="radar__coordinates" aria-hidden="true">
          <text x="30" y="30">SIGNAL / ACTIVE</text>
          <text x="30" y="44">NODES / 05</text>
          <text x="330" y="398">SG-001</text>
        </g>
      </svg>
      <figcaption className="radar__caption">
        <span>SIGNAL MAP / 05 NODES</span>
        <span className="radar__caption-status">SCANNING</span>
      </figcaption>
    </figure>
  );
}
