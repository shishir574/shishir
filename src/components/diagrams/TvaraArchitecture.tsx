export function TvaraArchitecture() {
  return (
    <figure className="diagram">
      <svg
        viewBox="0 0 760 460"
        className="diagram__svg"
        role="img"
        aria-labelledby="tvara-arch-title tvara-arch-desc"
      >
        <title id="tvara-arch-title">Tvara AI Sales Brain schematic</title>
        <desc id="tvara-arch-desc">
          Four sales engines as one sales brain: matching engine, intelligent campaigns,
          learning from every interaction, and connection to your existing sales stack
          across Email, WhatsApp and calls.
        </desc>

        <defs>
          <pattern id="arch-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="var(--border)" strokeWidth="0.5" />
          </pattern>
        </defs>

        <rect width="760" height="460" fill="url(#arch-grid)" opacity="0.35" />
        <rect x="20" y="20" width="720" height="420" className="diagram__frame" />

        <text x="40" y="54" className="diagram__label">
          TVARA / AI SALES BRAIN
        </text>
        <text x="720" y="54" className="diagram__label diagram__label--end">
          TVARA.GLOBAL
        </text>

        <g className="arch-layer">
          <rect x="40" y="76" width="680" height="72" />
          <text x="56" y="104" className="diagram__label">
            LAYER 01 / SALES ENGINES
          </text>
          {["MATCHING ENGINE", "CAMPAIGNS", "LEARNING LOOP", "EXISTING STACK"].map((label, index) => (
            <g key={label} className="arch-node">
              <rect x={56 + index * 163} y="114" width="145" height="22" />
              <text x={128 + index * 163} y="129" className="arch-node__text">
                {label}
              </text>
            </g>
          ))}
        </g>

        <line x1="380" y1="148" x2="380" y2="176" className="diagram__connector" />
        <polygon points="374,174 386,174 380,182" className="diagram__arrow" />

        <g className="arch-layer">
          <rect x="40" y="186" width="680" height="82" />
          <text x="56" y="212" className="diagram__label">
            LAYER 02 / DECISION LAYER
          </text>
          {["BEST-FIT OFFER", "MESSAGE ANGLE", "PRIORITY", "CHANNEL"].map((label, index) => (
            <g key={label} className="arch-node arch-node--accent">
              <rect x={56 + index * 163} y="224" width="145" height="28" />
              <text x={128 + index * 163} y="242" className="arch-node__text">
                {label}
              </text>
            </g>
          ))}
        </g>

        <line x1="380" y1="268" x2="380" y2="296" className="diagram__connector" />
        <polygon points="374,294 386,294 380,302" className="diagram__arrow" />

        <g className="arch-layer">
          <rect x="40" y="306" width="680" height="72" />
          <text x="56" y="332" className="diagram__label">
            LAYER 03 / EXECUTION
          </text>
          {["EMAIL", "WHATSAPP", "CALLS", "CRM SYNC"].map(
            (label, index) => (
              <g key={label} className="arch-node">
                <rect x={56 + index * 163} y="344" width="145" height="22" />
                <text x={128 + index * 163} y="359" className="arch-node__text">
                  {label}
                </text>
              </g>
            ),
          )}
        </g>

        <g className="arch-deployment">
          <rect x="40" y="394" width="680" height="32" />
          <text x="56" y="414" className="diagram__label">
            OUTCOME
          </text>
          <text x="300" y="414" className="arch-deployment__text">
            MATCHED ACTION · LEARNS EVERY DAY
          </text>
        </g>
      </svg>
      <figcaption className="diagram__caption">
        Four sales engines, one Sales Brain — tvara.global
      </figcaption>
    </figure>
  );
}
